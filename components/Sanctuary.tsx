import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { BioData, GeminiResponse, Language, SanctuaryEnvironment, StressLevel } from '../types.ts';
import { i18n } from '../lib/i18n.ts';
import { BioDataSimulator } from './BioDataSimulator.tsx';
import { EmbeddedMusicPlayer } from './MusicPlayer.tsx';
import { Trees, Sunset, Moon, Flower2, ChevronLeft, Power, Sparkles, X, Settings } from 'lucide-react';

const environmentData: Record<SanctuaryEnvironment, { name: string; image: string; sound: string, icon: React.ReactNode }> = {
    forest: {
        name: 'Misty Pine Forest',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80',
        sound: 'https://storage.googleapis.com/pedagogico/viva-sonidos/bosque.mp3',
        icon: <Trees className="w-12 h-12" />
    },
    beach: {
        name: 'Sunset Beach',
        image: 'https://images.unsplash.com/photo-1507525428034-b723a996f6ea?auto=format&fit=crop&w=1920&q=80',
        sound: 'https://storage.googleapis.com/pedagogico/viva-sonidos/mar.mp3',
        icon: <Sunset className="w-12 h-12" />
    },
    zen: {
        name: 'Moonlit Zen Garden',
        image: 'https://images.unsplash.com/photo-1610413258836-a0038f24a8fc?auto=format&fit=crop&w=1920&q=80',
        sound: 'https://storage.googleapis.com/pedagogico/viva-sonidos/viento.mp3',
        icon: <Moon className="w-12 h-12" />
    },
    meadow: {
        name: 'Floating Flower Meadow',
        image: 'https://images.unsplash.com/photo-1593382715494-3a758f856637?auto=format&fit=crop&w=1920&q=80',
        sound: 'https://storage.googleapis.com/pedagogico/viva-sonidos/piano.mp3',
        icon: <Flower2 className="w-12 h-12" />
    }
};

interface SanctuaryProps {
    bioData: BioData;
    setBioData: React.Dispatch<React.SetStateAction<BioData>>;
    geminiResponse: GeminiResponse | null;
    lang: Language;
    onStopSession: () => void;
}

const BreathingPacer: React.FC<{ lang: Language }> = ({ lang }) => {
    const [animationState, setAnimationState] = useState('inhale');
    const [instruction, setInstruction] = useState(i18n(lang).training.breathe.in);

    useEffect(() => {
        const texts = i18n(lang).training.breathe;
        const cycle = () => {
            setInstruction(texts.in);
            setAnimationState('inhale');
            setTimeout(() => {
                setInstruction(texts.hold);
                setAnimationState('hold');
                setTimeout(() => {
                    setInstruction(texts.out);
                    setAnimationState('exhale');
                }, 4000); // Hold for 4s
            }, 4000); // Inhale for 4s
        };
        cycle();
        const interval = setInterval(cycle, 14000); // 4 in + 4 hold + 6 out
        return () => clearInterval(interval);
    }, [lang]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className={`glowing-orb w-32 h-32 md:w-48 md:h-48 rounded-full ${animationState}`}></div>
            <p className="mt-8 text-white font-semibold text-lg drop-shadow-lg">{instruction}</p>
        </div>
    );
};

