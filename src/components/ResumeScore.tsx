'use client';

import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ResumeScoreProps {
  score: number;
  matchRate?: number;
}

export default function ResumeScore({ score, matchRate }: ResumeScoreProps) {
  const getColor = (s: number) => {
    if (s >= 80) return '#10b981'; // green-500
    if (s >= 60) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  return (
    <div className='bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md overflow-hidden'>
      <div className='flex flex-col items-center justify-center p-8 border-b border-slate-100 dark:border-slate-800'>
        <div className='w-32 h-32 md:w-40 md:h-40 relative group'>
          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={buildStyles({
              pathColor: getColor(score),
              textColor: getColor(score),
              trailColor: '#e2e8f0',
              textSize: '22px',
              pathTransitionDuration: 1.5,
            })}
          />
          <div className="absolute inset-0 bg-blue-500/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
        </div>
        <h3 className='mt-6 text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider'>
          ATS Score
        </h3>
        <p className='text-slate-500 dark:text-slate-400 text-xs text-center mt-2 font-medium'>
          Match with industry-standard parsing rules
        </p>
      </div>

      {matchRate !== undefined && matchRate > 0 && (
        <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 flex flex-col items-center border-t border-blue-100/50 dark:border-blue-800/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{matchRate}%</div>
            <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest leading-none">
              Role Match<br/>Accuracy
            </div>
          </div>
          <div className="w-full h-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-1000 ease-out" 
              style={{ width: `${matchRate}%` }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
