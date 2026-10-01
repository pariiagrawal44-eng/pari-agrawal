import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  Plus, 
  Trash2, 
  Eye, 
  Code, 
  Sparkles,
  FileText
} from 'lucide-react';

export const ReadmeBuilder: React.FC = () => {
  const [projectName, setProjectName] = useState('TaskFlow');
  const [tagline, setTagline] = useState('A minimalist, keyboard-first task manager for engineering teams.');
  const [githubUser, setGithubUser] = useState('johndoe');
  const [repoName, setRepoName] = useState('taskflow');
  const [license, setLicense] = useState('MIT');
  const [includeBadges, setIncludeBadges] = useState(true);
  const [previewTab, setPreviewTab] = useState<'raw' | 'preview'>('raw');
  const [copied, setCopied] = useState(false);

  // Tech stack items
  const [selectedTech, setSelectedTech] = useState<string[]>([
    'TypeScript',
    'React',
    'Tailwind CSS',
    'Vite'
  ]);

  const availableTech = [
    'TypeScript',
    'JavaScript',
    'React',
    'Next.js',
    'Node.js',
    'Express',
    'Python',
    'FastAPI',
    'Tailwind CSS',
    'PostgreSQL',
    'Docker',
    'Vite'
  ];

  // Features list
  const [features, setFeatures] = useState<string[]>([
    'Instant local sync with zero latency',
    'Keyboard shortcut command palette (`Cmd + K`)',
    'End-to-end type safety with strict TypeScript'
  ]);
  const [newFeatureText, setNewFeatureText] = useState('');

  const toggleTech = (tech: string) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter((t) => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const addFeature = () => {
    if (newFeatureText.trim()) {
      setFeatures([...features, newFeatureText.trim()]);
      setNewFeatureText('');
    }
  };

  const removeFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  // Generate markdown output
  const generatedMarkdown = useMemo(() => {
    const badgesSection = includeBadges
      ? `[![License: ${license}](https://img.shields.io/badge/License-${license}-yellow.svg)](https://opensource.org/licenses/${license})
[![CI Status](https://github.com/${githubUser}/${repoName}/actions/workflows/ci.yml/badge.svg)](https://github.com/${githubUser}/${repoName}/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

`
      : '';

    const techBadges = selectedTech.length > 0
      ? `### 🛠️ Built With\n${selectedTech.map((t) => `- **${t}**`).join('\n')}\n\n`
      : '';

    const featuresList = features.length > 0
      ? `## ✨ Features\n${features.map((f) => `- ${f}`).join('\n')}\n\n`
      : '';

    return `# ${projectName}

> ${tagline}

${badgesSection}---

${featuresList}${techBadges}## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm package manager

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/${githubUser}/${repoName}.git
   cd ${repoName}
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure Environment Variables:**
   \`\`\`bash
   cp .env.example .env
   # Open .env and add your configuration
   \`\`\`

4. **Run the local development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 🧪 Running Tests
\`\`\`bash
npm test
\`\`\`

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/${githubUser}/${repoName}/issues). Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting pull requests.

## 📄 License
This project is licensed under the **${license} License** - see the [LICENSE](LICENSE) file for details.
`;
  }, [projectName, tagline, githubUser, repoName, license, includeBadges, selectedTech, features]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'README.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Interactive README.md Generator</span>
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          A great README is what turns a quiet repository into a standout portfolio project. Configure your project details below and copy clean, professional Markdown.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Config & Inputs */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
            Project Configuration
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="My Awesome App"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Username</label>
              <input
                type="text"
                value={githubUser}
                onChange={(e) => setGithubUser(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="octocat"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">One-Line Hook / Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
              placeholder="What problem does this project solve in 1 sentence?"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Repo Name</label>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="taskflow"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">License</label>
              <select
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="MIT">MIT (Permissive, recommended)</option>
                <option value="Apache-2.0">Apache 2.0 (Patents protected)</option>
                <option value="GPL-3.0">GNU GPLv3 (Copyleft)</option>
                <option value="Unlicense">Unlicense (Public Domain)</option>
              </select>
            </div>
          </div>

          {/* Tech Stack Toggles */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tech Stack</label>
            <div className="flex flex-wrap gap-1.5">
              {availableTech.map((tech) => {
                const isSelected = selectedTech.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`px-2.5 py-1 text-2xs rounded-md font-mono transition-colors border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Features List */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Key Features</label>
            <div className="space-y-1.5 mb-2">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-200 text-xs">
                  <span className="text-slate-400 select-none">•</span>
                  <span className="flex-1 text-slate-800">{feat}</span>
                  <button
                    onClick={() => removeFeature(idx)}
                    className="text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                placeholder="Add a new feature..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <button
                onClick={addFeature}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeBadges}
                onChange={(e) => setIncludeBadges(e.target.checked)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              <span>Include shields.io status &amp; license badges</span>
            </label>
          </div>
        </div>

        {/* Right Output: Preview & Export */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-lg shadow-xs flex flex-col overflow-hidden">
          {/* Header Controls */}
          <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewTab('raw')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  previewTab === 'raw'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                Raw Markdown
              </button>
              <button
                onClick={() => setPreviewTab('preview')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  previewTab === 'preview'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                GitHub Preview
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors shadow-2xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 rounded-md transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Body Viewer */}
          <div className="p-4 flex-1 overflow-y-auto max-h-[620px]">
            {previewTab === 'raw' ? (
              <pre className="font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                {generatedMarkdown}
              </pre>
            ) : (
              <div className="prose prose-slate prose-sm max-w-none space-y-3">
                <h1 className="text-xl font-bold border-b border-slate-200 pb-2 text-slate-900">{projectName}</h1>
                <p className="text-slate-600 italic">{tagline}</p>
                
                {includeBadges && (
                  <div className="flex gap-2 flex-wrap text-2xs font-mono">
                    <span className="bg-yellow-100 text-yellow-900 px-2 py-0.5 rounded border border-yellow-200">
                      license: {license}
                    </span>
                    <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-200">
                      build: passing
                    </span>
                  </div>
                )}

                <h3 className="text-base font-semibold mt-4 text-slate-900">Features</h3>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-700 space-y-1">
                  {features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>

                <h3 className="text-base font-semibold mt-4 text-slate-900">Getting Started</h3>
                <div className="bg-slate-900 text-slate-200 p-3 rounded font-mono text-xs">
                  <div>$ git clone https://github.com/{githubUser}/{repoName}.git</div>
                  <div>$ cd {repoName}</div>
                  <div>$ npm install</div>
                  <div>$ npm run dev</div>
                </div>

                <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
                  Licensed under the {license} License.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
