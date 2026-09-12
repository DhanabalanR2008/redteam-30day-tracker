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
  <Analytics days={DAYS} progress={progress} completedDays={completedDays} overallProgress={overallProgress} />
);
