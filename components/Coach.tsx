
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import type { Language, ChatMessage, SessionRecord, JournalEntry } from '../types.ts';
import { i18n } from '../lib/i18n.ts';
import { getProactiveCoachGreeting } from '../services/geminiService.ts';
import { Bot, Send, User, LoaderCircle, Shield } from 'lucide-react';

const hasApiKey = !!process.env.API_KEY;

interface CoachProps {
    lang: Language;
    lastSession?: SessionRecord;
    lastJournal?: JournalEntry;
}

const TypingIndicator = () => (
    <div className="flex items-center space-x-1.5">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
    </div>
);

export const Coach: React.FC<CoachProps> = ({ lang, lastSession, lastJournal }) => {
    const t = i18n(lang).coach;
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Effect to generate the initial greeting.
    useEffect(() => {
        setIsTyping(true);
        setHistory([]); // Clear history on new context
        getProactiveCoachGreeting(lastSession, lastJournal, lang)
            .then(greeting => {
                setHistory([{ role: 'model', text: greeting }]);
            })
            .catch(e => {
                console.error("Proactive greeting failed:", e);
                setHistory([{ role: 'model', text: t.welcome_message }]);
            })
            .finally(() => setIsTyping(false));
    }, [lang, lastSession, lastJournal, t.welcome_message]);
    
    // Effect to scroll to the bottom of the chat
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [history, isTyping]);
    
    const handleSendMessage = useCallback(async (message: string) => {
        if (!message.trim() || isTyping) return;

        const userMessage: ChatMessage = { role: 'user', text: message };
        setHistory(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        if (!hasApiKey) {
            // DEMO MODE for chat
            setTimeout(() => {
                const modelMessage: ChatMessage = { role: 'model', text: "This is a simulated response. (Demo Mode)" };
                setHistory(prev => [...prev, modelMessage]);
                setIsTyping(false);
            }, 1000);
            return;
        }

        const historyForGemini = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const chat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: { systemInstruction: t.system_instruction },
                history: historyForGemini
            });
            const stream = await chat.sendMessageStream({ message });
            
            let fullResponse = '';
            setHistory(prev => [...prev, { role: 'model', text: '' }]);
            
            for await (const chunk of stream) {
                fullResponse += chunk.text;
                setHistory(prev => {
                    const newHistory = [...prev];
                    const lastMessage = newHistory[newHistory.length - 1];
                    if(lastMessage.role === 'model') {
                        lastMessage.text = fullResponse;
                    }
                    return newHistory;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setHistory(prev => [...prev, { role: 'model', text: t.error_message }]);
        } finally {
            setIsTyping(false);
        }
    }, [history, isTyping, t.system_instruction, t.error_message]);

    return (
        <div className="flex flex-col h-full bg-[var(--card-background)] rounded-3xl card-shadow animate-fade-in overflow-hidden">
            <div className="p-4 border-b border-[var(--border-color)]">
                <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center">
                    <Bot className="h-6 w-6 mr-3 text-violet-500" />
                    {t.title}
                </h2>
            </div>
            
            <div ref={chatContainerRef} className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
                {history.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                            <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0">
                                <Bot className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                            </div>
                        )}
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-violet-600 text-white rounded-br-lg' : 'bg-[var(--surface-color)] text-[var(--text-primary)] rounded-bl-lg'}`}>
                            <p className="whitespace-pre-wrap font-body text-sm leading-relaxed">{msg.text}</p>
                        </div>
                        {msg.role === 'user' && (
                            <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </div>
                        )}
                    </div>
                ))}
                 {(isTyping && history.length === 0) || (isTyping && history[history.length -1]?.role === 'user') ? (
                    <div className="flex items-start gap-3 justify-start">
                         <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div className="max-w-lg px-4 py-3 rounded-2xl bg-[var(--surface-color)] text-[var(--text-primary)] rounded-bl-lg">
                           <TypingIndicator />
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="p-4 border-t border-[var(--border-color)] bg-[var(--background)]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage(inputMessage);
                    }}
                    className="flex items-center gap-3"
                >
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={t.placeholder}
                        className="flex-1 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all font-body"
                        disabled={isTyping}
                    />
                    <button
                        type="submit"
                        disabled={isTyping || !inputMessage.trim()}
                        className="accent-gradient-bg text-white font-bold w-11 h-11 flex items-center justify-center rounded-xl transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                        aria-label="Send message"
                    >
                        {isTyping ? <LoaderCircle className="h-5 w-5 animate-spin"/> : <Send className="h-5 w-5" />}
                    </button>
                </form>
                 <p className="text-xs text-[var(--text-secondary)] mt-2 text-center flex items-center justify-center gap-1.5 font-body">
                    <Shield className="h-3 w-3" />
                    {t.disclaimer}
                </p>
            </div>
        </div>
    );
};