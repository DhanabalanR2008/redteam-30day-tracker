import React, { useState } from 'react';
import type { AppState } from '../types';
import { ExamChecklist, SECTIONS } from '../components/ExamChecklist';
import {
  Trophy, Copy, Check, Sparkles
} from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { triggerCelebration, playAudioBeep } from '../utils/confetti';

interface ExamPageProps {
  examChecklist: AppState['examChecklist'];
  progress: AppState['days'];
  onUpdate: (key: string, value: boolean) => void;
}

export const ExamPage: React.FC<ExamPageProps> = ({
  examChecklist,
  progress,
  onUpdate,
}) => {
  const [copied, setCopied] = useState(false);
  const [strengths, setStrengths] = useState('');
  const [weaknesses, setWeaknesses] = useState('');

  // Calculate scores
  const allItems = SECTIONS.flatMap((s) => s.items);
  const totalItems = allItems.length;
  const checkedCount = allItems.filter((i) => examChecklist[i.key]).length;
  const readinessPct = Math.round((checkedCount / totalItems) * 100);

  const completedDays = progress.filter((d) => d.completed).length;

  const handleCheckboxToggle = (key: string, val: boolean) => {
    onUpdate(key, val);
    playAudioBeep(val ? 660 : 440, 'sine', 0.08);
    if (checkedCount + (val ? 1 : -1) === totalItems) {
      triggerCelebration();
    }
  };

  const copyAssessmentReport = () => {
    let report = `# 30-Day Red Team Foundation — Month 1 Assessment Report\n\n`;
    report += `**Readiness Score:** ${checkedCount}/${totalItems} (${readinessPct}%)\n`;
    report += `**Days Completed:** ${completedDays}/30\n\n`;

    SECTIONS.forEach((s) => {
      report += `### ${s.title}\n`;
      s.items.forEach((item) => {
        report += `- [${examChecklist[item.key] ? 'x' : ' '}] ${item.label}\n`;
      });
      report += `\n`;
    });

    if (strengths) report += `**Strongest Areas:** ${strengths}\n`;
    if (weaknesses) report += `**Areas for Month 2 Improvement:** ${weaknesses}\n`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    playAudioBeep(880, 'sine', 0.15);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            MONTH 1 EVALUATION
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Red Team Readiness Assessment
        </h1>
        <p className="text-xs font-mono text-slate-400">
          Verify your practical competency across Linux, Networking, Web Exploitation, and Active Directory.
        </p>
      </div>

      {/* Score and Gauge Card */}
      <div className="glass-panel-glow p-5 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-amber-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Overall Operational Readiness
              </h3>
            </div>
            <p className="text-xs font-mono text-slate-400">
              {checkedCount} of {totalItems} core red team skills validated
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyAssessmentReport}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied Report!' : 'Export Report'}</span>
            </button>
          </div>
        </div>

        <ProgressBar
          value={readinessPct}
          height="lg"
          color={
            readinessPct >= 80
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
              : readinessPct >= 50
              ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
              : 'bg-gradient-to-r from-rose-500 to-orange-400'
          }
        />
      </div>

      {/* Sections Checklist */}
      <ExamChecklist
        examChecklist={examChecklist}
        onChange={handleCheckboxToggle}
      />

      {/* Self Assessment Notes */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={15} className="text-cyan-400" />
          <span>Self-Assessment & Month 2 Action Plan</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">Strongest Domain Skills</label>
            <textarea
              rows={3}
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              placeholder="e.g., Fast with Nmap/Linux CLI, solid understanding of Burp Repeater and SQL Injection logic..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">Target Weaknesses for Month 2</label>
            <textarea
              rows={3}
              value={weaknesses}
              onChange={(e) => setWeaknesses(e.target.value)}
              placeholder="e.g., Need more practice with Kerberoasting syntax, Active Directory BloodHound analysis, and SSRF filter bypasses..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
