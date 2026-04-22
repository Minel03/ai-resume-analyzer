"use client";

import React, { useState } from 'react';
import { MessageSquareQuote, ChevronDown, ChevronUp, Star, Lightbulb } from 'lucide-react';

interface InterviewPrepProps {
  questions: {
    question: string;
    answer: string;
  }[];
}

export default function InterviewPrep({ questions }: InterviewPrepProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!questions || questions.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
          <MessageSquareQuote className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold">Interview Coaching</h3>
      </div>

      <div className="space-y-3">
        {questions.map((item, i) => (
          <div key={i} className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden transition-all">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.question}</span>
              {openIndex === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {openIndex === i && (
              <div className="p-4 bg-white dark:bg-slate-900 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-start gap-2 mb-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 mt-1" />
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Perfect STAR Answer</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                  {item.answer}
                </p>
                
                <div className="mt-4 flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-[11px] text-blue-600 dark:text-blue-400">
                  <Lightbulb className="w-4 h-4 shrink-0" />
                  <span>Tip: Try to personalize this answer with a specific project from your resume.</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
