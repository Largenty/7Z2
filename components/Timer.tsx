'use client';

import { useEffect, useState } from 'react';
import { formatTime } from '@/lib/time';

interface TimerProps {
  isRunning: boolean;
  startTime: number | null;
  finalTime?: number | null;
}

export default function Timer({ isRunning, startTime, finalTime }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (finalTime !== undefined && finalTime !== null) {
      setElapsed(finalTime);
      return;
    }

    if (!isRunning || startTime === null) {
      setElapsed(0);
      return;
    }

    let frameId: number;

    const updateTimer = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      setElapsed(elapsed);
      frameId = requestAnimationFrame(updateTimer);
    };

    frameId = requestAnimationFrame(updateTimer);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isRunning, startTime, finalTime]);

  return (
    <div className="text-center">
      <div className="text-sm font-medium text-black mb-1">Temps</div>
      <div className="text-3xl font-black text-black tracking-tight">
        {formatTime(elapsed)}
      </div>
    </div>
  );
}
