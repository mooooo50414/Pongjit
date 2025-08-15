
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Play, Wind, LoaderCircle, Sparkles, RefreshCcw, Target, HeartPulse, CheckCircle, Leaf } from 'lucide-react';
import { getGardenFeedback } from '../services/geminiService.ts';
import type { BioData, Language } from '../types.ts';
import { i18n } from '../lib/i18n.ts';
import '../WellnessTip.css'; 

const GAME_DURATION = 120; // 120 seconds

type GameState = 'idle' | 'running' | 'finished';

const Plant: React.FC<{ growth: number }> = ({ growth }) => {
    // growth is a value from 0 to 1
    const stemHeight = 30 + growth * 70; // from 30 to 100
    const leafOpacity = Math.max(0, (growth - 0.1) / 0.9);
    const flowerOpacity = Math.max(0, (growth - 0.5) / 0.5);
    const flowerScale = Math.max(0, (growth - 0.4) / 0.6);

    return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <g transform="translate(100 180)">
                {/* Pot */}
                <path d="M -40 0 L -50 20 L 50 20 L 40 0 Z" fill="#c2b280" />
                <rect x="-40" y="-10" width="80" height="10" fill="#d4c392" />
                
                {/* Stem */}
                <path
                    d={`M 0,0 C 10,-${stemHeight * 0.25} -10,-${stemHeight * 0.75} 0,-${stemHeight}`}
                    stroke="#65a30d"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    style={{ transition: 'all 1s ease-out' }}
                />
                
                {/* Leaves */}
                <g opacity={leafOpacity} style={{ transition: 'opacity 1s ease-out 0.5s'}}>
                    <path d={`M 0,-${stemHeight * 0.4} C 20,-${stemHeight * 0.45} 30,-${stemHeight * 0.2} 40,-${stemHeight * 0.5}`} stroke="#84cc16" fill="none" strokeWidth="6" strokeLinecap="round" />
                    <path d={`M 0,-${stemHeight * 0.6} C -20,-${stemHeight * 0.65} -30,-${stemHeight * 0.4} -40,-${stemHeight * 0.7}`} stroke="#84cc16" fill="none" strokeWidth="6" strokeLinecap="round" />
                </g>
                
                {/* Flower */}
                <g transform={`translate(0, -${stemHeight}) scale(${flowerScale})`} opacity={flowerOpacity} style={{ transition: 'all 1s ease-out 1s' }}>
                    <circle cx="0" cy="0" r="12" fill="#facc15" />
                    {[0, 60, 120, 180, 240, 300].map(angle => (
                         <ellipse key={angle} cx="0" cy="-25" rx="10" ry="15" fill="rgba(236, 72, 153, 0.8)" transform={`rotate(${angle})`} />
                    ))}
                </g>
            </g>
        </svg>
    )
}


