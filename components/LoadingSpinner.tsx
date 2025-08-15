import React from 'react';
import type { Language } from '../types.ts';
import { i18n } from '../lib/i18n.ts';

interface LoadingSpinnerProps {
    lang: Language;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ lang }) => {
  const t = i18n(lang).loading;
  return (
    <div className="absolute inset-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-20">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 dark:border-violet-500"></div>
        <p className="text-violet-600 dark:text-violet-400 mt-4 text-sm font-medium">{t.composing}</p>
      </div>
    </div>
  );
};