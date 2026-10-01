import React, { useState, useMemo } from 'react';
import { REPO_TEMPLATES } from '../data/repoTemplates';
import { FileNode, RepoTemplate } from '../types/repo';
import { FileInspector } from './FileInspector';
import { 
  Folder, 
  FolderOpen, 
  File, 
  FileCode, 
  FileText, 
  Settings, 
  Shield, 
  KeyRound, 
  Scale, 
  Box, 
  ChevronRight, 
  ChevronDown,
  Search,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';

export const RepoExplorer: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('fullstack-web');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'root-fullstack': true,
    'gh-folder': true,
    'gh-workflows': true,
    'src-folder': true,
    'root-python': true,
    'py-github': true,
    'py-app': true,
    'root-minimal': true,
    'min-src': true
  });
  const [selectedNodeId, setSelectedNodeId] = useState<string>('readme-md');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const currentTemplate: RepoTemplate = useMemo(() => {
    return REPO_TEMPLATES.find((t) => t.id === selectedTemplateId) || REPO_TEMPLATES[0];
  }, [selectedTemplateId]);

  // Find currently selected node recursively
  const findNode = (node: FileNode, targetId: string): FileNode | null => {
    if (node.id === targetId) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findNode(child, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedNode = useMemo(() => {
    const found = findNode(currentTemplate.root, selectedNodeId);
    if (found) return found;
    // Default to README or first child
    const defaultNode = findNode(currentTemplate.root, 'readme-md') || 
                        findNode(currentTemplate.root, 'py-readme') || 
                        findNode(currentTemplate.root, 'min-readme') || 
                        currentTemplate.root;
    return defaultNode;
  }, [currentTemplate, selectedNodeId]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const getFileIcon = (node: FileNode) => {
    if (node.type === 'folder') {
      const isExpanded = expandedFolders[node.id];
      return isExpanded ? <FolderOpen className="w-4 h-4 text-amber-500" /> : <Folder className="w-4 h-4 text-amber-500" />;
    }

    const name = node.name.toLowerCase();
    if (name === 'readme.md') return <FileText className="w-4 h-4 text-emerald-600" />;
    if (name === 'license') return <Scale className="w-4 h-4 text-indigo-600" />;
    if (name.includes('gitignore')) return <Shield className="w-4 h-4 text-rose-500" />;
    if (name.includes('.env')) return <KeyRound className="w-4 h-4 text-amber-600" />;
    if (name.endsWith('.json') || name.endsWith('.toml')) return <Settings className="w-4 h-4 text-sky-600" />;
    if (name.endsWith('.yml') || name.endsWith('.yaml')) return <Box className="w-4 h-4 text-violet-600" />;
    if (name === 'dockerfile') return <Box className="w-4 h-4 text-cyan-600" />;
    if (name.endsWith('.ts') || name.endsWith('.tsx') || name.endsWith('.js') || name.endsWith('.py')) {
      return <FileCode className="w-4 h-4 text-blue-600" />;
    }
    return <File className="w-4 h-4 text-slate-400" />;
  };

  // Render tree node
  const renderTreeNode = (node: FileNode, depth = 0): React.ReactNode => {
    const isFolder = node.type === 'folder';
    const isExpanded = expandedFolders[node.id];
    const isSelected = selectedNode?.id === node.id;

    // Filter check
    const matchesSearch = searchQuery.trim() === '' || 
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || 
      (categoryFilter === 'essential' && node.importance === 'essential') ||
      (categoryFilter === 'ci' && node.category === 'ci') ||
      (categoryFilter === 'config' && node.category === 'config') ||
      (categoryFilter === 'docs' && node.category === 'docs');

    // If folder, check if any children match
    const hasMatchingDescendant = (n: FileNode): boolean => {
      if (!n.children) return false;
      return n.children.some(child => {
        const match = (searchQuery === '' || child.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
                      (categoryFilter === 'all' || child.category === categoryFilter || (categoryFilter === 'essential' && child.importance === 'essential'));
        return match || hasMatchingDescendant(child);
      });
    };

    if (!matchesSearch && !matchesCategory && !hasMatchingDescendant(node)) {
      return null;
    }

    return (
      <div key={node.id} className="select-none">
        <div
          onClick={() => {
            if (isFolder) {
              toggleFolder(node.id);
            }
            setSelectedNodeId(node.id);
          }}
          style={{ paddingLeft: `${depth * 16 + 10}px` }}
          className={`flex items-center gap-1.5 py-1.5 pr-2 rounded-md cursor-pointer text-xs sm:text-sm font-mono transition-colors group ${
            isSelected
              ? 'bg-slate-900 text-white font-semibold shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          {isFolder ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(node.id);
              }}
              className="p-0.5 hover:bg-slate-200/50 rounded"
            >
              {isExpanded ? (
                <ChevronDown className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`} />
              ) : (
                <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`} />
              )}
            </button>
          ) : (
            <span className="w-3.5" />
          )}

          <span className="shrink-0">{getFileIcon(node)}</span>

          <span className="truncate flex-1">{node.name}</span>

          {node.importance === 'essential' && (
            <span
              className={`text-2xs px-1.5 py-0.2 rounded font-sans tracking-tight shrink-0 ${
                isSelected ? 'bg-slate-800 text-rose-300' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              Core
            </span>
          )}
        </div>

        {isFolder && isExpanded && node.children && (
          <div className="border-l border-slate-200 ml-4 pl-1">
            {node.children.map((child) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Intro Header & Template Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Interactive Repository Explorer</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Inspect real GitHub project architectures. Click any file or directory to learn why it exists, see realistic code, and avoid common beginner blunders.
          </p>
        </div>

        {/* Template Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 px-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Stack:
          </span>
          <div className="flex gap-1 flex-wrap">
            {REPO_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => {
                  setSelectedTemplateId(tmpl.id);
                  if (tmpl.id === 'fullstack-web') setSelectedNodeId('readme-md');
                  else if (tmpl.id === 'python-app') setSelectedNodeId('py-readme');
                  else setSelectedNodeId('min-readme');
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedTemplateId === tmpl.id
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tmpl.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Explorer Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[640px]">
        {/* Left Column: Repository Tree Browser */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg shadow-xs flex flex-col overflow-hidden">
          {/* Tree Header */}
          <div className="p-3.5 border-b border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Project Tree</span>
              <span className="text-xs text-slate-500 font-mono">{currentTemplate.ecosystem}</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files (e.g. .gitignore, ci.yml)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-800"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-2xs">
              <span className="text-slate-400 mr-1 flex items-center gap-0.5">
                <Filter className="w-3 h-3" />
              </span>
              {[
                { id: 'all', label: 'All Files' },
                { id: 'essential', label: 'Core Essentials' },
                { id: 'ci', label: 'GitHub CI/CD' },
                { id: 'config', label: 'Configs' },
                { id: 'docs', label: 'Documentation' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setCategoryFilter(f.id)}
                  className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap ${
                    categoryFilter === f.id
                      ? 'bg-slate-900 text-white font-medium'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tree Content */}
          <div className="p-3 overflow-y-auto flex-1 max-h-[550px] space-y-0.5">
            {renderTreeNode(currentTemplate.root)}
          </div>

          {/* Quick Helper Footer */}
          <div className="p-2.5 border-t border-slate-200 bg-slate-50 text-2xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Core: Required for all repos
            </span>
            <span>Click any item to inspect</span>
          </div>
        </div>

        {/* Right Column: File Inspector */}
        <div className="lg:col-span-7">
          <FileInspector selectedNode={selectedNode} />
        </div>
      </div>
    </div>
  );
};
