import React, { useMemo, useState, useCallback } from 'react';
import type { SessionRecord, Language, StressLevel, InsightType, JournalEntry, AdvancedReport } from '../types.ts';
import { i18n } from '../lib/i18n.ts';
import { getWellnessReport, getAdvancedReport } from '../services/geminiService.ts';
import { Calendar, Brain, Trash2, HeartPulse, List, BarChartHorizontal, Activity, FileText, BarChart, TrendingUp, PieChart as PieChartIcon, Clock, LoaderCircle, AlertTriangle, Sparkles, AlertCircle, Users } from 'lucide-react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart as RePieChart, Pie, Cell, Legend } from 'recharts';

interface InsightsProps {
  history: SessionRecord[];
  journalEntries: JournalEntry[];
  setHistory: React.Dispatch<React.SetStateAction<SessionRecord[]>>;
  lang: Language;
}

type Period = '7d' | '30d' | 'all';

const stressValueMap: { [key in StressLevel]: number } = { Low: 1, Medium: 2, High: 3 };
const stressColorMap: { [key in StressLevel]: string } = {
  Low: 'text-green-600 dark:text-green-400',
  Medium: 'text-yellow-600 dark:text-yellow-400',
  High: 'text-red-600 dark:text-red-400'
};
const stressLevelNames = (lang: Language) => ({
    1: i18n(lang).bioSimulator.low,
    2: i18n(lang).bioSimulator.medium,
    3: i18n(lang).bioSimulator.high
});
const PIE_COLORS = ['#38bdf8', '#fbbf24', '#a78bfa', '#34d399'];


// --- DATA PROCESSING HELPERS ---

const filterHistoryByPeriod = (history: SessionRecord[], period: Period): SessionRecord[] => {
    const now = new Date();
    if (period === 'all') return history;
    const days = period === '7d' ? 7 : 30;
    const cutoff = new Date(new Date().setDate(now.getDate() - days));
    return history.filter(r => new Date(r.timestamp) > cutoff);
};

const calculateMetrics = (sessions: SessionRecord[], lang: Language) => {
    if (sessions.length === 0) {
        return {
            totalSessions: 0,
            avgStress: i18n(lang).bioSimulator.low,
            mostProductive: 'N/A',
            mostStressful: 'N/A'
        };
    }

    const totalStressValue = sessions.reduce((sum, r) => sum + stressValueMap[r.bioData.stressLevel], 0);
    const avgStressValue = totalStressValue / sessions.length;

    const activityStress = sessions.reduce((acc, record) => {
        const { activity, bioData } = record;
        if (!acc[activity]) {
            acc[activity] = { totalStress: 0, count: 0 };
        }
        acc[activity].totalStress += stressValueMap[bioData.stressLevel];
        acc[activity].count++;
        return acc;
    }, {} as Record<string, { totalStress: number, count: number }>);

    const avgActivityStress = Object.entries(activityStress).map(([name, data]) => ({
        name,
        avg: data.totalStress / data.count
    })).sort((a, b) => a.avg - b.avg);

    return {
        totalSessions: sessions.length,
        avgStress: stressLevelNames(lang)[Math.round(avgStressValue) as 1 | 2 | 3] || 'N/A',
        mostProductive: avgActivityStress[0]?.name || 'N/A',
        mostStressful: avgActivityStress[avgActivityStress.length - 1]?.name || 'N/A',
    };
};

const processTimeOfDayData = (sessions: SessionRecord[], lang: Language) => {
    const t = i18n(lang).insights.charts.stressByTime;
    const data = { [t.morning]: { total: 0, count: 0 }, [t.afternoon]: { total: 0, count: 0 }, [t.evening]: { total: 0, count: 0 } };
    sessions.forEach(s => {
        const hour = new Date(s.timestamp).getHours();
        const stress = stressValueMap[s.bioData.stressLevel];
        if (hour >= 5 && hour < 12) { // Morning
            data[t.morning].total += stress;
            data[t.morning].count++;
        } else if (hour >= 12 && hour < 18) { // Afternoon
            data[t.afternoon].total += stress;
            data[t.afternoon].count++;
        } else { // Evening
            data[t.evening].total += stress;
            data[t.evening].count++;
        }
    });
    return Object.entries(data).map(([name, { total, count }]) => ({ name, avgStress: count > 0 ? total / count : 0 }));
};


