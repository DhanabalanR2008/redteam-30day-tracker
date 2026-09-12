import React, { useState, useEffect } from 'react';
import type { DayDefinition, DayProgress } from '../types';
import { ConfidenceSlider } from './ConfidenceSlider';
import { X, AlertTriangle } from 'lucide-react';

interface DayModalProps {
  def: DayDefinition;
  progress: DayProgress;
  onClose: () => void;
  onSave: (p: DayProgress) => void;
}

const CHECKLIST_LABELS = [
  { key: 'learnedConcept' as const, label: 'Learned the concept' },
  { key: 'completedPractical' as const, label: 'Completed the practical task' },
  { key: 'canReproduce' as const, label: 'Can reproduce it without copying' },
  { key: 'canExplain' as const, label: 'Can explain what I did' },
  { key: 'wroteNotes' as const, label: 'Wrote notes' },
];

export const DayModal: React.FC<DayModalProps> = ({ def, progress, onClose, onSave }) => {
  const [local, setLocal] = useState<DayProgress>({ ...progress });
  const [attemptedComplete, setAttemptedComplete] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const allChecked = Object.values(local.checklist).every(Boolean);
  const hasHours = local.hours > 0;
  const canComplete = allChecked && hasHours;

  const handleCheckbox = (key: keyof DayProgress['checklist']) => {
    setLocal((p) => ({ ...p, checklist: { ...p.checklist, [key]: !p.checklist[key] } }));
  };

  const handleComplete = () => {
    if (!canComplete) { setAttemptedComplete(true); return; }
    const updated: DayProgress = {
      ...local,
      completed: true,
      completedAt: new Date().toISOString(),
    };
    onSave(updated);
    onClose();
  };

  const handleSaveDraft = () => {
    onSave(local);
    onClose();
  };

  const handleMarkIncomplete = () => {
    const updated: DayProgress = { ...local, completed: false, completedAt: undefined };
    onSave(updated);
    onClose();
  };

  const missingItems: string[] = [];
  if (!hasHours) missingItems.push('Enter hours studied (> 0)');
  CHECKLIST_LABELS.forEach(({ key, label }) => {
    if (!local.checklist[key]) missingItems.push(label);
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-gray-950 border border-gray-800 rounded-t-2xl sm:rounded-xl w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-950 border-b border-gray-800 px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-green-400 uppercase tracking-widest">WEEK {def.week} — {def.weekName}</div>
            <h2 className="text-white font-bold text-lg">DAY {def.day}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Study */}
          <div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">Study</div>
            <div className="text-white font-semibold text-sm mb-2">{def.topic}</div>
            <p className="text-gray-400 text-sm leading-relaxed">{def.study}</p>
          </div>

          {/* Practical Mission */}
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-4">
            <div className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-2">⚡ Practical Mission</div>
            <p className="text-gray-300 text-sm leading-relaxed">{def.practical}</p>
            {def.isCheckpoint && (
              <div className="mt-3 pt-3 border-t border-orange-500/20">
                <div className="text-xs font-mono text-orange-300">{def.checkpointText}</div>
              </div>
            )}
            <p className="text-xs text-gray-600 font-mono mt-3">
              ⚠ Practice only on systems you own or have explicit authorization to test.
            </p>
          </div>

          {/* Completion Checklist */}
          <div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Completion Requirements</div>
            <div className="flex flex-col gap-2">
              {CHECKLIST_LABELS.map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={local.checklist[key]}
                    onChange={() => handleCheckbox(key)}
                    className="w-4 h-4 accent-green-500 cursor-pointer"
                  />
                  <span className={`text-sm font-mono transition-colors ${local.checklist[key] ? 'text-green-400' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Daily Record */}
          <div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Daily Record</div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-mono text-gray-500 mb-1 block">Hours Studied</label>
                <input
                  type="number"
                  min={0}
                  max={24}
                  step={0.5}
                  value={local.hours || ''}
                  onChange={(e) => setLocal((p) => ({ ...p, hours: Math.max(0, parseFloat(e.target.value) || 0) }))}
                  placeholder="e.g. 4.5"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-gray-500 mb-1 block">Labs Completed</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={local.labs || ''}
                  onChange={(e) => setLocal((p) => ({ ...p, labs: Math.max(0, parseInt(e.target.value) || 0) }))}
                  placeholder="e.g. 3"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-green-500"
                />
              </div>
            </div>

            <ConfidenceSlider
              value={local.confidence}
              onChange={(v) => setLocal((p) => ({ ...p, confidence: v }))}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2 block">Notes & Findings</label>
            <textarea
              rows={5}
              value={local.notes}
              onChange={(e) => setLocal((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Document what you learned, commands used, interesting findings, questions for later..."
              className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-green-500 resize-none"
            />
          </div>

          {/* Validation warning */}
          {attemptedComplete && !canComplete && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex gap-2">
              <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono text-red-400 font-bold mb-1">Cannot mark complete — missing:</div>
                <ul className="text-xs text-red-300 font-mono space-y-0.5">
                  {missingItems.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-2 pb-2">
            {!progress.completed ? (
              <button
                onClick={handleComplete}
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-black font-mono font-bold text-sm rounded transition-colors"
              >
                ✓ COMPLETE DAY {def.day}
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="w-full py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 text-green-400 font-mono font-bold text-sm rounded transition-colors"
              >
                ✓ UPDATE & KEEP COMPLETE
              </button>
            )}

            <button
              onClick={handleSaveDraft}
              className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-mono text-sm rounded transition-colors"
            >
              Save Draft (keep incomplete)
            </button>

            {progress.completed && (
              <button
                onClick={handleMarkIncomplete}
                className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-mono text-sm rounded transition-colors"
              >
                Mark as Incomplete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
