import React, { useState, useEffect } from 'react';
import type { DayDefinition, DayProgress } from '../types';
import { ConfidenceSlider } from './ConfidenceSlider';
import {
  X, CheckCircle2, Clock, BookOpen, ShieldAlert,
  AlertTriangle, CheckSquare, Square, Award,
  Terminal, Copy, Check, Sparkles
} from 'lucide-react';
import { triggerCelebration, playAudioBeep } from '../utils/confetti';

interface DayModalProps {
  day: DayDefinition | null;
  progress?: DayProgress;
  isOpen: boolean;
  onClose: () => void;
  onSave: (dayNumber: number, progress: Partial<DayProgress>) => void;
}

const CHECKLIST_LABELS: { key: keyof DayProgress['checklist']; label: string }[] = [
  { key: 'learnedConcept', label: 'Understood core concept & architecture thoroughly' },
  { key: 'completedPractical', label: 'Executed hands-on practical mission in lab' },
  { key: 'canReproduce', label: 'Can independently reproduce steps without guidance' },
  { key: 'canExplain', label: 'Can explain the attack/defense mechanism in interview format' },
  { key: 'wroteNotes', label: 'Logged detailed findings, cheatsheet commands & key takeaways' },
];

export const DayModal: React.FC<DayModalProps> = ({ day, progress, isOpen, onClose, onSave }) => {
  if (!isOpen || !day) return null;

  const [hours, setHours] = useState(progress?.hours || 0);
  const [labs, setLabs] = useState(progress?.labs || 0);
  const [confidence, setConfidence] = useState(progress?.confidence || 5);
  const [notes, setNotes] = useState(progress?.notes || '');
  const [checklist, setChecklist] = useState<DayProgress['checklist']>(
    progress?.checklist || {
      learnedConcept: false,
      completedPractical: false,
      canReproduce: false,
      canExplain: false,
      wroteNotes: false,
    }
  );
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (day && progress) {
      setHours(progress.hours || 0);
      setLabs(progress.labs || 0);
      setConfidence(progress.confidence || 5);
      setNotes(progress.notes || '');
      setChecklist(
        progress.checklist || {
          learnedConcept: false,
          completedPractical: false,
          canReproduce: false,
          canExplain: false,
          wroteNotes: false,
        }
      );
      setError(null);
    }
  }, [day, progress]);

  const toggleChecklist = (key: keyof DayProgress['checklist']) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
    playAudioBeep(580, 'sine', 0.08);
  };

  const handleComplete = () => {
    const allChecked = Object.values(checklist).every(Boolean);
    if (!allChecked) {
      setError('You must complete all 5 daily checklist requirements before marking complete.');
      playAudioBeep(220, 'sawtooth', 0.2);
      return;
    }
    if (hours <= 0) {
      setError('Please log study hours (> 0h) spent on this mission.');
      playAudioBeep(220, 'sawtooth', 0.2);
      return;
    }

    onSave(day.day, {
      completed: true,
      hours,
      labs,
      confidence,
      notes,
      checklist,
    });

    triggerCelebration();
    playAudioBeep(523.25, 'triangle', 0.15);
    setTimeout(() => playAudioBeep(659.25, 'triangle', 0.15), 100);
    setTimeout(() => playAudioBeep(783.99, 'triangle', 0.3), 200);

    onClose();
  };

  const handleSaveDraft = () => {
    onSave(day.day, {
      completed: false,
      hours,
      labs,
      confidence,
      notes,
      checklist,
    });
    playAudioBeep(440, 'sine', 0.1);
    onClose();
  };

  const handleMarkIncomplete = () => {
    onSave(day.day, {
      completed: false,
    });
    onClose();
  };

  const copyBriefing = () => {
    const text = `DAY ${day.day}: ${day.topic}\nTheory: ${day.study}\nPractical: ${day.practical}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel-glow w-full max-w-2xl rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-700/80">
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-start justify-between bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                DAY {day.day} • WEEK {day.week}
              </span>
              {progress?.completed && (
                <span className="font-mono text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Completed
                </span>
              )}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">{day.topic}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyBriefing}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/60 transition-colors"
              title="Copy briefing"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/60 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 text-sm">
          {/* Theory and Practical Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                <BookOpen size={14} />
                <span>Theory & Architecture</span>
              </div>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">{day.study}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
                <ShieldAlert size={14} />
                <span>Practical Lab Mission</span>
              </div>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">{day.practical}</p>
            </div>
          </div>

          {day.isCheckpoint && day.checkpointText && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs font-mono space-y-1">
              <div className="text-amber-400 font-bold flex items-center gap-1.5">
                <Award size={14} />
                <span>MILESTONE TEST / CHECKPOINT</span>
              </div>
              <p className="text-slate-300">{day.checkpointText}</p>
            </div>
          )}

          {/* 5-Step Verification Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare size={14} className="text-emerald-400" />
                <span>Completion Checklist (Required)</span>
              </label>
              <span className="font-mono text-[11px] text-slate-400">
                {checkedCount}/5 Checked
              </span>
            </div>

            <div className="space-y-2">
              {CHECKLIST_LABELS.map(({ key, label }) => (
                <div
                  key={key}
                  onClick={() => toggleChecklist(key)}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    checklist[key]
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <button className="mt-0.5 text-emerald-400">
                    {checklist[key] ? <CheckSquare size={16} /> : <Square size={16} className="text-slate-600" />}
                  </button>
                  <span className="text-xs font-mono select-none leading-relaxed">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Time & Confidence inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <label className="font-mono text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Clock size={14} className="text-emerald-400" />
                <span>Hours Studied (Target: 5h)</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => setHours(5)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl text-xs font-mono font-bold border border-slate-700 whitespace-nowrap transition-colors"
                >
                  +5h Full
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Terminal size={14} className="text-cyan-400" />
                <span>Labs Completed</span>
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={labs}
                onChange={(e) => setLabs(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Confidence Slider */}
          <div className="pt-2">
            <ConfidenceSlider value={confidence} onChange={setConfidence} />
          </div>

          {/* Notes Input */}
          <div className="space-y-2 pt-2">
            <label className="font-mono text-xs font-medium text-slate-300 flex items-center justify-between">
              <span>Personal Notes & Key Commands</span>
              <span className="text-[10px] text-slate-500">Markdown supported</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record commands used (e.g., nmap -sC -sV, burp intruder tricks, credentials found, pain points)..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40 text-red-300 font-mono text-xs flex items-center gap-2">
              <AlertTriangle size={15} className="shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/80 flex flex-wrap items-center justify-between gap-2">
          {progress?.completed ? (
            <button
              onClick={handleMarkIncomplete}
              className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors px-2 py-1"
            >
              Mark Incomplete
            </button>
          ) : (
            <span className="text-[11px] font-mono text-slate-500">
              Auto-saves to browser storage
            </span>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-medium transition-colors border border-slate-700"
            >
              Save Draft
            </button>
            <button
              onClick={handleComplete}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles size={14} />
              <span>{progress?.completed ? 'Update Completed Day' : 'Mark Day Complete'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
