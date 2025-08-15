import React, { useState, useEffect, useRef } from 'react';
import type { Language, CustomMix } from '../types.ts';
import { i18n } from '../lib/i18n.ts';
import { SlidersHorizontal, CloudRain, Trees, Waves, Coffee, Flame, Wind, Music, Play, Square, Trash2, Volume2, Save } from 'lucide-react';

interface SoundscapeMixerProps {
    customMixes: CustomMix[];
    setCustomMixes: (mixes: CustomMix[]) => void;
    lang: Language;
}

const availableSounds = [
    { id: 'rain', url: 'https://storage.googleapis.com/pedagogico/viva-sonidos/lluvia.mp3', icon: <CloudRain className="w-6 h-6" /> },
    { id: 'forest', url: 'https://storage.googleapis.com/pedagogico/viva-sonidos/bosque.mp3', icon: <Trees className="w-6 h-6" /> },
    { id: 'waves', url: 'https://storage.googleapis.com/pedagogico/viva-sonidos/mar.mp3', icon: <Waves className="w-6 h-6" /> },
    { id: 'cafe', url: 'https://cdn.pixabay.com/download/audio/2022/04/18/audio_3593859664.mp3', icon: <Coffee className="w-6 h-6" /> },
    { id: 'fire', url: 'https://storage.googleapis.com/pedagogico/viva-sonidos/fuego.mp3', icon: <Flame className="w-6 h-6" /> },
    { id: 'wind', url: 'https://storage.googleapis.com/pedagogico/viva-sonidos/viento.mp3', icon: <Wind className="w-6 h-6" /> },
    { id: 'piano', url: 'https://storage.googleapis.com/pedagogico/viva-sonidos/piano.mp3', icon: <Music className="w-6 h-6" /> },
];

export const SoundscapeMixer: React.FC<SoundscapeMixerProps> = ({ customMixes, setCustomMixes, lang }) => {
    const t = i18n(lang).mixer;
    const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
    const [volumes, setVolumes] = useState<Record<string, number>>({});
    const [mixName, setMixName] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Initialize audio elements and volumes
        const initialVolumes: Record<string, number> = {};
        availableSounds.forEach(sound => {
            if (!audioRefs.current[sound.id]) {
                const audio = new Audio(sound.url);
                audio.loop = true;
                audioRefs.current[sound.id] = audio;
            } else {
                // Update URL if it has changed
                if(audioRefs.current[sound.id].src !== sound.url) {
                    audioRefs.current[sound.id].src = sound.url;
                }
            }
            initialVolumes[sound.id] = 0;
        });
        setVolumes(initialVolumes);

        // Cleanup on unmount
        return () => {
            Object.values(audioRefs.current).forEach(audio => {
                audio.pause();
            });
            audioRefs.current = {};
        };
    }, []);
    
    useEffect(() => {
        let active = false;
        Object.entries(volumes).forEach(([id, volume]) => {
            const audio = audioRefs.current[id];
            if (audio) {
                audio.volume = volume;
                if (volume > 0 && audio.paused) {
                    audio.play().catch(e => console.error(`Error playing ${id}:`, e));
                } else if (volume === 0 && !audio.paused) {
                    audio.pause();
                }
            }
            if (volume > 0) active = true;
        });
        setIsPlaying(active);
    }, [volumes]);

    const handleVolumeChange = (id: string, volume: number) => {
        setVolumes(prev => ({ ...prev, [id]: volume }));
    };

    const handleSaveMix = () => {
        if (!mixName.trim() || Object.values(volumes).every(v => v === 0)) return;
        const newMix: CustomMix = {
            id: Date.now().toString(),
            name: mixName,
            volumes: volumes,
        };
        setCustomMixes([newMix, ...customMixes]);
        setMixName('');
    };

    const playMix = (mix: CustomMix) => {
        const newVolumes: Record<string, number> = {};
        availableSounds.forEach(s => {
            newVolumes[s.id] = mix.volumes[s.id] || 0;
        });
        setVolumes(newVolumes);
    };

    const stopAll = () => {
        const newVolumes: Record<string, number> = {};
        availableSounds.forEach(s => {
            newVolumes[s.id] = 0;
        });
        setVolumes(newVolumes);
    };
    
    const deleteMix = (id: string) => {
        setCustomMixes(customMixes.filter(mix => mix.id !== id));
    };

    return (
        <div className="animate-fade-in space-y-8">
            <div className="text-center">
                <SlidersHorizontal className="h-16 w-16 mx-auto accent-gradient-text mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">{t.title}</h1>
                <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mt-2 font-body">
                    {t.description}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-[var(--card-background)] p-6 rounded-3xl card-shadow space-y-5">
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">{t.availableSounds}</h2>
                    {availableSounds.map(sound => (
                        <div key={sound.id} className="flex items-center gap-4">
                            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[var(--surface-color)] text-violet-500 rounded-lg">
                                {sound.icon}
                            </div>
                            <div className="flex-grow">
                                <span className="font-semibold text-sm">{t.sound[sound.id as keyof typeof t.sound]}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volumes[sound.id] || 0}
                                    onChange={(e) => handleVolumeChange(sound.id, parseFloat(e.target.value))}
                                    className="w-full mt-1"
                                />
                            </div>
                             <div className="w-10 text-center text-xs font-mono text-[var(--text-secondary)]">
                                {Math.round((volumes[sound.id] || 0) * 100)}%
                            </div>
                        </div>
                    ))}
                    <div className="border-t border-[var(--border-color)] pt-4 space-y-3">
                         <h3 className="text-lg font-bold text-[var(--text-primary)]">{t.saveMixTitle}</h3>
                         <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                value={mixName}
                                onChange={(e) => setMixName(e.target.value)}
                                placeholder={t.mixNamePlaceholder}
                                className="flex-grow bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all font-body"
                            />
                             <button
                                onClick={handleSaveMix}
                                disabled={!mixName.trim() || Object.values(volumes).every(v => v === 0)}
                                className="btn accent-gradient-bg text-white font-bold"
                            >
                                <Save className="w-5 h-5 mr-2" /> {t.saveButton}
                            </button>
                         </div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-[var(--card-background)] p-6 rounded-3xl card-shadow">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-[var(--text-primary)]">{t.myMixes}</h2>
                        {isPlaying && <button onClick={stopAll} className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"><Square className="w-4 h-4" /></button>}
                     </div>
                    {customMixes.length === 0 ? (
                        <div className="text-center py-10 text-[var(--text-secondary)] font-body">
                           <p>{t.noMixes}</p>
                        </div>
                    ) : (
                        <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
                            {customMixes.map(mix => (
                                <li key={mix.id} className="bg-[var(--surface-color)] p-3 rounded-xl flex items-center gap-3">
                                    <button onClick={() => playMix(mix)} className="flex items-center gap-3 flex-grow text-left group">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400">
                                            <Play className="w-5 h-5" />
                                        </div>
                                        <span className="font-semibold group-hover:text-violet-600 transition">{mix.name}</span>
                                    </button>
                                     <button onClick={() => deleteMix(mix.id)} className="p-2 text-gray-400 hover:text-red-500 transition">
                                        <Trash2 className="w-4 h-4" />
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