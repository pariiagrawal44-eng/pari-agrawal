import React, { useState, useMemo } from 'react';
import { 
  ProjectConfig, 
  generateProjectFiles, 
  downloadProjectAsZip, 
  GeneratedFile 
} from '../utils/projectGenerator';
import { 
  Folder, 
  FileCode, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Terminal, 
  Shield, 
  Github, 
  Layers, 
  Settings2,
  CheckCircle2,
  FileText,
  Workflow,
  Lock,
  ArrowRight
} from 'lucide-react';

export const ProjectBuilder: React.FC = () => {
  const [config, setConfig] = useState<ProjectConfig>({
    name: 'my-github-starter',
    tagline: 'A clean, production-grade starter repository with full GitHub best practices.',
    author: 'Alex Developer',
    githubUser: 'alexdev',
    license: 'MIT',
    archetype: 'fullstack-web',
    includeCiWorkflow: true,
    includeIssueTemplates: true,
    includePrTemplate: true,
    includeDependabot: true,
    includeContributing: true,
    includeCodeOfConduct: true,
    includeSecurityPolicy: true,
    includeEnvExample: true,
    includeGitignore: true
  });

  const [selectedFilePath, setSelectedFilePath] = useState<string>('README.md');
  const [copiedFile, setCopiedFile] = useState(false);
  const [copiedBash, setCopiedBash] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Generate all files reactively
  const generatedFiles = useMemo(() => {
    return generateProjectFiles(config);
  }, [config]);

  const activeFile = useMemo(() => {
    return generatedFiles.find((f) => f.path === selectedFilePath) || generatedFiles[0];
  }, [generatedFiles, selectedFilePath]);

  const handleCopyFile = () => {
    if (activeFile) {
      navigator.clipboard.writeText(activeFile.content);
      setCopiedFile(true);
      setTimeout(() => setCopiedFile(false), 2000);
    }
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      await downloadProjectAsZip(config, generatedFiles);
    } finally {
      setIsDownloading(false);
    }
  };

  // Presets
  const applyPreset = (type: 'minimal' | 'fullstack' | 'python' | 'vanilla') => {
    if (type === 'minimal') {
      setConfig({
        name: 'minimal-starter',
        tagline: 'The 5 essential files every GitHub repository needs.',
        author: 'Alex Developer',
        githubUser: 'alexdev',
        license: 'MIT',
        archetype: 'minimal',
        includeCiWorkflow: false,
        includeIssueTemplates: false,
        includePrTemplate: false,
        includeDependabot: false,
        includeContributing: false,
        includeCodeOfConduct: false,
        includeSecurityPolicy: false,
        includeEnvExample: true,
        includeGitignore: true
      });
      setSelectedFilePath('README.md');
    } else if (type === 'python') {
      setConfig({
        name: 'python-service',
        tagline: 'Python service with unit testing, virtualenv configuration, and CI pipeline.',
        author: 'Alex Developer',
        githubUser: 'alexdev',
        license: 'MIT',
        archetype: 'python-app',
        includeCiWorkflow: true,
        includeIssueTemplates: true,
        includePrTemplate: true,
        includeDependabot: true,
        includeContributing: true,
        includeCodeOfConduct: true,
        includeSecurityPolicy: true,
        includeEnvExample: true,
        includeGitignore: true
      });
      setSelectedFilePath('README.md');
    } else if (type === 'vanilla') {
      setConfig({
        name: 'web-landing-page',
        tagline: 'Simple HTML, CSS, and modern JavaScript website.',
        author: 'Alex Developer',
        githubUser: 'alexdev',
        license: 'MIT',
        archetype: 'frontend-vanilla',
        includeCiWorkflow: true,
        includeIssueTemplates: false,
        includePrTemplate: true,
        includeDependabot: false,
        includeContributing: true,
        includeCodeOfConduct: false,
        includeSecurityPolicy: false,
        includeEnvExample: false,
        includeGitignore: true
      });
      setSelectedFilePath('README.md');
    } else {
      setConfig({
        name: 'my-github-starter',
        tagline: 'A clean, production-grade starter repository with full GitHub best practices.',
        author: 'Alex Developer',
        githubUser: 'alexdev',
        license: 'MIT',
        archetype: 'fullstack-web',
        includeCiWorkflow: true,
        includeIssueTemplates: true,
        includePrTemplate: true,
        includeDependabot: true,
        includeContributing: true,
        includeCodeOfConduct: true,
        includeSecurityPolicy: true,
        includeEnvExample: true,
        includeGitignore: true
      });
      setSelectedFilePath('README.md');
    }
  };

  const safeDirName = config.name.toLowerCase().replace(/[^a-z0-9-_]/g, '-') || 'my-project';
  const bashCommands = `# 1. Extract the downloaded ZIP or enter your project folder:
cd ${safeDirName}

# 2. Initialize local Git repository:
git init

# 3. Stage all generated files (secrets & junk are safely ignored by .gitignore!):
git add .

# 4. Make your first official commit:
git commit -m "feat: initial commit with professional GitHub structure"

# 5. Rename default branch to main:
git branch -M main

# 6. Link to your new empty GitHub repository:
git remote add origin https://github.com/${config.githubUser}/${safeDirName}.git

# 7. Push all code and branches to GitHub:
git push -u origin main`;

  const handleCopyBash = () => {
    navigator.clipboard.writeText(bashCommands);
    setCopiedBash(true);
    setTimeout(() => setCopiedBash(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Hero Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-2xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-slate-800/90 px-2.5 py-1 rounded border border-slate-700">
            <Sparkles className="w-3.5 h-3.5" /> Built-In Project Scaffolder
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Build &amp; Download Your GitHub Repository
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Generate a complete, turnkey repository blueprint tailored with automated GitHub Actions CI, security policies, issue templates, licensing, and clean file hierarchy. Inspect every file live, then export a ready-to-push <code className="text-emerald-300 font-mono">.zip</code> bundle.
          </p>

          {/* Quick Presets */}
          <div className="pt-2 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Quick Templates:</span>
            <button
              onClick={() => applyPreset('fullstack')}
              className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 font-medium"
            >
              Full-Stack Web App
            </button>
            <button
              onClick={() => applyPreset('minimal')}
              className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 font-medium"
            >
              Minimal 5-File Starter
            </button>
            <button
              onClick={() => applyPreset('python')}
              className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 font-medium"
            >
              Python Service / CLI
            </button>
            <button
              onClick={() => applyPreset('vanilla')}
              className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 font-medium"
            >
              HTML/JS Web App
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Config + Live File Explorer & Code Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Configuration */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Settings2 className="w-4 h-4 text-slate-500" />
                1. Project Identity
              </h3>
              <span className="text-2xs font-mono text-slate-400">{generatedFiles.length} files</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Name</label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="my-awesome-repo"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline / Hook</label>
              <input
                type="text"
                value={config.tagline}
                onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="What does your project do?"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Author Name</label>
                <input
                  type="text"
                  value={config.author}
                  onChange={(e) => setConfig({ ...config, author: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub User</label>
                <input
                  type="text"
                  value={config.githubUser}
                  onChange={(e) => setConfig({ ...config, githubUser: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Stack Archetype</label>
                <select
                  value={config.archetype}
                  onChange={(e) => setConfig({ ...config, archetype: e.target.value as any })}
                  className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="fullstack-web">Full-Stack Node</option>
                  <option value="minimal">Minimal (5 files)</option>
                  <option value="python-app">Python Service</option>
                  <option value="frontend-vanilla">HTML/JS Web</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Open Source License</label>
                <select
                  value={config.license}
                  onChange={(e) => setConfig({ ...config, license: e.target.value as any })}
                  className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="MIT">MIT (Permissive)</option>
                  <option value="Apache-2.0">Apache 2.0 (Patents)</option>
                  <option value="GPL-3.0">GNU GPLv3 (Copyleft)</option>
                  <option value="Unlicense">Unlicense (Public Domain)</option>
                </select>
              </div>
            </div>

            {/* Feature Checkboxes */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                2. GitHub Features to Include
              </span>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={config.includeCiWorkflow}
                  onChange={(e) => setConfig({ ...config, includeCiWorkflow: e.target.checked })}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>GitHub Actions CI Pipeline (<code className="font-mono text-2xs text-slate-500">.github/workflows</code>)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={config.includeIssueTemplates}
                  onChange={(e) => setConfig({ ...config, includeIssueTemplates: e.target.checked })}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>Issue Templates (Bug report, Feature request)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={config.includePrTemplate}
                  onChange={(e) => setConfig({ ...config, includePrTemplate: e.target.checked })}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>Pull Request Checklist Template</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={config.includeGitignore}
                  onChange={(e) => setConfig({ ...config, includeGitignore: e.target.checked })}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>Strict Security <code className="font-mono text-2xs">.gitignore</code></span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={config.includeEnvExample}
                  onChange={(e) => setConfig({ ...config, includeEnvExample: e.target.checked })}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>Secrets Template (<code className="font-mono text-2xs">.env.example</code>)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={config.includeContributing}
                  onChange={(e) => setConfig({ ...config, includeContributing: e.target.checked })}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>Contributing Guide (<code className="font-mono text-2xs">CONTRIBUTING.md</code>)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={config.includeSecurityPolicy}
                  onChange={(e) => setConfig({ ...config, includeSecurityPolicy: e.target.checked })}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>Security Policy (<code className="font-mono text-2xs">SECURITY.md</code>)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={config.includeDependabot}
                  onChange={(e) => setConfig({ ...config, includeDependabot: e.target.checked })}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>Dependabot Security Scanner</span>
              </label>
            </div>

            {/* Direct Download Button */}
            <div className="pt-2">
              <button
                onClick={handleDownloadZip}
                disabled={isDownloading}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? 'Bundling ZIP...' : `Download ${config.name}.zip`}</span>
              </button>
              <p className="text-2xs text-slate-400 text-center mt-1.5">
                Ready to unzip and initialize with <code className="font-mono">git init</code>
              </p>
            </div>
          </div>
        </div>

        {/* Right Area: Interactive Generated Tree + Code Preview */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg shadow-xs flex flex-col overflow-hidden">
          {/* File Picker & Action Bar */}
          <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1">
                <Folder className="w-3.5 h-3.5 text-amber-500" /> Files:
              </span>
              {generatedFiles.map((file) => {
                const isSelected = file.path === activeFile.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFilePath(file.path)}
                    className={`px-2.5 py-1 text-2xs font-mono rounded-md transition-colors whitespace-nowrap border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-2xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {file.name}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyFile}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors shadow-2xs"
              >
                {copiedFile ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedFile ? 'Copied' : 'Copy File'}</span>
              </button>

              <button
                onClick={handleDownloadZip}
                disabled={isDownloading}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 rounded-md transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export ZIP</span>
              </button>
            </div>
          </div>

          {/* Active File Explanation Header */}
          <div className="p-3 bg-slate-100/70 border-b border-slate-200 text-xs flex items-start gap-2.5">
            <div className="p-1 rounded bg-white border border-slate-200 text-blue-600 mt-0.5">
              <FileCode className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900">{activeFile.path}</span>
                <span className="text-2xs font-mono uppercase bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">
                  {activeFile.language}
                </span>
              </div>
              <p className="text-slate-600 text-2xs mt-0.5">{activeFile.explanation}</p>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto flex-1 max-h-[500px]">
            <pre className="whitespace-pre leading-relaxed">{activeFile.content}</pre>
          </div>
        </div>
      </div>

      {/* Step-by-Step Terminal Push Guide */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600" />
              How to Push Your New Project to GitHub
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Follow these standard 7 commands in your local computer&apos;s terminal to turn your downloaded files into a live GitHub repo.
            </p>
          </div>

          <button
            onClick={handleCopyBash}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors border border-slate-200 self-start"
          >
            {copiedBash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedBash ? 'Commands Copied!' : 'Copy Terminal Script'}</span>
          </button>
        </div>

        <div className="bg-slate-950 text-slate-200 rounded-lg p-4 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre className="whitespace-pre text-slate-300 leading-relaxed">{bashCommands}</pre>
        </div>

        {/* Beginner Explanations of the commands */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-2xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">`git init`</span>
            Creates the hidden <code className="font-mono">.git/</code> directory which tracks your local history and file changes.
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">`git remote add origin`</span>
            Connects your local project folder to the remote GitHub repository URL in the cloud.
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">`git push -u origin main`</span>
            Uploads all files and your initial commit to GitHub. The <code className="font-mono">-u</code> sets up automatic branch tracking.
          </div>
        </div>
      </div>
    </div>
  );
};
