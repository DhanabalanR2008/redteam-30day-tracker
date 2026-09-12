import React, { useState } from 'react';
import { DAYS, WEEKS } from '../data/days';
import type { DayProgress } from '../types';
import { DayModal } from '../components/DayModal';
import { ProgressBar } from '../components/ProgressBar';
import { Flag } from 'lucide-react';

interface PlanProps {
  progress: DayProgress[];
  onUpdateDay: (p: DayProgress) => void;
}

export const Plan: React.FC<PlanProps> = ({ progress, onUpdateDay }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const currentDayDef = DAYS.find((d) => !progress.find((p) => p.day === d.day)?.completed);

  const selectedDef = selectedDay !== null ? DAYS.find((d) => d.day === selectedDay) : null;
  const selectedProgress = selectedDay !== null ? progress.find((p) => p.day === selectedDay)! : null;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-bold font-mono text-white">30-Day Plan</h1>
        <p className="text-gray-500 text-sm font-mono mt-1">Click any day to open details and log progress.</p>
      </div>

      {WEEKS.map(({ week, name, days: totalDays }) => {
        const weekDays = DAYS.filter((d) => d.week === week);
        const completed = weekDays.filter((d) => progress.find((p) => p.day === d.day)?.completed).length;
        const pct = Math.round((completed / totalDays) * 100);

        return (
          <div key={week}>
            {/* Week header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flag size={14} className="text-green-400" />
                <div>
                  <span className="text-xs font-mono text-green-400 uppercase tracking-widest">WEEK {week}</span>
                  <div className="text-white font-semibold text-sm">{name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-gray-400">{completed} / {totalDays} days</div>
                <div className="text-xs font-mono text-gray-600">{pct}%</div>
              </div>
            </div>

            <ProgressBar value={completed} max={totalDays} color={pct === 100 ? 'green' : 'orange'} height="sm" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {weekDays.map((def) => {
                const prog = progress.find((p) => p.day === def.day)!;
                return (
                  <div key={def.day} className="flex flex-col">
                    {/* Expanded card for Plan page */}
                    <button
                      onClick={() => setSelectedDay(def.day)}
                      className={`text-left rounded-lg border p-4 transition-all hover:scale-[1.01] flex flex-col gap-2 ${
                        prog.completed
                          ? 'bg-green-500/5 border-green-500/30 hover:border-green-500/50'
                          : currentDayDef?.day === def.day
                          ? 'bg-orange-500/5 border-orange-500/40 hover:border-orange-500/60'
                          : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-gray-500">DAY {def.day}</span>
                        {prog.completed && <span className="text-xs font-mono text-green-400">✓ DONE</span>}
                        {!prog.completed && currentDayDef?.day === def.day && (
                          <span className="text-xs font-mono text-orange-400">→ CURRENT</span>
                        )}
                        {def.isCheckpoint && <span className="text-xs font-mono text-blue-400">🏁 TEST</span>}
                      </div>
                      <div className="text-sm text-white font-medium leading-snug">{def.topic}</div>
                      <div className="text-xs text-gray-500 leading-relaxed line-clamp-2">{def.study}</div>
                      {prog.completed && (
                        <div className="flex gap-3 text-xs font-mono text-gray-600 mt-1 border-t border-gray-800 pt-2">
                          {prog.hours > 0 && <span>{prog.hours}h studied</span>}
                          {prog.labs > 0 && <span>{prog.labs} labs</span>}
                          <span className={prog.confidence >= 7 ? 'text-green-500' : prog.confidence >= 4 ? 'text-orange-500' : 'text-red-500'}>
                            ★ {prog.confidence}/10
                          </span>
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

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
