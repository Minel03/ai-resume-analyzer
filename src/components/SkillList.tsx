"use client";

import React from 'react';
import { CheckCircle2, AlertCircle, Sparkles, Map } from 'lucide-react';

interface Skill {
  name: string;
  roadmap?: string;
}

interface SkillListProps {
  title: string;
  skills: (string | Skill)[];
  type: 'extracted' | 'missing';
}

export default function SkillList({ title, skills, type }: SkillListProps) {
  const isExtracted = type === 'extracted';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${isExtracted ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600'}`}>
            {isExtracted ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h3>
        </div>
        <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full uppercase tracking-widest">
          {skills.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.length > 0 ? (
          skills.map((skill, index) => {
            const skillName = typeof skill === 'string' ? skill : skill.name;
            const skillRoadmap = typeof skill === 'string' ? null : skill.roadmap;

            return (
              <div key={index} className="group relative">
                <div className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border 
                  ${isExtracted 
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' 
                    : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-800'}`}>
                  {skillName}
                </div>
                
                {!isExtracted && skillRoadmap && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-slate-900 text-white text-[10px] rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 border border-slate-700">
                    <div className="flex items-center gap-1 mb-1 text-blue-400 font-bold uppercase tracking-tighter">
                      <Map className="w-3 h-3" />
                      Learning Roadmap
                    </div>
                    {skillRoadmap}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-slate-500 dark:text-slate-400 text-sm italic">
            {isExtracted ? "No skills detected yet." : "All key skills identified!"}
          </p>
        )}
      </div>

      {isExtracted && skills.length > 5 && (
        <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 font-medium animate-pulse">
          <Sparkles className="w-3 h-3 text-blue-400" />
          Great technical foundation identified!
        </div>
      )}
    </div>
  );
}
