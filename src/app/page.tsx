'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ResumeUpload from '../components/ResumeUpload';
import { Sparkles, Zap, Shield, BarChart3, Target, Info } from 'lucide-react';

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const router = useRouter();

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    if (jobDescription.trim()) {
      formData.append('jobDescription', jobDescription);
    }

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();

      // Save results to localStorage for current view
      localStorage.setItem('latestAnalysis', JSON.stringify(data));

      // Save to history (now with full data)
      try {
        const history = JSON.parse(
          localStorage.getItem('resumeHistory') || '[]',
        );
        const newHistoryItem = {
          id: Date.now(),
          date: new Date().toLocaleDateString(),
          score: data.score,
          matchRate: data.matchRate,
          jobTitle:
            jobDescription.split('\n')[0].substring(0, 30) ||
            'General Analysis',
          fullData: data, // Store the complete result
        };
        localStorage.setItem(
          'resumeHistory',
          JSON.stringify([newHistoryItem, ...history].slice(0, 10)),
        );
      } catch (e) {
        console.error('Failed to save to history');
      }

      // Redirect to results page
      router.push('/analyze');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setIsAnalyzing(false);
    }
  };

  return (
    <main className='min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500/30'>
      {/* Background patterns */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] animate-pulse' />
        <div
          className='absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] animate-pulse'
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32'>
        <div className='text-center space-y-8 mb-20'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider animate-bounce'>
            <Sparkles className='w-3 h-3' />
            AI Powered Analysis
          </div>

          <h1 className='text-5xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-blue-600 to-indigo-600 dark:from-white dark:via-blue-400 dark:to-indigo-400 leading-tight'>
            Perfect Your Resume <br /> with AI Precision
          </h1>

          <p className='max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 font-medium'>
            Upload your resume and get instant feedback on your ATS score,
            missing skills, and professional optimization suggestions.
          </p>
        </div>

        <div className='max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-in fade-in slide-in-from-bottom-10 duration-1000'>
          {/* Left Side: JD Input */}
          <div className='bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6'>
            <div className='flex items-center gap-2 mb-2'>
              <div className='p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg'>
                <Target className='w-5 h-5' />
              </div>
              <h2 className='text-xl font-bold'>Target Job (Optional)</h2>
            </div>

            <p className='text-slate-500 dark:text-slate-400 text-sm leading-relaxed'>
              Paste the job description you're applying for to get a "Match
              Rate" and keyword optimization tips.
            </p>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder='Paste job description here...'
              className='w-full h-64 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm'
            />

            <div className='flex items-start gap-2 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100/50 dark:border-blue-800/30'>
              <Info className='w-4 h-4 text-blue-500 mt-0.5' />
              <p className='text-[11px] text-slate-500 dark:text-slate-400 italic'>
                Providing a job description helps our AI identify specific
                keywords that recruiters in your industry are looking for.
              </p>
            </div>
          </div>

          {/* Right Side: Upload */}
          <div className='space-y-8'>
            <ResumeUpload
              onUpload={handleUpload}
              isAnalyzing={isAnalyzing}
            />

            {error && (
              <div className='p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-center text-sm font-medium'>
                {error}
              </div>
            )}

            <div className='grid grid-cols-2 gap-4'>
              <div className='p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'>
                <p className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-1'>
                  Step 1
                </p>
                <p className='text-sm font-semibold'>Paste Info</p>
              </div>
              <div className='p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'>
                <p className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-1'>
                  Step 2
                </p>
                <p className='text-sm font-semibold'>Upload PDF</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className='mt-40 grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            {
              title: 'Job Matching Engine',
              desc: 'See how well you match a specific role with our real-time Match Rate indicator.',
              icon: <Target className='w-6 h-6' />,
              color: 'text-amber-500',
              bg: 'bg-amber-50 dark:bg-amber-900/10',
            },
            {
              title: 'Skill Gap Identification',
              desc: "Instantly see what technical or soft skills you're missing for your target roles.",
              icon: <BarChart3 className='w-6 h-6' />,
              color: 'text-blue-500',
              bg: 'bg-blue-50 dark:bg-blue-900/10',
            },
            {
              title: 'AI Career Coaching',
              desc: 'Get deep-dives on every suggestion with our built-in AI career coach.',
              icon: <Sparkles className='w-6 h-6' />,
              color: 'text-indigo-500',
              bg: 'bg-indigo-50 dark:bg-indigo-900/10',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className='p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
              <div
                className={`w-12 h-12 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className='text-xl font-bold mb-3 dark:text-white'>
                {feature.title}
              </h3>
              <p className='text-slate-500 dark:text-slate-400 leading-relaxed'>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className='py-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 text-sm'>
        <p>© 2026 AI Resume Analyzer. Built for professionals.</p>
      </footer>
    </main>
  );
}
