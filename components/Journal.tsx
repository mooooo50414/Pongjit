
import React, { useState, useRef, useEffect } from 'react';
import type { JournalEntry, Language, VoiceAnalysis } from '../types.ts';
import { i18n } from '../lib/i18n.ts';
import { analyzeJournalEntry, analyzeVoiceNote } from '../services/geminiService.ts';
import { BookMarked, BrainCircuit, LoaderCircle, Sparkles, MessageSquareHeart, Zap, AlertTriangle, ChevronRight, FilePlus, BookHeart, ListChecks, Mic, Square, Trash2, Tag, Play, Pause, AudioLines, Pencil } from 'lucide-react';

// HACK: Add SpeechRecognition types to the window object for browser compatibility.
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
    start: () => void;
    stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: { new(): SpeechRecognition };
    webkitSpeechRecognition: { new(): SpeechRecognition };
  }
}

// Check for SpeechRecognition API
const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

interface JournalProps {
    journalEntries: JournalEntry[];
    setJournalEntries: (entries: JournalEntry[]) => void;
    lang: Language;
}

export const Journal: React.FC<JournalProps> = ({ journalEntries, setJournalEntries, lang }) => {
    const t = i18n(lang).journal;
    const [mode, setMode] = useState<'text' | 'voice'>('text');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

    // Text state
    const [currentText, setCurrentText] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');

    // Voice state
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordingIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // New state for speech recognition
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const [isRecognitionSupported, setIsRecognitionSupported] = useState(false);

    useEffect(() => {
        if (SpeechRecognitionAPI) {
            setIsRecognitionSupported(true);
        }
    }, []);

    const resetInputs = () => {
        setCurrentText('');
        setTags([]);
        setTagInput('');
        setAudioURL(null);
        setAudioBlob(null);
        setIsRecording(false);
        setRecordingTime(0);
        setError(null);
        setTranscript('');
    };

    const handleStartRecording = async () => {
        if (!isRecognitionSupported) {
            setError(t.error_speech_unsupported);
            return;
        }
        // Reset previous state
        setAudioURL(null);
        setAudioBlob(null);
        setTranscript('');
        setError(null);
        setRecordingTime(0);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            const chunks: Blob[] = [];

            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                setAudioBlob(blob);
                setAudioURL(URL.createObjectURL(blob));
                stream.getTracks().forEach(track => track.stop()); // Stop microphone access
            };
            
            // Setup SpeechRecognition
            const recognition = new SpeechRecognitionAPI();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = lang; 

            let finalTranscript = '';
            recognition.onresult = (event) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                setTranscript(finalTranscript + interimTranscript);
            };

            recognition.onerror = (event) => {
                setError(`${t.error_speech_unsupported}: ${event.error}`);
            };
            
            recognition.start();
            recognitionRef.current = recognition;

            recorder.start();
            setIsRecording(true);
            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } catch (err) {
            console.error("Error starting recording:", err);
            setError(t.error_mic_denied);
        }
    };
    
    const handleStopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            setIsRecording(false);
            if(recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
        }
    };
    
    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };
    
    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleAnalyze = async () => {
        setIsLoading(true);
        setError(null);
        let newEntry: JournalEntry | null = null;
        try {
            if (mode === 'text' && currentText.trim()) {
                const analysis = await analyzeJournalEntry(currentText, tags, lang);
                newEntry = {
                    id: Date.now().toString(),
                    timestamp: new Date().toISOString(),
                    content: currentText,
                    tags,
                    analysis
                };
            } else if (mode === 'voice' && audioBlob && audioURL) {
                if (!transcript.trim()) {
                    setError(t.error_no_speech);
                    setIsLoading(false);
                    return;
                }
                const analysis: VoiceAnalysis = await analyzeVoiceNote(transcript, lang);
                newEntry = {
                    id: Date.now().toString(),
                    timestamp: new Date().toISOString(),
                    content: '',
                    voiceNote: {
                        dataUrl: audioURL,
                        duration: recordingTime,
                        analysis,
                        transcript: transcript,
                    }
                };
            }

            if (newEntry) {
                const updatedEntries = [newEntry, ...journalEntries];
                setJournalEntries(updatedEntries);
                setSelectedEntry(newEntry);
                resetInputs();
            }
        } catch (e) {
            console.error(e);
            setError(t.error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(lang, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };
    
    const AnalysisCard: React.FC<{entry: JournalEntry}> = ({ entry }) => (
        <div className="bg-violet-50 dark:bg-gray-950/50 p-6 rounded-3xl border border-violet-100 dark:border-gray-800/50 space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-center text-violet-800 dark:text-violet-300">{t.analysis.title}</h3>
            
            {entry.analysis && (
                 <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold flex items-center text-[var(--text-primary)] mb-1"><ListChecks className="w-5 h-5 mr-2 text-sky-500"/>{t.analysis.emotions}</h4>
                        <div className="flex flex-wrap gap-2">
                            {entry.analysis.keyEmotions.map((emotion, i) => (
                                <span key={i} className="bg-sky-100 text-sky-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-sky-900 dark:text-sky-300">{emotion}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold flex items-center text-[var(--text-primary)] mb-1"><BookHeart className="w-5 h-5 mr-2 text-rose-500"/>{t.analysis.summary}</h4>
                        <p className="text-[var(--text-secondary)] font-body italic">"{entry.analysis.summary}"</p>
                    </div>
                    <div>
                        <h4 className="font-semibold flex items-center text-[var(--text-primary)] mb-1"><BrainCircuit className="w-5 h-5 mr-2 text-amber-500"/>{t.analysis.reflection}</h4>
                        <p className="text-[var(--text-secondary)] font-body">{entry.analysis.gentleReflection}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold flex items-center text-[var(--text-primary)] mb-1"><Sparkles className="w-5 h-5 mr-2 text-pink-500"/>{t.analysis.affirmation}</h4>
                        <p className="text-[var(--text-secondary)] font-body font-medium">"{entry.analysis.affirmation}"</p>
                    </div>
                </div>
            )}
            
            {entry.voiceNote?.analysis && (
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold flex items-center text-[var(--text-primary)] mb-1"><AudioLines className="w-5 h-5 mr-2 text-sky-500"/>{t.voice_analysis.tone}</h4>
                        <span className="bg-sky-100 text-sky-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-sky-900 dark:text-sky-300">{entry.voiceNote.analysis.detectedTone}</span>
                    </div>
                     <div>
                        <h4 className="font-semibold flex items-center text-[var(--text-primary)] mb-1"><BrainCircuit className="w-5 h-5 mr-2 text-amber-500"/>{t.voice_analysis.observation}</h4>
                        <p className="text-[var(--text-secondary)] font-body">{entry.voiceNote.analysis.keyObservation}</p>
                    </div>
                </div>
            )}
            
             <div className="border-t border-violet-200 dark:border-gray-700 pt-4 space-y-3">
                <p className="text-xs text-[var(--text-secondary)] font-body">{formatDate(entry.timestamp)}</p>
                {entry.content && <p className="text-[var(--text-primary)] whitespace-pre-wrap font-body text-sm bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">{entry.content}</p>}
                {entry.voiceNote && (
                    <div className="space-y-3">
                        {entry.voiceNote.transcript && (
                             <div>
                                 <h4 className="font-semibold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Transcript</h4>
                                 <p className="text-[var(--text-primary)] whitespace-pre-wrap font-body text-sm bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">{entry.voiceNote.transcript}</p>
                             </div>
                        )}
                        {entry.voiceNote.dataUrl && (
                            <div>
                                 <audio src={entry.voiceNote.dataUrl} controls className="w-full h-10" />
                            </div>
                        )}
                    </div>
                )}
                {entry.tags && entry.tags.length > 0 && (
                     <div className="flex flex-wrap gap-2 pt-2">
                        {entry.tags.map(tag => (
                             <span key={tag} className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">#{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
    
    const MainView = () => {
        if (selectedEntry) {
            return <AnalysisCard entry={selectedEntry} />;
        }
        return (
            <div className="bg-[var(--card-background)] p-6 rounded-3xl card-shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold flex items-center text-[var(--text-primary)]">
                        <MessageSquareHeart className="w-7 h-7 mr-3 text-violet-500"/>
                        {t.title}
                    </h2>
                     <div className="p-1 bg-[var(--surface-color)] dark:bg-gray-800/50 rounded-xl flex">
                        <button onClick={() => setMode('text')} className={`p-2 rounded-lg ${mode === 'text' ? 'bg-[var(--card-background)] shadow-sm' : ''}`}><Pencil className="w-5 h-5" /></button>
                        <button onClick={() => setMode('voice')} className={`p-2 rounded-lg ${mode === 'voice' ? 'bg-[var(--card-background)] shadow-sm' : ''}`}><Mic className="w-5 h-5" /></button>
                     </div>
                </div>
                <p className="text-[var(--text-secondary)] mt-2 mb-6 font-body">{t.description}</p>
                
                {mode === 'text' && (
                    <div className="animate-fade-in-fast">
                        <textarea
                            value={currentText}
                            onChange={(e) => setCurrentText(e.target.value)}
                            placeholder={t.placeholder}
                            className="w-full h-40 p-4 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none transition font-body"
                            disabled={isLoading}
                        />
                        <div className="mt-4">
                            <label className="text-sm font-medium text-[var(--text-secondary)]">{t.tags_label}</label>
                            <div className="flex flex-wrap gap-2 items-center mt-2 p-2 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl">
                                {tags.map(tag => (
                                    <span key={tag} className="flex items-center bg-violet-100 text-violet-800 text-xs font-semibold px-2 py-1 rounded-full dark:bg-violet-900 dark:text-violet-300">
                                        {tag}
                                        <button onClick={() => removeTag(tag)} className="ml-1.5 text-violet-500 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-200"><Trash2 className="w-3 h-3"/></button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    placeholder={t.tags_placeholder}
                                    className="flex-1 bg-transparent focus:outline-none text-sm p-1"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'voice' && (
                    <div className="animate-fade-in-fast flex flex-col items-center justify-center p-4 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl min-h-[220px]">
                        {!isRecognitionSupported && (
                            <p className="text-red-500 text-sm text-center flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4"/> {t.error_speech_unsupported}
                            </p>
                        )}
                        {isRecognitionSupported && !audioURL && !isRecording && (
                            <button onClick={handleStartRecording} className="flex flex-col items-center text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-200 transition">
                                <Mic className="w-16 h-16"/>
                                <span className="font-semibold mt-2">{t.voice_note_button}</span>
                            </button>
                        )}
                        {isRecording && (
                            <div className="flex flex-col items-center text-red-500 w-full">
                                 <button onClick={handleStopRecording} className="flex flex-col items-center">
                                    <Square className="w-16 h-16 animate-pulse"/>
                                    <span className="font-semibold mt-2">{t.recording} {new Date(recordingTime * 1000).toISOString().substr(14, 5)}</span>
                                </button>
                                 <p className="w-full text-sm text-gray-600 dark:text-gray-400 mt-2 p-2 bg-white/60 dark:bg-gray-900/40 rounded min-h-[40px] font-body">
                                    {transcript || 'Listening...'}
                                </p>
                            </div>
                        )}
                        {audioURL && !isRecording && (
                             <div className="w-full space-y-4 text-center">
                                <p className="w-full text-sm text-gray-600 dark:text-gray-400 p-2 bg-white/60 dark:bg-gray-900/40 rounded font-body">{transcript || 'No speech was detected.'}</p>
                                <audio src={audioURL} controls className="w-full h-10" />
                                <button onClick={handleStartRecording} className="w-full text-sm text-center text-violet-600 hover:underline">{t.record_again}</button>
                            </div>
                        )}
                    </div>
                )}
                
                {error && <p className="text-red-500 text-sm mt-2 flex items-center"><AlertTriangle className="w-4 h-4 mr-1"/> {error}</p>}
                
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading || (mode === 'text' && !currentText.trim()) || (mode === 'voice' && (!audioBlob || !transcript.trim()))}
                    className="w-full mt-4 btn accent-gradient-bg text-white font-bold py-3"
                >
                    {isLoading ? (
                        <>
                            <LoaderCircle className="w-5 h-5 mr-2 animate-spin" />
                            {t.loading}
                        </>
                    ) : (
                        <>
                            <Zap className="w-5 h-5 mr-2" />
                            {mode === 'text' ? t.button : t.save_voice_note}
                        </>
                    )}
                </button>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            <div className="md:col-span-2">
                <MainView />
            </div>
            <div className="md:col-span-1">
                <div className="bg-[var(--card-background)] p-6 rounded-3xl card-shadow h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold flex items-center">
                            <BookMarked className="w-6 h-6 mr-2 text-violet-500" />
                            {t.pastEntries}
                        </h3>
                         <button 
                            onClick={() => {setSelectedEntry(null); resetInputs();}}
                            className="bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/50 dark:hover:bg-violet-900 text-violet-700 dark:text-violet-300 p-2 rounded-full transition"
                            title="Write new entry"
                        >
                            <FilePlus className="w-5 h-5" />
                        </button>
                    </div>
                    {journalEntries.length === 0 ? (
                        <div className="text-center py-10 text-[var(--text-secondary)] font-body">
                            <p>{t.noEntries}</p>
                        </div>
                    ) : (
                        <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                            {journalEntries.map(entry => (
                                <li key={entry.id}>
                                    <button
                                        onClick={() => setSelectedEntry(entry)}
                                        className={`w-full text-left p-4 rounded-xl transition-colors flex items-center justify-between group ${selectedEntry?.id === entry.id ? 'bg-violet-50 dark:bg-violet-900/70' : 'hover:bg-[var(--surface-color)] dark:hover:bg-gray-800/50'}`}
                                    >
                                        <div className="flex-1 overflow-hidden">
                                             <div className={`font-semibold flex items-center gap-2 text-sm mb-1 ${selectedEntry?.id === entry.id ? 'text-violet-800 dark:text-violet-200' : 'text-[var(--text-primary)]'}`}>
                                                {entry.voiceNote ? <Mic className="w-4 h-4 text-violet-500"/> : <Pencil className="w-4 h-4 text-[var(--text-secondary)]"/>}
                                                <span>{formatDate(entry.timestamp)}</span>
                                            </div>
                                            <p className="text-sm text-[var(--text-secondary)] truncate pr-4">
                                                {entry.content || entry.voiceNote?.transcript || (entry.analysis?.summary ?? 'Voice Note')}
                                            </p>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1 ${selectedEntry?.id === entry.id ? 'text-violet-600 dark:text-violet-300' : 'text-gray-400 dark:text-gray-500'}`} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};