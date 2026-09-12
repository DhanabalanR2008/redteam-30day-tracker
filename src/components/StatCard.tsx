import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  accentColor?: string;
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  accentColor = 'text-emerald-400',
  trend,
}) => {
  return (
    <div className="glass-card rounded-2xl p-4 md:p-5 relative overflow-hidden group">
      {/* Subtle background glow */}
      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-all" />

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl md:text-3xl font-mono font-extrabold text-white tracking-tight">{value}</h3>
            {trend && (
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {trend}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs font-mono text-slate-400 pt-0.5">{subtitle}</p>}
        </div>

        <div className={`p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 ${accentColor} shadow-inner group-hover:scale-110 group-hover:border-emerald-500/30 transition-all`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};
