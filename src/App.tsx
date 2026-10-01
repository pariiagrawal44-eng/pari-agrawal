import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { ProjectBuilder } from './components/ProjectBuilder';
import { RepoExplorer } from './components/RepoExplorer';
import { EssentialFilesGuide } from './components/EssentialFilesGuide';
import { WorkflowSimulator } from './components/WorkflowSimulator';
import { ReadmeBuilder } from './components/ReadmeBuilder';
import { QuizSection } from './components/QuizSection';
import { GlossarySection } from './components/GlossarySection';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('builder');

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main App Body */}
      <main className="flex-1 pb-16">
        {activeTab === 'builder' && <ProjectBuilder />}
        {activeTab === 'explorer' && <RepoExplorer />}
        {activeTab === 'essential' && <EssentialFilesGuide />}
        {activeTab === 'workflow' && <WorkflowSimulator />}
        {activeTab === 'readme-builder' && <ReadmeBuilder />}
        {activeTab === 'quiz' && <QuizSection />}
        {activeTab === 'glossary' && <GlossarySection />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">RepoCraft</span>
              <span>·</span>
              <span>The Beginner&apos;s Interactive Guide to GitHub Projects</span>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveTab('builder')}
                className="hover:text-slate-900 transition-colors font-medium text-emerald-700"
              >
                Project Scaffolder
              </button>
              <button 
                onClick={() => setActiveTab('explorer')}
                className="hover:text-slate-900 transition-colors"
              >
                Repo Explorer
              </button>
              <button 
                onClick={() => setActiveTab('essential')}
                className="hover:text-slate-900 transition-colors"
              >
                Essential Files
              </button>
              <button 
                onClick={() => setActiveTab('workflow')}
                className="hover:text-slate-900 transition-colors"
              >
                Git vs GitHub
              </button>
              <button 
                onClick={() => setActiveTab('quiz')}
                className="hover:text-slate-900 transition-colors"
              >
                Quiz
              </button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between text-2xs text-slate-400 gap-2">
            <span>Built for developers embarking on their open-source journey.</span>
            <span>Always gitignore your secrets. Always include a license.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
