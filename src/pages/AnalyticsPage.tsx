import React from 'react';
import { DAYS } from '../data/days';
import type { DayProgress } from '../types';
import { Analytics } from '../components/Analytics';

interface AnalyticsPageProps {
  progress: DayProgress[];
  completedDays: number;
  overallProgress: number;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ progress, completedDays, overallProgress }) => (
  <div className="flex flex-col gap-4">
    <div>
      <h1 className="text-xl font-bold font-mono text-white">Progress Analytics</h1>
      <p className="text-gray-500 text-sm font-mono mt-1">Data from your completed days.</p>
    </div>
    <Analytics allDays={DAYS} progress={progress} completedDays={completedDays} overallProgress={overallProgress} />
  </div>
);
