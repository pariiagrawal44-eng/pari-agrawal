import React from 'react';
import { 
  FolderTree, 
  FileText, 
  GitPullRequest, 
  PenTool, 
  HelpCircle, 
  BookOpen,
  Github
} from 'lucide-react';

export type ActiveTab = 'builder' | 'explorer' | 'essential' | 'workflow' | 'readme-builder' | 'quiz' | 'glossary';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; shortLabel: string }[] = [
    { id: 'builder', label: 'Project Scaffolder', shortLabel: 'Build Project', icon: <PenTool className="w-4 h-4 text-emerald-400" /> },
    { id: 'explorer', label: 'Repo Explorer', shortLabel: 'Explorer', icon: <FolderTree className="w-4 h-4" /> },
    { id: 'essential', label: 'Essential Files', shortLabel: 'Core Files', icon: <FileText className="w-4 h-4" /> },
    { id: 'workflow', label: 'Workflow Simulator', shortLabel: 'Workflow', icon: <GitPullRequest className="w-4 h-4" /> },
    { id: 'readme-builder', label: 'README Builder', shortLabel: 'README', icon: <FileText className="w-4 h-4" /> },
    { id: 'quiz', label: 'Knowledge Quiz', shortLabel: 'Quiz', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'glossary', label: 'Glossary', shortLabel: 'Glossary', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">RepoCraft</span>
                <span className="text-xs font-medium text-slate-500 hidden sm:inline">Beginner GitHub Handbook</span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">Repository Anatomy · Major Files · Workflow Visualizer</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.shortLabel}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
