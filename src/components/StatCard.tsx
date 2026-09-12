import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  accent?: 'green' | 'orange' | 'red' | 'blue' | 'gray';
}

const accentMap = {
  green: 'text-green-400',
  orange: 'text-orange-400',
  red: 'text-red-400',
  blue: 'text-blue-400',
  gray: 'text-gray-300',
};

export const StatCard: React.FC<StatCardProps> = ({ label, value, subtext, accent = 'green' }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col gap-1">
    <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">{label}</span>
    <span className={`text-2xl font-bold font-mono ${accentMap[accent]}`}>{value}</span>
    {subtext && <span className="text-xs text-gray-600 font-mono">{subtext}</span>}
  </div>
);
