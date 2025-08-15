
import React, { useEffect, useState } from 'react';
import { Sparkles, Wind } from 'lucide-react';
import type { Language, InsightData } from '../types.ts';
import { i18n } from '../lib/i18n.ts';
import '../WellnessTip.css';

interface ActionableInsightProps {
  insightData: InsightData | undefined | null;
  lang: Language;
}

const BreathingVisualizer: React.FC<{text: string}> = ({ text }) => {
    const [animationState, setAnimationState] = useState('inhale');
    const [instruction, setInstruction] = useState('Inhale');

    const t = i18n('en').wellnessTip; // Use EN for parsing timing from AI

    useEffect(() => {
        // Simple parsing for "Inhale for Xs, ... Exhale for Ys"
        const inhaleMatch = text.match(/inhale for (\d+)/i);
        const holdMatch = text.match(/hold for (\d+)/i);
        const exhaleMatch = text.match(/exhale for (\d+)/i);
        
        const inhaleTime = (inhaleMatch ? parseInt(inhaleMatch[1], 10) : 4) * 1000;
        const holdTime = (holdMatch ? parseInt(holdMatch[1], 10) : 4) * 1000;
        const exhaleTime = (exhaleMatch ? parseInt(exhaleMatch[1], 10) : 6) * 1000;

        const cycle = () => {
            setInstruction(t.breathe.in);
            setAnimationState('inhale');
            setTimeout(() => {
                if (holdTime > 0) {
                    setInstruction(t.breathe.hold);
                    setAnimationState('hold');
                }
                setTimeout(() => {
                    setInstruction(t.breathe.out);
                    setAnimationState('exhale');
                }, holdTime);
            }, inhaleTime);
        };
        
        cycle();
        const interval = setInterval(cycle, inhaleTime + holdTime + exhaleTime);
        return () => clearInterval(interval);
    }, [text, t]);

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-sky-50 dark:bg-sky-900/30 rounded-lg">
            <div className="relative w-24 h-24 flex items-center justify-center">
                <div className={`breathing-circle breathing-circle-sky ${animationState}`}></div>
                <span className="z-10 font-bold text-sky-800 dark:text-sky-200">{instruction}</span>
            </div>
        </div>
    );
};

export const ActionableInsight: React.FC<ActionableInsightProps> = ({ insightData, lang }) => {
  const t = i18n(lang).wellnessTip;
  const { title, description, type } = insightData || {};

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h4 className="text-sm font-bold text-purple-600 dark:text-purple-400 tracking-wider uppercase">{t.title}</h4>
        <h5 className="text-[var(--text-primary)] font-bold text-md mt-1">{title || t.waitingTitle}</h5>
        <p className="text-gray-600 dark:text-gray-300 font-medium mt-1 font-body text-sm h-16 overflow-y-auto">
          {description || t.waiting}
        </p>
      </div>
        {type === 'breathing' && description && (
            <div className="mt-4">
                <BreathingVisualizer text={insightData?.description || ''}/>
            </div>
        )}
    </div>
  );
};
