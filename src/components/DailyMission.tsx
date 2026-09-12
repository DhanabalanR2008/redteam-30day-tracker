import React from 'react';
import type { DayDefinition, DayProgress } from '../types';
import { Target, Clock, ShieldAlert, ArrowRight, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

interface DailyMissionProps {
  day: DayDefinition;
  progress?: DayProgress;
  onOpenModal: (dayNumber: number) => void;
}

export const DailyMission: React.FC<DailyMissionProps> = ({ day, progress, onOpenModal }) => {
  const isCompleted = progress?.completed;

  return (
    <div className="glass-panel-glow rounded-2xl p-5 md:p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
              <Target size={13} className="text-emerald-400" />
              TODAY'S MISSION • DAY {day.day}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 font-mono text-xs border border-slate-700/60">
              Week {day.week}
            </span>
          </div>

          {isCompleted ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold">
              <CheckCircle2 size={14} className="text-emerald-400" />
              COMPLETED ({progress.hours}h Logged)
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-medium animate-pulse-subtle">
              <Sparkles size={13} />
              READY TO EXECUTE
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
              {day.topic}
            </h2>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2">
              <div className="flex items-start gap-2 text-xs font-mono text-emerald-300">
                <BookOpen size={14} className="mt-0.5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-slate-400 font-normal">Core Theory: </span>
                  <span className="font-semibold">{day.study}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs font-mono text-cyan-300">
                <ShieldAlert size={14} className="mt-0.5 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-slate-400 font-normal">Practical Lab: </span>
                  <span className="font-semibold">{day.practical}</span>
                </div>
              </div>
            </div>

            {/* Time Split Breakdown */}
            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-400 pt-1">
              <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                <Clock size={11} className="text-emerald-400" /> 1.5h Learn
              </span>
              <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                <Clock size={11} className="text-cyan-400" /> 2h Lab
              </span>
              <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                <Clock size={11} className="text-purple-400" /> 1h Practice
              </span>
              <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                <Clock size={11} className="text-amber-400" /> 30m Review
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => onOpenModal(day.day)}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>{isCompleted ? 'REVIEW MISSION LOG' : 'START DAY ' + day.day + ' MISSION'}</span>
              <ArrowRight size={16} />
            </button>
            <p className="text-[11px] font-mono text-center text-slate-400">
              Target: 5 hours total • Requires checklist verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
