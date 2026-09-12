import { useState, useCallback, useEffect } from 'react';
import type { AppState, DayProgress } from '../types';

const STORAGE_KEY = 'redteam_tracker_v1';

const defaultDayProgress = (day: number): DayProgress => ({
  day,
  completed: false,
  hours: 0,
  labs: 0,
  confidence: 5,
  notes: '',
  checklist: {
    learnedConcept: false,
    completedPractical: false,
    canReproduce: false,
    canExplain: false,
    wroteNotes: false,
  },
});

const defaultState = (): AppState => ({
  days: Array.from({ length: 30 }, (_, i) => defaultDayProgress(i + 1)),
  ctfs: 0,
  projects: 0,
  examChecklist: {},
  longestStreak: 0,
});

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as AppState;
    // ensure all 30 days exist (migration safety)
    const days = Array.from({ length: 30 }, (_, i) => {
      const existing = parsed.days?.find((d) => d.day === i + 1);
      return existing ?? defaultDayProgress(i + 1);
    });
    return { ...defaultState(), ...parsed, days };
  } catch {
    return defaultState();
  }
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function computeCurrentStreak(days: DayProgress[]): number {
  let streak = 0;
  for (let i = 29; i >= 0; i--) {
    if (days[i].completed) streak++;
    else break;
  }
  return streak;
}

function computeLongestStreak(days: DayProgress[], prev: number): number {
  let max = prev;
  let cur = 0;
  for (const d of days) {
    if (d.completed) { cur++; max = Math.max(max, cur); }
    else cur = 0;
  }
  return max;
}

export function useProgress() {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const updateDay = useCallback((progress: DayProgress) => {
    setState((prev) => {
      const days = prev.days.map((d) => (d.day === progress.day ? progress : d));
      const longestStreak = computeLongestStreak(days, prev.longestStreak);
      return { ...prev, days, longestStreak };
    });
  }, []);

  const updateGlobal = useCallback((updates: Partial<Pick<AppState, 'ctfs' | 'projects' | 'examChecklist'>>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetAll = useCallback(() => {
    const fresh = defaultState();
    setState(fresh);
    saveState(fresh);
  }, []);

  const currentStreak = computeCurrentStreak(state.days);
  const completedDays = state.days.filter((d) => d.completed).length;
  const totalHours = state.days.reduce((sum, d) => sum + d.hours, 0);
  const totalLabs = state.days.reduce((sum, d) => sum + d.labs, 0);
  const overallProgress = Math.round((completedDays / 30) * 100);

  return {
    state,
    currentStreak,
    completedDays,
    totalHours,
    totalLabs,
    overallProgress,
    updateDay,
    updateGlobal,
    resetAll,
  };
}
