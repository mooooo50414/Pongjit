
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './Header.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { ZenZone } from './components/ZenZone.tsx';
import { Onboarding } from './components/Onboarding.tsx';
import { Insights } from './components/Insights.tsx';
import { PlayZone } from './components/PlayZone.tsx';
import { Journal } from './components/Journal.tsx';
import { TeamWellness } from './components/TeamWellness.tsx';
import { Coach } from './components/Coach.tsx';
import { Spark } from './components/Spark.tsx';
import { DataManagement } from './components/DataManagement.tsx';
import { Reframe } from './components/Reframe.tsx';
import { SoundscapeMixer } from './components/SoundscapeMixer.tsx';
import { Login } from './components/Login.tsx';
import { Sanctuary } from './components/Sanctuary.tsx';
import { getBioAdaptiveResponse } from './services/geminiService.ts';
import type { User, BioData, GeminiResponse, Page, Language, SessionRecord, InsightType, JournalEntry, ReframeEntry, CustomMix, UserPreferences } from './types.ts';
import { Footer } from './components/Footer.tsx';
import { LoadingSpinner } from './components/LoadingSpinner.tsx';
import { LoaderCircle } from 'lucide-react';
import { i18n } from './lib/i18n.ts';

export type Theme = 'light' | 'dark' | 'sakura' | 'dusk' | 'nord' | 'matcha' | 'deep' | 'solarized-light' | 'monokai' | 'rose-pine';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAppReady, setIsAppReady] = useState(false);
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('pongjit_language') as Language | null) || 'th');
  const [theme, setTheme] = useState<Theme>('light');
  const [currentPage, setCurrentPage] = useState<Page>('Login');
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const initialBioData: BioData = {
    heartRate: 75,
    stressLevel: 'Low',
    activity: 'Just relaxing',
  };

  const initialGeminiResponse: GeminiResponse = {
    music: {
      description: "",
      keywords: "",
      soundscapeKey: 'rain',
    },
    insight: {
      title: "",
      description: "",
      type: 'tip' as InsightType,
    }
  };

  const [bioData, setBioData] = useState<BioData>(initialBioData);
  const [geminiResponse, setGeminiResponse] = useState<GeminiResponse | null>(initialGeminiResponse);
  const [history, setHistory] = useState<SessionRecord[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [reframeEntries, setReframeEntries] = useState<ReframeEntry[]>([]);
  const [customMixes, setCustomMixes] = useState<CustomMix[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  
  useEffect(() => {
    localStorage.setItem('pongjit_language', language);
    document.documentElement.lang = language;
  }, [language]);


  useEffect(() => {
    const storedTheme = localStorage.getItem('pongjit_theme') as Theme | null;
    if (storedTheme) {
        setTheme(storedTheme);
    } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    const themes: Theme[] = ['light', 'dark', 'sakura', 'dusk', 'nord', 'matcha', 'deep', 'solarized-light', 'monokai', 'rose-pine'];
    document.documentElement.classList.remove(...themes);
    document.documentElement.classList.add(theme);
    localStorage.setItem('pongjit_theme', theme);
  }, [theme]);
  
  // Apply page-specific body class for styling
  useEffect(() => {
    if (currentPage === 'Login') {
      document.body.classList.add('login-page-active');
    } else {
      document.body.classList.remove('login-page-active');
    }
    
    if (currentPage === 'Sanctuary') {
        document.body.classList.add('sanctuary-active');
    } else {
        document.body.classList.remove('sanctuary-active');
    }
    
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove('login-page-active');
      document.body.classList.remove('sanctuary-active');
    };
  }, [currentPage]);

  // App initialization: check for a logged-in user
  useEffect(() => {
    try {
        const savedUser = localStorage.getItem('pongjit_user');
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            const savedPrefs = localStorage.getItem(`pongjit_preferences_${parsedUser.email}`);
            setCurrentPage(savedPrefs ? 'Dashboard' : 'Onboarding');
        } else {
            setCurrentPage('Login');
        }
    } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('pongjit_user');
        setCurrentPage('Login');
    } finally {
        setIsAppReady(true);
    }
  }, []);
  
  // Load user-specific data when user state changes
  useEffect(() => {
    if (!user) return;
    try {
        const historyKey = `pongjit_history_${user.email}`;
        const savedHistory = localStorage.getItem(historyKey);
        if (savedHistory) setHistory(JSON.parse(savedHistory)); else setHistory([]);

        const journalKey = `pongjit_journal_${user.email}`;
        const savedJournal = localStorage.getItem(journalKey);
        if (savedJournal) setJournalEntries(JSON.parse(savedJournal)); else setJournalEntries([]);

        const reframeKey = `pongjit_reframe_${user.email}`;
        const savedReframe = localStorage.getItem(reframeKey);
        if (savedReframe) setReframeEntries(JSON.parse(savedReframe)); else setReframeEntries([]);

        const mixesKey = `pongjit_mixes_${user.email}`;
        const savedMixes = localStorage.getItem(mixesKey);
        if (savedMixes) setCustomMixes(JSON.parse(savedMixes)); else setCustomMixes([]);

        const prefsKey = `pongjit_preferences_${user.email}`;
        const savedPrefs = localStorage.getItem(prefsKey);
        if (savedPrefs) setUserPreferences(JSON.parse(savedPrefs)); else setUserPreferences(null);

    } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
    }
  }, [user]);

  // Save user-specific data when it changes
  useEffect(() => { if (user) localStorage.setItem(`pongjit_history_${user.email}`, JSON.stringify(history)); }, [history, user]);
  useEffect(() => { if (user) localStorage.setItem(`pongjit_journal_${user.email}`, JSON.stringify(journalEntries)); }, [journalEntries, user]);
  useEffect(() => { if (user) localStorage.setItem(`pongjit_reframe_${user.email}`, JSON.stringify(reframeEntries)); }, [reframeEntries, user]);
  useEffect(() => { if (user) localStorage.setItem(`pongjit_mixes_${user.email}`, JSON.stringify(customMixes)); }, [customMixes, user]);
  useEffect(() => {
    if (user) {
        const key = `pongjit_preferences_${user.email}`;
        if (userPreferences) {
            localStorage.setItem(key, JSON.stringify(userPreferences));
        } else {
            localStorage.removeItem(key);
        }
    }
  }, [userPreferences, user]);


  const handleFetchBioAdaptiveResponse = useCallback(async (currentBioData: BioData) => {
    if (!sessionActive) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await getBioAdaptiveResponse(currentBioData, language, userPreferences);
      setGeminiResponse(response);
    } catch (err) {
      console.error("Error fetching bio-adaptive response:", err);
      setError(i18n(language).dashboard.connectionError);
    } finally {
      setIsLoading(false);
    }
  }, [sessionActive, language, userPreferences]);

  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout>;
    if (sessionActive) {
      debounceTimer = setTimeout(() => {
        handleFetchBioAdaptiveResponse(bioData);
      }, 1000); // Debounce to avoid too many API calls
    }
    return () => clearTimeout(debounceTimer);
  }, [bioData, sessionActive, handleFetchBioAdaptiveResponse]);
  
  const handleStartSession = (activity: string) => {
    const newBioData = { ...initialBioData, activity };
    setBioData(newBioData);
    setSessionActive(true);
    setCurrentPage('Dashboard');
    // Initial fetch on start
    handleFetchBioAdaptiveResponse(newBioData);
  };

  const handleStopSession = () => {
    if (geminiResponse) {
        const newRecord: SessionRecord = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            activity: bioData.activity,
            bioData: bioData,
            geminiResponse: geminiResponse,
        };
        setHistory(prev => [newRecord, ...prev]);
    }
    setSessionActive(false);
    setCurrentPage('Onboarding');
    setBioData(initialBioData);
    setGeminiResponse(initialGeminiResponse);
  };

  const handleLogin = (newUser: User) => {
    localStorage.setItem('pongjit_user', JSON.stringify(newUser));
    setUser(newUser);
    const savedPrefs = localStorage.getItem(`pongjit_preferences_${newUser.email}`);
    setCurrentPage(savedPrefs ? 'Onboarding' : 'Onboarding'); // Go to onboarding to choose activity.
  };

  const handleLogout = () => {
    // Clear user-specific state
    setHistory([]);
    setJournalEntries([]);
    setReframeEntries([]);
    setCustomMixes([]);
    setUserPreferences(null);
    setSessionActive(false);
    
    // Clear user from storage
    localStorage.removeItem('pongjit_user');
    setUser(null);
    setCurrentPage('Login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return (
          <Dashboard
            bioData={bioData}
            setBioData={setBioData}
            geminiResponse={geminiResponse}
            isLoading={isLoading}
            error={error}
            onStopSession={handleStopSession}
            lang={language}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'Training':
        return <ZenZone lang={language} lastBioData={bioData} />;
      case 'Insights':
        return <Insights history={history} journalEntries={journalEntries} setHistory={setHistory} lang={language} />;
      case 'Play':
        return <PlayZone lang={language} lastBioData={bioData} />;
      case 'Sanctuary':
        return <Sanctuary 
                    bioData={bioData}
                    setBioData={setBioData}
                    geminiResponse={geminiResponse}
                    lang={language}
                    onStopSession={handleStopSession}
               />;
      case 'Journal':
        return <Journal journalEntries={journalEntries} setJournalEntries={setJournalEntries} lang={language} />;
      case 'Reframe':
        return <Reframe reframeEntries={reframeEntries} setReframeEntries={setReframeEntries} lang={language} />;
      case 'Mixer':
        return <SoundscapeMixer customMixes={customMixes} setCustomMixes={setCustomMixes} lang={language} />;
      case 'Team':
        return <TeamWellness history={history} lang={language} />;
      case 'Coach':
        return <Coach lang={language} lastSession={history[0]} lastJournal={journalEntries[0]} />;
      case 'Spark':
        return <Spark lang={language} />;
      case 'Data':
        return <DataManagement 
                  user={user!}
                  history={history}
                  journalEntries={journalEntries}
                  reframeEntries={reframeEntries}
                  customMixes={customMixes}
                  userPreferences={userPreferences}
                  setHistory={setHistory}
                  setJournalEntries={setJournalEntries}
                  setReframeEntries={setReframeEntries}
                  setCustomMixes={setCustomMixes}
                  setUserPreferences={setUserPreferences}
                  lang={language}
                />;
      case 'Onboarding':
        return <Onboarding onStart={handleStartSession} lang={language} userPreferences={userPreferences} setUserPreferences={setUserPreferences} />;
      case 'Login':
      default:
        return <Login 
                    onLogin={handleLogin} 
                    lang={language}
                    setLang={setLanguage}
                    theme={theme}
                    setTheme={setTheme}
                />;
    }
  };

  if (!isAppReady) {
    return (
        <div className="flex items-center justify-center min-h-screen">
           <LoaderCircle className="h-12 w-12 animate-spin text-[var(--accent-color)]"/>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="relative z-10 min-h-screen flex flex-col">
        {currentPage !== 'Login' && user && (
            <Header 
                user={user}
                onLogout={handleLogout}
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                sessionActive={sessionActive} 
                lang={language}
                setLang={setLanguage}
                theme={theme}
                setTheme={setTheme}
            />
        )}
        <main className={`flex-grow container mx-auto ${currentPage !== 'Login' && currentPage !== 'Sanctuary' ? 'p-4 sm:p-6 md:p-8' : ''}`}>
            {renderPage()}
        </main>
        {currentPage !== 'Login' && currentPage !== 'Sanctuary' && <Footer lang={language} />}
      </div>
    </div>
  );
};

export default App;
