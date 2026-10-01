import React, { useState } from 'react';
import { ESSENTIAL_FILES } from '../data/essentialFiles';
import { EssentialFileTopic } from '../types/repo';
import { 
  FileText, 
  ShieldCheck, 
  AlertOctagon, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp,
  FileCode,
  Copy,
  Check
} from 'lucide-react';

export const EssentialFilesGuide: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('readme');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const currentTopic: EssentialFileTopic = 
    ESSENTIAL_FILES.find((t) => t.id === selectedTopicId) || ESSENTIAL_FILES[0];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          The 8 Cornerstone Files of Every GitHub Repository
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Before writing thousands of lines of application code, professional developers establish these essential files. They define security, licensing, reproducibility, and open-source collaboration.
        </p>
      </div>

      {/* File Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {ESSENTIAL_FILES.map((topic) => {
          const isSelected = topic.id === currentTopic.id;
          return (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopicId(topic.id);
                setOpenFaqIndex(0);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-mono transition-all whitespace-nowrap border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-semibold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{topic.filename}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        {/* Banner Header */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base sm:text-lg font-bold text-slate-900">{currentTopic.filename}</span>
                <span className="text-xs font-medium text-slate-500">·</span>
                <span className="text-sm font-semibold text-slate-700">{currentTopic.title}</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{currentTopic.shortDesc}</p>
            </div>
            <div className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-2xs self-start">
              {currentTopic.badge}
            </div>
          </div>

          <div className="mt-4 p-3.5 bg-white border border-slate-200/80 rounded-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Why You Must Have This File</h4>
            <p className="text-sm text-slate-800 leading-relaxed">{currentTopic.whyNeeded}</p>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Recommended Anatomy Checklist */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Standard Anatomy &amp; Required Sections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentTopic.structure.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{item.item}</h5>
                    <p className="text-xs text-slate-600 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side-by-side Examples: Right Way vs Blunder */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              Realistic Example Comparison
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* The Right Way */}
              <div className="border border-emerald-200 bg-emerald-50/20 rounded-lg overflow-hidden flex flex-col">
                <div className="p-3 bg-emerald-50/80 border-b border-emerald-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Recommended / Clean Template
                  </span>
                  <button
                    onClick={() => handleCopy(currentTopic.goodExample)}
                    className="flex items-center gap-1 text-2xs font-medium text-emerald-800 hover:text-emerald-950 bg-white border border-emerald-200 px-2 py-0.5 rounded shadow-2xs"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-4 bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto flex-1 max-h-72">
                  <pre className="whitespace-pre leading-relaxed">{currentTopic.goodExample}</pre>
                </div>
              </div>

              {/* The Rookie Trap */}
              {currentTopic.badExample ? (
                <div className="border border-rose-200 bg-rose-50/20 rounded-lg overflow-hidden flex flex-col">
                  <div className="p-3 bg-rose-50/80 border-b border-rose-200">
                    <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4 text-rose-600" />
                      Common Beginner Blunder / Danger
                    </span>
                  </div>
                  <div className="p-4 bg-slate-900 text-rose-200 font-mono text-xs overflow-x-auto flex-1 max-h-72">
                    <pre className="whitespace-pre leading-relaxed">{currentTopic.badExample}</pre>
                  </div>
                </div>
              ) : (
                <div className="border border-slate-200 bg-slate-50 rounded-lg p-5 flex flex-col justify-center">
                  <h5 className="text-sm font-bold text-slate-800 mb-1">Key Takeaway</h5>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Always populate {currentTopic.filename} during project initialization. GitHub provides built-in starters when creating a repository via the Web UI—always check the boxes for README, .gitignore, and LICENSE!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Dos & Don'ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 bg-white">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Golden Best Practices (DO)
              </h4>
              <ul className="space-y-2">
                {currentTopic.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 bg-white">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Fatal Traps to Avoid (DON&apos;T)
              </h4>
              <ul className="space-y-2">
                {currentTopic.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Beginner FAQs */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-sky-600" />
              Frequently Asked Beginner Questions
            </h3>
            <div className="border border-slate-200 rounded-lg divide-y divide-slate-200 overflow-hidden bg-white">
              {currentTopic.beginnerFaq.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="p-3.5">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left flex items-center justify-between gap-3 group"
                    >
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1 pt-1 border-t border-slate-100">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
