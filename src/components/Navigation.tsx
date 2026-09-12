import React from 'react';
import type { Page } from '../types';
import { LayoutDashboard, CalendarDays, BarChart3, Trophy, Settings, ShieldCheck, Flame, Terminal } from 'lucide-react';

interface NavProps {
  page: Page;
  setPage: (p: Page) => void;
  currentStreak?: number;
  overallProgress?: number;
}

const NAV_ITEMS: { id: Page; label: string; tag?: string; Icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: 'dashboard', label: 'Command Center', Icon: LayoutDashboard },
  { id: 'plan', label: '30-Day Mission', tag: '4 WEEKS', Icon: CalendarDays },
  { id: 'analytics', label: 'Telemetry & Stats', Icon: BarChart3 },
  { id: 'exam', label: 'Month 1 Exam', tag: 'FINAL', Icon: Trophy },
  { id: 'settings', label: 'Config & Backup', Icon: Settings },
];

export const Navigation: React.FC<NavProps> = ({ page, setPage, currentStreak = 0, overallProgress = 0 }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 glass-panel border-r border-slate-800/80 min-h-screen sticky top-0 z-40 bg-slate-950/80">
        {/* Brand Header */}
        <div className="px-5 py-5 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
              <Terminal size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-emerald-400 font-bold tracking-widest uppercase bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  RED TEAM
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-white font-bold text-sm tracking-tight mt-0.5">30-Day Foundation</div>
            </div>
          </div>
        </div>

        {/* Quick Progress Banner */}
        <div className="px-4 py-3 mx-3 my-3 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Flame size={16} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Streak</div>
              <div className="text-xs font-bold text-white font-mono">{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Overall</div>
            <div className="text-xs font-bold text-emerald-400 font-mono">{overallProgress}%</div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5 p-3 flex-1">
          {NAV_ITEMS.map(({ id, label, tag, Icon }) => {
            const isSelected = page === id;
            return (
              <button
                key={id}
                onClick={() => setPage(id)}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  isSelected
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-950/50 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={17}
                    className={`transition-colors ${
                      isSelected ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{label}</span>
                </div>
                {tag && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      isSelected
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                    }`}
                  >
                    {tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Rules Disclaimer */}
        <div className="p-4 mx-3 mb-4 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-medium mb-1">
            <ShieldCheck size={13} />
            <span>Ethical Lab Notice</span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
            Practice exclusively on authorized lab targets and VMs you own.
          </p>
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-slate-800 flex bg-slate-950/90 backdrop-blur-xl">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isSelected = page === id;
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-medium transition-all ${
                isSelected ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon size={18} className={isSelected ? 'text-emerald-400 scale-110 transition-transform' : 'text-slate-500'} />
              <span className="text-[10px] font-mono truncate max-w-[64px]">{label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
