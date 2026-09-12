import React, { useState } from 'react';
import type { AppState } from '../types';
import {
  RotateCcw, Plus, Minus, AlertTriangle,
  Download, Upload, Shield, CheckCircle2,
  Database, Trophy, Flag, Sparkles
} from 'lucide-react';
import { playAudioBeep, triggerCelebration } from '../utils/confetti';

interface SettingsPageProps {
  state: AppState;
  ctfs: number;
  projects: number;
  onUpdateGlobal: (data: Partial<AppState>) => void;
  onReset: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  state,
  ctfs,
  projects,
  onUpdateGlobal,
  onReset,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  const completedDays = state.days.filter((d) => d.completed).length;
  const totalHours = state.days.reduce((acc, d) => acc + (d.hours || 0), 0);

  // Backup Export
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `redteam-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    playAudioBeep(660, 'sine', 0.15);
  };

  // Restore Import
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportSuccess(null);
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && Array.isArray(parsed.days)) {
          onUpdateGlobal(parsed);
          setImportSuccess('Successfully restored your progress backup!');
          triggerCelebration();
        } else {
          setImportError('Invalid backup file format.');
        }
      } catch {
        setImportError('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            SYSTEM CONFIGURATION
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Settings & Data Management
        </h1>
        <p className="text-xs font-mono text-slate-400">
          Manage CTF machines rooted, export encrypted training logs, and configure local persistence.
        </p>
      </div>

      {/* Manual Counters: CTFs and Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Flag size={14} className="text-rose-400" />
                <span>CTF Machines Rooted</span>
              </h3>
              <p className="text-[11px] font-mono text-slate-400">HTB, THM, Proving Grounds</p>
            </div>
            <span className="text-2xl font-mono font-bold text-white">{ctfs}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onUpdateGlobal({ ctfs: Math.max(0, ctfs - 1) });
                playAudioBeep(330, 'sine', 0.1);
              }}
              className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl font-mono text-xs border border-slate-700 flex items-center justify-center gap-1 transition-colors"
            >
              <Minus size={14} /> Decrement
            </button>
            <button
              onClick={() => {
                onUpdateGlobal({ ctfs: ctfs + 1 });
                playAudioBeep(660, 'sine', 0.1);
              }}
              className="flex-1 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-xl font-mono text-xs font-bold border border-rose-500/30 flex items-center justify-center gap-1 transition-colors"
            >
              <Plus size={14} /> Rooted +1
            </button>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy size={14} className="text-yellow-400" />
                <span>Major Projects Finished</span>
              </h3>
              <p className="text-[11px] font-mono text-slate-400">Cheat sheets & automated tools</p>
            </div>
            <span className="text-2xl font-mono font-bold text-white">{projects}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onUpdateGlobal({ projects: Math.max(0, projects - 1) });
                playAudioBeep(330, 'sine', 0.1);
              }}
              className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl font-mono text-xs border border-slate-700 flex items-center justify-center gap-1 transition-colors"
            >
              <Minus size={14} /> Decrement
            </button>
            <button
              onClick={() => {
                onUpdateGlobal({ projects: projects + 1 });
                playAudioBeep(660, 'sine', 0.1);
              }}
              className="flex-1 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded-xl font-mono text-xs font-bold border border-yellow-500/30 flex items-center justify-center gap-1 transition-colors"
            >
              <Plus size={14} /> Project +1
            </button>
          </div>
        </div>
      </div>

      {/* Backup and Restore */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Database size={15} className="text-emerald-400" />
          <span>Data Backup & Portability</span>
        </h3>
        <p className="text-xs font-mono text-slate-400">
          Your training progress is stored locally in your browser storage. Download a JSON backup to transfer between devices or safeguard your history.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportJSON}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Download size={15} />
            <span>Export Backup (.JSON)</span>
          </button>

          <label className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-105">
            <Upload size={15} />
            <span>Import / Restore Backup</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>

        {importSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-400" />
            <span>{importSuccess}</span>
          </div>
        )}

        {importError && (
          <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40 text-red-300 font-mono text-xs flex items-center gap-2">
            <AlertTriangle size={15} className="text-red-400" />
            <span>{importError}</span>
          </div>
        )}
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="glass-panel p-5 rounded-2xl space-y-4 border border-red-500/20 bg-red-950/5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
          <AlertTriangle size={15} />
          <span>Danger Zone</span>
        </div>
        <p className="text-xs font-mono text-slate-400">
          Erase all logged hours ({totalHours}h), completed tasks ({completedDays}/30 days), and reset streaks back to zero.
        </p>

        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw size={14} />
            <span>Reset All 30-Day Progress...</span>
          </button>
        ) : (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 space-y-3">
            <p className="text-xs font-mono text-red-300 font-bold">
              ⚠️ Are you sure? This will permanently erase your 30-day progress history.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onReset();
                  setShowConfirm(false);
                  playAudioBeep(220, 'sawtooth', 0.3);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded-xl shadow-lg transition-colors"
              >
                Yes, Erase & Reset All
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-xl border border-slate-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
