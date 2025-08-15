
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Play, Wind, LoaderCircle, Sparkles, RefreshCcw, Target, HeartPulse, CheckCircle, BrainCircuit, Waves, Pause, StopCircle } from 'lucide-react';
import { getTrainingFeedback, getGuidedMeditation } from '../services/geminiService.ts';
import type { BioData, Language, GuidedMeditation } from '../types.ts';
import { i18n } from '../lib/i18n.ts';
import '../WellnessTip.css'; // Reuse for breathing visualizer

const TRAINING_DURATION = 60; // 60 seconds

type TrainingMode = 'breathing' | 'meditation';

export const ZenZone: React.FC<{ lang: Language, lastBioData: BioData }> = ({ lang, lastBioData }) => {
  const t = i18n(lang).training;
  
  const [mode, setMode] = useState<TrainingMode>('breathing');
  const [trainingState, setTrainingState] = useState<'idle' | 'running' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState(TRAINING_DURATION);
  
  // Feedback for breathing
  const [feedback, setFeedback] = useState('');
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

  // Guided Meditation state
  const [meditation, setMeditation] = useState<GuidedMeditation | null>(null);
  const [isLoadingMeditation, setIsLoadingMeditation] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(-1);
  const utteranceRef = useRef<SpeechSynthesisUtterance[]>([]);

  const [startHr, setStartHr] = useState(lastBioData.heartRate);
  const [currentHr, setCurrentHr] = useState(lastBioData.heartRate);
  const targetHr = useMemo(() => Math.max(60, Math.floor(startHr * 0.9)), [startHr]);

  // Breathing pacer state
  const [animationState, setAnimationState] = useState('inhale');
  const [instruction, setInstruction] = useState(i18n(lang).training.breathe.in);
  
  // Stop speech when component unmounts or mode changes
  useEffect(() => {
    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);
  
  useEffect(() => {
      if(mode !== 'meditation' && speechSynthesis.speaking) {
          speechSynthesis.cancel();
          setIsSpeaking(false);
          setCurrentParagraph(-1);
      }
  }, [mode]);

  useEffect(() => {
    // This effect ensures the instruction text updates if the language changes while the component is idle.
    if (trainingState === 'idle') {
      setInstruction(i18n(lang).training.breathe.in);
    }
  }, [lang, trainingState]);


  const startBreathingTraining = useCallback(() => {
    const latestHeartRate = lastBioData.heartRate;
    setStartHr(latestHeartRate);
    setCurrentHr(latestHeartRate);
    setTimeLeft(TRAINING_DURATION);
    setFeedback('');
    setTrainingState('running');
  }, [lastBioData.heartRate]);

  const startMeditation = useCallback(async () => {
    setIsLoadingMeditation(true);
    setMeditation(null);
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentParagraph(-1);
    try {
        const med = await getGuidedMeditation(lastBioData, lang);
        setMeditation(med);
    } catch(e) {
        console.error(e);
        // show error to user
    } finally {
        setIsLoadingMeditation(false);
    }
  }, [lastBioData, lang]);
  
   const handlePlayPauseSpeech = () => {
        if (!meditation) return;

        if (isSpeaking) {
            speechSynthesis.pause();
            setIsSpeaking(false);
        } else {
            if (speechSynthesis.paused) {
                speechSynthesis.resume();
            } else {
                const voices = speechSynthesis.getVoices();
                // A simple attempt to find a voice matching the language
                const voice = voices.find(v => v.lang.startsWith(lang)) || voices.find(v => v.lang.startsWith('en')) || voices[0];
                
                utteranceRef.current = meditation.script.map((p, index) => {
                    const utterance = new SpeechSynthesisUtterance(p);
                    utterance.voice = voice;
                    utterance.lang = voice?.lang || lang;
                    utterance.rate = 0.9;
                    utterance.pitch = 1.1;
                    utterance.onstart = () => setCurrentParagraph(index);
                    utterance.onend = () => {
                        if (index === meditation.script.length - 1) {
                            setCurrentParagraph(-1);
                            setIsSpeaking(false);
                        }
                    };
                    return utterance;
                });
                
                utteranceRef.current.forEach(u => speechSynthesis.speak(u));
            }
            setIsSpeaking(true);
        }
    };

    const handleStopSpeech = () => {
        speechSynthesis.cancel();
        setIsSpeaking(false);
        setCurrentParagraph(-1);
    };


  useEffect(() => {
    if (trainingState !== 'running' || mode !== 'breathing') return;
    
    const breatheTexts = i18n(lang).training.breathe;
    // Breathing pacer effect
    const cycle = () => {
      setInstruction(breatheTexts.in);
      setAnimationState('inhale');
      setTimeout(() => {
        setInstruction(breatheTexts.hold);
        setAnimationState('hold');
        setTimeout(() => {
          setInstruction(breatheTexts.out);
          setAnimationState('exhale');
        }, 4000); // Hold for 4s
      }, 4000); // Inhale for 4s
    };
    cycle();
    const pacerInterval = setInterval(cycle, 12000); // 4 in + 4 hold + 4 out (from css) = 12s cycle

    // Main training timer effect
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      setCurrentHr(prevHr => {
        if (prevHr > targetHr) {
          const decreaseAmount = (startHr - targetHr) / TRAINING_DURATION;
          return Math.max(targetHr, prevHr - decreaseAmount);
        }
        return prevHr;
      });
    }, 1000);

    return () => {
      clearInterval(pacerInterval);
      clearInterval(timerInterval);
    };
  }, [trainingState, startHr, targetHr, lang, mode]);

  useEffect(() => {
    if (timeLeft <= 0 && trainingState === 'running' && mode === 'breathing') {
      setTrainingState('finished');
      setIsLoadingFeedback(true);
      getTrainingFeedback(startHr, currentHr, lang)
        .then(setFeedback)
        .catch(err => {
          console.error(err);
          setFeedback(i18n(lang).training.feedbackError);
        })
        .finally(() => setIsLoadingFeedback(false));
    }
  }, [timeLeft, trainingState, startHr, currentHr, lang, mode]);

  const progress = ((TRAINING_DURATION - timeLeft) / TRAINING_DURATION) * 100;
  const hrReduction = startHr - Math.round(currentHr);

  const renderIdle = () => (
    <>
      <div className="flex items-center justify-center space-x-2 bg-gray-200/50 dark:bg-gray-800/50 p-2 rounded-2xl mb-12">
        <button onClick={() => setMode('breathing')} className={`px-4 py-3 w-40 rounded-xl font-semibold flex items-center justify-center transition-all ${mode === 'breathing' ? 'bg-[var(--card-background)] shadow-md text-violet-600 dark:text-violet-300' : 'bg-transparent text-[var(--text-secondary)]'}`}>
          <Waves className="h-5 w-5 mr-2"/> {t.modes.breathing}
        </button>
        <button onClick={() => setMode('meditation')} className={`px-4 py-3 w-40 rounded-xl font-semibold flex items-center justify-center transition-all ${mode === 'meditation' ? 'bg-[var(--card-background)] shadow-md text-violet-600 dark:text-violet-300' : 'bg-transparent text-[var(--text-secondary)]'}`}>
          <BrainCircuit className="h-5 w-5 mr-2"/> {t.modes.meditation}
        </button>
      </div>

      <div className="w-full text-center">
        {mode === 'breathing' && (
          <div className="animate-fade-in">
            <Wind className="mx-auto h-24 w-24 text-violet-500/80 dark:text-violet-400/80 mb-6" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">{t.title}</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-lg mb-8 font-body">{t.description}</p>
            <button
              onClick={startBreathingTraining}
              className="mt-8 btn accent-gradient-bg text-white font-bold py-4 px-10 text-lg"
            >
              <Play className="h-6 w-6 mr-3"/>{t.button}
            </button>
          </div>
        )}
        {mode === 'meditation' && (
          <div className="animate-fade-in">
             <BrainCircuit className="mx-auto h-24 w-24 text-violet-500/80 dark:text-violet-400/80 mb-6" />
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">{t.meditation.title}</h2>
             <p className="text-xl text-[var(--text-secondary)] max-w-lg mb-8 font-body">{t.meditation.description}</p>
              
             {isLoadingMeditation ? (
                <div className="mt-8 flex justify-center items-center text-[var(--text-secondary)]">
                    <LoaderCircle className="h-6 w-6 animate-spin mr-3"/>
                    {t.meditation.generating}
                </div>
             ) : meditation ? (
                <div className="mt-8 text-left bg-white dark:bg-gray-900/50 p-6 rounded-2xl max-w-xl mx-auto border border-gray-200 dark:border-gray-700/50">
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 text-center">{meditation.title}</h3>
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2 font-body text-[var(--text-secondary)]">
                       {meditation.script.map((paragraph, index) => <p key={index} className={`${currentParagraph === index ? 'text-violet-600 dark:text-violet-300 font-semibold' : ''} transition-colors`}>{paragraph}</p>)}
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <button onClick={handlePlayPauseSpeech} className="w-16 h-16 flex items-center justify-center rounded-full accent-gradient-bg text-white shadow-lg hover:opacity-90 transition-opacity">
                            {isSpeaking ? <Pause className="h-7 w-7"/> : <Play className="h-7 w-7 ml-1"/>}
                        </button>
                        <button onClick={handleStopSpeech} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700/60 text-[var(--text-secondary)] hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                            <StopCircle className="h-6 w-6"/>
                        </button>
                         <button
                            onClick={startMeditation}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700/60 text-[var(--text-secondary)] hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors" title={t.regenerate}
                        >
                            <RefreshCcw className="h-6 w-6"/>
                        </button>
                    </div>
                </div>
             ) : (
                <button
                    onClick={startMeditation}
                    className="mt-8 btn accent-gradient-bg text-white font-bold py-4 px-10 text-lg"
                >
                    <Sparkles className="h-6 w-6 mr-3"/>{t.meditation.button}
                </button>
             )}
          </div>
        )}
      </div>
    </>
  );

  const renderBreathingRunning = () => (
    <div className="w-full text-center">
        <div className="relative w-56 h-56 mx-auto flex items-center justify-center mb-8">
            <div className={`breathing-circle ${animationState}`}></div>
            <span className="z-10 font-bold text-3xl text-violet-800 dark:text-violet-200">{instruction}</span>
        </div>
        <div className="flex justify-around items-center max-w-md mx-auto mb-8 text-[var(--text-primary)]">
            <div className="text-center">
                <div className="text-sm text-[var(--text-secondary)] font-body">{t.currentHr}</div>
                <div className="flex items-center justify-center text-4xl font-bold">
                    <HeartPulse className="h-8 w-8 mr-2 text-red-500" />
                    {Math.round(currentHr)}
                </div>
            </div>
            <div className="text-center">
                <div className="text-sm text-[var(--text-secondary)] font-body">{t.targetHr}</div>
                <div className="flex items-center justify-center text-4xl font-bold">
                    <Target className="h-8 w-8 mr-2 text-green-500" />
                    {targetHr}
                </div>
            </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div className="accent-gradient-bg h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 1s linear' }}></div>
        </div>
        <div className="mt-2 text-lg font-semibold text-[var(--text-secondary)]">{timeLeft}s</div>
    </div>
  );

  const renderBreathingFinished = () => (
      <div className="text-center animate-fade-in w-full max-w-lg">
          <CheckCircle className="mx-auto h-24 w-24 text-emerald-500 mb-4" />
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-2">{t.complete}</h2>
          <div className="text-lg text-[var(--text-secondary)] mb-6 font-body h-16 flex items-center justify-center">
              {isLoadingFeedback ? <LoaderCircle className="h-6 w-6 mx-auto animate-spin" /> : 
              <p className="flex items-center justify-center text-center italic"><Sparkles className="h-5 w-5 mr-2 text-indigo-500 flex-shrink-0"/>"{feedback}"</p>}
          </div>
          <div className="grid grid-cols-2 gap-4 text-left bg-gray-100 dark:bg-gray-900/50 p-6 rounded-2xl mb-8 border border-gray-200 dark:border-gray-700">
              <div>
                  <div className="text-sm text-[var(--text-secondary)]">Start HR</div>
                  <div className="text-3xl font-bold text-[var(--text-primary)]">{startHr}</div>
              </div>
               <div>
                  <div className="text-sm text-[var(--text-secondary)]">End HR</div>
                  <div className="text-3xl font-bold text-[var(--text-primary)]">{Math.round(currentHr)}</div>
              </div>
              <div className="col-span-2">
                  <div className="text-sm text-[var(--text-secondary)]">Reduction</div>
                  <div className={`text-3xl font-bold ${hrReduction > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {hrReduction > 0 ? `-${hrReduction}` : `+${Math.abs(hrReduction)}`} bpm
                  </div>
              </div>
          </div>
          <button
            onClick={() => { setTrainingState('idle'); setMode('breathing'); }}
            className="group btn accent-gradient-bg text-white font-bold py-3 px-8 text-lg"
          >
            <RefreshCcw className="h-5 w-5 mr-3 transition-transform group-hover:rotate-180 duration-500"/>{t.tryAgain}
          </button>
      </div>
  );

  const renderContent = () => {
    if (trainingState === 'running' && mode === 'breathing') return renderBreathingRunning();
    if (trainingState === 'finished' && mode === 'breathing') return renderBreathingFinished();
    return renderIdle();
  }

  return (
    <div className={`flex flex-col items-center justify-center text-center p-4 md:p-8 rounded-3xl min-h-[70vh] transition-colors duration-500 card-shadow`}>
      <div className="w-full max-w-2xl flex flex-col items-center animate-fade-in">
          {renderContent()}
      </div>
    </div>
  );
};
