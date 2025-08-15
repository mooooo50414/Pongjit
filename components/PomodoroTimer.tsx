import React, { useState, useEffect, useRef, useCallback } from 'react';
import { i18n } from '../lib/i18n.ts';
import type { Language, BioData, BreakSuggestion, Page } from '../types.ts';
import { Play, Pause, RotateCcw, Sparkles, Wind, Brain, LoaderCircle, Coffee } from 'lucide-react';
import { getBreakSuggestion, getProactiveBreakSuggestion } from '../services/geminiService.ts';

const FOCUS_DURATION = 25 * 60;
const PROACTIVE_BREAK_DURATION = 3 * 60;

interface PomodoroTimerProps {
    lang: Language;
    bioData: BioData;
    setCurrentPage: (page: Page) => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ lang, bioData, setCurrentPage }) => {
    const t = i18n(lang).dashboard;
    const { focusFlow: ft } = t;

    const [timerMode, setTimerMode] = useState<'idle' | 'work' | 'break' | 'suggestion'>('idle');
    const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION);
    const [isActive, setIsActive] = useState(false);
    
    const [suggestion, setSuggestion] = useState<BreakSuggestion | null>(null);
    const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);

    // Proactive break state
    const [showProactiveModal, setShowProactiveModal] = useState(false);
    const [proactiveMessage, setProactiveMessage] = useState('');
    const [isProactiveLoading, setIsProactiveLoading] = useState(false);
    const proactiveTriggeredRef = useRef(false);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    // Timer countdown logic
    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive]);
    
    // Proactive high-stress detection
    useEffect(() => {
        if (timerMode === 'work' && isActive && bioData.stressLevel === 'High' && !proactiveTriggeredRef.current) {
            const highStressTimer = setTimeout(() => {
                if(bioData.stressLevel === 'High' && !proactiveTriggeredRef.current) {
                    proactiveTriggeredRef.current = true;
                    setIsActive(false); // Pause the timer
                    setShowProactiveModal(true);
                    setIsProactiveLoading(true);

                    getProactiveBreakSuggestion(bioData.activity, lang)
                        .then(setProactiveMessage)
                        .catch(e => {
                            console.error("Proactive suggestion failed:", e);
                            setProactiveMessage(ft.proactive_fallback);
                        })
                        .finally(() => setIsProactiveLoading(false));
                }
            }, 5000); // 5-second debounce

            return () => clearTimeout(highStressTimer);
        }
    }, [bioData.stressLevel, bioData.activity, isActive, timerMode, lang, ft.proactive_fallback]);

    // Handle timer completion
    useEffect(() => {
        if (timeLeft === 0 && isActive) {
            setIsActive(false);
            if (timerMode === 'work') {
                // Work session ended, get suggestion
                setTimerMode('suggestion');
                setIsLoadingSuggestion(true);
                getBreakSuggestion(bioData.stressLevel, lang)
                    .then(setSuggestion)
                    .catch(e => {
                        console.error(e);
                        // Sensible fallback
                        setSuggestion({ message: 'Great job! Time for a 5 minute break.', breakMinutes: 5, suggestion: 'none' });
                    })
                    .finally(() => setIsLoadingSuggestion(false));

                new Notification(ft.session_complete).onclick = () => window.focus();
            } else if (timerMode === 'break') {
                // Break ended, go back to idle to start next focus
                setTimerMode('idle');
                setTimeLeft(FOCUS_DURATION);
            }
        }
    }, [timeLeft, isActive, timerMode, bioData.stressLevel, lang, ft]);

    const handleStartFocus = () => {
        proactiveTriggeredRef.current = false;
        setTimerMode('work');
        setTimeLeft(FOCUS_DURATION);
        setIsActive(true);
    };
    
    const handlePauseResume = () => {
        setIsActive(!isActive);
    };

    const handleReset = () => {
        proactiveTriggeredRef.current = false;
        setIsActive(false);
        setTimerMode('idle');
        setTimeLeft(FOCUS_DURATION);
        setSuggestion(null);
        setShowProactiveModal(false);
    };

    const handleStartBreak = () => {
        if (!suggestion) return;
        setTimerMode('break');
        setTimeLeft(suggestion.breakMinutes * 60);
        setIsActive(true);
        setSuggestion(null);
    };
    
    const handleStartProactiveBreak = () => {
        setTimerMode('break');
        setTimeLeft(PROACTIVE_BREAK_DURATION);
        setIsActive(true);
        setShowProactiveModal(false);
    };

    const handleResumeFocus = () => {
        setIsActive(true);
        setShowProactiveModal(false);
    }

    const handleSkipBreak = () => {
        handleStartFocus(); // Re-use start focus logic
        setSuggestion(null);
    };

    const ProactiveBreakModal = () => (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30 animate-fade-in-fast p-4">
            <div className="bg-[var(--card-background)] p-6 rounded-2xl card-shadow max-w-sm w-full m-4 relative text-center">
                <Coffee className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">{ft.proactive_title}</h3>
                {isProactiveLoading ? (
                    <div className="my-4 flex flex-col items-center h-[48px]">
                        <LoaderCircle className="w-6 h-6 animate-spin text-violet-500" />
                    </div>
                ) : (
                    <p className="text-[var(--text-secondary)] my-4 font-body min-h-[48px]">{proactiveMessage}</p>
                )}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <button onClick={handleStartProactiveBreak} className="btn bg-violet-600 text-white hover:bg-violet-700 w-full">{ft.proactive_take_break}</button>
                    <button onClick={handleResumeFocus} className="btn bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-color)] w-full">{ft.proactive_continue}</button>
                </div>
            </div>
        </div>
    );

    const renderTimer = () => {
        const breakDuration = timerMode === 'break' && suggestion ? suggestion.breakMinutes * 60 : PROACTIVE_BREAK_DURATION;
        const totalDuration = timerMode === 'work' ? FOCUS_DURATION : breakDuration;
        const progress = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle className="text-gray-200/80 dark:text-gray-700/50" strokeWidth="8" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                        <circle
                            className="text-violet-500"
                            strokeWidth="8"
                            strokeDasharray={2 * Math.PI * 45}
                            strokeDashoffset={(2 * Math.PI * 45) * (1 - progress / 100)}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="45"
                            cx="50"
                            cy="50"
                            transform="rotate(-90 50 50)"
                            style={{ transition: 'stroke-dashoffset 1s linear' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </div>
                        <div className="text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider mt-2">
                            {timerMode === 'work' ? t.pomodoro.work : t.pomodoro.short_break}
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4 mt-6">
                    <button onClick={handleReset} className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--surface-color)] text-[var(--text-secondary)] hover:bg-gray-300/60 dark:bg-gray-800/60 dark:hover:bg-gray-700/60 transition-colors">
                        <RotateCcw className="h-7 w-7"/>
                    </button>
                    <button onClick={handlePauseResume} className="w-24 h-24 flex items-center justify-center rounded-full accent-gradient-bg text-white shadow-lg shadow-violet-500/30 hover:opacity-90 transition-all hover:scale-105">
                        {isActive ? <Pause className="h-10 w-10"/> : <Play className="h-10 w-10 ml-1"/>}
                    </button>
                    <div className="w-16 h-16"></div>
                </div>
            </div>
        );
    }

    const renderIdle = () => (
         <div className="flex flex-col items-center justify-center text-center h-full">
            <Brain className="w-24 h-24 text-violet-300 dark:text-violet-600/50" />
            <h4 className="text-xl font-bold text-[var(--text-primary)] mt-4">{ft.title}</h4>
            <p className="text-[var(--text-secondary)] mt-1 mb-6 max-w-xs font-body">{ft.description}</p>
            <button onClick={handleStartFocus} className="btn accent-gradient-bg text-white font-bold py-3 px-6 text-lg">
                <Play className="h-5 h-5 mr-2" />
                {ft.start_focus}
            </button>
         </div>
    );
    
    const renderSuggestion = () => (
        <div className="flex flex-col items-center justify-center text-center h-full p-4 animate-fade-in">
             <Sparkles className="w-16 h-16 text-yellow-400" />
             <h4 className="text-xl font-bold text-[var(--text-primary)] mt-4">{ft.session_complete}</h4>

            {isLoadingSuggestion ? (
                <div className="my-6 flex flex-col items-center h-[72px]">
                    <LoaderCircle className="w-8 h-8 animate-spin text-violet-500" />
                    <p className="text-sm text-[var(--text-secondary)] mt-2">{i18n(lang).loading.composing}</p>
                </div>
            ) : suggestion && (
                <div className="my-4 p-4 bg-violet-50 dark:bg-gray-800/50 rounded-xl border border-violet-100 dark:border-gray-700 w-full min-h-[72px]">
                    <h5 className="font-semibold text-violet-700 dark:text-violet-300">{ft.ai_recommendation}</h5>
                    <p className="text-sm text-[var(--text-secondary)] italic mt-1 font-body">"{suggestion.message}"</p>
                </div>
            )}
            
            <div className="w-full space-y-2 mt-4">
                 <button 
                    onClick={handleStartBreak}
                    disabled={isLoadingSuggestion || !suggestion}
                    className="w-full btn bg-violet-600 text-white font-bold hover:bg-violet-700 disabled:opacity-50"
                 >
                    {suggestion ? ft.start_break(suggestion.breakMinutes) : '...'}
                 </button>
                {suggestion?.suggestion === 'breathing' && (
                     <button 
                        onClick={() => setCurrentPage('Training')}
                        className="w-full btn bg-sky-500 text-white font-bold hover:bg-sky-600"
                     >
                        <Wind className="w-5 h-5 mr-2" />
                        {ft.breathing_exercise}
                     </button>
                )}
                 <button 
                    onClick={handleSkipBreak}
                    disabled={isLoadingSuggestion || !suggestion}
                    className="w-full text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2"
                 >
                    {ft.skip_break}
                 </button>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (timerMode) {
            case 'idle':
                return renderIdle();
            case 'work':
            case 'break':
                return renderTimer();
            case 'suggestion':
                return renderSuggestion();
            default:
                return null;
        }
    };

    return (
        <div className="relative p-6 rounded-3xl h-[400px] card-shadow">
            {renderContent()}
            {showProactiveModal && <ProactiveBreakModal />}
        </div>
    );
}