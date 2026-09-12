import React from 'react';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, RadarChart,
  PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import type { DayDefinition, DayProgress } from '../types';
import { WEEKS } from '../data/days';

interface AnalyticsProps {
  allDays: DayDefinition[];
  progress: DayProgress[];
  completedDays: number;
  overallProgress: number;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs font-mono">
        <div className="text-gray-400 mb-1">{label}</div>
        {payload.map((p) => (
          <div key={p.name} className="text-green-400">{p.name}: {p.value}</div>
        ))}
      </div>
    );
  }
  return null;
};

export const Analytics: React.FC<AnalyticsProps> = ({ allDays, progress, completedDays, overallProgress }) => {
  const completedProgress = progress.filter((p) => p.completed);

  // Hours per day (only completed days)
  const hoursData = allDays
    .filter((d) => progress.find((p) => p.day === d.day)?.completed)
    .map((d) => {
      const pr = progress.find((p) => p.day === d.day)!;
      return { name: `D${d.day}`, hours: pr.hours, labs: pr.labs };
    });

  // Confidence progression
  const confidenceData = allDays
    .filter((d) => progress.find((p) => p.day === d.day)?.completed)
    .map((d) => {
      const pr = progress.find((p) => p.day === d.day)!;
      return { name: `D${d.day}`, confidence: pr.confidence };
    });

  // Weekly completion
  const weeklyData = WEEKS.map(({ week, name, days: total }) => {
    const weekDays = allDays.filter((d) => d.week === week);
    const done = weekDays.filter((d) => progress.find((p) => p.day === d.day)?.completed).length;
    return { name: `W${week}`, fullName: name, completed: done, total };
  });

  // Topic-wise confidence (radar)
  const radarData = WEEKS.map(({ week, name }) => {
    const weekDays = allDays.filter((d) => d.week === week);
    const completedWeekDays = weekDays.filter((d) => progress.find((p) => p.day === d.day)?.completed);
    const avgConf = completedWeekDays.length > 0
      ? Math.round(completedWeekDays.reduce((sum, d) => sum + (progress.find((p) => p.day === d.day)?.confidence ?? 0), 0) / completedWeekDays.length)
      : 0;
    return { subject: name.split(' ')[0], confidence: avgConf, fullMark: 10 };
  });

  const avgHours = completedProgress.length > 0
    ? (completedProgress.reduce((s, p) => s + p.hours, 0) / completedProgress.length).toFixed(1)
    : '0';

  const avgConfidence = completedProgress.length > 0
    ? (completedProgress.reduce((s, p) => s + p.confidence, 0) / completedProgress.length).toFixed(1)
    : '0';

  const totalLabs = progress.reduce((s, p) => s + p.labs, 0);

  if (completedDays === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-600 font-mono text-sm">Complete your first day to see analytics.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Days Done', val: `${completedDays}/30` },
          { label: 'Progress', val: `${overallProgress}%` },
          { label: 'Avg Hours/Day', val: `${avgHours}h` },
          { label: 'Avg Confidence', val: `${avgConfidence}/10` },
        ].map(({ label, val }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 font-mono">{label}</div>
            <div className="text-lg font-bold font-mono text-green-400 mt-1">{val}</div>
          </div>
        ))}
      </div>

      {/* Hours chart */}
      {hoursData.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">Hours Studied per Day</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={hoursData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'monospace' }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'monospace' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hours" fill="#22c55e" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Labs chart */}
      {hoursData.length > 0 && totalLabs > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">Labs Completed per Day</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={hoursData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'monospace' }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'monospace' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="labs" fill="#f97316" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Confidence chart */}
      {confidenceData.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">Confidence Progression</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={confidenceData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'monospace' }} />
              <YAxis domain={[0, 10]} tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'monospace' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="confidence" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Weekly completion */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">Weekly Completion</div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'monospace' }} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'monospace' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="completed" fill="#3b82f6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar: topic-wise confidence */}
      {completedDays >= 7 && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">Topic-wise Average Confidence</div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11, fontFamily: 'monospace' }} />
              <Radar name="Confidence" dataKey="confidence" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
