
import React, { useState, useEffect } from 'react';
import { BookOpen, Monitor, Brush, Edit, Sparkles, Wind, LoaderCircle, Target, Brain, Bed, Leaf, CloudRain, Building, Music, VolumeX, CheckCircle } from 'lucide-react';
import type { Language, UserPreferences, UserGoal, SoundPreference } from '../types.ts';
import { i18n } from '../lib/i18n.ts';
import { getDailyQuote } from '../services/geminiService.ts';

interface OnboardingProps {
  onStart: (activity: string) => void;
  lang: Language;
  userPreferences: UserPreferences | null;
  setUserPreferences: (prefs: UserPreferences) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onStart, lang, userPreferences, setUserPreferences }) => {
  const [customActivity, setCustomActivity] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [dailyQuote, setDailyQuote] = useState('');
  const [isQuoteLoading, setIsQuoteLoading] = useState(true);
  
  // Assessment state
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [selections, setSelections] = useState<{goal: UserGoal | null; soundPreference: SoundPreference | null}>({ goal: null, soundPreference: null });

  const t = i18n(lang).onboarding;

  useEffect(() => {
    setIsQuoteLoading(true);
    getDailyQuote(lang)
      .then(setDailyQuote)
      .catch(console.error)
      .finally(() => setIsQuoteLoading(false));
  }, [lang]);

  const activities = [
    { name: t.activities.study, icon: <BookOpen className="h-10 w-10" />, value: 'Studying' },
    { name: t.activities.code, icon: <Monitor className="h-10 w-10" />, value: 'Coding' },
    { name: t.activities.creative, icon: <Brush className="h-10 w-10" />, value: 'Creative Work' },
    { name: t.activities.other, icon: <Edit className="h-10 w-10" />, value: 'other' },
  ];

  const handleActivityClick = (activityValue: string, activityName: string) => {
    if (activityValue === 'other') {
      setShowCustomInput(true);
    } else {
      onStart(activityName);
    }
  };
  
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customActivity.trim()) {
      onStart(customActivity.trim());
    }
  };
  
  const handleGoalSelect = (goal: UserGoal) => {
    setSelections(prev => ({ ...prev, goal }));
    setAssessmentStep(2);
  };
  
  const handleSoundSelect = (sound: SoundPreference) => {
    setSelections(prev => ({...prev, soundPreference: sound}));
    setAssessmentStep(3);
  };
  
  const handleAssessmentComplete = () => {
    if (selections.goal && selections.soundPreference) {
      setUserPreferences({
        goal: selections.goal,
        soundPreference: selections.soundPreference
      });
    }
  };

  const goalOptions: { key: UserGoal; icon: React.ReactNode }[] = [
    { key: 'stress', icon: <Wind className="w-8 h-8"/> },
    { key: 'focus', icon: <Target className="w-8 h-8"/> },
    { key: 'sleep', icon: <Bed className="w-8 h-8"/> },
    { key: 'general', icon: <Leaf className="w-8 h-8"/> },
  ];

  const soundOptions: { key: SoundPreference; icon: React.ReactNode }[] = [
    { key: 'nature', icon: <CloudRain className="w-8 h-8"/> },
    { key: 'urban', icon: <Building className="w-8 h-8"/> },
    { key: 'music', icon: <Music className="w-8 h-8"/> },
    { key: 'silent', icon: <VolumeX className="w-8 h-8"/> },
  ];

  const renderAssessment = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4 animate-fade-in">
        <div className="card-shadow p-8 md:p-12 rounded-3xl max-w-3xl w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">{t.assessment.title}</h1>
            <p className="text-[var(--text-secondary)] text-md mb-8 max-w-2xl mx-auto font-body">
                {t.description}
            </p>
            
            <div className="relative mb-8">
                 <div className="w-full bg-[var(--surface-color)] h-1 rounded-full"></div>
                 <div className="absolute top-0 left-0 bg-[var(--accent-color)] h-1 rounded-full" style={{width: `${(assessmentStep -1) * 50}%`, transition: 'width 0.5s ease-out'}}></div>
            </div>

            {assessmentStep === 1 && (
                <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">{`${t.assessment.step} 1/2: ${t.assessment.goal_q}`}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {goalOptions.map(({key, icon}) => (
                           <button key={key} onClick={() => handleGoalSelect(key)} className="group flex flex-col items-center justify-center p-4 h-32 rounded-2xl bg-[var(--surface-color)] text-[var(--text-secondary)] font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/20 hover:bg-[var(--card-background)]">
                                <div className="mb-2 text-violet-500 dark:text-violet-400 transition-transform duration-300 group-hover:scale-110">{icon}</div>
                                <span>{t.assessment.goal_options[key]}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
             {assessmentStep === 2 && (
                <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">{`${t.assessment.step} 2/2: ${t.assessment.sound_q}`}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       {soundOptions.map(({key, icon}) => (
                           <button key={key} onClick={() => handleSoundSelect(key)} className="group flex flex-col items-center justify-center p-4 h-32 rounded-2xl bg-[var(--surface-color)] text-[var(--text-secondary)] font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/20 hover:bg-[var(--card-background)]">
                                <div className="mb-2 text-sky-500 dark:text-sky-400 transition-transform duration-300 group-hover:scale-110">{icon}</div>
                                <span>{t.assessment.sound_options[key]}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
             {assessmentStep === 3 && (
                <div className="animate-fade-in text-center">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4"/>
                    <h2 className="text-3xl font-bold mb-4">{t.assessment.complete_title}</h2>
                    <p className="text-[var(--text-secondary)] mb-8">{t.assessment.complete_subtitle}</p>
                    <button onClick={handleAssessmentComplete} className="btn accent-gradient-bg text-white text-lg px-8 py-3">
                        {t.assessment.complete_button}
                    </button>
                </div>
            )}
        </div>
    </div>
  );

  const renderActivityChooser = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4 animate-fade-in">
      <div className="card-shadow p-8 md:p-12 rounded-3xl max-w-3xl w-full">
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-lg">
            <Sparkles className="w-12 h-12 accent-gradient-text"/>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">{t.welcome}</h1>
        <p className="text-[var(--text-secondary)] text-md mb-8 max-w-2xl mx-auto font-body">
            {t.startSessionTitle}
        </p>

        {showCustomInput ? (
          <form onSubmit={handleCustomSubmit} className="w-full max-w-sm mx-auto animate-fade-in">
            <input
              type="text"
              value={customActivity}
              onChange={(e) => setCustomActivity(e.target.value)}
              placeholder={t.placeholder}
              className="w-full text-center text-lg px-4 py-3 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none transition font-body"
              autoFocus
            />
            <button
              type="submit"
              className="mt-4 btn accent-gradient-bg text-white font-bold w-full"
            >
              {t.button}
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
            {activities.map((activity) => (
              <button
                key={activity.value}
                onClick={() => handleActivityClick(activity.value, activity.name)}
                className="group flex flex-col items-center justify-center p-4 h-32 rounded-2xl bg-[var(--surface-color)] text-[var(--text-secondary)] font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/20 hover:bg-[var(--card-background)]"
              >
                <div className="mb-2 text-violet-500 dark:text-violet-400 transition-transform duration-300 group-hover:scale-110">{activity.icon}</div>
                <span>{activity.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

       <div className="mt-8 card-shadow p-4 rounded-2xl max-w-xl w-full">
            <h3 className="font-bold text-sm text-[var(--text-secondary)] uppercase tracking-wider">{t.dailyQuote.title}</h3>
            {isQuoteLoading ? (
                <div className="flex justify-center items-center h-10">
                    <LoaderCircle className="h-5 w-5 animate-spin text-[var(--text-secondary)]"/>
                </div>
            ) : (
                <p className="text-center font-medium italic text-[var(--text-primary)] mt-2">"{dailyQuote}"</p>
            )}
       </div>

    </div>
  );

  if (!userPreferences) {
    return renderAssessment();
  }

  return renderActivityChooser();
};