export const Sanctuary: React.FC<SanctuaryProps> = ({ bioData, setBioData, geminiResponse, lang, onStopSession }) => {
    const t = i18n(lang).sanctuary;
    const [environment, setEnvironment] = useState<SanctuaryEnvironment | null>(null);
    const [showControls, setShowControls] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (environment) {
            const soundUrl = environmentData[environment].sound;
            if (audioRef.current) {
                if (audioRef.current.src !== soundUrl) {
                    audioRef.current.src = soundUrl;
                    audioRef.current.load();
                }
                audioRef.current.volume = 0.5;
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => console.error("Audio play failed:", e));
                }
            }
        } else if (audioRef.current) {
            audioRef.current.pause();
        }
    }, [environment]);

    // Cleanup audio on unmount
    useEffect(() => {
        const audio = audioRef.current;
        return () => {
            audio?.pause();
        };
    }, []);

    const adaptiveStyles = useMemo(() => {
        switch (bioData.stressLevel) {
            case 'High': return { '--bio-saturate': 0.6, '--bio-brightness': 0.7, '--bio-vignette': 0.4 };
            case 'Medium': return { '--bio-saturate': 0.9, '--bio-brightness': 0.9, '--bio-vignette': 0.2 };
            case 'Low': return { '--bio-saturate': 1.1, '--bio-brightness': 1.05, '--bio-vignette': 0 };
            default: return { '--bio-saturate': 1, '--bio-brightness': 1, '--bio-vignette': 0 };
        }
    }, [bioData.stressLevel]);

    if (!environment) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] animate-fade-in text-center p-4">
                <h1 className="text-3xl md:text-5xl font-bold accent-gradient-text">{t.title}</h1>
                <p className="text-lg text-[var(--text-secondary)] mt-2 mb-10 max-w-2xl">{t.description}</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl">
                    {Object.entries(environmentData).map(([key, data]) => (
                        <button key={key} onClick={() => setEnvironment(key as SanctuaryEnvironment)}
                            className="group relative aspect-square bg-gray-500 rounded-2xl overflow-hidden card-shadow transform hover:scale-105 transition-transform duration-300">
                            <img src={data.image} alt={data.name} className="w-full h-full object-cover transition-opacity duration-300" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center p-4">
                                <div className="text-white/80 group-hover:text-white transition-colors">{data.icon}</div>
                                <p className="text-white font-bold text-lg mt-2 drop-shadow-lg">{t.environments[key as keyof typeof t.environments]}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }
    
    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <audio ref={audioRef} loop />
            <div style={{ ...adaptiveStyles, backgroundImage: `url(${environmentData[environment].image})` } as React.CSSProperties}
                className="sanctuary-bg absolute inset-0 bg-cover bg-center" />
            <div style={adaptiveStyles as React.CSSProperties} className="sanctuary-vignette absolute inset-0" />
            {bioData.stressLevel === 'Low' && (
                <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <Sparkles key={i} className="absolute text-yellow-200 animate-pulse" style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            animationDuration: `${Math.random() * 3 + 2}s`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}/>
                    ))}
                </div>
            )}
            
            <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-white p-4">
                <BreathingPacer lang={lang} />
                <p className="mt-4 text-sm drop-shadow-lg opacity-80">{t.breathing_guide}</p>
            </div>
            
            <div className="absolute top-6 left-6 z-30">
                <button onClick={() => setEnvironment(null)} className="flex items-center gap-2 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/50 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-semibold">{t.select_env}</span>
                </button>
            </div>
            
             <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
                <button onClick={() => setShowControls(c => !c)} className="bg-black/30 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/50 transition-colors">
                   <Settings className="w-5 h-5" />
                </button>
                <button onClick={onStopSession} className="flex items-center gap-2 bg-red-600/70 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-red-600/90 transition-colors">
                    <Power className="w-5 h-5" />
                    <span className="font-semibold hidden sm:inline">{t.end_session}</span>
                </button>
            </div>
            
             {showControls && (
                <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-md p-4 animate-fade-in-fast">
                    <button onClick={() => setShowControls(false)} className="absolute top-3 right-3 p-1 text-white/70 hover:text-white"><X /></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-4 items-start">
                         <div className="bg-transparent p-0 rounded-3xl text-white">
                           <EmbeddedMusicPlayer musicData={geminiResponse?.music} lang={lang} />
                         </div>
                         <div className="bg-transparent p-0 rounded-3xl text-white">
                           <BioDataSimulator bioData={bioData} setBioData={setBioData} lang={lang} />
                         </div>
                    </div>
                </div>
             )}
        </div>
    );
};