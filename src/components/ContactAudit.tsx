"use client";

import React from 'react';
import { CheckCircle, XCircle, Mail, Phone, Link, Briefcase } from 'lucide-react';

interface ContactAuditProps {
  audit: {
    email: boolean;
    phone: boolean;
    linkedin: boolean;
    portfolio: boolean;
  };
}

export default function ContactAudit({ audit }: ContactAuditProps) {
  const checks = [
    { name: 'Email Address', status: audit.email, icon: <Mail className="w-4 h-4" /> },
    { name: 'Phone Number', status: audit.phone, icon: <Phone className="w-4 h-4" /> },
    { name: 'LinkedIn Profile', status: audit.linkedin, icon: <Link className="w-4 h-4" /> },
    { name: 'Portfolio/Site', status: audit.portfolio, icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Contact Info Audit</h3>
      <div className="grid grid-cols-1 gap-4">
        {checks.map((check, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 text-sm font-medium">
              <span className="text-slate-400">{check.icon}</span>
              {check.name}
            </div>
            {check.status ? (
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <CheckCircle className="w-4 h-4" />
                FOUND
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-500 dark:text-red-400 text-xs font-bold">
                <XCircle className="w-4 h-4" />
                MISSING
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
