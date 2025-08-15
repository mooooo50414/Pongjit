
import React, { useState, useCallback } from 'react';
import type { Language, ReframeEntry, ThoughtAnalysis } from '../types.ts';
import { i18n } from '../lib/i18n.ts';
import { analyzeThought, getReframedThought } from '../services/geminiService.ts';
import { Repeat, LoaderCircle, Sparkles, AlertTriangle, Lightbulb, CheckCircle, BrainCircuit, HelpCircle, ChevronsRight, FilePlus } from 'lucide-react';

interface ReframeProps {
    reframeEntries: ReframeEntry[];
    setReframeEntries: (entries: ReframeEntry[]) => void;
    lang: Language;
}

type ReframeStep = 'input' | 'analyzing' | 'result' | 'reframing';

export const Reframe: React.FC<ReframeProps> = ({ reframeEntries, setReframeEntries, lang }) => {
    const t = i18n(lang).reframe;
    const [step, setStep] = useState<ReframeStep>('input');
    const [originalThought, setOriginalThought] = useState('');
    const [analysis, setAnalysis] = useState<ThoughtAnalysis | null>(null);
    const [reframedThought, setReframedThought] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [selectedEntry, setSelectedEntry] = useState<ReframeEntry | null>(null);

    const handleAnalyze = async () => {
        if (!originalThought.trim()) return;
        setStep('analyzing');
        setError(null);
        try {
            // Step 1: Analyze the thought to find the distortion
            const analysisResult = await analyzeThought(originalThought, lang);
            setAnalysis(analysisResult);

            // Step 2: Get the AI-generated reframe based on the analysis
            const reframedResult = await getReframedThought(originalThought, analysisResult, lang);
            setReframedThought(reframedResult);

            setStep('result');
        } catch (e) {
            console.error(e);
            setError(t.error);
            setStep('input');
        }
    };

    const handleSaveReframe = () => {
        if (!reframedThought.trim() || !analysis) return;
        const newEntry: ReframeEntry = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            originalThought,
            analysis,
            reframedThought,
        };
        const updatedEntries = [newEntry, ...reframeEntries];
        setReframeEntries(updatedEntries);
        
        resetState();
        setSelectedEntry(newEntry);
    };
    
    const resetState = () => {
        setStep('input');
        setOriginalThought('');
        setAnalysis(null);
        setReframedThought('');
        setError(null);
    };
    
    const startNew = () => {
        resetState();
        setSelectedEntry(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(lang, { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const MainTool = () => {
        if (selectedEntry) {
             return (
                 <div className="bg-[var(--card-background)] p-6 rounded-3xl card-shadow space-y-6">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/40 rounded-xl border border-green-200 dark:border-green-800">
                        <button onClick={startNew} className="text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline flex items-center justify-center gap-2 w-full">
                            <FilePlus className="w-4 h-4" />
                            {t.start_new}
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-sm text-[var(--text-secondary)]">{t.original_thought}</h4>
                            <p className="p-3 bg-[var(--surface-color)] rounded-lg mt-1 font-body text-[var(--text-primary)]">{selectedEntry.originalThought}</p>
                        </div>
                        <div className="animate-fade-in bg-violet-50 dark:bg-gray-950/50 p-5 rounded-2xl border border-violet-100 dark:border-gray-800/50 space-y-4">
                            <h3 className="text-xl font-bold text-violet-800 dark:text-violet-300">{t.step2_title}</h3>
                            <div>
                                <h4 className="font-semibold flex items-center text-[var(--text-primary)] mb-2"><BrainCircuit className="w-5 h-5 mr-2 text-sky-500"/>{t.step2_distortion_title}</h4>
                                <div className="p-3 bg-white/50 dark:bg-gray-800/40 rounded-lg">
                                    <p className="font-bold text-sky-700 dark:text-sky-300">{selectedEntry.analysis.distortion.name}</p>
                                    <p className="text-xs text-[var(--text-secondary)] font-body">{selectedEntry.analysis.distortion.description}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold flex items-center text-[var(--text-primary)] mb-2"><HelpCircle className="w-5 h-5 mr-2 text-emerald-500"/>{t.step2_questions_title}</h4>
                                <ul className="space-y-2">
                                {selectedEntry.analysis.challengingQuestions.map((q, i) => (
                                    <li key={i} className="flex items-start text-sm">
                                        <ChevronsRight className="w-4 h-4 mr-2 mt-0.5 text-emerald-600 flex-shrink-0"/>
                                        <span className="text-[var(--text-secondary)] font-body">{q}</span>
                                    </li>
                                ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-[var(--text-secondary)]">{t.reframed_thought}</h4>
                            <p className="p-3 bg-green-50 dark:bg-green-800/40 rounded-lg mt-1 font-bold text-green-700 dark:text-green-300 font-body">{selectedEntry.reframedThought}</p>
                        </div>
                    </div>
                 </div>
            )
        }
        
        return (
            <div className="bg-[var(--card-background)] p-6 rounded-3xl card-shadow space-y-6">
                <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t.step1_title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] font-body mb-3">{t.step1_prompt}</p>
                    <textarea
                        value={originalThought}
                        onChange={(e) => setOriginalThought(e.target.value)}
                        placeholder={t.step1_placeholder}
                        className="w-full h-28 p-4 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none transition font-body"
                        disabled={step !== 'input'}
                    />
                    <button
                        onClick={handleAnalyze}
                        disabled={step !== 'input' || !originalThought.trim()}
                        className="mt-3 w-full btn accent-gradient-bg text-white font-bold py-3 disabled:opacity-50"
                    >
                        {step === 'analyzing' ? (
                            <LoaderCircle className="w-5 h-5 mr-2 animate-spin" />
                        ) : (
                            <Sparkles className="w-5 h-5 mr-2" />
                        )}
                        {t.step1_button}
                    </button>
                     {error && <p className="text-red-500 text-sm mt-2 flex items-center"><AlertTriangle className="w-4 h-4 mr-1"/> {error}</p>}
                </div>

                {analysis && ['result', 'reframing'].includes(step) && (
                    <div className="animate-fade-in bg-violet-50 dark:bg-gray-950/50 p-5 rounded-2xl border border-violet-100 dark:border-gray-800/50 space-y-4">
                        <h3 className="text-xl font-bold text-violet-800 dark:text-violet-300">{t.step2_title}</h3>
                        <div>
                            <h4 className="font-semibold flex items-center text-[var(--text-primary)] mb-2"><BrainCircuit className="w-5 h-5 mr-2 text-sky-500"/>{t.step2_distortion_title}</h4>
                            <div className="p-3 bg-white/50 dark:bg-gray-800/40 rounded-lg">
                                <p className="font-bold text-sky-700 dark:text-sky-300">{analysis.distortion.name}</p>
                                <p className="text-xs text-[var(--text-secondary)] font-body">{analysis.distortion.description}</p>
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold flex items-center text-[var(--text-primary)] mb-2"><HelpCircle className="w-5 h-5 mr-2 text-emerald-500"/>{t.step2_questions_title}</h4>
                            <ul className="space-y-2">
                               {analysis.challengingQuestions.map((q, i) => (
                                   <li key={i} className="flex items-start text-sm">
                                        <ChevronsRight className="w-4 h-4 mr-2 mt-0.5 text-emerald-600 flex-shrink-0"/>
                                        <span className="text-[var(--text-secondary)] font-body">{q}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="border-t border-violet-200 dark:border-gray-700 pt-4">
                            <h3 className="text-xl font-bold text-violet-800 dark:text-violet-300 mb-2">{t.step3_title}</h3>
                            <p className="text-sm text-[var(--text-secondary)] font-body mb-3">{t.step3_prompt}</p>
                             <textarea
                                value={reframedThought}
                                onChange={(e) => setReframedThought(e.target.value)}
                                placeholder={t.step3_placeholder}
                                className="w-full h-24 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none transition font-body"
                            />
                             <button
                                onClick={handleSaveReframe}
                                disabled={!reframedThought.trim()}
                                className="mt-3 w-full btn bg-green-600 hover:bg-green-700 text-white font-bold py-3 disabled:opacity-50"
                            >
                                <CheckCircle className="w-5 h-5 mr-2" />
                                {t.step3_button}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    };

    return (
        <div className="animate-fade-in space-y-8">
            <div className="text-center">
                <Repeat className="h-16 w-16 mx-auto accent-gradient-text mb-4" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">{t.title}</h1>
                <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mt-2 font-body">
                    {t.description}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <MainTool />
                </div>
                <div className="md:col-span-1">
                    <div className="bg-[var(--card-background)] p-6 rounded-3xl card-shadow h-full">
                        <h3 className="text-xl font-bold flex items-center mb-4">
                            <Repeat className="w-6 h-6 mr-2 text-violet-500" />
                            {t.history_title}
                        </h3>
                        {reframeEntries.length === 0 ? (
                            <div className="text-center py-10 text-[var(--text-secondary)] font-body">
                                <p>{t.no_history}</p>
                            </div>
                        ) : (
                            <ul className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                                {reframeEntries.map(entry => (
                                    <li key={entry.id}>
                                        <button
                                            onClick={() => setSelectedEntry(entry)}
                                            className={`w-full text-left p-4 rounded-xl transition-colors group ${selectedEntry?.id === entry.id ? 'bg-violet-50 dark:bg-violet-900/70' : 'hover:bg-[var(--surface-color)] dark:hover:bg-gray-800/50'}`}
                                        >
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{formatDate(entry.timestamp)}</p>
                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">{entry.originalThought}</p>
                                            <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
                                                <Lightbulb className="w-3 h-3 mr-1" />
                                                <span className="truncate">{entry.reframedThought}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};