import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { GlossaryTerm } from '../types/repo';
import { Search, BookOpen, Sparkles, Code2 } from 'lucide-react';

export const GlossarySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState<'All' | 'Git' | 'GitHub' | 'Workflow'>('All');

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchCat = filterCat === 'All' || item.category === filterCat;
      const matchSearch = searchTerm === '' ||
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.beginnerMetaphor.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchTerm, filterCat]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>GitHub &amp; Git Jargon Decoder</span>
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Confused by developer terms like &ldquo;Fork&rdquo;, &ldquo;Rebase&rdquo;, &ldquo;Upstream&rdquo;, or &ldquo;HEAD&rdquo;? Here is what they actually mean in plain English with beginner-friendly real-world metaphors.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jargon (e.g., Fork, PR, Conflict)..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          {(['All', 'Git', 'GitHub'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterCat === cat
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'All' ? 'All Terms' : `${cat} Terms`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Term Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTerms.map((term, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-mono text-base font-bold text-slate-900">{term.term}</h3>
                <span className={`text-2xs font-semibold px-2 py-0.5 rounded border ${
                  term.category === 'Git'
                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                    : 'bg-purple-50 text-purple-800 border-purple-200'
                }`}>
                  {term.category}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {term.definition}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="p-2.5 bg-amber-50/50 border border-amber-200/70 rounded-md">
                <div className="text-2xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1 mb-0.5">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Plain English Metaphor
                </div>
                <p className="text-xs text-amber-950 leading-relaxed italic">
                  &ldquo;{term.beginnerMetaphor}&rdquo;
                </p>
              </div>

              <div className="font-mono text-2xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                <span className="text-slate-400 select-none">Ex: </span>
                <span>{term.example}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
