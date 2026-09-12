import React from 'react';
import type { Page } from '../types';
import { LayoutDashboard, CalendarDays, BarChart3, Trophy, Settings } from 'lucide-react';

interface NavProps {
  page: Page;
  setPage: (p: Page) => void;
}

const NAV_ITEMS: { id: Page; label: string; Icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'plan', label: '30-Day Plan', Icon: CalendarDays },
  { id: 'analytics', label: 'Analytics', Icon: BarChart3 },
  { id: 'exam', label: 'Month 1 Exam', Icon: Trophy },
  { id: 'settings', label: 'Settings', Icon: Settings },
];

export const Navigation: React.FC<NavProps> = ({ page, setPage }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-gray-900 border-r border-gray-800 min-h-screen sticky top-0">
        <div className="px-5 py-6 border-b border-gray-800">
          <span className="font-mono text-xs text-green-400 tracking-widest uppercase">Red Team</span>
          <div className="text-white font-bold text-sm mt-0.5">30-Day Tracker</div>
        </div>
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors text-left ${
                page === id
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-gray-800">
          <p className="text-xs text-gray-600 font-mono leading-relaxed">
            Practice only on systems you own or have explicit authorization to test.
          </p>
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 flex">
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setPage(id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors ${
              page === id ? 'text-green-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Icon size={18} />
            <span className="hidden xs:block truncate">{label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>
    </>
  );
};
