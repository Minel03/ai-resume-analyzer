'use client';

import React from 'react';
import { Lightbulb, Target, ArrowRight } from 'lucide-react';

interface SuggestionListProps {
  title: string;
  suggestions: string[];
  type: 'improvement' | 'ats';
  onLearnMore: (suggestion: string, type: string) => void;
}

export default function SuggestionList({
  title,
  suggestions,
  type,
  onLearnMore,
}: SuggestionListProps) {
  const isImprovement = type === 'improvement';

  return (
    <div className='bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-full'>
      <div className='flex items-center gap-2 mb-6'>
        <div
          className={`p-2 rounded-lg ${isImprovement ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'}`}>
          {isImprovement ? (
            <Lightbulb className='w-5 h-5' />
          ) : (
            <Target className='w-5 h-5' />
          )}
        </div>
        <h3 className='text-lg font-bold text-slate-800 dark:text-slate-100'>
          {title}
        </h3>
      </div>

      <ul className='space-y-4'>
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <li
              key={index}
              className='flex flex-col gap-2 group'>
              <div className='flex gap-3'>
                <div className='mt-1 shrink-0'>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold 
                    ${isImprovement ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600' : 'bg-blue-100 dark:bg-blue-900 text-blue-600'}`}>
                    {index + 1}
                  </div>
                </div>
                <p className='text-slate-600 dark:text-slate-300 text-sm leading-relaxed group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors'>
                  {suggestion}
                </p>
              </div>

              <button
                onClick={() => onLearnMore(suggestion, type)}
                className='ml-8 text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline group/btn'>
                Learn more with AI
                <ArrowRight className='w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform' />
              </button>
            </li>
          ))
        ) : (
          <p className='text-slate-500 dark:text-slate-400 text-sm italic'>
            No suggestions generated at this time.
          </p>
        )}
      </ul>
    </div>
  );
}
