export interface DayDefinition {
  day: number;
  week: number;
  weekName: string;
  topic: string;
  study: string;
  practical: string;
  isCheckpoint?: boolean;
  checkpointText?: string;
}

export interface DayProgress {
  day: number;
  completed: boolean;
  hours: number;
  labs: number;
  confidence: number;
  notes: string;
  completedAt?: string;
  checklist: {
    learnedConcept: boolean;
    completedPractical: boolean;
    canReproduce: boolean;
    canExplain: boolean;
    wroteNotes: boolean;
  };
}

export interface AppState {
  days: DayProgress[];
  ctfs: number;
  projects: number;
  examChecklist: Record<string, boolean>;
  longestStreak: number;
}

export type Page = 'dashboard' | 'plan' | 'analytics' | 'exam' | 'settings';
