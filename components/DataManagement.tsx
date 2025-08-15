
import React, { useState } from 'react';
import type { Language, User, SessionRecord, JournalEntry, ReframeEntry, CustomMix, UserPreferences } from '../types.ts';
import { i18n } from '../lib/i18n.ts';
import { Shield, Download, Trash2, BookMarked, ListChecks, AlertTriangle, CheckCircle, Repeat, SlidersHorizontal, UserCheck } from 'lucide-react';

interface DataManagementProps {
    user: User;
    history: SessionRecord[];
    journalEntries: JournalEntry[];
    reframeEntries: ReframeEntry[];
    customMixes: CustomMix[];
    userPreferences: UserPreferences | null;
    setHistory: React.Dispatch<React.SetStateAction<SessionRecord[]>>;
    setJournalEntries: React.Dispatch<React.SetStateAction<JournalEntry[]>>;
    setReframeEntries: React.Dispatch<React.SetStateAction<ReframeEntry[]>>;
    setCustomMixes: React.Dispatch<React.SetStateAction<CustomMix[]>>;
    setUserPreferences: React.Dispatch<React.SetStateAction<UserPreferences | null>>;
    lang: Language;
}

export const DataManagement: React.FC<DataManagementProps> = ({ user, history, journalEntries, reframeEntries, customMixes, userPreferences, setHistory, setJournalEntries, setReframeEntries, setCustomMixes, setUserPreferences, lang }) => {
    const t = i18n(lang).data;
    const [deleted, setDeleted] = useState(false);

    const handleDownload = () => {
        const data = {
            sessionHistory: history,
            journalEntries: journalEntries,
            reframeEntries: reframeEntries,
            customMixes: customMixes,
            userPreferences: userPreferences
        };
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `pongjit_data_${user.email}.json`;
        link.click();
    };

    const handleDelete = () => {
        if (window.confirm(t.deleteConfirm)) {
            setHistory([]);
            setJournalEntries([]);
            setReframeEntries([]);
            setCustomMixes([]);
            setUserPreferences(null);
            
            // Clear from localStorage
            localStorage.removeItem(`pongjit_history_${user.email}`);
            localStorage.removeItem(`pongjit_journal_${user.email}`);
            localStorage.removeItem(`pongjit_reframe_${user.email}`);
            localStorage.removeItem(`pongjit_mixes_${user.email}`);
            localStorage.removeItem(`pongjit_preferences_${user.email}`);

            setDeleted(true);
        }
    };

    const hasData = history.length > 0 || journalEntries.length > 0 || reframeEntries.length > 0 || !!userPreferences;

    return (
        <div className="animate-fade-in space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                <Shield className="h-16 w-16 mx-auto accent-gradient-text mb-4" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">{t.title}</h1>
                <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mt-2 font-body">
                    {t.description}
                </p>
            </div>
            
            {deleted && (
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg flex items-center justify-center gap-2" role="alert">
                  <CheckCircle className="h-5 w-5"/>
                  <strong className="font-bold">{t.deleteSuccess}</strong>
                </div>
            )}

            <div className="bg-[var(--card-background)] p-6 md:p-8 rounded-3xl card-shadow space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{t.dataStoredTitle}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-[var(--surface-color)] p-4 rounded-xl flex items-center gap-4">
                            <ListChecks className="h-8 w-8 text-violet-500"/>
                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">{t.sessions}</p>
                                <p className="text-2xl font-bold text-[var(--text-primary)]">{history.length}</p>
                            </div>
                        </div>
                         <div className="bg-[var(--surface-color)] p-4 rounded-xl flex items-center gap-4">
                            <BookMarked className="h-8 w-8 text-sky-500"/>
                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">{t.journalEntries}</p>
                                <p className="text-2xl font-bold text-[var(--text-primary)]">{journalEntries.length}</p>
                            </div>
                        </div>
                         <div className="bg-[var(--surface-color)] p-4 rounded-xl flex items-center gap-4">
                            <Repeat className="h-8 w-8 text-emerald-500"/>
                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">{t.reframeEntries}</p>
                                <p className="text-2xl font-bold text-[var(--text-primary)]">{reframeEntries.length}</p>
                            </div>
                        </div>
                         <div className="bg-[var(--surface-color)] p-4 rounded-xl flex items-center gap-4">
                            <SlidersHorizontal className="h-8 w-8 text-pink-500"/>
                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">{t.customMixes}</p>
                                <p className="text-2xl font-bold text-[var(--text-primary)]">{customMixes.length}</p>
                            </div>
                        </div>
                         <div className="bg-[var(--surface-color)] p-4 rounded-xl flex items-center gap-4">
                            <UserCheck className="h-8 w-8 text-indigo-500"/>
                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">{t.userPreferences}</p>
                                <p className="text-2xl font-bold text-[var(--text-primary)]">{userPreferences ? 1 : 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                     <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{t.actionsTitle}</h2>
                     <div className="space-y-4">
                        <div className="bg-[var(--surface-color)] p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="font-semibold text-[var(--text-primary)]">{t.downloadButton}</p>
                                <p className="text-sm text-[var(--text-secondary)] font-body">{t.downloadDescription}</p>
                            </div>
                             <button
                                onClick={handleDownload}
                                disabled={!hasData}
                                className="btn w-full sm:w-auto flex-shrink-0 bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-50"
                            >
                                <Download className="h-5 w-5 mr-2"/>
                                {t.downloadButton}
                            </button>
                        </div>
                     </div>
                </div>
                 <div className="border-t border-red-200 dark:border-red-800/50 pt-6">
                     <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2 mb-2"><AlertTriangle/>{t.deleteTitle}</h2>
                     <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="font-semibold text-red-800 dark:text-red-300">{t.deleteButton}</p>
                            <p className="text-sm text-red-700 dark:text-red-300/80 font-body">{t.deleteDescription}</p>
                        </div>
                        <button
                            onClick={handleDelete}
                            disabled={!hasData}
                            className="btn w-full sm:w-auto flex-shrink-0 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                        >
                            <Trash2 className="h-5 w-5 mr-2"/>
                            {t.deleteButton}
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};