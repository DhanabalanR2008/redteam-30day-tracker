import React, { useState } from 'react';
import type { AppState } from '../types';
import { RotateCcw, Plus, Minus, AlertTriangle } from 'lucide-react';

interface SettingsPageProps {
  state: AppState;
  ctfs: number;
  projects: number;
  onUpdateGlobal: (u: Partial<Pick<AppState, 'ctfs' | 'projects'>>) => void;
  onReset: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ state, ctfs, projects, onUpdateGlobal, onReset }) => {
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    if (!confirmReset) { setConfirmReset(true); return; }
    onReset();
    setConfirmReset(false);
  };

  const completedCount = state.days.filter((d) => d.completed).length;
  const totalHours = state.days.reduce((s, d) => s + d.hours, 0);
  const totalLabs = state.days.reduce((s, d) => s + d.labs, 0);

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <div>
        <h1 className="text-xl font-bold font-mono text-white">Settings</h1>
        <p className="text-gray-500 text-sm font-mono mt-1">Manage your tracker data and global counters.</p>
      </div>

      {/* Global counters */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col gap-4">
        <h2 className="text-sm font-mono text-white font-bold">Global Counters</h2>

        {[
          { label: 'CTFs Completed', val: ctfs, key: 'ctfs' as const },
          { label: 'Projects Completed', val: projects, key: 'projects' as const },
        ].map(({ label, val, key }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm font-mono text-gray-400">{label}</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateGlobal({ [key]: Math.max(0, val - 1) })}
                className="w-8 h-8 rounded bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-mono text-white font-bold">{val}</span>
              <button
                onClick={() => onUpdateGlobal({ [key]: val + 1 })}
                className="w-8 h-8 rounded bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Data summary */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <h2 className="text-sm font-mono text-white font-bold mb-3">Stored Data Summary</h2>
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          {[
            { label: 'Days Completed', val: completedCount },
            { label: 'Total Hours', val: `${totalHours.toFixed(1)}h` },
            { label: 'Total Labs', val: totalLabs },
            { label: 'CTFs', val: ctfs },
            { label: 'Projects', val: projects },
            { label: 'Longest Streak', val: `${state.longestStreak} days` },
          ].map(({ label, val }) => (
            <div key={label} className="flex justify-between border-b border-gray-800 pb-1">
              <span className="text-gray-500">{label}</span>
              <span className="text-green-400">{val}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 font-mono mt-3">
          All data stored in browser localStorage. No data leaves your device.
        </p>
      </div>

      {/* Legal / disclaimer */}
      <div className="bg-gray-900 border border-orange-500/20 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle size={16} className="text-orange-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-mono text-orange-400 font-bold mb-1">Lab Safety Reminder</div>
            <p className="text-xs text-gray-500 font-mono leading-relaxed">
              This tracker is for personal learning only. All practical activities must be conducted 
              exclusively on systems you own or have explicit written authorization to test. 
              Unauthorized access to computer systems is illegal.
            </p>
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="bg-gray-900 border border-red-500/20 rounded-lg p-4">
        <h2 className="text-sm font-mono text-red-400 font-bold mb-2">Reset Progress</h2>
        <p className="text-xs text-gray-500 font-mono mb-4">
          This will permanently erase all 30 days of progress, hours, labs, notes, and streak data.
        </p>

        {confirmReset && (
          <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mb-3 text-xs font-mono text-red-300">
            ⚠ Are you sure? This will erase your 30-day progress. Click again to confirm.
          </div>
        )}

        <button
          onClick={handleReset}
          className={`flex items-center gap-2 px-4 py-2.5 rounded font-mono text-sm font-bold transition-colors ${
            confirmReset
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400'
          }`}
        >
          <RotateCcw size={14} />
          {confirmReset ? 'CONFIRM RESET — ERASE ALL DATA' : 'Reset Progress'}
        </button>

        {confirmReset && (
          <button
            onClick={() => setConfirmReset(false)}
            className="ml-2 mt-2 text-xs text-gray-500 hover:text-gray-300 font-mono underline"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="text-xs text-gray-700 font-mono text-center">
        30-Day Red Team Tracker — personal learning dashboard
      </div>
    </div>
  );
};
