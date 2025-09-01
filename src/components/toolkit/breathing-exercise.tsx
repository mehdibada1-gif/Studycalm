'use client';

import { useState, useEffect } from 'react';

export default function BreathingExercise() {
  const [text, setText] = useState('Get Ready...');

  useEffect(() => {
    const breathingCycle = () => {
      setText('Breathe In...');
      setTimeout(() => {
        setText('Hold...');
        setTimeout(() => {
          setText('Breathe Out...');
        }, 2000); // Hold for 2 seconds
      }, 4000); // Inhale for 4 seconds
    };

    const interval = setInterval(breathingCycle, 10000); // 4s in + 2s hold + 4s out = 10s cycle
    breathingCycle(); // Start immediately

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-accent/20 rounded-lg h-80">
      <div className="relative flex items-center justify-center w-48 h-48">
        <div className="absolute w-full h-full bg-primary/20 rounded-full animate-pulse-slow"></div>
        <div
          key={text}
          className="w-32 h-32 bg-primary rounded-full flex items-center justify-center animate-breathing"
        ></div>
        <span className="absolute text-lg font-semibold text-primary-foreground">{text}</span>
      </div>
      <style jsx>{`
        @keyframes breathing {
          0%,
          100% {
            transform: scale(0.8);
          }
          40% {
            transform: scale(1);
          }
          60% {
            transform: scale(1);
          }
        }
        .animate-breathing {
          animation: breathing 10s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
