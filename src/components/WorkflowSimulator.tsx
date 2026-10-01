import React, { useState } from 'react';
import { WORKFLOW_STEPS } from '../data/workflowSteps';
import { 
  GitBranch, 
  Terminal, 
  Cloud, 
  Laptop, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Play, 
  GitPullRequest,
  CheckCircle2,
  AlertCircle,
  GitCommit,
  GitMerge,
  Cpu
} from 'lucide-react';

export const WorkflowSimulator: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [terminalExecuted, setTerminalExecuted] = useState<boolean>(false);

  const step = WORKFLOW_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < WORKFLOW_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setTerminalExecuted(false);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setTerminalExecuted(false);
    }
  };

  const getPhaseBadge = (phase: string) => {
    if (phase === 'Local Machine') {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-md">
          <Laptop className="w-3.5 h-3.5 text-sky-600" />
          Phase: Local Computer (Git CLI)
        </span>
      );
    }
    if (phase === 'GitHub Remote') {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-purple-850 text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-md">
          <Cloud className="w-3.5 h-3.5 text-purple-600" />
          Phase: GitHub Cloud (Remote Repo)
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
        <Users className="w-3.5 h-3.5 text-emerald-600" />
        Phase: Team Review &amp; Merging
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Git vs GitHub Demystified Hero */}
      <div className="border border-slate-200 bg-slate-50 rounded-lg p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <span className="text-2xs font-bold uppercase tracking-wider text-slate-500">The Essential Distinction</span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">Git vs GitHub: What Is the Difference?</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Beginners often confuse the two. <strong>Git</strong> is the local command-line software tool that records your file versions. <strong>GitHub</strong> is the web hosting cloud company that stores those Git histories online and adds team features (Pull Requests, CI automation, Code Reviews).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                <Laptop className="w-4 h-4 text-blue-600" />
                <span>Git (Local Engine)</span>
              </div>
              <ul className="text-slate-600 space-y-1 text-2xs leading-normal">
                <li>• Runs offline on your laptop</li>
                <li>• Managed via CLI (`git commit`)</li>
                <li>• Stores history in `.git/`</li>
                <li>• Created by Linus Torvalds</li>
              </ul>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                <Cloud className="w-4 h-4 text-purple-600" />
                <span>GitHub (Cloud Platform)</span>
              </div>
              <ul className="text-slate-600 space-y-1 text-2xs leading-normal">
                <li>• Website and cloud servers</li>
                <li>• Pull requests &amp; code reviews</li>
                <li>• Automated CI/CD (Actions)</li>
                <li>• Social open-source network</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Stepper */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs p-4 sm:p-6 space-y-6">
        {/* Step Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
            <span>The 9-Step Contribution Lifecycle</span>
            <span className="font-mono">Step {step.step} of {WORKFLOW_STEPS.length}</span>
          </div>

          <div className="grid grid-cols-9 gap-1.5">
            {WORKFLOW_STEPS.map((s, idx) => {
              const isDone = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <button
                  key={s.step}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    setTerminalExecuted(false);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    isCurrent
                      ? 'bg-slate-900 ring-2 ring-slate-900/30'
                      : isDone
                      ? 'bg-emerald-500'
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  title={`Step ${s.step}: ${s.title}`}
                />
              );
            })}
          </div>

          {/* Quick Step Buttons for mobile/touch */}
          <div className="flex gap-2 overflow-x-auto py-2 scrollbar-none">
            {WORKFLOW_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => {
                  setCurrentStepIndex(idx);
                  setTerminalExecuted(false);
                }}
                className={`px-2.5 py-1 rounded text-2xs font-mono whitespace-nowrap transition-colors border ${
                  idx === currentStepIndex
                    ? 'bg-slate-900 text-white border-slate-900 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {s.step}. {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Current Step Detailed Card */}
        <div className="border border-slate-200 rounded-lg p-5 bg-slate-50/50 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">{step.action}</p>
            </div>
            {getPhaseBadge(step.phase)}
          </div>

          <p className="text-sm text-slate-800 leading-relaxed font-normal">
            {step.description}
          </p>

          {/* Dual Action Panes: Terminal CLI & GitHub Cloud Web Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Terminal Execution Simulation */}
            <div className="bg-slate-950 text-slate-200 rounded-lg p-4 font-mono text-xs border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 pb-2 mb-3 border-b border-slate-800 text-2xs">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Your Local Terminal (macOS / Linux / Windows WSL)</span>
                  </div>
                  <span className="text-slate-500">bash</span>
                </div>

                {step.gitCommand ? (
                  <div className="space-y-3">
                    <div className="text-slate-300">
                      <span className="text-emerald-400 select-none mr-2">$</span>
                      <span className="font-semibold whitespace-pre-wrap">{step.gitCommand}</span>
                    </div>

                    {terminalExecuted && (
                      <div className="pt-2 text-slate-400 border-t border-slate-800 text-2xs space-y-1">
                        <p className="text-emerald-400 font-semibold">✓ Command executed successfully</p>
                        <p className="text-slate-500">[Branch: feat/add-user-profile] 1 file changed, 42 insertions(+)</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-4 text-center text-slate-500 italic">
                    (No local Git command needed here—this step takes place directly on GitHub.com!)
                  </div>
                )}
              </div>

              {step.gitCommand && (
                <div className="pt-4 mt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-2xs text-slate-500">Test simulation:</span>
                  <button
                    onClick={() => setTerminalExecuted(true)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-2xs transition-colors"
                  >
                    <Play className="w-3 h-3 text-emerald-400" />
                    <span>Simulate Terminal Run</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right: GitHub Web Interface Simulation */}
            <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between text-slate-600 pb-2 mb-3 border-b border-slate-200 text-2xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Cloud className="w-3.5 h-3.5 text-purple-600" />
                    <span>GitHub.com Web Interface</span>
                  </div>
                  <span className="text-slate-400">repo: owner/project</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-md text-xs text-slate-700 leading-relaxed">
                  <p className="font-medium text-slate-900 mb-1">What you do on the website:</p>
                  <p>{step.githubActionText || 'Watch for real-time status updates and pull request triggers.'}</p>
                </div>

                {/* Specific mockup visuals for key steps */}
                {step.visualGraphic === 'ci' && (
                  <div className="mt-3 p-3 bg-emerald-50/60 border border-emerald-200 rounded-md text-2xs space-y-1.5">
                    <div className="flex items-center justify-between font-semibold text-emerald-900">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        All checks have passed
                      </span>
                      <span>3 successful checks</span>
                    </div>
                    <div className="text-slate-600 pl-5 space-y-1">
                      <div>✓ Node.js 20 Linter &amp; Tests (CI) — 42s</div>
                      <div>✓ Security Dependency Scan — 12s</div>
                    </div>
                  </div>
                )}

                {step.visualGraphic === 'merge' && (
                  <div className="mt-3 p-3 bg-purple-50/60 border border-purple-200 rounded-md text-2xs space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-purple-900">
                      <GitMerge className="w-3.5 h-3.5 text-purple-600" />
                      Ready to Merge
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span className="px-3 py-1 bg-emerald-600 text-white rounded font-medium shadow-2xs">
                        Squash and merge
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-500">
                <span>Location: GitHub Repository UI</span>
                <span className="text-purple-600 font-medium">Automatic sync</span>
              </div>
            </div>
          </div>

          {/* Pro Tip Box */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
            <span className="font-bold text-amber-800 shrink-0">Pro Tip:</span>
            <p className="leading-relaxed">{step.tip}</p>
          </div>
        </div>

        {/* Navigation Step Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              currentStepIndex === 0
                ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
                : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous Step
          </button>

          <span className="text-xs text-slate-500 hidden sm:inline">
            Use Prev/Next to follow the full branch lifecycle
          </span>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === WORKFLOW_STEPS.length - 1}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              currentStepIndex === WORKFLOW_STEPS.length - 1
                ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-2xs'
            }`}
          >
            Next Step
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
