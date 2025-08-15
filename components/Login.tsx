
import React, { useState } from 'react';
import { Mail, User as UserIcon, LogIn, AlertTriangle, Sun, Moon, Facebook, Check } from 'lucide-react';
import type { Language, User } from '../types.ts';
import type { Theme } from '../App.tsx';
import { Logo } from './Logo.tsx';
import { i18n } from '../lib/i18n.ts';

interface LoginProps {
    onLogin: (user: User) => void;
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

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.45c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
);


export const Login: React.FC<LoginProps> = ({ onLogin, lang, setLang, theme, setTheme }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [error, setError] = useState('');
    
    const t = i18n(lang);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        if (!name.trim() || !email.trim()) {
            setError(t.login.error_fill_fields);
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError(t.login.error_invalid_email);
            return;
        }
        if (!consent) {
            setError(t.login.error_consent);
            return;
        }
        onLogin({ name, email });
    };

    const handleSocialLogin = (provider: 'google' | 'facebook') => {
        const user = provider === 'google'
            ? { name: 'Google User', email: 'user@google.com' }
            : { name: 'Facebook User', email: 'user@facebook.com' };
        onLogin(user);
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 animate-fade-in">
            <div className="card-shadow p-8 rounded-3xl max-w-md w-full">
                <div className="mb-6">
                    <Logo size={80} />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-2" dangerouslySetInnerHTML={{ __html: t.login.title }}></h1>
                <p className="text-[var(--text-secondary)] text-md mb-8 max-w-2xl mx-auto font-body">{t.login.subtitle}</p>
                
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-[var(--text-secondary)]">{t.login.name_label}</label>
                        <div className="relative mt-1">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-[var(--surface-color)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none placeholder:text-[var(--text-secondary)]/60"
                                placeholder={t.login.name_placeholder}
                                required
                            />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="email" className="text-sm font-medium text-[var(--text-secondary)]">{t.login.email_label}</label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-[var(--surface-color)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none placeholder:text-[var(--text-secondary)]/60"
                                placeholder={t.login.email_placeholder}
                                required
                            />
                        </div>
                    </div>
                     <div className="pt-2">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="consent"
                                    aria-describedby="consent-description"
                                    name="consent"
                                    type="checkbox"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    className="focus:ring-violet-500 h-4 w-4 text-violet-600 border-[var(--border-color)] rounded bg-[var(--surface-color)]"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="consent" className="font-body text-[var(--text-secondary)]">
                                    {t.login.consent_label}
                                </label>
                            </div>
                        </div>
                    </div>
                    {error && <p className="text-red-500 dark:text-red-400 text-xs flex items-center pt-2"><AlertTriangle className="w-4 h-4 mr-1"/>{error}</p>}
                    <button type="submit" className="btn accent-gradient-bg text-white w-full !mt-6">
                        <LogIn className="w-5 h-5 mr-2" />
                        {t.login.continue_button}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-[var(--border-color)]"></div>
                    <span className="mx-4 text-xs font-semibold text-[var(--text-secondary)]">{t.login.or_divider}</span>
                    <div className="flex-grow border-t border-[var(--border-color)]"></div>
                </div>

                <div className="space-y-3">
                     <button onClick={() => handleSocialLogin('google')} className="btn w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <GoogleIcon />
                        <span className="ml-2">{t.login.google_button}</span>
                    </button>
                    <button onClick={() => handleSocialLogin('facebook')} className="btn w-full bg-[#1877F2] hover:bg-[#166eeb] text-white">
                        <Facebook className="w-5 h-5"/>
                        <span className="ml-2">{t.login.facebook_button}</span>
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <select 
                            value={lang} 
                            onChange={(e) => setLang(e.target.value as Language)}
                            className="bg-[var(--surface-color)] text-[var(--text-primary)] text-xs font-semibold rounded-md p-1.5 border border-[var(--border-color)] focus:ring-2 focus:ring-violet-500 focus:outline-none"
                        >
                            {languages.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
                        </select>
                        <div className="flex items-center gap-2">
                             <span className="text-xs font-semibold text-[var(--text-secondary)]">{t.login.theme_label}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                        {themes.map((th) => (
                           <button
                                key={th.name}
                                onClick={() => setTheme(th.name)}
                                className={`w-full h-8 rounded-lg transition-all duration-200 flex items-center justify-center ${
                                    theme === th.name ? 'ring-2 ring-offset-1 ring-[var(--accent-color)] ring-offset-[var(--card-background)]' : ''
                                }`}
                                style={{ backgroundColor: th.color, border: `1px solid ${th.borderColor}` }}
                                title={th.label}
                                aria-label={`Select ${th.label} theme`}
                           >
                            {theme === th.name && <Check className="w-4 h-4 text-white mix-blend-difference"/>}
                           </button>
                        ))}
                    </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-4 text-center">{t.login.local_storage_note}</p>
            </div>
        </div>
    );
};