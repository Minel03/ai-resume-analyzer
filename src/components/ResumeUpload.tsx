'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle, Loader2 } from 'lucide-react';

interface ResumeUploadProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export default function ResumeUpload({
  onUpload,
  isAnalyzing,
}: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
  };

  const handleAnalyze = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className='w-full max-w-2xl mx-auto space-y-6'>
      <div
        {...getRootProps()}
        className={`relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out p-12 text-center
          ${
            isDragActive
              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
              : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-slate-900/50'
          }`}>
        <input {...getInputProps()} />

        <div className='flex flex-col items-center justify-center space-y-4'>
          <div
            className={`p-4 rounded-full transition-colors duration-300 ${isDragActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-blue-500'}`}>
            <Upload className='w-8 h-8' />
          </div>

          <div className='space-y-2'>
            <h3 className='text-xl font-semibold text-slate-800 dark:text-slate-100'>
              {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
            </h3>
            <p className='text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto'>
              Drag and drop your PDF file here, or click to browse from your
              computer
            </p>
          </div>

          <div className='flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider'>
            <span className='px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded'>
              PDF Only
            </span>
            <span className='px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded'>
              Max 5MB
            </span>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className='absolute -bottom-12 -right-12 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors' />
        <div className='absolute -top-12 -left-12 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors' />
      </div>

      {file && (
        <div className='animate-in fade-in slide-in-from-bottom-4 duration-500'>
          <div className='bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <div className='p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg'>
                <FileText className='w-5 h-5' />
              </div>
              <div className='flex flex-col'>
                <span className='text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[200px]'>
                  {file.name}
                </span>
                <span className='text-xs text-slate-500'>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </div>

            <button
              onClick={removeFile}
              className='p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-red-500 transition-colors'
              disabled={isAnalyzing}>
              <X className='w-5 h-5' />
            </button>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2
              ${
                isAnalyzing
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]'
              }`}>
            {isAnalyzing ? (
              <>
                <Loader2 className='w-5 h-5 animate-spin' />
                Analyzing Resume...
              </>
            ) : (
              <>
                Analyze Resume
                <CheckCircle className='w-5 h-5' />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
