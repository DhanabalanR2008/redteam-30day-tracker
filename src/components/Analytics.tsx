import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid, RadarChart,
  PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import type { DayDefinition, DayProgress } from '../types';
import { WEEKS } from '../data/days';
import { Award, Trophy, Zap, Shield, Flame, Target } from 'lucide-react';

export interface AnalyticsProps {
  days: DayDefinition[];
  progress: DayProgress[];
  completedDays: number;
  overallProgress: number;
}

export const Analytics: React.FC<AnalyticsProps> = ({
  days,
  progress,
  completedDays,
  overallProgress,
}) => {
  // Chart 1: Hours by day
  const hoursData = days.map((d) => {
    const p = progress.find((item) => item.day === d.day);
    return {
      day: `D${d.day}`,
      hours: p?.hours || 0,
      target: 5,
    };
  });

  // Chart 2: Labs completed by day
  const labsData = days.map((d) => {
    const p = progress.find((item) => item.day === d.day);
    return {
      day: `D${d.day}`,
      labs: p?.labs || 0,
    };
  });

  // Chart 3: Confidence over time
  const confidenceData = days
    .map((d) => {
      const p = progress.find((item) => item.day === d.day);
      return {
        day: `D${d.day}`,
        confidence: p?.confidence || 0,
      };
    })
    .filter((d) => d.confidence > 0);

  // Chart 4: Weekly completion
  const weeklyData = WEEKS.map((w) => {
    const weekDays = days.filter((d) => d.week === w.week);
    const completed = weekDays.filter((d) => {
      const p = progress.find((item) => item.day === d.day);
      return p?.completed;
    }).length;
    const hours = weekDays.reduce((acc, d) => {
      const p = progress.find((item) => item.day === d.day);
      return acc + (p?.hours || 0);
    }, 0);

    return {
      name: `Week ${w.week}`,
      completed,
      total: weekDays.length,
      percentage: Math.round((completed / weekDays.length) * 100),
      hours,
    };
  });

  // Chart 5: Topic Radar
  const topicData = [
    { subject: 'Linux OS', score: calculateTopicScore(days, progress, [1, 2, 3, 7]) },
    { subject: 'Networking', score: calculateTopicScore(days, progress, [3, 4, 5, 6]) },
    { subject: 'Web Basics', score: calculateTopicScore(days, progress, [8, 9, 10, 11, 12, 13, 14]) },
    { subject: 'Adv Web/API', score: calculateTopicScore(days, progress, [15, 16, 17, 18, 19, 20, 21]) },
    { subject: 'Windows & AD', score: calculateTopicScore(days, progress, [22, 23, 24, 25, 26, 27, 28, 29, 30]) },
  ];

  // Milestones
  const badges = [
    { id: 1, title: 'Linux Novice', desc: 'Complete Week 1', unlocked: completedDays >= 7, icon: Shield },
    { id: 2, title: 'Web Infiltrator', desc: 'Complete Week 2', unlocked: completedDays >= 14, icon: Zap },
    { id: 3, title: 'API Exploiter', desc: 'Complete Week 3', unlocked: completedDays >= 21, icon: Target },
    { id: 4, title: 'Domain Domination', desc: 'Complete Week 4', unlocked: completedDays >= 30, icon: Trophy },
    { id: 5, title: 'Halfway Hero', desc: 'Reach 15 Days', unlocked: completedDays >= 15, icon: Flame },
    { id: 6, title: 'Red Team Operator', desc: 'All 30 Days Finished', unlocked: completedDays === 30, icon: Award },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            PERFORMANCE TELEMETRY
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Progress Analytics & Competency
        </h1>
        <p className="text-xs font-mono text-slate-400">
          Visualized daily study hours, hands-on lab consistency, and domain skill progression.
        </p>
      </div>

      {/* Badges & Milestones */}
      <div className="glass-panel p-5 rounded-2xl space-y-3">
        <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Award size={16} className="text-amber-400" />
          <span>Achievement Milestones</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className={`p-3.5 rounded-xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                  b.unlocked
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-500 opacity-60'
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    b.unlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold font-mono text-white leading-tight">{b.title}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">{b.desc}</div>
                </div>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                    b.unlocked ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {b.unlocked ? 'UNLOCKED' : 'LOCKED'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hours Studied Per Day */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
              Daily Study Hours Logged
            </h3>
            <span className="text-xs font-mono text-emerald-400">Target: 5h</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoursData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="day" stroke="#6b7280" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981', borderRadius: '0.75rem' }}
                  labelStyle={{ color: '#10b981', fontFamily: 'monospace', fontWeight: 'bold' }}
                />
                <Bar dataKey="hours" fill="#10b981" radius={[4, 4, 0, 0]} name="Hours Logged" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Labs Completed Per Day */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
            Hands-on Labs Completed
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={labsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="day" stroke="#6b7280" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#06b6d4', borderRadius: '0.75rem' }}
                  labelStyle={{ color: '#06b6d4', fontFamily: 'monospace', fontWeight: 'bold' }}
                />
                <Bar dataKey="labs" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Labs Done" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confidence Curve */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
            Self-Assessed Confidence Progression (1-10)
          </h3>
          <div className="h-64">
            {confidenceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={confidenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="day" stroke="#6b7280" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                  <YAxis domain={[0, 10]} stroke="#6b7280" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#8b5cf6', borderRadius: '0.75rem' }}
                    labelStyle={{ color: '#8b5cf6', fontFamily: 'monospace', fontWeight: 'bold' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="confidence"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    name="Confidence Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs font-mono text-slate-500">
                Log confidence in your daily missions to populate the trend curve.
              </div>
            )}
          </div>
        </div>

        {/* Topic Skill Radar */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
            Domain Readiness Radar
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={topicData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" tick={{ fontSize: 11, fontFamily: 'monospace' }} />
                <Radar
                  name="Proficiency"
                  dataKey="score"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.4}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981', borderRadius: '0.75rem' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

function calculateTopicScore(days: DayDefinition[], progress: DayProgress[], dayNumbers: number[]) {
  const relevantDays = days.filter((d) => dayNumbers.includes(d.day));
  let totalScore = 0;
  relevantDays.forEach((d) => {
    const p = progress.find((item) => item.day === d.day);
    if (p?.completed) totalScore += 10;
    else if ((p?.hours || 0) > 0) totalScore += 5;
  });
  const maxScore = relevantDays.length * 10;
  return maxScore === 0 ? 0 : Math.round((totalScore / maxScore) * 100);
}
