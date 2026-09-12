import React, { useState } from 'react';
import { DAYS, WEEKS } from '../data/days';
import type { DayProgress } from '../types';
import { DayModal } from '../components/DayModal';
import { ProgressBar } from '../components/ProgressBar';
import {
  Flag, ChevronDown, ChevronUp, CheckCircle2,
  Clock, ArrowRight, Award
} from 'lucide-react';

interface PlanProps {
  progress: DayProgress[];
  onUpdateDay: (dayNumber: number, data: Partial<DayProgress>) => void;
}

const WEEK_CHECKPOINTS: Record<number, string> = {
  1: 'IP → Port → Service → Protocol → Application (End-to-End Enumeration Flow)',
  2: 'Request → Application → Input → Backend → Database/Logic → Response Flow',
  3: 'Vulnerability Matrix: SQLi • XSS • IDOR • SSRF • File Upload • Command Injection',
  4: 'Enterprise Domain Kill Chain: Recon → Initial Foothold → PrivEsc → Lateral Movement → Domain Admin',
};

export const Plan: React.FC<PlanProps> = ({ progress, onUpdateDay }) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | null>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const toggleWeek = (w: number) => {
    setExpandedWeeks((prev) => ({ ...prev, [w]: !prev[w] }));
  };

  const selectedDay = DAYS.find((d) => d.day === selectedDayNumber) || null;
  const selectedProgress = progress.find((p) => p.day === selectedDayNumber);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            ROADMAP BLUEPRINT
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          30-Day Red Team Curriculum
        </h1>
        <p className="text-xs font-mono text-slate-400">
          Structured 4-week progression from fundamental Linux networking to Active Directory enterprise exploitation.
        </p>
      </div>

      {/* 4 Weeks Accordion List */}
      <div className="space-y-4">
        {WEEKS.map((w) => {
          const weekDays = DAYS.filter((d) => d.week === w.week);
          const weekCompleted = weekDays.filter((d) => {
            const p = progress.find((item) => item.day === d.day);
            return p?.completed;
          }).length;
          const weekHours = weekDays.reduce((acc, d) => {
            const p = progress.find((item) => item.day === d.day);
            return acc + (p?.hours || 0);
          }, 0);
          const pct = Math.round((weekCompleted / weekDays.length) * 100);
          const isExpanded = expandedWeeks[w.week];
          const checkpointText = WEEK_CHECKPOINTS[w.week];

          return (
            <div key={w.week} className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 transition-all">
              {/* Week Header */}
              <div
                onClick={() => toggleWeek(w.week)}
                className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      WEEK {w.week}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">• {w.days} Days Curriculum</span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{w.name}</h3>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                  <div className="w-36 md:w-44 space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span>{weekCompleted}/{weekDays.length} Days</span>
                      <span>{weekHours}h</span>
                    </div>
                    <ProgressBar value={pct} height="sm" showPercentage={false} />
                  </div>

                  <button className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Week Content */}
              {isExpanded && (
                <div className="p-4 md:p-5 pt-0 border-t border-slate-800/60 space-y-4 bg-slate-950/40">
                  {/* Checkpoint highlight */}
                  {checkpointText && (
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 font-mono text-xs space-y-1.5 mt-3">
                      <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <Award size={14} />
                        <span>Week {w.week} Core Checkpoint:</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-950 text-emerald-300 border border-slate-800 text-[11px] tracking-wide overflow-x-auto">
                        {checkpointText}
                      </div>
                    </div>
                  )}

                  {/* Day Row Items */}
                  <div className="space-y-2">
                    {weekDays.map((d) => {
                      const p = progress.find((item) => item.day === d.day);
                      const isCompleted = p?.completed;

                      return (
                        <div
                          key={d.day}
                          onClick={() => setSelectedDayNumber(d.day)}
                          className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all gap-2 ${
                            isCompleted
                              ? 'bg-slate-900/60 border-emerald-500/30 hover:border-emerald-500/50'
                              : 'bg-slate-900/30 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                          }`}
                        >
                          <div className="flex items-start sm:items-center gap-3">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                                isCompleted
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {d.day}
                            </div>

                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white text-xs md:text-sm">
                                  {d.topic}
                                </span>
                                {d.isCheckpoint && (
                                  <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                                    <Flag size={9} /> TEST
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] font-mono text-slate-400 line-clamp-1">
                                {d.practical}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                              <Clock size={12} className={isCompleted ? 'text-emerald-400' : 'text-slate-500'} />
                              <span>{p?.hours || 0}h</span>
                            </div>

                            {isCompleted ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono flex items-center gap-1 font-semibold">
                                <CheckCircle2 size={12} /> Done
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[11px] font-mono flex items-center gap-1">
                                View <ArrowRight size={11} />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Day Modal */}
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
