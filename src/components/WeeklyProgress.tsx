import React from 'react';
import type { DayDefinition, DayProgress } from '../types';
import { ProgressBar } from './ProgressBar';

interface WeeklyProgressProps {
  weeks: { week: number; name: string; days: number }[];
  allDays: DayDefinition[];
  progress: DayProgress[];
}

export const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ weeks, allDays, progress }) => {
  return (
    <div className="glass-panel rounded-2xl p-5 space-y-4">
      <h2 className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">Weekly Progress Overview</h2>
      <div className="flex flex-col gap-4">
        {weeks.map(({ week, name, days: totalDays }) => {
          const weekDays = allDays.filter((d) => d.week === week);
          const completed = weekDays.filter((d) => progress.find((p) => p.day === d.day)?.completed).length;
          const pct = Math.round((completed / totalDays) * 100);
          return (
            <div key={week} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">WEEK {week}</span>
                  <div className="text-sm text-white font-semibold">{name}</div>
                </div>
                <span className="text-xs font-mono text-slate-300">
                  {completed} / {totalDays} Days ({pct}%)
                </span>
              </div>
              <ProgressBar
                value={completed}
                max={totalDays}
                showPercentage={false}
                color={
                  pct === 100
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : pct >= 50
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                    : 'bg-gradient-to-r from-amber-500 to-orange-400'
                }
                height="sm"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
