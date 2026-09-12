import { useState } from 'react';
import { useProgress } from './hooks/useProgress';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { Plan } from './pages/Plan';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ExamPage } from './pages/ExamPage';
import { SettingsPage } from './pages/SettingsPage';
import type { Page } from './types';

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const {
    state, currentStreak, completedDays, totalHours, totalLabs,
    overallProgress, updateDay, updateGlobal, resetAll,
  } = useProgress();

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
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Navigation page={page} setPage={setPage} />

      {/* Main content */}
      <main className="flex-1 px-4 py-6 pb-24 md:pb-8 max-w-5xl mx-auto w-full md:px-6 lg:px-8">
        {renderPage()}
      </main>
    </div>
  );
}
