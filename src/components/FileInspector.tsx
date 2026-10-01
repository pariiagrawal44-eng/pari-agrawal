import React, { useState } from 'react';
import { FileNode } from '../types/repo';
import { 
  FileCode, 
  Folder, 
  Copy, 
  Check, 
  AlertTriangle, 
  Lightbulb, 
  ExternalLink,
  ShieldAlert,
  Info
} from 'lucide-react';

interface FileInspectorProps {
  selectedNode: FileNode | null;
}

export const FileInspector: React.FC<FileInspectorProps> = ({ selectedNode }) => {
  const [activeSubTab, setActiveSubTab] = useState<'anatomy' | 'raw' | 'traps'>('anatomy');
  const [copied, setCopied] = useState(false);

  if (!selectedNode) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50 border border-slate-200 rounded-lg">
        <Info className="w-10 h-10 text-slate-400 mb-3" />
        <h3 className="text-base font-semibold text-slate-800">Select a file or folder</h3>
        <p className="text-sm text-slate-500 max-w-sm mt-1">
          Click any file in the tree to the left to inspect its role, sample code, and beginner pitfalls.
        </p>
      </div>
    );
  }

  const handleCopy = () => {
    if (selectedNode.sampleContent) {
      navigator.clipboard.writeText(selectedNode.sampleContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getImportanceBadge = (importance?: string) => {
    if (importance === 'essential') {
      return <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Non-Negotiable Essential</span>;
    }
    if (importance === 'recommended') {
      return <span className="text-xs font-medium text-amber-750 text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Recommended Best Practice</span>;
    }
    return <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Optional / Context Dependent</span>;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xs flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white border border-slate-200 rounded-md shadow-2xs mt-0.5 text-slate-700">
              {selectedNode.type === 'folder' ? <Folder className="w-5 h-5 text-amber-500" /> : <FileCode className="w-5 h-5 text-blue-600" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-slate-900 font-mono tracking-tight">{selectedNode.name}</h2>
                {selectedNode.importance && getImportanceBadge(selectedNode.importance)}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-mono">
                <span>Path: {selectedNode.path}</span>
                {selectedNode.language && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase text-slate-600 font-semibold">{selectedNode.language}</span>
                  </>
                )}
                {selectedNode.category && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{selectedNode.category}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {selectedNode.sampleContent && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors shadow-2xs"
              title="Copy file sample content to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          )}
        </div>

        {/* Quick Summary Banner */}
        <p className="mt-3 text-sm text-slate-700 font-medium leading-relaxed bg-white p-3 rounded border border-slate-200/80">
          {selectedNode.summary}
        </p>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-200/60">
          <button
            onClick={() => setActiveSubTab('anatomy')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeSubTab === 'anatomy'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Anatomy &amp; Purpose
          </button>
          {selectedNode.sampleContent && (
            <button
              onClick={() => setActiveSubTab('raw')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeSubTab === 'raw'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Real Code Sample
            </button>
          )}
          {(selectedNode.commonMistakes || selectedNode.proTip) && (
            <button
              onClick={() => setActiveSubTab('traps')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeSubTab === 'traps'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Beginner Pitfalls &amp; Tips
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-5">
        {activeSubTab === 'anatomy' && (
          <div className="space-y-5">
            {/* What it Does & Why it Matters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">What This File Does</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedNode.whatItDoes}</p>
              </div>

              <div className="bg-blue-50/50 border border-blue-200/70 rounded-lg p-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1.5">Why GitHub Cares</h4>
                <p className="text-sm text-blue-900 leading-relaxed">{selectedNode.whyItMatters}</p>
              </div>
            </div>

            {/* Line-by-Line Breakdown if available */}
            {selectedNode.annotations && selectedNode.annotations.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Key Sections Breakdown</h4>
                <div className="border border-slate-200 rounded-lg divide-y divide-slate-200 overflow-hidden bg-white">
                  {selectedNode.annotations.map((ann, idx) => (
                    <div key={idx} className="p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                          Lines {ann.lines}
                        </span>
                        <h5 className="text-sm font-semibold text-slate-900">{ann.title}</h5>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">{ann.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preview of Code if available */}
            {selectedNode.sampleContent && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Sample File Content</h4>
                  <span className="text-xs text-slate-400">Click &apos;Real Code Sample&apos; tab for full view</span>
                </div>
                <div className="bg-slate-900 text-slate-200 rounded-lg p-3.5 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800 shadow-inner">
                  <pre className="leading-relaxed whitespace-pre">{selectedNode.sampleContent}</pre>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'raw' && selectedNode.sampleContent && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                {selectedNode.name} · {selectedNode.sampleContent.split('\n').length} lines
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-slate-950 text-slate-100 rounded-lg p-4 font-mono text-xs overflow-x-auto border border-slate-800">
              <table className="w-full border-collapse">
                <tbody>
                  {selectedNode.sampleContent.split('\n').map((line, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/60">
                      <td className="text-slate-600 select-none pr-4 text-right align-top w-8">{idx + 1}</td>
                      <td className="whitespace-pre text-slate-200">{line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSubTab === 'traps' && (
          <div className="space-y-4">
            {selectedNode.commonMistakes && selectedNode.commonMistakes.length > 0 && (
              <div className="border border-rose-200 bg-rose-50/40 rounded-lg p-4">
                <div className="flex items-center gap-2 text-rose-900 font-semibold text-sm mb-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Beginner Traps to Watch Out For</span>
                </div>
                <ul className="space-y-2">
                  {selectedNode.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-rose-950">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedNode.proTip && (
              <div className="border border-emerald-200 bg-emerald-50/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm mb-2">
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                  <span>Pro Tip for GitHub</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                  {selectedNode.proTip}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
