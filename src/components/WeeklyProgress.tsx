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
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
      <h2 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4">Weekly Progress</h2>
      <div className="flex flex-col gap-5">
        {weeks.map(({ week, name, days: totalDays }) => {
          const weekDays = allDays.filter((d) => d.week === week);
          const completed = weekDays.filter((d) => progress.find((p) => p.day === d.day)?.completed).length;
          const pct = Math.round((completed / totalDays) * 100);
          return (
            <div key={week}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-xs text-green-400 font-mono">WEEK {week}</span>
                  <div className="text-sm text-white font-medium">{name}</div>
                </div>
                <span className="text-sm font-mono text-gray-300">
                  {completed} / {totalDays}
                </span>
              </div>
              <ProgressBar
                value={completed}
                max={totalDays}
                showPercent={false}
                color={pct === 100 ? 'green' : pct >= 50 ? 'orange' : 'red'}
                height="md"
              />
              <div className="mt-1 text-xs text-gray-600 font-mono">{pct}% complete</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
