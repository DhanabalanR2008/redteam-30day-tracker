import React from 'react';
import type { DayDefinition, DayProgress } from '../types';
import { CheckCircle, Circle, Flame } from 'lucide-react';

interface DayCardProps {
  def: DayDefinition;
  progress: DayProgress;
  onClick: () => void;
  isCurrent?: boolean;
}

export const DayCard: React.FC<DayCardProps> = ({ def, progress, onClick, isCurrent }) => {
  const { completed, confidence, hours, labs } = progress;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-lg border p-3 transition-all hover:scale-[1.02] ${
        completed
          ? 'bg-green-500/5 border-green-500/30 hover:border-green-500/50'
          : isCurrent
          ? 'bg-orange-500/5 border-orange-500/40 hover:border-orange-500/60'
          : 'bg-gray-900 border-gray-800 hover:border-gray-700'
      }`}
    >
      <div className="flex items-start justify-between gap-1 mb-1.5">
        <div className="flex items-center gap-1.5">
          {completed ? (
            <CheckCircle size={14} className="text-green-400 shrink-0 mt-0.5" />
          ) : isCurrent ? (
            <Flame size={14} className="text-orange-400 shrink-0 mt-0.5" />
          ) : (
            <Circle size={14} className="text-gray-700 shrink-0 mt-0.5" />
          )}
          <span className="text-xs font-mono text-gray-500">DAY {def.day}</span>
        </div>
        <span className="text-xs font-mono text-gray-700">W{def.week}</span>
      </div>

      <div className="text-xs text-white font-medium leading-snug line-clamp-2 mb-2">{def.topic}</div>

      {completed && (
        <div className="flex gap-2 text-xs font-mono text-gray-500">
          {hours > 0 && <span>{hours}h</span>}
          {labs > 0 && <span>{labs} labs</span>}
          {confidence > 0 && (
            <span className={confidence >= 7 ? 'text-green-500' : confidence >= 4 ? 'text-orange-500' : 'text-red-500'}>
              ★{confidence}
            </span>
          )}
        </div>
      )}

      {!completed && isCurrent && (
        <div className="text-xs font-mono text-orange-400">→ Current</div>
      )}
    </button>
  );
};
