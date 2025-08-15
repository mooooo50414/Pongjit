import React, { useState, useMemo, useCallback, useEffect } from 'react';
import type { SessionRecord, Language, TeamWellnessReport, StressLevel, TeamMember, TeamChallenge } from '../types.ts';
import { i18n } from '../lib/i18n.ts';
import { getTeamWellnessReport, generateAdminMessage, generateChallengeIdeas } from '../services/geminiService.ts';
import { Users, LoaderCircle, AlertTriangle, PieChart as PieChartIcon, BarChart, Trophy, Sparkles, ShieldCheck, Activity, BrainCircuit, TrendingUp, CalendarDays, MessageSquare, Lightbulb, Pencil, X } from 'lucide-react';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip, Legend, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface TeamWellnessProps {
  history: SessionRecord[];
  lang: Language;
}

// --- Data Processing Helpers ---
const stressValueMap: { [key in StressLevel]: number } = { Low: 1, Medium: 2, High: 3 };

const calculateKpis = (history: SessionRecord[], lang: Language) => {
    const t = i18n(lang);
    if (history.length === 0) {
        return {
            morale: t.team.kpis.morale_levels.medium,
            moraleColor: 'text-yellow-500',
            avgStress: 'N/A',
            topActivity: 'N/A',
            activeUsers: 0,
        };
    }
    const totalStress = history.reduce((sum, s) => sum + stressValueMap[s.bioData.stressLevel], 0);
    const avgStressValue = totalStress / history.length;
    const avgStressName = t.bioSimulator[avgStressValue < 1.7 ? 'low' : avgStressValue < 2.3 ? 'medium' : 'high'];

    let morale, moraleColor;
    if (avgStressValue < 1.5) {
        morale = t.team.kpis.morale_levels.high;
        moraleColor = 'text-green-500';
    } else if (avgStressValue < 2.5) {
        morale = t.team.kpis.morale_levels.medium;
        moraleColor = 'text-yellow-500';
    } else {
        morale = t.team.kpis.morale_levels.low;
        moraleColor = 'text-red-500';
    }

    const activityCounts = history.reduce((acc, s) => {
        acc[s.activity] = (acc[s.activity] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topActivity = Object.entries(activityCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    
    // As this is a single-user demo, we simulate a contributor count
    const activeUsers = history.length > 0 ? Math.min(5, history.length) : 0;

    return { morale, moraleColor, avgStress: avgStressName, topActivity, activeUsers };
};


const calculateStressDistribution = (history: SessionRecord[], lang: Language) => {
    const stressCounts = history.reduce((acc, s) => {
        acc[s.bioData.stressLevel] = (acc[s.bioData.stressLevel] || 0) + 1;
        return acc;
    }, {} as Record<StressLevel, number>);

    const PIE_COLORS = { Low: '#22c55e', Medium: '#f59e0b', High: '#ef4444' };
    return Object.entries(stressCounts).map(([name, value]) => ({
        name: i18n(lang).bioSimulator[name.toLowerCase() as 'low' | 'medium' | 'high'],
        value,
        color: PIE_COLORS[name as StressLevel],
    }));
};

const calculateActivityStress = (history: SessionRecord[]) => {
    const activityData = history.reduce((acc, record) => {
        if (!acc[record.activity]) {
            acc[record.activity] = { totalStress: 0, count: 0 };
        }
        acc[record.activity].totalStress += stressValueMap[record.bioData.stressLevel];
        acc[record.activity].count++;
        return acc;
    }, {} as Record<string, { totalStress: number; count: number }>);

    return Object.entries(activityData)
        .map(([name, data]) => ({ name, avgStress: data.totalStress / data.count }))
        .sort((a, b) => b.avgStress - a.avgStress);
};

const calculateSessionsByDay = (history: SessionRecord[], lang: Language) => {
    const dayCounts = i18n(lang).team.charts.day_names.map(name => ({ name, sessions: 0 }));
    history.forEach(s => {
        const dayIndex = new Date(s.timestamp).getDay();
        dayCounts[dayIndex].sessions++;
    });
    return dayCounts;
};

// --- Main Component ---
export const TeamWellness: React.FC<TeamWellnessProps> = ({ history, lang }) => {
  const t = i18n(lang).team;
  const [report, setReport] = useState<TeamWellnessReport | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  
  const [activeChallenge, setActiveChallenge] = useState<TeamChallenge | null>(null);

  const totalSessions = history.length;
  
  const handleGenerateReport = useCallback(async () => {
    if (totalSessions === 0) return;
    setIsLoadingReport(true);
    setReportError(null);
    try {
        const result = await getTeamWellnessReport(history, lang);
        setReport(result);
        if(!activeChallenge) setActiveChallenge(result.challenge);
    } catch (e) {
        console.error(e);
        setReportError(t.error);
    } finally {
        setIsLoadingReport(false);
    }
  }, [history, lang, t.error, totalSessions, activeChallenge]);

  // Generate initial report on load if there's history
  useEffect(() => {
    if(history.length > 0 && !report){
        handleGenerateReport();
    }
  }, [history, report, handleGenerateReport]);

  const kpis = useMemo(() => calculateKpis(history, lang), [history, lang]);
  const stressDistributionData = useMemo(() => calculateStressDistribution(history, lang), [history, lang]);
  const activityStressData = useMemo(() => calculateActivityStress(history), [history, lang]);
  const sessionsByDayData = useMemo(() => calculateSessionsByDay(history, lang), [history, lang]);
  
  const challengeProgress = totalSessions > 0 && activeChallenge ? Math.min(100, (totalSessions / activeChallenge.goal) * 100) : 0;
  
  const simulatedTeam: TeamMember[] = useMemo(() => {
    if (history.length === 0) return [];
    
    const userNames = ['Alex Smith', 'Brenda Lee', 'Carlos Ray', 'Diana Prince', 'Ethan Hunt'];
    const stressLevels: StressLevel[] = ['Low', 'Medium', 'High'];

    return userNames.map((name, index) => {
        const lastSession = history[index % history.length];
        return {
            id: (1001 + index).toString(),
            name,
            email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
            lastActivity: lastSession.activity,
            lastActivityDate: new Date(lastSession.timestamp).toLocaleDateString(),
            currentStress: lastSession?.bioData.stressLevel || stressLevels[Math.floor(Math.random() * stressLevels.length)] 
        };
    });
  }, [history]);
  
  if (totalSessions < 3) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
             <Users className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
             <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t.title}</h1>
             <p className="text-lg text-[var(--text-secondary)] mt-2">{t.no_data}</p>
        </div>
      );
  }

  const kpiCards = [
      { label: t.kpis.morale, value: kpis.morale, icon: <BrainCircuit className={kpis.moraleColor} />, color: kpis.moraleColor },
      { label: t.kpis.avg_stress, value: kpis.avgStress, icon: <TrendingUp className="text-orange-500" /> },
      { label: t.kpis.top_activity, value: kpis.topActivity, icon: <Activity className="text-blue-500" /> },
      { label: t.kpis.active_users, value: kpis.activeUsers, icon: <Users className="text-indigo-500" /> },
  ]
  
  const StatusBubble:React.FC<{stress: StressLevel}> = ({stress}) => {
      const stressMap = {
          Low: { text: t.roster.status_low, color: 'bg-green-500' },
          Medium: { text: t.roster.status_medium, color: 'bg-yellow-500' },
          High: { text: t.roster.status_high, color: 'bg-red-500' },
      }
      return <span className={`flex items-center gap-1.5 text-xs font-medium text-white px-2 py-0.5 rounded-full ${stressMap[stress].color}`}>
          <span className={`h-1.5 w-1.5 rounded-full bg-white`}></span>
          {stressMap[stress].text}
      </span>
  }

  return (
    <div className="space-y-8 animate-fade-in">
        {isBroadcastModalOpen && <BroadcastModal lang={lang} report={report} onClose={() => setIsBroadcastModalOpen(false)} />}
        {isChallengeModalOpen && <ChallengeModal lang={lang} onSetChallenge={setActiveChallenge} onClose={() => setIsChallengeModalOpen(false)} />}

        <div className="text-center">
            <Users className="h-16 w-16 mx-auto accent-gradient-text mb-4" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">{t.title}</h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mt-2 font-body">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-[var(--card-background)] p-6 rounded-2xl card-shadow">
                    <h3 className="text-xl font-bold mb-4">{t.roster.title}</h3>
                    <div className="divide-y divide-[var(--border-color)]">
                        {simulatedTeam.map(member => (
                            <div key={member.id} className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-sm text-[var(--text-secondary)]">{member.name.charAt(0)}</div>
                                    <div>
                                        <p className="font-semibold text-[var(--text-primary)]">{member.name}</p>
                                        <p className="text-xs text-[var(--text-secondary)]">{member.email}</p>
                                    </div>
                                </div>
                                <div className="hidden sm:block text-sm text-center">
                                    <p className="font-medium text-[var(--text-primary)]">{member.lastActivity}</p>
                                    <p className="text-xs text-[var(--text-secondary)]">{t.roster.last_active} {member.lastActivityDate}</p>
                                </div>
                                <div>
                                    <StatusBubble stress={member.currentStress} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="bg-[var(--card-background)] p-6 rounded-2xl card-shadow">
                    <h3 className="text-xl font-bold mb-4">{t.communication.title}</h3>
                    <div className="bg-violet-50 dark:bg-gray-800/50 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-[var(--text-secondary)] font-body flex-1">{t.communication.broadcast_prompt.split(',')[0]}</p>
                        <button onClick={() => setIsBroadcastModalOpen(true)} className="btn w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white shrink-0">
                           <MessageSquare className="h-5 w-5 mr-2" /> {t.communication.broadcast_button}
                        </button>
                    </div>
                 </div>
            </div>
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-[var(--card-background)] p-6 rounded-2xl card-shadow">
                     <h3 className="text-xl font-bold mb-4">{t.challenge.title}</h3>
                     {activeChallenge ? (
                         <>
                            <p className="font-bold text-lg text-amber-600 dark:text-amber-400">{activeChallenge.title}</p>
                            <p className="text-xs text-[var(--text-secondary)] font-body mb-3">{activeChallenge.description}</p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${challengeProgress}%` }}></div>
                            </div>
                            <div className="text-xs font-medium text-right text-[var(--text-secondary)] mt-1">{totalSessions} / {activeChallenge.goal} {activeChallenge.unit}</div>
                            <button onClick={() => setIsChallengeModalOpen(true)} className="text-sm font-semibold text-violet-600 hover:underline mt-4 flex items-center gap-1">
                                <Pencil className="w-3 h-3" />
                                {t.challenge.set_new_challenge}
                            </button>
                         </>
                     ) : <p className="text-sm text-gray-500">No active challenge. Set one!</p>}
                </div>
                <div className="bg-[var(--card-background)] p-6 rounded-2xl card-shadow">
                    <h3 className="text-xl font-bold mb-4">{t.kpis.title}</h3>
                     <div className="space-y-4">
                        {kpiCards.map(kpi => (
                            <div key={kpi.label} className="flex items-center gap-3">
                                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-[var(--surface-color)]">{kpi.icon}</div>
                                <div>
                                    <p className="text-xs font-semibold text-[var(--text-secondary)]">{kpi.label}</p>
                                    <p className={`text-lg font-bold ${kpi.color || 'text-[var(--text-primary)]'}`}>{kpi.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 bg-[var(--card-background)] p-6 rounded-2xl card-shadow">
                <h3 className="text-lg font-bold flex items-center mb-4"><PieChartIcon className="w-5 h-5 mr-2 text-sky-500"/>{t.charts.stress_dist}</h3>
                <div style={{ width: '100%', height: 250 }}>
                    <ResponsiveContainer>
                        <RePieChart>
                            <Pie data={stressDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                {stressDistributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: 'var(--card-background)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}/>
                            <Legend iconSize={10} wrapperStyle={{fontSize: "12px", color: 'var(--text-secondary)'}} />
                        </RePieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="lg:col-span-3 bg-[var(--card-background)] p-6 rounded-2xl card-shadow">
                <h3 className="text-lg font-bold flex items-center mb-4"><BarChart className="w-5 h-5 mr-2 text-green-500"/>{t.charts.stress_by_activity}</h3>
                <div style={{ width: '100%', height: 250 }}>
                    <ResponsiveContainer>
                       <ReBarChart data={activityStressData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                            <YAxis domain={[1, 3]} allowDecimals={false} ticks={[1,2,3]} tickFormatter={(v) => i18n(lang).bioSimulator[v === 1 ? 'low' : v === 2 ? 'medium' : 'high']} stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                            <Tooltip cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} contentStyle={{ background: 'var(--card-background)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }} formatter={(value: number) => [value.toFixed(2), "Avg. Stress"]}/>
                            <Bar dataKey="avgStress" fill="var(--accent-color)" radius={[4, 4, 0, 0]} barSize={30} />
                       </ReBarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        <div className="bg-[var(--card-background)] p-6 rounded-2xl card-shadow">
            <h3 className="text-lg font-bold flex items-center mb-4"><CalendarDays className="w-5 h-5 mr-2 text-red-500"/>{t.charts.sessions_by_day}</h3>
            <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                   <ReBarChart data={sessionsByDayData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                        <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                        <YAxis allowDecimals={false} stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                        <Tooltip cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} contentStyle={{ background: 'var(--card-background)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}/>
                        <Bar dataKey="sessions" fill="var(--accent-color)" radius={[4, 4, 0, 0]} />
                   </ReBarChart>
                </ResponsiveContainer>
            </div>
        </div>

         <div className="text-center text-xs text-gray-500 dark:text-gray-600 font-body flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800/30 rounded-lg">
            <ShieldCheck className="h-4 w-4 mr-2 text-green-600"/>
            {t.anonymity}
        </div>
    </div>
  );
};


const BroadcastModal: React.FC<{onClose: () => void, lang: Language, report: TeamWellnessReport | null}> = ({onClose, lang, report}) => {
    const t = i18n(lang).team.communication;
    const [message, setMessage] = useState('');
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleGenerateSuggestion = async () => {
        if(!report) return;
        setIsSuggesting(true);
        try {
            const result = await generateAdminMessage(report.keyObservation, lang);
            setMessage(result);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSuggesting(false);
        }
    }

    const handleSend = () => {
        setIsSent(true);
        setTimeout(() => {
            onClose();
        }, 1500);
    }
    
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast p-4">
            <div className="bg-[var(--card-background)] p-6 rounded-2xl card-shadow max-w-lg w-full m-4 relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"><X /></button>
                <h3 className="text-xl font-bold mb-4">{t.broadcast_title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{t.broadcast_prompt}</p>
                <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full h-32 p-3 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-violet-500"
                    placeholder={t.broadcast_placeholder}
                />
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                     <button onClick={handleGenerateSuggestion} disabled={isSuggesting || !report} className="btn bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--surface-color)] w-full justify-center disabled:opacity-50">
                        {isSuggesting ? <LoaderCircle className="w-5 h-5 mr-2 animate-spin"/> : <Sparkles className="w-5 h-5 mr-2 text-pink-500"/>}
                        {t.generate_suggestion}
                     </button>
                    <button onClick={handleSend} disabled={!message.trim()} className="btn accent-gradient-bg text-white w-full justify-center disabled:opacity-50">
                        {isSent ? t.message_sent : t.send_broadcast}
                    </button>
                </div>
            </div>
        </div>
    )
}

const ChallengeModal: React.FC<{onClose: () => void, lang: Language, onSetChallenge: (c: TeamChallenge) => void}> = ({onClose, lang, onSetChallenge}) => {
    const t = i18n(lang).team.challenge;
    const [ideas, setIdeas] = useState<TeamChallenge[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState<TeamChallenge>({title: '', description: '', goal: 100, unit: 'sessions'});
    
    const handleGenerateIdeas = async () => {
        setIsLoading(true);
        try {
            const result = await generateChallengeIdeas(lang);
            setIdeas(result.ideas);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSave = () => {
        onSetChallenge(selectedChallenge);
        onClose();
    }
    
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast p-4">
            <div className="bg-[var(--card-background)] p-6 rounded-2xl card-shadow max-w-2xl w-full m-4 relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"><X /></button>
                <h3 className="text-xl font-bold mb-4">{t.new_challenge_title}</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-medium">{t.challenge_name}</label>
                        <input type="text" value={selectedChallenge.title} onChange={e => setSelectedChallenge(p => ({...p, title: e.target.value}))} className="w-full mt-1 p-2 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-lg"/>
                     </div>
                     <div>
                        <label className="text-sm font-medium">{t.challenge_desc}</label>
                        <input type="text" value={selectedChallenge.description} onChange={e => setSelectedChallenge(p => ({...p, description: e.target.value}))} className="w-full mt-1 p-2 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-lg"/>
                     </div>
                     <div>
                        <label className="text-sm font-medium">{t.challenge_goal}</label>
                        <input type="number" value={selectedChallenge.goal} onChange={e => setSelectedChallenge(p => ({...p, goal: parseInt(e.target.value, 10) || 0}))} className="w-full mt-1 p-2 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-lg"/>
                     </div>
                     <div>
                        <label className="text-sm font-medium">{t.challenge_unit}</label>
                        <input type="text" value={selectedChallenge.unit} onChange={e => setSelectedChallenge(p => ({...p, unit: e.target.value}))} className="w-full mt-1 p-2 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-lg"/>
                     </div>
                 </div>

                 <div className="border-t border-[var(--border-color)] my-4 pt-4">
                     <button onClick={handleGenerateIdeas} disabled={isLoading} className="text-sm font-semibold text-violet-600 hover:underline flex items-center gap-2 disabled:opacity-50">
                         {isLoading ? <><LoaderCircle className="w-4 h-4 animate-spin"/>{t.generating_ideas}</> : <><Lightbulb className="w-4 h-4"/>{t.generate_ideas}</>}
                     </button>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                        {ideas.map(idea => (
                            <button key={idea.title} onClick={() => setSelectedChallenge(idea)} className="p-3 text-left bg-[var(--surface-color)] rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/50">
                                <p className="font-bold text-sm">{idea.title}</p>
                                <p className="text-xs text-[var(--text-secondary)]">{idea.description}</p>
                            </button>
                        ))}
                     </div>
                 </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="btn bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-color)]">{t.cancel}</button>
                    <button onClick={handleSave} disabled={!selectedChallenge.title} className="btn accent-gradient-bg text-white disabled:opacity-50">{t.save_challenge}</button>
                </div>
            </div>
        </div>
    )
}