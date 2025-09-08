
'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const STUDY_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function PomodoroTimer() {
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [timeLeft, setTimeLeft] = useState(0); // Initialize to 0 to prevent hydration mismatch
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // This now runs only on the client, avoiding hydration mismatch.
    setTimeLeft(mode === 'study' ? STUDY_TIME : BREAK_TIME);
  }, [mode]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    } else if (timeLeft === 0 && isActive) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (mode === 'study') {
            setMode('break');
        } else {
            setMode('study');
        }
        setIsActive(false); // Pause timer when session ends
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => {
    // If the timer is at 0, reset it before starting
    if (timeLeft === 0) {
        setTimeLeft(mode === 'study' ? STUDY_TIME : BREAK_TIME);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setMode('study');
    setTimeLeft(STUDY_TIME);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalTime = mode === 'study' ? STUDY_TIME : BREAK_TIME;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-accent/20 rounded-lg">
      <div
        className={`w-48 h-48 rounded-full flex items-center justify-center text-5xl font-mono font-semibold transition-colors ${
          mode === 'study' ? 'bg-primary/20 text-primary-foreground' : 'bg-accent/50 text-accent-foreground'
        }`}
      >
        {formatTime(timeLeft)}
      </div>
      <div className="w-full max-w-sm mt-6">
        <Progress value={progress} />
        <p className="text-center mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {mode}
        </p>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <Button onClick={toggleTimer} size="lg" className="w-32">
          {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={resetTimer} variant="outline" size="lg" aria-label="Reset Timer">
          <RotateCcw />
        </Button>
      </div>
    </div>
  );
}
