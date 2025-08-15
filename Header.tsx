
import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Page, Language, User } from './types.ts';
import type { Theme } from './App.tsx';
import { Sun, Moon, Gamepad2, Users, BotMessageSquare, Brain, BarChart, BookMarked, TrendingUp, Lightbulb, Shield, Repeat, SlidersHorizontal, LogOut, ChevronDown, Check, Mountain } from 'lucide-react';
import { i18n } from './lib/i18n.ts';
import { Logo } from './components/Logo.tsx';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  sessionActive: boolean;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const languages: { code: Language, name: string, flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

const themes: { name: Theme; label: string; color: string; borderColor: string }[] = [
    { name: 'light', label: 'Light', color: '#f8f9fa', borderColor: '#e9ecef' },
    { name: 'dark', label: 'Dark', color: '#0d1117', borderColor: '#30363d' },
    { name: 'sakura', label: 'Sakura', color: '#fdf8f8', borderColor: '#f8e0e0' },
    { name: 'dusk', label: 'Dusk', color: '#231f20', borderColor: '#51484f' },
    { name: 'nord', label: 'Nord', color: '#2e3440', borderColor: '#4c566a' },
    { name: 'matcha', label: 'Matcha', color: '#f5f9f2', borderColor: '#dce8d9' },
    { name: 'deep', label: 'Deep', color: '#011627', borderColor: '#1d3b53' },
    { name: 'solarized-light', label: 'Solarized', color: '#fdf6e3', borderColor: '#d8d2c0' },
    { name: 'monokai', label: 'Monokai', color: '#272822', borderColor: '#49483e' },
    { name: 'rose-pine', label: 'Rosé Pine', color: '#191724', borderColor: '#312f44' },
];

export const Header: React.FC<HeaderProps> = ({ user, onLogout, currentPage, setCurrentPage, sessionActive, lang, setLang, theme, setTheme }) => {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const navRef = useRef<HTMLElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: '0px', width: '0px', opacity: 0 });
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const visibleNavItems = useMemo(() => {
    const t = i18n(lang).header;
    const navItems: { page: Page, label: string, icon: React.ReactElement, sessionRequired: boolean }[] = [
        { page: 'Dashboard', label: t.dashboard, icon: <BarChart />, sessionRequired: true },
        { page: 'Training', label: t.training, icon: <Brain />, sessionRequired: false },
        { page: 'Sanctuary', label: t.sanctuary, icon: <Mountain />, sessionRequired: true },
        { page: 'Spark', label: t.spark, icon: <Lightbulb />, sessionRequired: false },
        { page: 'Insights', label: t.insights, icon: <TrendingUp />, sessionRequired: true },
        { page: 'Play', label: t.play, icon: <Gamepad2 />, sessionRequired: false },
        { page: 'Mixer', label: t.mixer, icon: <SlidersHorizontal />, sessionRequired: false },
        { page: 'Journal', label: t.journal, icon: <BookMarked />, sessionRequired: false },
        { page: 'Reframe', label: t.reframe, icon: <Repeat />, sessionRequired: false },
        { page: 'Coach', label: t.coach, icon: <BotMessageSquare />, sessionRequired: false },
        { page: 'Team', label: t.team, icon: <Users />, sessionRequired: false },
        { page: 'Data', label: t.data, icon: <Shield />, sessionRequired: false },
    ];
    return navItems.filter(item => !item.sessionRequired || sessionActive);
  }, [sessionActive, lang]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, visibleNavItems.length);
  }, [visibleNavItems]);

  useEffect(() => {
    const activeIndex = visibleNavItems.findIndex(item => item.page === currentPage);
    const activeItemEl = itemRefs.current[activeIndex];

    if (activeItemEl && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = activeItemEl.getBoundingClientRect();
        
        setPillStyle({
            left: `${itemRect.left - navRect.left}px`,
            width: `${itemRect.width}px`,
            opacity: 1,
        });
    } else {
        setPillStyle(current => ({...current, opacity: 0}));
    }
  }, [currentPage, visibleNavItems]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarColor = useMemo(() => {
    if (!user) return '#cccccc';
    const colors = ['#f87171', '#fb923c', '#fbbf24', '#a3e635', '#4ade80', '#34d399', '#22d3ee', '#60a5fa', '#818cf8', '#c084fc', '#f472b6'];
    const charCodeSum = user.email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
  }, [user]);
  
  const NavLink: React.FC<{ page: Page; children: React.ReactNode; icon: React.ReactElement; isMobile?: boolean; refProp?: React.Ref<HTMLButtonElement> }> = ({ page, children, icon, isMobile, refProp }) => {
    const isActive = currentPage === page;
    const label = children as string;
    
    if (isMobile) {
        return (
            <button
                onClick={() => setCurrentPage(page)}
                className="flex flex-col items-center justify-center text-center w-auto flex-1 h-16 rounded-2xl transition-all duration-300 ease-in-out relative group"
                title={label}
                aria-label={label}
            >
                <div className={`relative flex items-center justify-center w-10 h-10 mb-0.5 rounded-full transition-all duration-300
                    ${isActive ? 'bg-[var(--accent-color)]/10' : ''}`}
                >
                    {/* Glowing background for active item */}
                    <div className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive ? 'bg-[var(--accent-color)] opacity-20 blur-md' : 'opacity-0'}`}></div>

                    {/* The Icon */}
                    {React.cloneElement(icon as React.ReactElement<any>, {
                        className: `relative h-6 w-6 transition-colors duration-300 ${isActive ? 'text-[var(--accent-color)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`
                    })}
                </div>

                {/* The label */}
                <span className={`text-[10px] font-bold transition-colors duration-300 ${isActive ? 'text-[var(--accent-color)]' : 'text-[var(--text-secondary)] opacity-80 group-hover:opacity-100'}`}>
                    {children}
                </span>
            </button>
        );
    }

    return (
      <button
        ref={refProp}
        onClick={() => setCurrentPage(page)}
        className={`relative z-10 flex items-center gap-2 rounded-full transition-colors duration-300 px-4 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-color)]
          ${isActive
            ? 'text-white'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
        }
        title={label}
        aria-label={label}
      >
        {React.cloneElement(icon as React.ReactElement<any>, { className: 'h-5 w-5' })}
        <span className="hidden sm:inline">{children}</span>
      </button>
    );
  };

  const MobileNav = () => (
    <nav className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[95vw] max-w-sm card-shadow p-1 flex justify-around items-center z-50 rounded-2xl">
       {visibleNavItems.map(item => (
            <NavLink key={`${item.page}-mobile`} page={item.page} icon={item.icon} isMobile>{item.label}</NavLink>
        ))}
    </nav>
  );

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--border-color)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage(sessionActive ? 'Dashboard' : 'Onboarding')}>
              <Logo size={32} />
              <span className="text-xl sm:text-2xl font-bold accent-gradient-text">
                PongJit
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
                <nav ref={navRef} className="hidden sm:flex items-center space-x-1 bg-[var(--surface-color)] p-1.5 rounded-full relative">
                    <div 
                        className="absolute top-1.5 h-[calc(100%-0.75rem)] rounded-full accent-gradient-bg transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
                        style={pillStyle}
                    />
                    {visibleNavItems.map((item, index) => (
                        <NavLink 
                            key={item.page} 
                            page={item.page} 
                            icon={item.icon}
                            refProp={el => { itemRefs.current[index] = el; }}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
              <div className="relative" ref={dropdownRef}>
                  <button
                      onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center gap-2 rounded-full p-1 pr-3 bg-[var(--surface-color)] hover:bg-gray-200 dark:hover:bg-gray-700/60 transition-colors"
                  >
                      <div style={{ backgroundColor: avatarColor }} className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {user?.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden sm:inline font-semibold text-sm">{user.name}</span>
                      <ChevronDown className={`w-4 h-4 text-[var(--text-secondary)] transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-[90vw] max-w-xs sm:w-64 card-shadow rounded-2xl p-2 z-50">
                          <div className="px-2 py-2">
                            <p className="text-sm font-semibold text-[var(--text-primary)]" role="none">{user.name}</p>
                            <p className="text-xs text-[var(--text-secondary)] truncate" role="none">{user.email}</p>
                          </div>
                          <div className="border-t border-[var(--border-color)] my-2"></div>
                          
                          <div className="px-2 py-1">
                                <label className="text-sm text-[var(--text-secondary)]">Theme</label>
                                <div className="grid grid-cols-5 gap-3 pt-2.5 pb-1">
                                    {themes.map((t) => (
                                        <button
                                            key={t.name}
                                            onClick={() => setTheme(t.name)}
                                            className={`w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center ${
                                                theme === t.name ? 'ring-2 ring-offset-2 ring-[var(--accent-color)] ring-offset-[var(--card-background)]' : ''
                                            }`}
                                            style={{ backgroundColor: t.color, border: `1px solid ${t.borderColor}` }}
                                            title={t.label}
                                            aria-label={`Select ${t.label} theme`}
                                        >
                                          {theme === t.name && <Check className="w-4 h-4 text-white mix-blend-difference"/>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                          <div className="flex items-center justify-between px-2 py-1 mt-1">
                            <label className="text-sm text-[var(--text-secondary)]">Language</label>
                            <select 
                                value={lang} 
                                onChange={(e) => setLang(e.target.value as Language)}
                                className="bg-transparent text-sm font-semibold rounded-md p-1.5 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                            >
                                {languages.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
                            </select>
                          </div>
                          <div className="border-t border-[var(--border-color)] my-2"></div>
                          <button
                            onClick={onLogout}
                            className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg transition-colors"
                          >
                             <LogOut className="h-4 w-4" />
                             <span>Logout</span>
                          </button>
                      </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {currentPage !== 'Onboarding' && <MobileNav />}
    </>
  );
};
