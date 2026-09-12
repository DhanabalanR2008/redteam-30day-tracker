import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Flame, CheckCircle } from 'lucide-react';
import { playAudioBeep, triggerCelebration } from '../utils/confetti';

interface StudyTimerProps {
  onLogHours?: (hours: number) => void;
}

export const StudyTimer: React.FC<StudyTimerProps> = ({ onLogHours }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'pomodoro' | 'deepwork' | 'stopwatch'>('pomodoro');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (mode === 'stopwatch') {
          setElapsedSeconds((prev) => prev + 1);
        } else {
          setSecondsLeft((prev) => {
            if (prev <= 1) {
              setIsActive(false);
              playAudioBeep(587.33, 'triangle', 0.4);
              setTimeout(() => playAudioBeep(880, 'triangle', 0.6), 200);
              triggerCelebration();
              return 0;
            }
            return prev - 1;
          });
          setElapsedSeconds((prev) => prev + 1);
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, mode]);

  const handleModeChange = (newMode: 'pomodoro' | 'deepwork' | 'stopwatch') => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === 'pomodoro') setSecondsLeft(25 * 60);
    if (newMode === 'deepwork') setSecondsLeft(60 * 60);
    if (newMode === 'stopwatch') setSecondsLeft(0);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'pomodoro') setSecondsLeft(25 * 60);
    if (mode === 'deepwork') setSecondsLeft(60 * 60);
    if (mode === 'stopwatch') setElapsedSeconds(0);
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentDisplayTime = mode === 'stopwatch' ? formatTime(elapsedSeconds) : formatTime(secondsLeft);

  const handleLogCurrentTime = () => {
    const hours = Number((elapsedSeconds / 3600).toFixed(1));
    if (hours > 0 && onLogHours) {
      onLogHours(hours);
      triggerCelebration();
      setElapsedSeconds(0);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
          isActive
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 animate-pulse-subtle'
            : 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:border-slate-600 hover:text-white'
        }`}
      >
        <Timer size={14} className={isActive ? 'text-emerald-400 animate-spin' : 'text-slate-400'} style={{ animationDuration: '6s' }} />
        <span>{isActive ? `FOCUS [${currentDisplayTime}]` : 'STUDY TIMER'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 p-4 rounded-xl glass-panel-glow shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
            <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
              <Flame size={14} className="text-amber-400" />
              Focus Mode
            </div>
            <span className="text-[10px] font-mono text-slate-400">Target: 5h/day</span>
          </div>

          <div className="flex gap-1 bg-slate-900/80 p-1 rounded-lg mt-3 border border-slate-800">
            <button
              onClick={() => handleModeChange('pomodoro')}
              className={`flex-1 py-1 text-[11px] font-mono rounded transition-colors ${
                mode === 'pomodoro' ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              25m Pomodoro
            </button>
            <button
              onClick={() => handleModeChange('deepwork')}
              className={`flex-1 py-1 text-[11px] font-mono rounded transition-colors ${
                mode === 'deepwork' ? 'bg-cyan-500/20 text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              60m Deep
            </button>
            <button
              onClick={() => handleModeChange('stopwatch')}
              className={`flex-1 py-1 text-[11px] font-mono rounded transition-colors ${
                mode === 'stopwatch' ? 'bg-purple-500/20 text-purple-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Stopwatch
            </button>
          </div>

          <div className="text-center my-5">
            <div className="font-mono text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
              {currentDisplayTime}
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-1">
              {isActive ? 'Session in progress...' : 'Ready to begin mission'}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsActive(!isActive);
                playAudioBeep(isActive ? 440 : 660, 'sine', 0.1);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-mono text-xs font-bold transition-all shadow-md ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
              }`}
            >
              {isActive ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
              {isActive ? 'PAUSE' : 'START SESSION'}
            </button>
            <button
              onClick={resetTimer}
              className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700/60 hover:bg-slate-700 transition-colors"
              title="Reset"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {elapsedSeconds >= 60 && onLogHours && (
            <button
              onClick={handleLogCurrentTime}
              className="w-full mt-3 flex items-center justify-center gap-1.5 py-1.5 bg-slate-800/80 hover:bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 rounded-lg text-[11px] font-mono transition-all"
            >
              <CheckCircle size={12} />
              Log {(elapsedSeconds / 3600).toFixed(1)}h to Today's Tracker
            </button>
          )}
        </div>
      )}
    </div>
  );
};
