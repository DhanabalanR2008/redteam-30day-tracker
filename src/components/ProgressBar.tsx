import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  height?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'bg-gradient-to-r from-emerald-500 to-teal-400',
  height = 'md',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full space-y-1.5">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-mono">
          {label && <span className="text-slate-300 font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-emerald-400 font-bold ml-auto">{percentage}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-900/90 rounded-full overflow-hidden border border-slate-800 p-0.5 ${heightClasses[height]}`}>
        <div
          className={`${heightClasses[height]} rounded-full transition-all duration-500 ease-out shadow-sm ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
