import React, { useState } from 'react';
import type { AppState } from '../types';
import { ExamChecklist, SECTIONS } from '../components/ExamChecklist';
import { DAYS } from '../data/days';
import { Shield } from 'lucide-react';

interface ExamPageProps {
  examChecklist: AppState['examChecklist'];
  progress: AppState['days'];
  onUpdate: (key: string, val: boolean) => void;
}

export const ExamPage: React.FC<ExamPageProps> = ({ examChecklist, progress, onUpdate }) => {
  const [overallConfidence, setOverallConfidence] = useState(5);
  const [strongest, setStrongest] = useState('');
  const [weakest, setWeakest] = useState('');
  const [month2topics, setMonth2topics] = useState('');

  const total = SECTIONS.reduce((s, sec) => s + sec.items.length, 0);
  const score = Object.values(examChecklist).filter(Boolean).length;

  // Suggest strongest/weakest based on average confidence per week
  const weekConfidences = [1, 2, 3, 4].map((w) => {
    const wDays = DAYS.filter((d) => d.week === w && progress.find((p) => p.day === d.day)?.completed);
    const avg = wDays.length > 0
      ? wDays.reduce((s, d) => s + (progress.find((p) => p.day === d.day)?.confidence ?? 0), 0) / wDays.length
      : 0;
    return { week: w, avg };
  });

  const weekNames = ['Linux + Networking', 'Web Application Hacking', 'Advanced Web + API Security', 'Windows + Active Directory'];
  const bestWeek = weekConfidences.reduce((a, b) => (a.avg >= b.avg ? a : b));
  const worstWeek = weekConfidences.reduce((a, b) => (a.avg <= b.avg ? a : b));

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Shield size={32} className="text-green-400" />
        </div>
        <div className="text-xs font-mono text-green-400 uppercase tracking-[0.3em] mb-1">Month 1</div>
        <h1 className="text-2xl font-bold font-mono text-white">RED TEAM EXAM</h1>
        <p className="text-gray-500 text-sm font-mono mt-1">Check each skill you can demonstrate confidently.</p>
      </div>

      <ExamChecklist examChecklist={examChecklist} onChange={onUpdate} />

      {/* Self-assessment */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col gap-4">
        <h2 className="text-sm font-mono text-white font-bold uppercase tracking-wider">Self-Assessment</h2>

        <div>
          <label className="text-xs font-mono text-gray-500 block mb-1">Overall Confidence (1–10)</label>
          <input
            type="range" min={1} max={10} step={1} value={overallConfidence}
            onChange={(e) => setOverallConfidence(Number(e.target.value))}
            className="w-full accent-green-500"
          />
          <div className="text-xs font-mono text-green-400 mt-1">{overallConfidence} / 10</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-mono text-gray-500 block mb-1">Strongest Area</label>
            <input
              value={strongest}
              onChange={(e) => setStrongest(e.target.value)}
              placeholder={weekConfidences[0].avg > 0 ? weekNames[bestWeek.week - 1] : 'e.g. Linux + Networking'}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-green-500"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-gray-500 block mb-1">Weakest Area</label>
            <input
              value={weakest}
              onChange={(e) => setWeakest(e.target.value)}
              placeholder={weekConfidences[0].avg > 0 ? weekNames[worstWeek.week - 1] : 'e.g. Active Directory'}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-gray-500 block mb-1">Recommended Topics for Month 2</label>
          <textarea
            rows={3}
            value={month2topics}
            onChange={(e) => setMonth2topics(e.target.value)}
            placeholder="e.g. Active Directory attacks (Kerberoasting, Pass-the-Hash), Buffer Overflow, Privilege Escalation labs..."
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-green-500 resize-none"
          />
        </div>

        <div className="bg-green-500/5 border border-green-500/20 rounded p-3 text-center">
          <div className="text-xs font-mono text-gray-500 mb-1">MONTH 1 SCORE</div>
          <div className="text-2xl font-bold font-mono text-green-400">{score} / {total}</div>
          <div className="text-xs font-mono text-gray-600 mt-1">{Math.round((score / total) * 100)}% of skills verified</div>
        </div>
      </div>
    </div>
  );
};
