import React from 'react';
import type { BioData, StressLevel, Language } from '../types.ts';
import { HeartPulse, Meh, Frown, Smile } from 'lucide-react';
import { i18n } from '../lib/i18n.ts';

interface BioDataSimulatorProps {
  bioData: BioData;
  setBioData: React.Dispatch<React.SetStateAction<BioData>>;
  lang: Language;
}

export const BioDataSimulator: React.FC<BioDataSimulatorProps> = ({ bioData, setBioData, lang }) => {
  const t = i18n(lang).bioSimulator;
  
  const handleHeartRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBioData(prev => ({ ...prev, heartRate: parseInt(e.target.value, 10) }));
  };

  const handleStressChange = (level: StressLevel) => {
    setBioData(prev => ({ ...prev, stressLevel: level }));
  };

  const inactiveClassValue = 'bg-[var(--surface-color)] border-transparent text-[var(--text-secondary)] hover:bg-gray-200/80 dark:hover:bg-gray-700/80';

  const stressLevels: { 
      level: StressLevel; 
      icon: React.ReactNode; 
      activeClass: string;
      inactiveClass: string;
      name: string 
  }[] = [
    { level: 'Low', icon: <Smile className="h-6 w-6" />, activeClass: 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500', inactiveClass: inactiveClassValue, name: t.low },
    { level: 'Medium', icon: <Meh className="h-6 w-6" />, activeClass: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500', inactiveClass: inactiveClassValue, name: t.medium },
    { level: 'High', icon: <Frown className="h-6 w-6" />, activeClass: 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500', inactiveClass: inactiveClassValue, name: t.high },
  ];

  return (
    <div className="bg-[var(--card-background)] p-6 rounded-3xl card-shadow space-y-6">
      <h3 className="text-lg font-bold text-[var(--text-primary)]">{t.title}</h3>
      
      {/* Heart Rate Slider */}
      <div className="pt-2">
        <label htmlFor="heartRate" className="flex items-center text-sm font-medium text-[var(--text-secondary)] mb-4 font-body">
          <HeartPulse className="h-5 w-5 mr-2 text-red-500 dark:text-red-400" />
          {t.heartRate} <span className="font-bold text-lg ml-2 text-[var(--text-primary)]">{bioData.heartRate} bpm</span>
        </label>
        <div className="relative h-8 flex items-center">
            <input
                id="heartRate"
                type="range"
                min="60"
                max="140"
                value={bioData.heartRate}
                onChange={handleHeartRateChange}
                className="w-full"
                style={{ background: `linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) ${((bioData.heartRate - 60) / (140 - 60)) * 100}%, var(--slider-track-color) ${((bioData.heartRate - 60) / (140 - 60)) * 100}%)` }}
            />
        </div>
      </div>

      {/* Stress Level Buttons */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3 font-body">{t.stressLevel}</label>
        <div className="grid grid-cols-3 gap-3">
          {stressLevels.map(({ level, icon, activeClass, inactiveClass, name }) => (
            <button
              key={level}
              onClick={() => handleStressChange(level)}
              className={`flex items-center justify-center space-x-2 font-semibold py-3 px-2 rounded-xl transition-all duration-200 border-2 ${
                bioData.stressLevel === level 
                  ? activeClass
                  : inactiveClass
              }`}
            >
              {icon}
              <span className="hidden sm:inline-block">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};