export const PlayZone: React.FC<{ lang: Language, lastBioData: BioData }> = ({ lang, lastBioData }) => {
  const t = i18n(lang).play;
  
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  
  const [feedback, setFeedback] = useState('');
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

  const [startHr, setStartHr] = useState(lastBioData.heartRate);
  const [currentHr, setCurrentHr] =useState(lastBioData.heartRate);
  const targetHr = useMemo(() => Math.max(60, Math.floor(startHr * 0.85)), [startHr]);

  const [animationState, setAnimationState] = useState('inhale');
  const [instruction, setInstruction] = useState(i18n(lang).training.breathe.in);

  const startTraining = useCallback(() => {
    const latestHeartRate = lastBioData.heartRate;
    setStartHr(latestHeartRate);
    setCurrentHr(latestHeartRate);
    setTimeLeft(GAME_DURATION);
    setFeedback('');
    setGameState('running');
  }, [lastBioData.heartRate]);


  useEffect(() => {
    if (gameState !== 'running') return;
    
    const cycle = () => {
      setInstruction(i18n(lang).training.breathe.in);
      setAnimationState('inhale');
      setTimeout(() => {
        setInstruction(i18n(lang).training.breathe.hold);
        setAnimationState('hold');
        setTimeout(() => {
          setInstruction(i18n(lang).training.breathe.out);
          setAnimationState('exhale');
        }, 4000); 
      }, 4000); 
    };
    cycle();
    const pacerInterval = setInterval(cycle, 12000); 

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      setCurrentHr(prevHr => {
        if (prevHr > targetHr) {
          const decreaseAmount = (startHr - targetHr) / GAME_DURATION;
          return Math.max(targetHr, prevHr - decreaseAmount * (1 + Math.random() * 0.5));
        }
        return prevHr;
      });
    }, 1000);

    return () => {
      clearInterval(pacerInterval);
      clearInterval(timerInterval);
    };
  }, [gameState, startHr, targetHr, lang]);

  const performance = useMemo(() => {
    if (startHr <= targetHr) return 1;
    const reduction = startHr - Math.round(currentHr);
    const maxReduction = startHr - targetHr;
    return Math.max(0, Math.min(1, reduction / maxReduction));
  }, [startHr, currentHr, targetHr]);

  useEffect(() => {
    if (timeLeft <= 0 && gameState === 'running') {
      setGameState('finished');
      setIsLoadingFeedback(true);
      getGardenFeedback(performance, lang)
        .then(setFeedback)
        .catch(err => {
          console.error(err);
          setFeedback(t.feedbackError);
        })
        .finally(() => setIsLoadingFeedback(false));
    }
  }, [timeLeft, gameState, performance, lang, t.feedbackError]);

  const backgroundStyle = useMemo(() => {
    const darkSky = { top: [37, 33, 61], bottom: [91, 84, 139] }; // Dark blue to purple
    const brightSky = { top: [135, 206, 250], bottom: [255, 255, 255] }; // Sky blue to white
    
    const interpolate = (start: number[], end: number[], factor: number) => 
        start.map((s, i) => Math.round(s + (end[i] - s) * factor));

    const topColor = interpolate(darkSky.top, brightSky.top, performance);
    const bottomColor = interpolate(darkSky.bottom, brightSky.bottom, performance);

    return { 
        background: `linear-gradient(to bottom, rgb(${topColor.join(',')}), rgb(${bottomColor.join(',')}))`
    };
  }, [performance]);

  const renderIdle = () => (
    <div className="text-center w-full max-w-lg animate-fade-in">
        <div className="w-48 h-48 mx-auto mb-6">
            <Leaf className="w-full h-full text-green-500/80 dark:text-green-400/80" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 dark:text-white">{t.title}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mb-10 font-body">{t.description}</p>
        <button
            onClick={startTraining}
            className="group mt-8 accent-gradient-bg text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-violet-500/50 hover:opacity-95"
        >
            <Play className="h-6 w-6 mr-3 transition-transform group-hover:scale-110"/>{t.button}
        </button>
    </div>
  );

  const renderRunning = () => (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative w-full h-64 md:h-96">
            <Plant growth={performance}/>
        </div>
        <div className="text-center">
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-8">
                <div className={`breathing-circle ${animationState}`}></div>
                <span className="z-10 font-bold text-2xl text-violet-800 dark:text-violet-200">{instruction}</span>
            </div>
            <div className="flex justify-around items-center max-w-xs mx-auto mb-6 text-gray-700 dark:text-gray-200">
                <div className="text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-body">{i18n(lang).training.currentHr}</div>
                    <div className="flex items-center justify-center text-3xl font-bold">
                        <HeartPulse className="h-7 w-7 mr-2 text-red-500" />
                        {Math.round(currentHr)}
                    </div>
                </div>
            </div>
            <div className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-300">{timeLeft}s</div>
        </div>
    </div>
  );

  const renderFinished = () => (
      <div className="text-center animate-fade-in w-full max-w-2xl">
          <div className="relative w-64 h-64 mx-auto mb-4">
            <Plant growth={performance}/>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t.complete}</h2>
          
          <div className="bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl my-6 border border-gray-200 dark:border-gray-700 min-h-[80px] flex items-center justify-center">
             {isLoadingFeedback ? <LoaderCircle className="h-6 w-6 mx-auto animate-spin" /> : 
             <div className="text-center">
                <p className="font-semibold text-violet-700 dark:text-violet-300 mb-1">{t.feedbackTitle}</p>
                <p className="italic text-gray-700 dark:text-gray-300">"{feedback}"</p>
             </div>
             }
          </div>

          <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-4 mb-6">
            <div className="accent-gradient-bg h-4 rounded-full flex items-center justify-end pr-2" style={{ width: `${performance * 100}%` }}>
                <span className="text-xs font-bold text-white">{(performance * 100).toFixed(0)}%</span>
            </div>
          </div>

          <button
            onClick={() => setGameState('idle')}
            className="group accent-gradient-bg text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-violet-500/50 hover:opacity-95"
          >
            <RefreshCcw className="h-5 w-5 mr-3 transition-transform group-hover:rotate-180 duration-500"/>{t.tryAgain}
          </button>
      </div>
  );

  const renderContent = () => {
    switch(gameState) {
        case 'running': return renderRunning();
        case 'finished': return renderFinished();
        case 'idle':
        default: return renderIdle();
    }
  }

  return (
    <div 
        className={`flex flex-col items-center justify-center text-center p-4 md:p-8 rounded-3xl min-h-[70vh] transition-all duration-1000`}
        style={gameState === 'idle' ? {} : backgroundStyle}
    >
        {renderContent()}
    </div>
  );
};
