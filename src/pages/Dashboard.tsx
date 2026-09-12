import React, { useState } from 'react';
import { DAYS, WEEKS } from '../data/days';
import type { DayProgress } from '../types';
import { StatCard } from '../components/StatCard';
import { ProgressBar } from '../components/ProgressBar';
import { DailyMission } from '../components/DailyMission';
import { DayCard } from '../components/DayCard';
import { DayModal } from '../components/DayModal';
import { WeeklyProgress } from '../components/WeeklyProgress';
import { Flame, Zap } from 'lucide-react';

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
  onUpdateDay: (p: DayProgress) => void;
}

function getMotivation(pct: number): string {
  if (pct === 100) return 'MONTH 1 COMPLETE. FOUNDATION ESTABLISHED.';
  if (pct >= 80) return 'One final push. The foundation is almost complete.';
  if (pct >= 60) return 'Enumeration is becoming instinct.';
  if (pct >= 40) return "You're learning to think like an attacker.";
  if (pct >= 20) return 'Your fundamentals are becoming dangerous.';
  return 'Recon begins with discipline.';
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress, ctfs, projects, completedDays, totalHours, totalLabs,
  overallProgress, currentStreak, longestStreak, onUpdateDay,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Current = first incomplete day
  const currentDayDef = DAYS.find((d) => !progress.find((p) => p.day === d.day)?.completed) ?? null;
  const todayProgress = currentDayDef ? progress.find((p) => p.day === currentDayDef.day)! : null;

  const selectedDef = selectedDay !== null ? DAYS.find((d) => d.day === selectedDay) : null;
  const selectedProgress = selectedDay !== null ? progress.find((p) => p.day === selectedDay)! : null;

  const motivation = getMotivation(overallProgress);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center pt-2">
        <div className="text-xs font-mono text-green-400 tracking-[0.3em] uppercase mb-1">30-Day</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
          RED TEAM CHALLENGE
        </h1>
        <p className="text-gray-500 text-sm mt-1 font-mono italic">
          "Build the foundation. One day. One lab. One skill at a time."
        </p>
      </div>

      {/* Motivation banner */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-center">
        <span className="text-green-400 font-mono text-sm">{motivation}</span>
      </div>

      {/* Today's Mission */}
      <div>
        <div className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-2">
          {currentDayDef ? `▶ Today's Mission` : '✅ Challenge Complete'}
        </div>
        <DailyMission
          day={currentDayDef}
          progress={todayProgress}
          onStart={() => currentDayDef && setSelectedDay(currentDayDef.day)}
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <StatCard label="Days Completed" value={`${completedDays} / 30`} accent="green" />
        <StatCard label="Total Hours" value={`${totalHours.toFixed(1)} / 150`} subtext="target: 5h/day" accent="blue" />
        <StatCard label="Labs Completed" value={totalLabs} accent="orange" />
        <StatCard label="CTFs" value={ctfs} accent="gray" />
        <StatCard label="Projects" value={`${projects} / 1`} accent="gray" />
        <StatCard
          label="Current Streak"
          value={`${currentStreak} days`}
          subtext={currentStreak > 0 ? '🔥 Keep going!' : 'Start your streak'}
          accent={currentStreak > 0 ? 'orange' : 'gray'}
        />
        <StatCard label="Longest Streak" value={`${longestStreak} days`} accent="gray" />
        <StatCard label="Overall Progress" value={`${overallProgress}%`} accent="green" />
      </div>

      {/* Overall progress bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Overall Progress</span>
          <div className="flex items-center gap-2">
            {currentStreak > 0 && (
              <div className="flex items-center gap-1 text-orange-400 font-mono text-xs">
                <Flame size={12} />
                <span>{currentStreak}</span>
              </div>
            )}
            <span className="text-xs font-mono text-green-400">{completedDays} / 30</span>
          </div>
        </div>
        <ProgressBar value={completedDays} max={30} height="lg" color="green" />
        <div className="mt-2 text-xs font-mono text-gray-600">{overallProgress}% complete — {30 - completedDays} days remaining</div>
      </div>

      {/* Weekly progress */}
      <WeeklyProgress weeks={WEEKS} allDays={DAYS} progress={progress} />

      {/* 30-day grid */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-green-400" />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">30-Day Progress Map</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
          {DAYS.map((def) => {
            const prog = progress.find((p) => p.day === def.day)!;
            return (
              <DayCard
                key={def.day}
                def={def}
                progress={prog}
                isCurrent={currentDayDef?.day === def.day}
                onClick={() => setSelectedDay(def.day)}
              />
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedDay !== null && selectedDef && selectedProgress && (
        <DayModal
          def={selectedDef}
          progress={selectedProgress}
          onClose={() => setSelectedDay(null)}
          onSave={(updated) => { onUpdateDay(updated); setSelectedDay(null); }}
        />
      )}
    </div>
  );
};
