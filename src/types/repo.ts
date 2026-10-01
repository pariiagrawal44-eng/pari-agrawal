export type FileCategory = 'meta' | 'config' | 'source' | 'ci' | 'docs' | 'security' | 'asset';
export type FileImportance = 'essential' | 'recommended' | 'optional';

export interface FileAnnotation {
  lines: string;
  title: string;
  description: string;
}

export interface FileNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  category?: FileCategory;
  importance?: FileImportance;
  summary: string;
  whatItDoes: string;
  whyItMatters: string;
  sampleContent?: string;
  language?: string;
  annotations?: FileAnnotation[];
  commonMistakes?: string[];
  proTip?: string;
  githubFunctionality?: string;
}

export interface RepoTemplate {
  id: string;
  title: string;
  tagline: string;
  ecosystem: string;
  description: string;
  root: FileNode;
}

export interface EssentialFileTopic {
  id: string;
  filename: string;
  title: string;
  shortDesc: string;
  badge: string;
  whyNeeded: string;
  structure: { item: string; detail: string }[];
  goodExample: string;
  badExample?: string;
  dos: string[];
  donts: string[];
  beginnerFaq: { q: string; a: string }[];
}

export interface WorkflowStep {
  step: number;
  title: string;
  phase: 'Local Machine' | 'GitHub Remote' | 'Collaboration';
  action: string;
  description: string;
  gitCommand?: string;
  githubActionText?: string;
  visualGraphic: 'clone' | 'branch' | 'stage' | 'commit' | 'push' | 'pr' | 'ci' | 'review' | 'merge';
  tip: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ruleOfThumb: string;
}

export interface GlossaryTerm {
  term: string;
  category: 'Git' | 'GitHub' | 'Workflow';
  definition: string;
  beginnerMetaphor: string;
  example: string;
}
