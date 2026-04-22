'use client';

import React, { useState } from 'react';
import { X, Sparkles, Loader2, Wand2, Copy, Check } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  isLoading: boolean;
  type?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  content,
  isLoading,
  type,
}: ModalProps) {
  const [rewriteContent, setRewriteContent] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleRewrite = async () => {
    setIsRewriting(true);
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestion: title, type, mode: 'rewrite' }),
      });
      const data = await response.json();
      setRewriteContent(data.explanation);
    } catch (e) {
      setRewriteContent('Failed to generate rewrite. Please try again.');
    } finally {
      setIsRewriting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rewriteContent || content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8'>
      <div
        className='absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300'
        onClick={onClose}
      />

      <div className='relative w-full max-w-2xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col'>
        {/* Header */}
        <div className='shrink-0 p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900 z-10'>
          <div className='flex items-center gap-2'>
            <div className='p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg'>
              <Sparkles className='w-5 h-5' />
            </div>
            <h3 className='text-lg font-bold text-white truncate max-w-[300px] md:max-w-[400px]'>
              AI Career Insights
            </h3>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleCopy}
              className='p-2 hover:bg-slate-800 rounded-full transition-all text-slate-400 hover:text-white'
              title='Copy to clipboard'>
              {copied ? (
                <Check className='w-5 h-5 text-emerald-500' />
              ) : (
                <Copy className='w-5 h-5' />
              )}
            </button>
            <button
              onClick={onClose}
              className='p-2 hover:bg-slate-800 rounded-full transition-all text-slate-500 hover:text-white'>
              <X className='w-6 h-6' />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className='flex-1 overflow-y-auto p-8'>
          {isLoading ? (
            <div className='py-20 flex flex-col items-center justify-center gap-4'>
              <Loader2 className='w-10 h-10 text-blue-500 animate-spin' />
              <p className='text-slate-400 font-medium animate-pulse'>
                Consulting AI coach...
              </p>
            </div>
          ) : (
            <div className='space-y-8'>
              <div className='p-4 bg-slate-800/50 rounded-xl border border-slate-800'>
                <p className='text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1'>
                  Observation
                </p>
                <p className='text-slate-200 font-medium'>{title}</p>
              </div>

              <div className='prose dark:prose-invert max-w-none'>
                <div className='text-slate-300 leading-relaxed whitespace-pre-wrap text-base md:text-lg'>
                  {content}
                </div>
              </div>

              {rewriteContent ? (
                <div className='animate-in slide-in-from-bottom-4 duration-500 p-6 bg-blue-600/10 border border-blue-500/30 rounded-2xl space-y-4'>
                  <div className='flex items-center gap-2 text-blue-400'>
                    <Wand2 className='w-4 h-4' />
                    <span className='text-sm font-bold uppercase tracking-widest'>
                      AI Suggested Rewrites
                    </span>
                  </div>
                  <div className='text-slate-200 text-sm md:text-base whitespace-pre-wrap font-mono leading-relaxed'>
                    {rewriteContent}
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleRewrite}
                  disabled={isRewriting}
                  className='w-full flex items-center justify-center gap-2 py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] disabled:opacity-50'>
                  {isRewriting ? (
                    <>
                      <Loader2 className='w-5 h-5 animate-spin' />
                      Generating Rewrites...
                    </>
                  ) : (
                    <>
                      <Wand2 className='w-5 h-5' />
                      Generate Professional Rewrites
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        <div className='shrink-0 p-6 bg-slate-800/50 border-t border-slate-800 flex justify-end'>
          <button
            onClick={onClose}
            className='px-8 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all shadow-lg active:scale-95'>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
