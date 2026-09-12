import React from 'react';
import type { DayDefinition, DayProgress } from '../types';
import { CheckCircle2, Circle, Clock, Flag } from 'lucide-react';

interface DayCardProps {
  day: DayDefinition;
  progress?: DayProgress;
  isToday?: boolean;
  onSelect: (day: number) => void;
}

export const DayCard: React.FC<DayCardProps> = ({ day, progress, isToday, onSelect }) => {
  const isCompleted = progress?.completed;
  const hasCheckedAny = progress?.checklist
    ? Object.values(progress.checklist).some(Boolean)
    : false;
  const isDraft = !isCompleted && ((progress?.hours ?? 0) > 0 || hasCheckedAny);

  return (
    <div
      onClick={() => onSelect(day.day)}
      className={`glass-card rounded-xl p-4 cursor-pointer relative group flex flex-col justify-between min-h-[140px] border transition-all ${
        isToday
          ? 'border-emerald-500/50 bg-emerald-950/20 shadow-lg shadow-emerald-500/10'
          : isCompleted
          ? 'border-emerald-500/30 bg-slate-900/60'
          : isDraft
          ? 'border-amber-500/30 bg-slate-900/60'
          : 'border-slate-800/80 hover:border-slate-700'
      }`}
    >
      {/* Top Meta */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-emerald-400 transition-colors">
            DAY {day.day}
          </span>
          {isToday && (
            <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded bg-emerald-500 text-slate-950">
              TODAY
            </span>
          )}
          {day.isCheckpoint && (
            <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
              <Flag size={9} /> TEST
            </span>
          )}
        </div>

        {isCompleted ? (
          <div className="flex items-center gap-1 text-emerald-400 font-mono text-xs">
            <CheckCircle2 size={16} />
          </div>
        ) : isDraft ? (
          <div className="flex items-center gap-1 text-amber-400 font-mono text-[10px]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>IN PROGRESS</span>
          </div>
        ) : (
          <Circle size={15} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
        )}
      </div>

      {/* Main Topic */}
      <div className="my-2">
        <h4 className="text-xs md:text-sm font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
          {day.topic}
        </h4>
      </div>

      {/* Footer / Stats */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-1">
          <Clock size={11} className={isCompleted ? 'text-emerald-400' : 'text-slate-500'} />
          <span>{progress?.hours ?? 0}h</span>
        </div>

        {progress?.confidence ? (
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-slate-500">Conf:</span>
            <span
              className={`font-bold ${
                progress.confidence >= 8
                  ? 'text-emerald-400'
                  : progress.confidence >= 5
                  ? 'text-amber-400'
                  : 'text-red-400'
              }`}
            >
              {progress.confidence}/10
            </span>
          </div>
        ) : (
          <span className="text-[10px] text-slate-500">W{day.week}</span>
        )}
      </div>
    </div>
  );
};
