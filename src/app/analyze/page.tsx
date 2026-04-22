"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResumeScore from '../../components/ResumeScore';
import SkillList from '../../components/SkillList';
import SuggestionList from '../../components/SuggestionList';
import SectionScores from '../../components/SectionScores';
import ContactAudit from '../../components/ContactAudit';
import InterviewPrep from '../../components/InterviewPrep';
import Modal from '../../components/Modal';
import { ArrowLeft, Download, RefreshCw, History, FileText, Sparkles } from 'lucide-react';

interface AnalysisResult {
  score: number;
  matchRate: number;
  sectionScores: {
    impact: number;
    brevity: number;
    style: number;
    softSkills: number;
  };
  skills: string[];
  missing: { name: string; roadmap: string }[];
  jdKeywords?: string[];
  suggestions: string[];
  atsSuggestions: string[];
  contactInfoAudit: {
    email: boolean;
    phone: boolean;
    linkedin: boolean;
    portfolio: boolean;
  };
  interviewPrep: { question: string; answer: string }[];
  originalText: string;
  originalJD: string;
}

interface HistoryItem {
  id: number;
  date: string;
  score: number;
  matchRate: number;
  jobTitle: string;
  fullData: AnalysisResult;
}

export default function AnalyzePage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('latestAnalysis');
    const savedHistory = localStorage.getItem('resumeHistory');
    
    if (savedData) {
      try {
        setResult(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved analysis");
        router.push('/');
      }
    } else {
      router.push('/');
    }

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, [router]);

  const handleLearnMore = async (suggestion: string, type: string) => {
    setModalTitle(suggestion);
    setIsModalOpen(true);
    setIsModalLoading(true);
    setModalContent('');

    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestion, type }),
      });
      const data = await response.json();
      setModalContent(data.explanation);
    } catch (error) {
      setModalContent("Sorry, we couldn't generate a detailed insight.");
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!result) return;
    setModalTitle("AI Generated Cover Letter");
    setIsModalOpen(true);
    setIsModalLoading(true);
    setModalContent('');

    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          suggestion: result.originalJD || "General Position", 
          userText: result.originalText || "Resume Content",
          mode: 'cover_letter' 
        }),
      });
      const data = await response.json();
      setModalContent(data.explanation);
    } catch (error) {
      setModalContent("Failed to generate cover letter.");
    } finally {
      setIsModalLoading(false);
    }
  };

  const loadHistoryItem = (item: HistoryItem) => {
    if (item.fullData) {
      setResult(item.fullData);
      localStorage.setItem('latestAnalysis', JSON.stringify(item.fullData));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">Loading analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 print:bg-white print:pb-0">
      <style jsx global>{`
        @media print {
          header, .print-hide, button, footer, .history-sidebar { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; max-width: 100% !important; }
          .grid { display: block !important; }
          .lg\\:col-span-4, .lg\\:col-span-8 { width: 100% !important; margin-bottom: 2rem; }
          .bg-white, .dark\\:bg-slate-900 { background-color: white !important; color: black !important; border: 1px solid #e2e8f0 !important; break-inside: avoid; margin-bottom: 1.5rem !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleGenerateCoverLetter}
              className="hidden md:flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all border border-blue-100 dark:border-blue-800"
            >
              <FileText className="w-4 h-4" />
              Generate Cover Letter
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-all shadow-lg"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-8">
            <ResumeScore score={result.score} matchRate={result.matchRate} />
            <SectionScores scores={result.sectionScores} />
            <ContactAudit audit={result.contactInfoAudit} />
            
            {/* History Sidebar */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm history-sidebar">
              <div className="flex items-center gap-2 mb-6">
                <History className="w-5 h-5 text-slate-400" />
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recent History</h3>
              </div>
              <div className="space-y-4">
                {history.length > 0 ? history.map((item) => (
                  <div key={item.id} onClick={() => loadHistoryItem(item)} className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all group cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold truncate pr-4 group-hover:text-blue-500 transition-colors">{item.jobTitle}</p>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600">{item.score}%</span>
                    </div>
                  </div>
                )) : <p className="text-xs text-slate-500 italic text-center py-4">No history yet</p>}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SkillList title="Detected Skills" skills={result.skills} type="extracted" />
              <SkillList title="Missing Skills" skills={result.missing} type="missing" />
            </div>



            <InterviewPrep questions={result.interviewPrep} />

            <div className="space-y-8">
              <SuggestionList title="Resume Improvements" suggestions={result.suggestions} type="improvement" onLearnMore={handleLearnMore} />
              <SuggestionList title="ATS Optimization" suggestions={result.atsSuggestions} type="ats" onLearnMore={handleLearnMore} />
            </div>

            {/* Summary Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Sparkles className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-bold mb-2">Final Verdict</h3>
              <p className="text-blue-100 leading-relaxed relative z-10">
                Your resume is {result.score >= 80 ? 'strong but has room for fine-tuning.' : 'in need of optimization.'} {result.matchRate > 0 && `Your match rate is ${result.matchRate}%.`} Focus on the improvements below.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle} content={modalContent} isLoading={isModalLoading} />
    </div>
  );
}
