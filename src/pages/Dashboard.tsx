import React, { useState, useMemo } from 'react';
import { DAYS } from '../data/days';
import type { DayProgress } from '../types';
import { StatCard } from '../components/StatCard';
import { ProgressBar } from '../components/ProgressBar';
import { DailyMission } from '../components/DailyMission';
import { DayCard } from '../components/DayCard';
import { DayModal } from '../components/DayModal';
import {
  Calendar, Clock, Terminal, Trophy,
  Flame, Flag, Search, Sparkles
} from 'lucide-react';

interface DashboardProps {
  progress: DayProgress[];
  ctfs: number;
  projects: number;
  completedDays: number;
  totalHours: number;
  totalLabs: number;
  overallProgress: number;
  currentStreak: number;
  longestStreak: number;
  onUpdateDay: (dayNumber: number, data: Partial<DayProgress>) => void;
}

const MOTIVATION_QUOTES = [
  "\"The quieter you become, the more you are able to hear.\" — Kali Linux Motto",
  "\"Build the foundation. One day. One lab. One skill at a time.\"",
  "\"In theory, theory and practice are the same. In practice, they are not.\"",
  "\"You don't need to be a wizard to hack, you just need to understand how the system was built.\"",
  "\"Consistency beats intensity. 5 focused hours today compound into red team mastery.\"",
];

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  ctfs,
  projects,
  completedDays,
  totalHours,
  totalLabs,
  overallProgress,
  currentStreak,
  longestStreak,
  onUpdateDay,
}) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'w1' | 'w2' | 'w3' | 'w4' | 'completed' | 'pending'>('all');

  // Find first incomplete day
  const todayDay = useMemo(() => {
    const firstIncomplete = DAYS.find((d) => {
      const p = progress.find((item) => item.day === d.day);
      return !p?.completed;
    });
    return firstIncomplete || DAYS[0];
  }, [progress]);

  const todayProgress = progress.find((p) => p.day === todayDay.day);

  // Filter & search days
  const filteredDays = useMemo(() => {
    return DAYS.filter((d) => {
      const p = progress.find((item) => item.day === d.day);
      const isCompleted = !!p?.completed;

      // Filter check
      if (activeFilter === 'w1' && d.week !== 1) return false;
      if (activeFilter === 'w2' && d.week !== 2) return false;
      if (activeFilter === 'w3' && d.week !== 3) return false;
      if (activeFilter === 'w4' && d.week !== 4) return false;
      if (activeFilter === 'completed' && !isCompleted) return false;
      if (activeFilter === 'pending' && isCompleted) return false;

      // Search check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          d.topic.toLowerCase().includes(query) ||
          d.study.toLowerCase().includes(query) ||
          d.practical.toLowerCase().includes(query) ||
          `day ${d.day}`.includes(query)
        );
      }

      return true;
    });
  }, [progress, activeFilter, searchQuery]);

  const selectedDay = DAYS.find((d) => d.day === selectedDayNumber) || null;
  const selectedProgress = progress.find((p) => p.day === selectedDayNumber);

  const quoteIndex = (completedDays) % MOTIVATION_QUOTES.length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome & Motivational Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-5 rounded-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold">
              OPERATIONAL STATUS: READY
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Red Team Foundation Tracker
          </h1>
          <p className="text-xs font-mono text-slate-400 italic">
            {MOTIVATION_QUOTES[quoteIndex]}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-right">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Target Goal</div>
            <div className="text-xs font-mono font-bold text-white">150 Hours / 30 Days</div>
          </div>
        </div>
      </div>

      {/* Primary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        <StatCard
          title="Days Done"
          value={`${completedDays}/30`}
          subtitle={`${30 - completedDays} days left`}
          icon={Calendar}
          accentColor="text-emerald-400"
          trend={`${overallProgress}%`}
        />
        <StatCard
          title="Total Hours"
          value={`${totalHours}h`}
          subtitle="Target: 150h"
          icon={Clock}
          accentColor="text-cyan-400"
          trend={`${Math.round((totalHours / 150) * 100)}%`}
        />
        <StatCard
          title="Streak"
          value={`${currentStreak}d`}
          subtitle={`Best: ${longestStreak}d`}
          icon={Flame}
          accentColor="text-amber-400"
        />
        <StatCard
          title="Labs Done"
          value={totalLabs}
          subtitle="Hands-on sessions"
          icon={Terminal}
          accentColor="text-purple-400"
        />
        <StatCard
          title="CTF Rooted"
          value={ctfs}
          subtitle="Machines pwned"
          icon={Flag}
          accentColor="text-rose-400"
        />
        <StatCard
          title="Projects"
          value={`${projects}/1`}
          subtitle="Cheat Sheet / Lab"
          icon={Trophy}
          accentColor="text-yellow-400"
        />
      </div>

      {/* Overall Progress Bar */}
      <div className="glass-panel p-4 rounded-2xl space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-semibold flex items-center gap-1.5">
            <Sparkles size={14} className="text-emerald-400" />
            30-Day Master Campaign Progress
          </span>
          <span className="text-emerald-400 font-bold">{completedDays} of 30 Days Completed ({overallProgress}%)</span>
        </div>
        <ProgressBar value={overallProgress} height="md" showPercentage={false} />
      </div>

      {/* Today's Active Mission */}
      <DailyMission
        day={todayDay}
        progress={todayProgress}
        onOpenModal={(d) => setSelectedDayNumber(d)}
      />

      {/* 30-Day Grid Header & Search/Filters */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>30-Day Curriculum Grid</span>
              <span className="text-xs font-mono font-normal text-slate-400">
                ({filteredDays.length} {filteredDays.length === 1 ? 'day' : 'days'} shown)
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">Click any day to launch briefing or update progress</p>
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search topic or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All 30 Days' },
            { id: 'w1', label: 'Week 1: Linux & Net' },
            { id: 'w2', label: 'Week 2: Web App' },
            { id: 'w3', label: 'Week 3: Adv Web & API' },
            { id: 'w4', label: 'Week 4: Windows & AD' },
            { id: 'completed', label: 'Completed' },
            { id: 'pending', label: 'Pending' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                activeFilter === f.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 30-Day Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredDays.map((d) => {
            const p = progress.find((item) => item.day === d.day);
            const isToday = d.day === todayDay.day;
            return (
              <DayCard
                key={d.day}
                day={d}
                progress={p}
                isToday={isToday}
                onSelect={(num) => setSelectedDayNumber(num)}
              />
            );
          })}
        </div>

        {filteredDays.length === 0 && (
          <div className="p-8 text-center glass-panel rounded-2xl text-slate-400 font-mono text-xs space-y-2">
            <p>No days matched your search filter "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Day Modal Dialog */}
      <DayModal
        day={selectedDay}
        progress={selectedProgress}
        isOpen={selectedDayNumber !== null}
        onClose={() => setSelectedDayNumber(null)}
        onSave={onUpdateDay}
      />
    </div>
  );
};
