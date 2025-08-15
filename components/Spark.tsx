
import React, { useState, useCallback } from 'react';
import type { Language, SparkMode } from '../types.ts';
import { i18n } from '../lib/i18n.ts';
import { getIdeaSpark } from '../services/geminiService.ts';
import { Lightbulb, BrainCog, HelpCircle, Shuffle, Drama, LoaderCircle, Sparkles, AlertTriangle } from 'lucide-react';

interface SparkProps {
    lang: Language;
}

export const Spark: React.FC<SparkProps> = ({ lang }) => {
    const t = i18n(lang).spark;
    const [topic, setTopic] = useState('');
    const [mode, setMode] = useState<SparkMode>('brainstorm');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<string>('');
    
    const modes: { id: SparkMode; title: string; description: string; icon: React.ReactNode }[] = [
        { id: 'brainstorm', title: t.modes.brainstorm.title, description: t.modes.brainstorm.description, icon: <BrainCog className="w-6 h-6" /> },
        { id: 'questions', title: t.modes.questions.title, description: t.modes.questions.description, icon: <HelpCircle className="w-6 h-6" /> },
        { id: 'metaphors', title: t.modes.metaphors.title, description: t.modes.metaphors.description, icon: <Shuffle className="w-6 h-6" /> },
        { id: 'roleplay', title: t.modes.roleplay.title, description: t.modes.roleplay.description, icon: <Drama className="w-6 h-6" /> },
    ];

    const handleGenerate = useCallback(async () => {
        if (!topic.trim()) return;
        setIsLoading(true);
        setError(null);
        setResponse('');
        try {
            const result = await getIdeaSpark(topic, mode, lang);
            setResponse(result);
        } catch (e) {
            console.error(e);
            setError(t.error);
        } finally {
            setIsLoading(false);
        }
    }, [topic, mode, lang, t.error]);
    
    const formattedResponse = response.split(/[\n-?]/).map(item => item.trim()).filter(item => item.length > 0);

    return (
        <div className="animate-fade-in space-y-8">
            <div className="text-center">
                <Lightbulb className="h-16 w-16 mx-auto accent-gradient-text mb-4" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">{t.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-2 font-body">
                    {t.description}
                </p>
            </div>

            <div className="max-w-4xl mx-auto bg-[var(--card-background)] p-6 md:p-8 rounded-3xl card-shadow">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="topic-input" className="text-lg font-semibold text-[var(--text-primary)] mb-2 block">{`1. ${t.topic_label}`}</label>
                        <textarea
                            id="topic-input"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder={t.placeholder}
                            className="w-full h-24 p-4 bg-[var(--surface-color)] dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none transition font-body"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                         <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">{`2. ${t.modes.brainstorm.title}`}</h3>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {modes.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => setMode(m.id)}
                                    className={`p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                                        mode === m.id
                                            ? 'bg-violet-100 dark:bg-violet-900/50 border-violet-500 shadow-lg'
                                            : 'bg-[var(--surface-color)] dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600'
                                    }`}
                                >
                                    <div className={`flex items-center gap-3 font-bold ${mode === m.id ? 'text-violet-700 dark:text-violet-300' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {m.icon}
                                        {m.title}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-body">{m.description}</p>
                                </button>
                            ))}
                         </div>
                    </div>
                     <button
                        onClick={handleGenerate}
                        disabled={isLoading || !topic.trim()}
                        className="w-full accent-gradient-bg text-white font-bold py-4 px-4 rounded-xl transition-opacity flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                        {isLoading ? (
                            <>
                                <LoaderCircle className="w-6 h-6 mr-2 animate-spin" />
                                {t.loading}
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-6 h-6 mr-2" />
                                {t.button}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {(response || error) && (
                 <div className="max-w-4xl mx-auto animate-fade-in">
                    <h3 className="text-2xl font-bold text-center mb-4">{t.response_title}</h3>
                    {error && <p className="text-red-500 text-center flex items-center justify-center"><AlertTriangle className="w-5 h-5 mr-2"/> {error}</p>}
                    {response && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formattedResponse.map((item, index) => (
                                <div key={index} className="bg-[var(--card-background)] p-4 rounded-xl card-shadow flex items-start">
                                    <span className="text-violet-500 mr-3 mt-1"><Lightbulb className="w-5 h-5"/></span>
                                    <p className="text-gray-700 dark:text-gray-200 font-body">{item}</p>
                                </div>
                            ))}
                        </div>
                    )}
                 </div>
            )}
        </div>
    );
};