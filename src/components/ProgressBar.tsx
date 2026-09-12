import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'green' | 'orange' | 'red' | 'blue';
  showPercent?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

const colorMap = {
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
};

const heightMap = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  color = 'green',
  showPercent = false,
  height = 'md',
}) => {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-gray-400 font-mono">{label}</span>}
          {showPercent && <span className="text-xs text-gray-400 font-mono">{pct}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-800 rounded-full ${heightMap[height]}`}>
        <div
          className={`${colorMap[color]} ${heightMap[height]} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
