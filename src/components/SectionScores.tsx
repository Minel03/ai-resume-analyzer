"use client";

import React from 'react';
import { Zap, Clock, Palette, Users } from 'lucide-react';

interface SectionScoresProps {
  scores: {
    impact: number;
    brevity: number;
    style: number;
    softSkills: number;
  };
}

export default function SectionScores({ scores }: SectionScoresProps) {
  const metrics = [
    { name: 'Impact', value: scores.impact, icon: <Zap className="w-4 h-4" />, color: 'bg-amber-500' },
    { name: 'Brevity', value: scores.brevity, icon: <Clock className="w-4 h-4" />, color: 'bg-emerald-500' },
    { name: 'Style', value: scores.style, icon: <Palette className="w-4 h-4" />, color: 'bg-blue-500' },
    { name: 'Soft Skills', value: scores.softSkills, icon: <Users className="w-4 h-4" />, color: 'bg-indigo-500' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Performance Metrics</h3>
      <div className="space-y-6">
        {metrics.map((metric, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
                <span className={metric.color + ' p-1 rounded text-white'}>{metric.icon}</span>
                {metric.name}
              </div>
              <span className="font-bold">{metric.value}%</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${metric.color} transition-all duration-1000 ease-out`} 
                style={{ width: `${metric.value}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
