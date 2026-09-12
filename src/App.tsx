import { useState, useEffect } from 'react';
import { useProgress } from './hooks/useProgress';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { Plan } from './pages/Plan';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ExamPage } from './pages/ExamPage';
import { SettingsPage } from './pages/SettingsPage';
import { StudyTimer } from './components/StudyTimer';
import type { Page } from './types';
import { Shield, Flame, Terminal } from 'lucide-react';

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [currentDate, setCurrentDate] = useState('');

  const {
    state, currentStreak, completedDays, totalHours, totalLabs,
    overallProgress, updateDay, updateGlobal, resetAll,
  } = useProgress();

  useEffect(() => {
    const d = new Date();
    setCurrentDate(d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
  }, []);

  const handleLogHoursFromTimer = (hours: number) => {
    // Find first incomplete day or day 1
    const targetDay = state.days.find((d) => !d.completed) || state.days[0];
    if (targetDay) {
      updateDay(targetDay.day, {
        hours: Number(((targetDay.hours || 0) + hours).toFixed(1)),
      });
    }
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return (
          <Dashboard
            progress={state.days}
            ctfs={state.ctfs}
            projects={state.projects}
            completedDays={completedDays}
            totalHours={totalHours}
            totalLabs={totalLabs}
            overallProgress={overallProgress}
            currentStreak={currentStreak}
            longestStreak={state.longestStreak}
            onUpdateDay={updateDay}
          />
        );
      case 'plan':
        return <Plan progress={state.days} onUpdateDay={updateDay} />;
      case 'analytics':
        return <AnalyticsPage progress={state.days} completedDays={completedDays} overallProgress={overallProgress} />;
      case 'exam':
        return (
          <ExamPage
            examChecklist={state.examChecklist}
            progress={state.days}
            onUpdate={(key, val) => updateGlobal({ examChecklist: { ...state.examChecklist, [key]: val } })}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            state={state}
            ctfs={state.ctfs}
            projects={state.projects}
            onUpdateGlobal={updateGlobal}
            onReset={resetAll}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <Navigation
        page={page}
        setPage={setPage}
        currentStreak={currentStreak}
        overallProgress={overallProgress}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 glass-panel border-b border-slate-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-slate-400 font-medium">
                {currentDate || 'SYSTEM ACTIVE'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Embedded Study Focus Timer */}
            <StudyTimer onLogHours={handleLogHoursFromTimer} />

            {/* Streak Counter Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold">
              <Flame size={14} />
              <span>{currentStreak} DAY STREAK</span>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 px-4 py-6 pb-24 md:pb-8 max-w-6xl mx-auto w-full md:px-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
