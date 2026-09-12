import React from 'react';
import type { DayDefinition, DayProgress } from '../types';
import { CheckCircle, Clock, FlaskConical, Target } from 'lucide-react';

interface DailyMissionProps {
  day: DayDefinition | null;
  progress: DayProgress | null;
  onStart: () => void;
}

export const DailyMission: React.FC<DailyMissionProps> = ({ day, progress, onStart }) => {
  if (!day) {
    return (
      <div className="bg-gray-900 border border-green-500/20 rounded-lg p-6 text-center">
        <div className="text-green-400 font-mono text-lg font-bold">🎉 ALL 30 DAYS COMPLETE</div>
        <div className="text-gray-400 text-sm mt-2">MONTH 1 FOUNDATION ESTABLISHED.</div>
      </div>
    );
  }

  const isCompleted = progress?.completed;

  return (
    <div className={`rounded-lg border p-5 ${isCompleted ? 'bg-gray-900 border-green-500/30' : 'bg-gray-900 border-orange-500/30'}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">
            {isCompleted ? '✅ COMPLETED' : "TODAY'S MISSION"}
          </span>
          <div className="text-xs text-gray-500 font-mono mt-0.5">WEEK {day.week} — {day.weekName}</div>
        </div>
        <div className="text-2xl font-bold font-mono text-white">DAY {day.day}</div>
      </div>

      <h3 className="text-white font-semibold text-base mb-2">{day.topic}</h3>

      {!isCompleted && (
        <>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{day.study}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {[
              { icon: Clock, label: 'Learn', val: '1.5 hr' },
              { icon: FlaskConical, label: 'Lab', val: '2 hr' },
              { icon: Target, label: 'Practice', val: '1 hr' },
              { icon: CheckCircle, label: 'Revision', val: '30 min' },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="bg-gray-800 rounded px-2 py-2 flex flex-col items-center gap-0.5">
                <Icon size={14} className="text-green-400" />
                <span className="text-xs text-gray-500 font-mono">{label}</span>
                <span className="text-xs text-white font-mono font-bold">{val}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <button
        onClick={onStart}
        className={`w-full py-2.5 rounded font-mono font-bold text-sm transition-colors ${
          isCompleted
            ? 'bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20'
            : 'bg-orange-500 hover:bg-orange-600 text-black'
        }`}
      >
        {isCompleted ? `EDIT DAY ${day.day} →` : `[ START DAY ${day.day} ]`}
      </button>

      {!isCompleted && (
        <p className="text-xs text-gray-600 font-mono mt-2 text-center">
          ⚠ Practice only on systems you own or have explicit authorization to test.
        </p>
      )}
    </div>
  );
};
