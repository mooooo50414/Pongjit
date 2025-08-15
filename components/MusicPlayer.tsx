import React, { useState, useEffect, useRef } from 'react';
import { Music4, Play, Pause, Waves, CloudRain, Coffee, Trees } from 'lucide-react';
import type { Language, MusicData } from '../types.ts';
import { i18n } from '../lib/i18n.ts';

interface ActionableMusicProps {
  musicData: MusicData | undefined | null;
  lang: Language;
}

const soundscapeSources = {
    rain: { 
        url: 'https://storage.googleapis.com/pedagogico/viva-sonidos/lluvia.mp3',
        icon: <CloudRain className="h-8 w-8 text-sky-600 dark:text-sky-400" />
    },
    forest: {
        url: 'https://storage.googleapis.com/pedagogico/viva-sonidos/bosque.mp3',
        icon: <Trees className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
    },
    cafe: {
        url: 'https://cdn.pixabay.com/download/audio/2022/04/18/audio_3593859664.mp3',
        icon: <Coffee className="h-8 w-8 text-amber-600 dark:text-amber-400" />
    },
    waves: {
        url: 'https://storage.googleapis.com/pedagogico/viva-sonidos/mar.mp3',
        icon: <Waves className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
};

export const EmbeddedMusicPlayer: React.FC<ActionableMusicProps> = ({ musicData, lang }) => {
  const t = i18n(lang).musicPlayer;
  const { description, soundscapeKey } = musicData || {};
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current && soundscapeKey) {
        const sourceUrl = soundscapeSources[soundscapeKey]?.url;
        if(audioRef.current.src !== sourceUrl) {
            audioRef.current.src = sourceUrl;
            audioRef.current.load();
            setIsPlaying(false);
        }
    }
  }, [soundscapeKey]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error(`Error playing ${soundscapeKey}:`, e));
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const currentSoundscape = soundscapeKey ? soundscapeSources[soundscapeKey] : null;

  return (
    <div className="flex flex-col h-full">
        <div className="flex-grow">
            <h4 className="text-sm font-bold text-violet-600 dark:text-violet-500 tracking-wider uppercase">{t.title}</h4>
            <p className="text-gray-700 dark:text-white font-medium text-md mt-1 font-body h-20 overflow-y-auto">
              {description || t.waiting}
            </p>
        </div>
        {soundscapeKey && currentSoundscape && (
            <div className="mt-4 flex items-center space-x-4 bg-gray-100 dark:bg-gray-800/50 p-4 rounded-xl">
                 <audio ref={audioRef} loop onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
                <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center">
                    {currentSoundscape.icon}
                </div>
                <div className="flex-grow">
                     <p className="font-bold text-gray-800 dark:text-white capitalize">{soundscapeKey}</p>
                </div>
                <button
                    onClick={togglePlayPause}
                    className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-full transition-colors duration-300 shadow-lg"
                >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                </button>
            </div>
        )}
    </div>
  );
};

// Keep old component for compatibility in case it's used elsewhere, but we'll use the new one.
export const ActionableMusic: React.FC<ActionableMusicProps> = ({ musicData, lang }) => {
  const t = i18n(lang).musicPlayer;
  const { description, keywords } = musicData || {};

  const handleListen = () => {
    if (keywords) {
      const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(keywords)}`;
      window.open(youtubeUrl, '_blank');
    }
  };

  return <EmbeddedMusicPlayer musicData={musicData} lang={lang} />
};