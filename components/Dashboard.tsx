
import React from 'react';
import type { BioData, GeminiResponse, Language, Page } from '../types.ts';
import { BioDataSimulator } from './BioDataSimulator.tsx';
import { EmbeddedMusicPlayer } from './MusicPlayer.tsx';
import { ActionableInsight } from './WellnessTip.tsx';
import { LoadingSpinner } from './LoadingSpinner.tsx';
import { i18n } from '../lib/i18n.ts';
import { Power, Activity, BarChart3, Bot, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { PomodoroTimer } from './PomodoroTimer.tsx';


const FocusTools: React.FC<{ geminiResponse: GeminiResponse | null, isLoading: boolean, lang: Language }> = ({ geminiResponse, isLoading, lang }) => {
    const t = i18n(lang).dashboard;
    return (
      <div className="relative p-6 rounded-3xl card-shadow min-h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-[var(--accent-color)]"/>
              {t.recommendations}
          </h3>
          {isLoading && <LoadingSpinner lang={lang} />}
          <div className="space-y-6 flex-grow flex flex-col">
            <div className="flex-grow">
              <EmbeddedMusicPlayer musicData={geminiResponse?.music} lang={lang} />
            </div>
            <div className="border-t border-[var(--border-color)] pt-6 flex-grow">
              <ActionableInsight insightData={geminiResponse?.insight} lang={lang} />
            </div>
          </div>
      </div>
    );
};

interface DashboardProps {
  bioData: BioData;
  setBioData: React.Dispatch<React.SetStateAction<BioData>>;
  geminiResponse: GeminiResponse | null;
  isLoading: boolean;
  error: string | null;
  onStopSession: () => void;
  lang: Language;
  setCurrentPage: (page: Page) => void;
}


export const Dashboard: React.FC<DashboardProps> = ({
  bioData,
  setBioData,
  geminiResponse,
  isLoading,
  error,
  onStopSession,
  lang,
  setCurrentPage
}) => {
  const t = i18n(lang);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="p-4 sm:p-6 rounded-3xl card-shadow">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-1">{t.dashboard.sessionOverview}</h2>
              <p className="text-[var(--text-secondary)] mb-4 sm:mb-0 font-body" dangerouslySetInnerHTML={{ __html: t.dashboard.sessionActive(bioData.activity)}}></p>
            </div>
            <div className="flex items-center flex-wrap gap-2 text-sm shrink-0">
                 <div className="bg-[var(--surface-color)] p-2 rounded-lg flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-[var(--accent-color)]" />
                    <span className="text-[var(--text-secondary)] mr-1">{t.bioSimulator.heartRate}:</span>
                    <span className="font-bold text-[var(--text-primary)]">{bioData.heartRate} bpm</span>
                </div>
                <div className="bg-[var(--surface-color)] p-2 rounded-lg flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-[var(--accent-color)]" />
                    <span className="text-[var(--text-secondary)] mr-1">{t.bioSimulator.stressLevel}:</span>
                    <span className="font-bold text-[var(--text-primary)]">{i18n(lang).bioSimulator[bioData.stressLevel.toLowerCase() as 'low']}</span>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <PomodoroTimer 
            lang={lang} 
            bioData={bioData}
            setCurrentPage={setCurrentPage}
          />
          <BioDataSimulator bioData={bioData} setBioData={setBioData} lang={lang}/>
        </div>
        <div className="space-y-8">
          <FocusTools geminiResponse={geminiResponse} isLoading={isLoading} lang={lang}/>
          <div className="p-6 rounded-3xl card-shadow">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t.dashboard.sessionControl}</h3>
            <button
              onClick={onStopSession}
              className="w-full btn bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30"
            >
              <Power className="h-5 w-5 mr-2"/>
              {t.dashboard.endSession}
            </button>
          </div>
        </div>
      </div>
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mt-4" role="alert">
          <strong className="font-bold">{t.dashboard.error} </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  );
};