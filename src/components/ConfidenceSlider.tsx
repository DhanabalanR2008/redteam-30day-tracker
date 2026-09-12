import React from 'react';

interface ConfidenceSliderProps {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}

const labels: Record<number, string> = {
  1: 'No idea', 2: 'Confused', 3: 'Glimpse', 4: 'Shaky', 5: 'Getting it',
  6: 'Solid', 7: 'Confident', 8: 'Strong', 9: 'Expert', 10: 'Mastered',
};

export const ConfidenceSlider: React.FC<ConfidenceSliderProps> = ({ value, onChange, disabled }) => {
  const color = value <= 3 ? '#ef4444' : value <= 6 ? '#f97316' : '#22c55e';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 font-mono">Confidence</span>
        <span className="text-sm font-mono font-bold" style={{ color }}>
          {value} / 10 — {labels[value]}
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-green-500 disabled:opacity-50"
        style={{ accentColor: color }}
      />
      <div className="flex justify-between text-xs text-gray-700 font-mono">
        <span>1</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  );
};