// --- VIEW COMPONENTS ---

const ReportView: React.FC<{ history: SessionRecord[], journalEntries: JournalEntry[], lang: Language }> = ({ history, journalEntries, lang }) => {
    const t = i18n(lang).insights;
    const [period, setPeriod] = useState<Period>('7d');
    const [report, setReport] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [advancedReport, setAdvancedReport] = useState<AdvancedReport | null>(null);
    const [isAdvancedLoading, setIsAdvancedLoading] = useState(false);
    const [advancedError, setAdvancedError] = useState<string | null>(null);

    const filteredHistory = useMemo(() => filterHistoryByPeriod([...history], period), [history, period]);
    const metrics = useMemo(() => calculateMetrics(filteredHistory, lang), [filteredHistory, lang]);
    const timeOfDayData = useMemo(() => processTimeOfDayData(filteredHistory, lang), [filteredHistory, lang]);

    const handleGenerateReport = useCallback(async () => {
        const weeklyHistory = filterHistoryByPeriod([...history], '7d');
        if (weeklyHistory.length === 0) {
            setReport(t.noHistory);
            return;
        }
        setIsLoading(true);
        setError(null);
        setReport(null);
        try {
            const result = await getWellnessReport(weeklyHistory, lang);
            setReport(result);
        } catch (e) {
            console.error(e);
            setError(t.report.error);
        } finally {
            setIsLoading(false);
        }
    }, [history, lang, t]);

    const handleGenerateAdvancedReport = useCallback(async () => {
        if (history.length === 0) return;
        setIsAdvancedLoading(true);
        setAdvancedError(null);
        setAdvancedReport(null);
        try {
            const result = await getAdvancedReport(history, journalEntries, lang);
            setAdvancedReport(result);
        } catch (e) {
            console.error(e);
            setAdvancedError(t.report.error);
        } finally {
            setIsAdvancedLoading(false);
        }
    }, [history, journalEntries, lang, t]);
    
    const riskLevelStyle = (level: 'Low' | 'Medium' | 'High') => {
        switch(level) {
            case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    }

    const metricCards = [
      { label: t.metrics.totalSessions, value: metrics.totalSessions, icon: <List className="text-blue-500"/> },
      { label: t.metrics.avgStress, value: metrics.avgStress, icon: <BarChartHorizontal className="text-orange-500" /> },
      { label: t.metrics.mostProductive, value: metrics.mostProductive, icon: <TrendingUp className="text-green-500"/> },
      { label: t.metrics.mostStressful, value: metrics.mostStressful, icon: <TrendingUp className="text-red-500 rotate-90"/> },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-[var(--card-background)] p-6 rounded-3xl card-shadow">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center">
                    <FileText className="h-6 w-6 mr-3 text-violet-600 dark:text-violet-500" />
                    {t.report.title}
                </h3>
                {report && (
                    <div className="bg-violet-50 dark:bg-violet-900/40 p-4 rounded-xl mb-4 border border-violet-100 dark:border-violet-800">
                         <h4 className="font-bold text-violet-800 dark:text-violet-300 mb-2 flex items-center"><Sparkles className="h-5 w-5 mr-2 text-pink-500"/>{t.report.summaryCardTitle}</h4>
                        <p className="text-gray-700 dark:text-gray-300 font-body whitespace-pre-wrap">{report}</p>
                    </div>
                )}
                 {isLoading && (
                    <div className="flex items-center justify-center p-4 text-gray-600 dark:text-gray-400">
                        <LoaderCircle className="h-5 w-5 animate-spin mr-2"/>
                        {t.report.generating}
                    </div>
                 )}
                 {error && (
                    <div className="flex items-center p-4 text-red-600 bg-red-50 dark:bg-red-900/30 rounded-lg">
                        <AlertTriangle className="h-5 w-5 mr-2"/>
                        {error}
                    </div>
                 )}
                <button onClick={handleGenerateReport} disabled={isLoading} className="btn accent-gradient-bg text-white hover:opacity-90 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center">
                    <Activity className="h-5 w-5 mr-2" />
                    {t.report.generateButton}
                </button>
            </div>
            
             <div className="bg-[var(--card-background)] p-6 rounded-3xl card-shadow">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 sm:mb-0">{t.metrics.title}</h3>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-[var(--text-secondary)] font-body">{t.metrics.period}:</span>
                        <select value={period} onChange={e => setPeriod(e.target.value as Period)} className="bg-[var(--surface-color)] dark:bg-gray-700 rounded-md p-1.5 border border-[var(--border-color)] text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none">
                            <option value="7d">{t.metrics.sevenDays}</option>
                            <option value="30d">{t.metrics.thirtyDays}</option>
                            <option value="all">{t.metrics.allTime}</option>
                        </select>
                    </div>
                </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {metricCards.map(metric => (
                         <div key={metric.label} className="bg-[var(--surface-color)] p-4 rounded-xl flex gap-4 items-center">
                             <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white dark:bg-gray-800">{metric.icon}</div>
                             <div>
                                <div className="text-sm text-[var(--text-secondary)]">{metric.label}</div>
                                <p className="text-lg md:text-xl font-bold text-[var(--text-primary)] mt-1 truncate" title={metric.value.toString()}>{metric.value}</p>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>

            <div className="bg-[var(--card-background)] p-6 rounded-3xl card-shadow">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center">
                    <Brain className="h-6 w-6 mr-3 text-violet-600 dark:text-violet-500" />
                    {t.report.advanced_title}
                </h3>
                {isAdvancedLoading && (
                    <div className="flex items-center justify-center p-4 text-gray-600 dark:text-gray-400">
                        <LoaderCircle className="h-5 w-5 animate-spin mr-2"/>
                        {t.report.generating_advanced}
                    </div>
                )}
                {advancedError && (
                    <div className="flex items-center p-4 text-red-600 bg-red-50 dark:bg-red-900/30 rounded-lg">
                        <AlertTriangle className="h-5 w-5 mr-2"/>{advancedError}
                    </div>
                )}
                {advancedReport && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                        <div className="bg-[var(--surface-color)] p-4 rounded-xl">
                             <h4 className="font-bold text-[var(--text-primary)] flex items-center mb-2">
                                 <AlertCircle className="h-5 w-5 mr-2"/>
                                 {t.report.burnout_risk_title}
                            </h4>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${riskLevelStyle(advancedReport.burnoutRisk.level)}`}>
                                    {t.report.risk_levels[advancedReport.burnoutRisk.level.toLowerCase() as 'low' | 'medium' | 'high']}
                                </span>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] font-body">{advancedReport.burnoutRisk.reason}</p>
                        </div>
                         <div className="bg-[var(--surface-color)] p-4 rounded-xl">
                            <h4 className="font-bold text-[var(--text-primary)] flex items-center mb-2">
                                <Users className="h-5 w-5 mr-2"/>
                                {t.report.comparative_analysis_title}
                            </h4>
                            <p className="text-sm text-[var(--text-secondary)] font-body">{advancedReport.comparativeAnalysis}</p>
                        </div>
                    </div>
                )}
                <button onClick={handleGenerateAdvancedReport} disabled={isAdvancedLoading || history.length < 5} className="mt-4 btn bg-violet-600 text-white hover:bg-violet-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    {t.report.advanced_button}
                </button>
                {history.length < 5 && <p className="text-xs text-gray-500 mt-2">More data is needed for an accurate analysis (5+ sessions required).</p>}
            </div>

            <div className="bg-[var(--card-background)] p-6 rounded-3xl card-shadow">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-violet-600 dark:text-violet-500" />
                    {t.charts.stressByTime.title}
                </h3>
                 {timeOfDayData.some(d => d.avgStress > 0) ? (
                    <div style={{ width: '100%', height: 250 }}>
                        <ResponsiveContainer>
                            <ReBarChart data={timeOfDayData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                <YAxis 
                                    domain={[0, 3]} 
                                    ticks={[1, 2, 3]} 
                                    tickFormatter={(value) => stressLevelNames(lang)[value as 1|2|3]}
                                    stroke="var(--text-secondary)"
                                    tick={{ fill: 'var(--text-secondary)' }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                                    contentStyle={{ background: 'var(--card-background)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}
                                    labelStyle={{ fontWeight: 'bold' }}
                                    formatter={(value: number) => [value > 0 ? value.toFixed(2) : 'N/A', i18n(lang).insights.metrics.avgStress]}
                                />
                                <Bar dataKey="avgStress" fill="var(--accent-color)" radius={[4, 4, 0, 0]} />
                            </ReBarChart>
                        </ResponsiveContainer>
                    </div>
                ) : <div className="h-[250px] flex items-center justify-center text-gray-500">{t.charts.noData}</div>}
            </div>
        </div>
    )
}

const AnalyticsView: React.FC<{ history: SessionRecord[], journalEntries: JournalEntry[], lang: Language }> = ({ history, journalEntries, lang }) => {
    const t = i18n(lang).insights;
    const stressLevels = stressLevelNames(lang);

    const analyticsData = useMemo(() => {
        if (history.length < 1) return null;

        const activityStress = history.reduce((acc, record) => {
            const { activity, bioData } = record;
            if (!acc[activity]) {
                acc[activity] = { totalStress: 0, count: 0 };
            }
            acc[activity].totalStress += stressValueMap[bioData.stressLevel];
            acc[activity].count++;
            return acc;
        }, {} as Record<string, { totalStress: number, count: number }>);
        
        const activityStressChartData = Object.entries(activityStress)
            .map(([name, data]) => ({ name, avgStress: data.totalStress / data.count }))
            .sort((a, b) => b.avgStress - a.avgStress);

        const insightDistribution = history.reduce((acc, record) => {
            const type = record.geminiResponse.insight.type;
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        const insightChartData = Object.entries(insightDistribution).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));
        
        // Life Event Correlation Data
        const stressByDate = new Map<string, number[]>();
        history.forEach(s => {
            const date = s.timestamp.split('T')[0];
            if (!stressByDate.has(date)) stressByDate.set(date, []);
            stressByDate.get(date)!.push(stressValueMap[s.bioData.stressLevel]);
        });
        
        const avgStressByDate = new Map<string, number>();
        stressByDate.forEach((stresses, date) => {
            avgStressByDate.set(date, stresses.reduce((a, b) => a + b, 0) / stresses.length);
        });

        const stressByTag = new Map<string, number[]>();
        journalEntries.forEach(j => {
            if (j.tags && j.tags.length > 0) {
                const date = j.timestamp.split('T')[0];
                const dailyAvgStress = avgStressByDate.get(date);
                if (dailyAvgStress !== undefined) {
                    j.tags.forEach(tag => {
                        if (!stressByTag.has(tag)) stressByTag.set(tag, []);
                        stressByTag.get(tag)!.push(dailyAvgStress);
                    });
                }
            }
        });

        const lifeEventChartData = Array.from(stressByTag.entries()).map(([tag, stresses]) => ({
            name: tag,
            avgStress: stresses.reduce((a, b) => a + b, 0) / stresses.length,
        })).sort((a, b) => b.avgStress - a.avgStress);

        return { activityStressChartData, insightChartData, lifeEventChartData };
    }, [history, journalEntries]);

    if (!analyticsData) {
        return (
            <div className="text-center py-20 bg-[var(--card-background)] rounded-3xl card-shadow">
                <BarChart className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">{t.tabs.analytics}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-body mt-2">{t.noHistory}</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-[var(--card-background)] p-5 rounded-xl card-shadow">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-violet-600 dark:text-violet-500" />
                        {t.charts.stressTrends.title}
                    </h3>
                    {analyticsData.activityStressChartData.length > 0 ? (
                        <div style={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer>
                                <ReBarChart data={analyticsData.activityStressChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                    <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12, width: 80 }} angle={-20} textAnchor="end" />
                                    <YAxis 
                                        domain={[0, 3]} 
                                        ticks={[1, 2, 3]} 
                                        tickFormatter={(value) => stressLevels[value as 1|2|3]}
                                        stroke="var(--text-secondary)"
                                        tick={{ fill: 'var(--text-secondary)' }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                                        contentStyle={{ background: 'var(--card-background)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}
                                        labelStyle={{ fontWeight: 'bold' }}
                                        formatter={(value: number) => [value.toFixed(2), i18n(lang).insights.metrics.avgStress]}
                                    />
                                    <Bar dataKey="avgStress" fill="var(--accent-color)" radius={[4, 4, 0, 0]} />
                                </ReBarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : <div className="h-[250px] flex items-center justify-center text-gray-500">{t.charts.noData}</div>}
                </div>
                <div className="lg:col-span-2 bg-[var(--card-background)] p-5 rounded-xl card-shadow">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center">
                        <PieChartIcon className="mr-2 h-5 w-5 text-violet-600 dark:text-violet-500" />
                        {t.charts.insightDistribution.title}
                    </h3>
                    {analyticsData.insightChartData.length > 0 ? (
                        <div style={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer>
                                <RePieChart>
                                    <Pie
                                        data={analyticsData.insightChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                            const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                            const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                            return (
                                                <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="14">
                                                {`${(percent * 100).toFixed(0)}%`}
                                                </text>
                                            );
                                        }}
                                    >
                                        {analyticsData.insightChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                                        contentStyle={{ background: 'var(--card-background)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}
                                    />
                                    <Legend iconSize={10} wrapperStyle={{fontSize: "12px", color: 'var(--text-secondary)'}}/>
                                </RePieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : <div className="h-[250px] flex items-center justify-center text-gray-500">{t.charts.noData}</div>}
                </div>
            </div>
             <div className="bg-[var(--card-background)] p-5 rounded-xl card-shadow">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center">
                    <BarChart className="mr-2 h-5 w-5 text-violet-600 dark:text-violet-500" />
                    {t.charts.lifeEventCorrelation.title}
                </h3>
                {analyticsData.lifeEventChartData.length > 0 ? (
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                             <ReBarChart data={analyticsData.lifeEventChartData} margin={{ top: 5, right: 20, left: 0, bottom: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} angle={-30} textAnchor="end" interval={0} />
                                <YAxis 
                                    label={{ value: t.charts.lifeEventCorrelation.y_axis_label, angle: -90, position: 'insideLeft', fill: 'var(--text-secondary)', fontSize: 12 }}
                                    domain={[0, 3]} 
                                    ticks={[1, 2, 3]} 
                                    tickFormatter={(value) => stressLevels[value as 1|2|3]}
                                    stroke="var(--text-secondary)"
                                    tick={{ fill: 'var(--text-secondary)' }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                                    contentStyle={{ background: 'var(--card-background)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}
                                    labelStyle={{ fontWeight: 'bold' }}
                                    formatter={(value: number) => [value.toFixed(2), i18n(lang).insights.metrics.avgStress]}
                                />
                                <Bar dataKey="avgStress" fill="var(--accent-color)" radius={[4, 4, 0, 0]} />
                            </ReBarChart>
                        </ResponsiveContainer>
                    </div>
                ) : <div className="h-[300px] flex items-center justify-center text-gray-500">{t.charts.noData}</div>}
             </div>
        </div>
    )
}

const SessionLogView: React.FC<{ history: SessionRecord[], lang: Language }> = ({ history, lang }) => {
    const t = i18n(lang).insights.log;
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const localeMap: Record<Language, string> = { th: 'th-TH', en: 'en-US', es: 'es-ES', ja: 'ja-JP', fr: 'fr-FR', de: 'de-DE', pt: 'pt-PT', ru: 'ru-RU', zh: 'zh-CN', ko: 'ko-KR', hi: 'hi-IN' };
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        };
        return date.toLocaleDateString(localeMap[lang] || 'en-US', options);
    };

    if (history.length === 0) {
        return (
            <div className="text-center py-20 bg-[var(--card-background)] rounded-3xl card-shadow">
                <List className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">{t.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-body mt-2">{i18n(lang).insights.noHistory}</p>
            </div>
        )
    }

    return (
         <div className="space-y-4">
          {history.map((record) => (
            <div key={record.id} className="bg-[var(--card-background)] p-5 rounded-2xl card-shadow">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-3">
                <h3 className="text-xl font-bold text-violet-600 dark:text-violet-400">{record.activity}</h3>
                <p className="text-sm text-[var(--text-secondary)] flex items-center mt-1 sm:mt-0 font-body">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(record.timestamp)}
                </p>
              </div>
              <p className="text-[var(--text-secondary)] italic mb-4 font-body">
                <span className="font-bold not-italic text-[var(--text-primary)]">{t.insight}</span> "{record.geminiResponse.insight.title}: {record.geminiResponse.insight.description}"
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--text-secondary)] border-t border-[var(--border-color)] pt-3">
                  <div className="flex items-center" title="Heart Rate">
                      <HeartPulse className="h-4 w-4 mr-2 text-red-500 dark:text-red-400"/>
                      {record.bioData.heartRate} bpm
                  </div>
                  <div className={`flex items-center font-semibold ${stressColorMap[record.bioData.stressLevel]}`} title="Stress Level">
                      <BarChart className="h-4 w-4 mr-2"/>
                      {(i18n(lang).bioSimulator as any)[record.bioData.stressLevel.toLowerCase()]}
                  </div>
              </div>
            </div>
          ))}
        </div>
    )
}

export const Insights: React.FC<InsightsProps> = ({ history, journalEntries, setHistory, lang }) => {
  const t = i18n(lang).insights;
  const [view, setView] = useState<'report' | 'log' | 'analytics'>('report');

  const handleClearHistory = () => {
    const confirmationText: Record<Language, string> = {
        th: 'คุณแน่ใจหรือไม่ว่าต้องการล้างประวัติทั้งหมด?',
        en: 'Are you sure you want to clear all history?',
        es: '¿Estás seguro de que quieres borrar todo el historial?',
        ja: '本当にすべての履歴を消去しますか？',
        fr: 'Êtes-vous sûr de vouloir effacer tout l\'historique ?',
        de: 'Sind Sie sicher, dass Sie den gesamten Verlauf löschen möchten?',
        pt: 'Tem certeza de que deseja limpar todo o histórico?',
        ru: 'Вы уверены, что хотите очистить всю историю?',
        zh: '您确定要清除所有历史记录吗？',
        ko: '정말로 모든 기록을 삭제하시겠습니까？',
        hi: 'क्या आप वाकई सारा इतिहास साफ़ करना चाहते हैं?',
    };
    if (window.confirm(confirmationText[lang] || confirmationText.en)) {
      setHistory([]);
    }
  };

  const TabButton: React.FC<{tabName: 'report' | 'log' | 'analytics', children: React.ReactNode, icon: React.ReactNode}> = ({ tabName, children, icon }) => (
    <button 
        onClick={() => setView(tabName)} 
        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${view === tabName ? 'bg-white dark:bg-gray-700 text-violet-600 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'}`}
    >
        {icon} <span className="hidden sm:inline">{children}</span>
    </button>
  );

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] flex items-center">
            <Brain className="mr-3 h-8 w-8 text-violet-600 dark:text-violet-500"/>
            {t.title}
        </h2>
        <div className="flex items-center gap-2">
            <div className="p-1 bg-gray-100 dark:bg-gray-800 rounded-xl flex">
                <TabButton tabName='report' icon={<FileText className="w-4 h-4" />}>{t.tabs.report}</TabButton>
                <TabButton tabName='log' icon={<List className="w-4 h-4" />}>{t.tabs.log}</TabButton>
                <TabButton tabName='analytics' icon={<BarChart className="w-4 h-4" />}>{t.tabs.analytics}</TabButton>
            </div>
            {history.length > 0 && (
                <button
                    onClick={handleClearHistory}
                    className="flex items-center bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/50 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-300 font-semibold p-2.5 rounded-lg transition-colors"
                    title={t.clear}
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            )}
        </div>
      </div>
      
      <div className="transition-opacity duration-300">
        {view === 'report' && <ReportView history={history} journalEntries={journalEntries} lang={lang} />}
        {view === 'log' && <SessionLogView history={history} lang={lang} />}
        {view === 'analytics' && <AnalyticsView history={history} journalEntries={journalEntries} lang={lang} />}
      </div>
    </div>
  );
};