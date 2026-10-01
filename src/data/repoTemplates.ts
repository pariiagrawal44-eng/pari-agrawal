import { RepoTemplate } from '../types/repo';

export const REPO_TEMPLATES: RepoTemplate[] = [
  {
    id: 'fullstack-web',
    title: 'Full-Stack Web App',
    tagline: 'React 19 + Node.js Express + TypeScript',
    ecosystem: 'TypeScript / Node.js',
    description: 'The standard modern web repository setup containing frontend client, backend API server, CI pipelines, and environment separation.',
    root: {
      id: 'root-fullstack',
      name: 'my-modern-webapp',
      path: '/',
      type: 'folder',
      summary: 'Root project directory containing all configuration, source code, and metadata.',
      whatItDoes: 'The top-level container holding every file and folder tracked by Git.',
      whyItMatters: 'GitHub looks for specific files at the root (like README.md, LICENSE, and .github/) to render the project home page and trigger automations.',
      children: [
        {
          id: 'gh-folder',
          name: '.github',
          path: '/.github',
          type: 'folder',
          category: 'ci',
          importance: 'recommended',
          summary: 'GitHub platform-specific configuration directory.',
          whatItDoes: 'Hosts all GitHub-specific features like GitHub Actions automated workflows, Issue Templates, Pull Request templates, and Dependabot security configs.',
          whyItMatters: 'Any folder starting with a dot is hidden on Unix systems, but GitHub automatically scans `.github/` to enable platform automations.',
          children: [
            {
              id: 'gh-workflows',
              name: 'workflows',
              path: '/.github/workflows',
              type: 'folder',
              category: 'ci',
              importance: 'recommended',
              summary: 'GitHub Actions Continuous Integration & Deployment (CI/CD) pipelines.',
              whatItDoes: 'Contains YAML files describing tasks GitHub should automatically run whenever you push code or open a Pull Request.',
              whyItMatters: 'Prevents broken code from merging by automatically running linting, tests, and builds in a cloud VM.',
              children: [
                {
                  id: 'ci-yml',
                  name: 'ci.yml',
                  path: '/.github/workflows/ci.yml',
                  type: 'file',
                  category: 'ci',
                  importance: 'recommended',
                  language: 'yaml',
                  summary: 'Automated test and lint workflow executed on every pull request.',
                  whatItDoes: 'Spins up an Ubuntu runner, installs dependencies, checks TypeScript types, lints source code, and executes test suites.',
                  whyItMatters: 'Acts as your quality guardrail. If any test fails, GitHub puts a red X on the Pull Request and blocks merging.',
                  sampleContent: `name: CI Quality Checks

on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    name: Run Linter & Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Run Test Suite
        run: npm test -- --coverage`,
                  annotations: [
                    { lines: '3-7', title: 'Workflow Triggers (`on:`)', description: 'Specifies when GitHub should execute this workflow: on pushes to main/dev and whenever someone opens a PR to main.' },
                    { lines: '9-12', title: 'Job & Virtual Environment', description: 'GitHub allocates a free disposable Ubuntu Linux virtual machine in the cloud to run your pipeline.' },
                    { lines: '14-16', title: 'Checkout Action', description: 'Downloads your repository code into the virtual machine so subsequent commands can access it.' },
                    { lines: '24-25', title: 'Deterministic Install (`npm ci`)', description: 'Uses package-lock.json for 100% reproducible clean installs in automated runners.' }
                  ],
                  commonMistakes: [
                    'Using `npm install` instead of `npm ci` in CI (can result in inconsistent dependency versions)',
                    'Indentation errors in YAML: 2 spaces is standard; tabs will break GitHub Actions',
                    'Hardcoding secrets in YAML instead of using GitHub Repository Secrets (`${{ secrets.API_KEY }}`)'
                  ],
                  proTip: 'GitHub gives free public repositories unlimited GitHub Actions minutes and private repos 2,000 free minutes per month!'
                },
                {
                  id: 'deploy-yml',
                  name: 'deploy.yml',
                  path: '/.github/workflows/deploy.yml',
                  type: 'file',
                  category: 'ci',
                  importance: 'optional',
                  language: 'yaml',
                  summary: 'Continuous Delivery pipeline that builds and deploys to production.',
                  whatItDoes: 'Triggers automatically after a Pull Request is merged into the `main` branch to push fresh code to hosting providers (Vercel, AWS, Cloud Run).',
                  whyItMatters: 'Eliminates manual FTP/SSH uploads and guarantees reproducible production deployments.',
                  sampleContent: `name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      # Deploy command uses secrets stored securely in GitHub Repo Settings
      - run: echo "Deploying artifacts to production..."`
                }
              ]
            },
            {
              id: 'issue-templates',
              name: 'ISSUE_TEMPLATE',
              path: '/.github/ISSUE_TEMPLATE',
              type: 'folder',
              category: 'meta',
              importance: 'optional',
              summary: 'Standardized forms for bug reports and feature requests.',
              whatItDoes: 'When users click "New Issue" on GitHub, these templates present them with guided markdown forms asking for system info, reproduction steps, and screenshots.',
              whyItMatters: 'Stops contributors from submitting vague "it does not work" issues without actionable debugging details.'
            },
            {
              id: 'pr-template',
              name: 'PULL_REQUEST_TEMPLATE.md',
              path: '/.github/PULL_REQUEST_TEMPLATE.md',
              type: 'file',
              category: 'meta',
              importance: 'recommended',
              language: 'markdown',
              summary: 'Default checklist pre-filled when opening a Pull Request.',
              whatItDoes: 'Automatically populates the PR description box with headers asking for: What changed, Related Issue #, Testing notes, and a PR checklist.',
              whyItMatters: 'Ensures every contributor follows team review standards before asking maintainers to review code.',
              sampleContent: `## Description
Briefly describe what this PR does and why it is needed.

## Related Issue
Fixes # (issue number)

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix/feature that breaks existing behavior)
- [ ] Documentation update

## Checklist:
- [ ] My code follows the project style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have added tests that prove my fix is effective
- [ ] New and existing unit tests pass locally with my changes`
            },
            {
              id: 'dependabot',
              name: 'dependabot.yml',
              path: '/.github/dependabot.yml',
              type: 'file',
              category: 'security',
              importance: 'recommended',
              language: 'yaml',
              summary: 'Automated dependency vulnerability scanner and updater.',
              whatItDoes: 'Tells GitHub to check your npm packages daily/weekly and automatically submit a Pull Request whenever a package has a known security vulnerability or version bump.',
              whyItMatters: 'Keeps your app secure without you having to manually check for CVE vulnerabilities every week.',
              sampleContent: `version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5`
            }
          ]
        },
        {
          id: 'src-folder',
          name: 'src',
          path: '/src',
          type: 'folder',
          category: 'source',
          importance: 'essential',
          summary: 'Application source code written and maintained by developers.',
          whatItDoes: 'The primary workspace where the frontend user interface, state management, components, and client-side logic reside.',
          whyItMatters: 'Separates human-written code from build artifacts, third-party libraries, and configuration files.',
          children: [
            {
              id: 'components-folder',
              name: 'components',
              path: '/src/components',
              type: 'folder',
              category: 'source',
              importance: 'recommended',
              summary: 'Reusable UI elements (Buttons, Modals, Navbars).',
              whatItDoes: 'Houses modular building blocks following the Single Responsibility Principle.',
              whyItMatters: 'Keeps pages clean and avoids duplicating UI code across the application.'
            },
            {
              id: 'app-tsx',
              name: 'App.tsx',
              path: '/src/App.tsx',
              type: 'file',
              category: 'source',
              importance: 'essential',
              language: 'typescript',
              summary: 'Root application component wiring layouts and routing.',
              whatItDoes: 'Serves as the top-level React component rendering the navigation bar, routes, and main layout structure.',
              whyItMatters: 'The entry point for visual hierarchy and global application state providers.',
              sampleContent: `import React from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Dashboard />
      </main>
    </div>
  );
}`
            },
            {
              id: 'main-tsx',
              name: 'main.tsx',
              path: '/src/main.tsx',
              type: 'file',
              category: 'source',
              importance: 'essential',
              language: 'typescript',
              summary: 'DOM mounting entry point that attaches React to HTML.',
              whatItDoes: 'Finds `<div id="root"></div>` in index.html and starts the React virtual DOM tree.',
              whyItMatters: 'The bridge connecting static HTML to dynamic JavaScript execution.'
            }
          ]
        },
        {
          id: 'public-folder',
          name: 'public',
          path: '/public',
          type: 'folder',
          category: 'asset',
          importance: 'recommended',
          summary: 'Static assets served directly without bundler transformation.',
          whatItDoes: 'Stores raw static assets like `favicon.ico`, `robots.txt`, manifest icons, and images that do not need to be processed by Vite/Webpack.',
          whyItMatters: 'Files in public are served verbatim at root URLs (e.g. `/favicon.ico` rather than hashed paths).'
        },
        {
          id: 'tests-folder',
          name: 'tests',
          path: '/tests',
          type: 'folder',
          category: 'source',
          importance: 'recommended',
          summary: 'Automated unit, integration, and end-to-end tests.',
          whatItDoes: 'Contains test suites (e.g. Vitest, Jest, Playwright) that verify your code works as expected before deployment.',
          whyItMatters: 'Prevents regressions and gives contributors confidence that changes won\'t break existing features.'
        },
        {
          id: 'gitignore',
          name: '.gitignore',
          path: '/.gitignore',
          type: 'file',
          category: 'config',
          importance: 'essential',
          language: 'shell',
          summary: 'Explicit list of files and folders Git must never track or commit.',
          whatItDoes: 'Prevents huge folders (like `node_modules/`), secret keys (`.env`), system files (`.DS_Store`), and build outputs (`dist/`, `build/`) from ever being committed to GitHub.',
          whyItMatters: 'Number one defense against accidentally leaking passwords/API keys and bloating your repository with thousands of junk files.',
          sampleContent: `# Dependencies (never commit thousands of third-party files!)
node_modules/
.pnp
.pnp.js

# Environment Variables & Secrets (CRITICAL: never commit real API keys!)
.env
.env.local
.env.production.local
*.pem
*.key

# Build and distribution outputs
dist/
build/
coverage/

# Operating System junk
.DS_Store
Thumbs.db

# IDE and Editor configurations
.vscode/*
!.vscode/extensions.json
.idea/`,
          annotations: [
            { lines: '2', title: '`node_modules/` Excluded', description: 'Dependencies can easily be 500MB+ and 30,000 files. Instead, commit package.json and let developers run `npm install`.' },
            { lines: '8-10', title: 'Secrets & `.env` Excluded', description: 'Prevents security leaks. Publicly leaking an AWS or Stripe key on GitHub can cost thousands of dollars in minutes!' },
            { lines: '14-16', title: 'Compiled Build Artifacts', description: 'Distributable files are generated on-the-fly by CI/CD or build commands, so tracking them causes endless merge conflicts.' },
            { lines: '19-20', title: 'OS-Specific Metadata', description: 'Files like `.DS_Store` are created silently by macOS Finder and clutter your Git commit history.' }
          ],
          commonMistakes: [
            'Committing `.env` before adding it to `.gitignore` (Git keeps tracking a file even after adding it to .gitignore if it was already committed)',
            'Forgetting `node_modules/` and accidentally pushing 50,000 files to GitHub',
            'Committing developer-specific IDE files like `.idea/` or personal debug logs'
          ],
          proTip: 'If you accidentally committed a secret before gitignoring it, use `git rm --cached .env` to stop tracking it without deleting your local copy!'
        },
        {
          id: 'env-example',
          name: '.env.example',
          path: '/.env.example',
          type: 'file',
          category: 'config',
          importance: 'essential',
          language: 'shell',
          summary: 'Safe template documenting all required environment variables with dummy values.',
          whatItDoes: 'Shows other developers (and your future self) which environment variables the app needs to run, without exposing real secrets.',
          whyItMatters: 'When a new developer clones your repo, they copy `.env.example` to `.env` and fill in their personal API keys.',
          sampleContent: `# App Server Configuration
PORT=3000
NODE_ENV=development

# Database Connection (Placeholder credentials only!)
DATABASE_URL="postgresql://user:password@localhost:5432/myapp_db"

# Third-Party API Keys (Never put your real secret key here!)
STRIPE_PUBLIC_KEY="pk_test_your_key_here"
OPENAI_API_KEY="sk-your-openai-api-key-here"
JWT_SECRET="replace-with-a-random-32-char-secret"`,
          annotations: [
            { lines: '1-3', title: 'Environment Config', description: 'Defines runtime options like port and node environment.' },
            { lines: '6', title: 'Database Connection Template', description: 'Shows format of database connection string without exposing production database credentials.' },
            { lines: '9-11', title: 'Dummy API Key Placeholders', description: 'Clear dummy indicators (`pk_test_...`, `your-key-here`) so contributors know what services are needed.' }
          ],
          commonMistakes: [
            'Putting real production keys in `.env.example` because "it\'s just an example"',
            'Renaming `.env.example` to `.env` in git instead of creating a local untracked `.env` file'
          ],
          proTip: 'Golden Rule: `.env` is PRIVATE (in .gitignore). `.env.example` is PUBLIC (committed to GitHub).'
        },
        {
          id: 'package-json',
          name: 'package.json',
          path: '/package.json',
          type: 'file',
          category: 'config',
          importance: 'essential',
          language: 'json',
          summary: 'The manifest and command center for any Node.js/JavaScript project.',
          whatItDoes: 'Defines your project name, version, runnable CLI scripts (`dev`, `build`, `test`), production dependencies, and developer dependencies.',
          whyItMatters: 'Tells tools like `npm` and GitHub what libraries your project requires to execute.',
          sampleContent: `{
  "name": "modern-webapp",
  "version": "1.0.0",
  "description": "Full-stack web application with React and Node.js",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.475.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "typescript": "^5.7.0",
    "vite": "^6.1.0",
    "vitest": "^3.0.0"
  },
  "license": "MIT"
}`,
          annotations: [
            { lines: '6-11', title: '`scripts` Object', description: 'Shortcuts you can run via `npm run <name>`. E.g., `npm run dev` starts the local web server.' },
            { lines: '12-16', title: '`dependencies` (Runtime)', description: 'Packages required in production for users to run the application (React, UI libraries, database clients).' },
            { lines: '17-22', title: '`devDependencies` (Build-time only)', description: 'Tools only needed during development (compilers, linters, test runners). These are excluded from final production builds.' },
            { lines: '23', title: 'License Field', description: 'SPDX license identifier indicating legal permission for others to use and modify your package.' }
          ],
          commonMistakes: [
            'Installing development tools (like TypeScript or Jest) under `dependencies` instead of `--save-dev`',
            'Manually editing version numbers in `dependencies` without running `npm install`',
            'Missing comma syntax errors: JSON is strict, trailing commas will cause errors'
          ],
          proTip: 'GitHub automatically parses `package.json` to show your repo\'s dependency graph and alert you to outdated packages!'
        },
        {
          id: 'package-lock-json',
          name: 'package-lock.json',
          path: '/package-lock.json',
          type: 'file',
          category: 'config',
          importance: 'essential',
          language: 'json',
          summary: 'The exact snapshot of every installed dependency and sub-dependency version.',
          whatItDoes: 'Locks down the exact version numbers, integrity hashes, and dependency trees of all packages downloaded into `node_modules`.',
          whyItMatters: 'Guarantees that when your teammate or GitHub Actions runs `npm ci`, they get the EXACT same code down to the bit, avoiding "works on my machine" bugs.',
          sampleContent: `{
  "name": "modern-webapp",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "modern-webapp",
      "version": "1.0.0",
      "dependencies": {
        "react": "^19.0.0"
      }
    },
    "node_modules/react": {
      "version": "19.0.0",
      "resolved": "https://registry.npmjs.org/react/-/react-19.0.0.tgz",
      "integrity": "sha512-V8Pz...=="
    }
  }
}`,
          commonMistakes: [
            'Adding `package-lock.json` to `.gitignore`! NEVER do this! A lockfile MUST be committed to Git.',
            'Deleting `package-lock.json` whenever there is a conflict instead of properly updating it.'
          ],
          proTip: 'A common beginner mistake is thinking lockfiles are unnecessary clutter. In production engineering, committing lockfiles is non-negotiable!'
        },
        {
          id: 'readme-md',
          name: 'README.md',
          path: '/README.md',
          type: 'file',
          category: 'docs',
          importance: 'essential',
          language: 'markdown',
          summary: 'The front door and homepage of your GitHub repository.',
          whatItDoes: 'GitHub automatically renders this file directly on your repository homepage. It tells visitors what the project is, why it exists, how to install it, and how to run it.',
          whyItMatters: 'The single most read file in any software project. Without a good README, 90% of developers will close your repo and look elsewhere.',
          sampleContent: `# 🚀 Modern WebApp

> A high-performance full-stack web application built with React 19, TypeScript, and Node.js.

[![CI Status](https://github.com/myorg/modern-webapp/actions/workflows/ci.yml/badge.svg)](https://github.com/myorg/modern-webapp/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Key Features
- ⚡ **Lightning Fast**: Built on modern Vite bundler
- 🛡️ **Type-Safe**: End-to-end TypeScript strict mode
- 🎨 **Responsive UI**: Tailwind CSS styled components
- 🧪 **Tested**: Comprehensive unit tests with Vitest

## 📋 Prerequisites
- Node.js (version 20 or higher)
- npm or pnpm

## 🚀 Quickstart

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/modern-webapp.git
   cd modern-webapp
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure Environment Variables**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your local credentials
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🤝 Contributing
Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the submission process.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.`,
          annotations: [
            { lines: '1-3', title: 'Catchy Header & Tagline', description: 'Explains what the app does in one concise sentence immediately.' },
            { lines: '5-6', title: 'Status Badges', description: 'Visually shows build pass/fail status and open source license directly from shields.io or GitHub Actions.' },
            { lines: '18-40', title: 'Copy-Paste Quickstart Commands', description: 'Never make users guess how to run your code. Always provide exact step-by-step terminal instructions.' },
            { lines: '42-47', title: 'Links to Legal and Guidelines', description: 'Points to CONTRIBUTING.md and LICENSE for open source etiquette.' }
          ],
          commonMistakes: [
            'Leaving the default framework boilerplate README (e.g. default "Create React App" or "Vite + React" template)',
            'Not listing prerequisites like Node/Python version',
            'Assuming everyone knows how to configure environment variables'
          ],
          proTip: 'Use screenshots or animated GIFs in your README. Projects with visual previews receive 3x more stars and engagement on GitHub!'
        },
        {
          id: 'license-file',
          name: 'LICENSE',
          path: '/LICENSE',
          type: 'file',
          category: 'meta',
          importance: 'essential',
          language: 'markdown',
          summary: 'The legal terms specifying how others can use, copy, and modify your code.',
          whatItDoes: 'Grants explicit legal permissions to other humans and companies to run, edit, distribute, or commercialize your code.',
          whyItMatters: 'If you have NO LICENSE, your code is "All Rights Reserved" by default! Other developers legally cannot use your code in their projects even if it is publicly visible on GitHub.',
          sampleContent: `MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
          annotations: [
            { lines: '1-3', title: 'License Type & Copyright Year', description: 'Names the license and assigns authorship to you.' },
            { lines: '5-11', title: 'Permissive Grant of Rights', description: 'The MIT License allows anyone to do virtually anything (even use it in closed-source commercial software).' },
            { lines: '17-23', title: 'Disclaimer of Warranty', description: 'Protects you from being sued if someone uses your software and it causes bugs, downtime, or data loss.' }
          ],
          commonMistakes: [
            'Forgetting to add a license (rendering your open-source project legally unusable for companies)',
            'Mixing incompatible copyleft licenses (like GPLv3) with permissive licenses (like MIT) without understanding the difference'
          ],
          proTip: 'MIT is the most popular license for web projects because it is short, permissive, and beginner-friendly.'
        },
        {
          id: 'contributing-md',
          name: 'CONTRIBUTING.md',
          path: '/CONTRIBUTING.md',
          type: 'file',
          category: 'docs',
          importance: 'recommended',
          language: 'markdown',
          summary: 'Guidelines for community members who want to submit code or fixes.',
          whatItDoes: 'Explains how to set up the local dev environment, Git branch naming rules, code formatting standards, and PR etiquette.',
          whyItMatters: 'GitHub automatically displays a link to this file whenever someone clicks "New Pull Request" or "New Issue" in your repository.'
        },
        {
          id: 'tsconfig-json',
          name: 'tsconfig.json',
          path: '/tsconfig.json',
          type: 'file',
          category: 'config',
          importance: 'recommended',
          language: 'json',
          summary: 'TypeScript compiler configuration and strict type checking rules.',
          whatItDoes: 'Tells the TypeScript compiler how to translate TS code to JavaScript, what libraries to include, and whether to enforce strict type checking.',
          whyItMatters: 'Controls developer experience and catches runtime bugs before the code even runs in the browser.'
        },
        {
          id: 'vite-config-ts',
          name: 'vite.config.ts',
          path: '/vite.config.ts',
          type: 'file',
          category: 'config',
          importance: 'recommended',
          language: 'typescript',
          summary: 'Frontend bundler and development server configuration.',
          whatItDoes: 'Configures how React JSX is compiled, port settings, path aliases (like `@/components`), and asset optimization.',
          whyItMatters: 'Powers fast local Hot Module Replacement (HMR) and produces optimized minified files for production.'
        }
      ]
    }
  },
  {
    id: 'python-app',
    title: 'Python Backend / Data Project',
    tagline: 'FastAPI / Flask + Poetry / Pip + Pytest',
    ecosystem: 'Python',
    description: 'Modern Python application layout adhering to PEP standards, virtual environment isolation, and automated testing.',
    root: {
      id: 'root-python',
      name: 'fastapi-backend-service',
      path: '/',
      type: 'folder',
      summary: 'Root Python application workspace.',
      whatItDoes: 'Standard layout for Python backend services, APIs, and data science projects.',
      whyItMatters: 'Separates source modules from tests, environment configs, and virtual environments.',
      children: [
        {
          id: 'py-github',
          name: '.github',
          path: '/.github',
          type: 'folder',
          category: 'ci',
          importance: 'recommended',
          summary: 'GitHub automations for Python.',
          whatItDoes: 'Houses GitHub Actions for running flake8/black linting and pytest.',
          whyItMatters: 'Runs Python test matrices across Python 3.10, 3.11, and 3.12.',
          children: [
            {
              id: 'py-workflow',
              name: 'python-ci.yml',
              path: '/.github/workflows/python-ci.yml',
              type: 'file',
              category: 'ci',
              importance: 'recommended',
              language: 'yaml',
              summary: 'Pytest automated test runner on GitHub Actions.',
              whatItDoes: 'Sets up Python virtual environment and executes test suite on Ubuntu runners.',
              whyItMatters: 'Catches broken logic before Pull Requests are merged.',
              sampleContent: `name: Python Quality Suite

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.11", "3.12"]

    steps:
      - uses: actions/checkout@v4
      - name: Set up Python \${{ matrix.python-version }}
        uses: actions/setup-python@v5
        with:
          python-version: \${{ matrix.python-version }}
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install ruff pytest
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
      - name: Lint with Ruff
        run: ruff check .
      - name: Test with pytest
        run: pytest`
            }
          ]
        },
        {
          id: 'py-app',
          name: 'app',
          path: '/app',
          type: 'folder',
          category: 'source',
          importance: 'essential',
          summary: 'Application package containing Python modules.',
          whatItDoes: 'Houses your API routes, database models, schemas, and business logic.',
          whyItMatters: 'Having an explicit package directory (`app/`) prevents naming collisions with installed packages.',
          children: [
            {
              id: 'py-init',
              name: '__init__.py',
              path: '/app/__init__.py',
              type: 'file',
              category: 'source',
              importance: 'essential',
              language: 'python',
              summary: 'Marks a directory as a Python package.',
              whatItDoes: 'Tells the Python interpreter that this folder contains importable modules (e.g. `from app.models import User`).',
              whyItMatters: 'Without `__init__.py`, legacy Python tools may fail to recognize the folder as a package.'
            },
            {
              id: 'py-main',
              name: 'main.py',
              path: '/app/main.py',
              type: 'file',
              category: 'source',
              importance: 'essential',
              language: 'python',
              summary: 'FastAPI application factory and entry point.',
              whatItDoes: 'Instantiates the web server app, registers routes, and configures middleware.',
              whyItMatters: 'The file you pass to ASGI servers like `uvicorn app.main:app --reload`.',
              sampleContent: `from fastapi import FastAPI

app = FastAPI(
    title="Service API",
    version="1.0.0",
    description="High performance REST API backend"
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Server running"}

@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id, "available": True}`
            }
          ]
        },
        {
          id: 'py-tests',
          name: 'tests',
          path: '/tests',
          type: 'folder',
          category: 'source',
          importance: 'recommended',
          summary: 'Unit and functional test suites for pytest.',
          whatItDoes: 'Keeps test files (e.g. `test_main.py`, `conftest.py`) isolated from production code.',
          whyItMatters: 'Pytest automatically searches this folder for any files starting with `test_`.'
        },
        {
          id: 'py-gitignore',
          name: '.gitignore',
          path: '/.gitignore',
          type: 'file',
          category: 'config',
          importance: 'essential',
          language: 'shell',
          summary: 'Python-specific ignore patterns.',
          whatItDoes: 'Ignores `__pycache__/`, `.pytest_cache/`, virtual environments (`.venv/`, `venv/`), and `.env`.',
          whyItMatters: 'Never commit local virtual environments (`.venv`) to GitHub! They contain binaries compiled specifically for your operating system.',
          sampleContent: `# Byte-compiled / optimized files
__pycache__/
*.py[cod]
*$py.class

# Virtual Environments (DO NOT COMMIT!)
.venv/
venv/
ENV/
env/

# Environment secrets
.env
*.sqlite3

# Distribution / packaging
build/
dist/
*.egg-info/

# Testing cache
.pytest_cache/
.coverage
htmlcov/`
        },
        {
          id: 'pyproject-toml',
          name: 'pyproject.toml',
          path: '/pyproject.toml',
          type: 'file',
          category: 'config',
          importance: 'essential',
          language: 'toml',
          summary: 'The modern Python packaging and build specification (PEP 518/621).',
          whatItDoes: 'The modern replacement for `setup.py`, `setup.cfg`, and `requirements.txt`. Manages dependencies, build tools, and tool configs (black, ruff, pytest) all in one place.',
          whyItMatters: 'Standardized format recognized across modern Python tooling (Poetry, Hatch, Flit, pip).',
          sampleContent: `[project]
name = "fastapi-backend-service"
version = "0.1.0"
description = "FastAPI backend service"
readme = "README.md"
requires-python = ">=3.11"
dependencies = [
    "fastapi>=0.115.0",
    "uvicorn[standard]>=0.30.0",
    "pydantic>=2.8.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.0.0",
    "ruff>=0.5.0",
    "httpx>=0.27.0",
]

[tool.ruff]
line-length = 88`
        },
        {
          id: 'py-requirements',
          name: 'requirements.txt',
          path: '/requirements.txt',
          type: 'file',
          category: 'config',
          importance: 'recommended',
          language: 'shell',
          summary: 'Traditional pip dependency list.',
          whatItDoes: 'Pinned list of packages installed via `pip install -r requirements.txt`.',
          whyItMatters: 'Commonly required by platforms like Heroku, Dockerfiles, and legacy pipelines.',
          sampleContent: `fastapi==0.115.0
uvicorn==0.30.0
pydantic==2.8.0
python-dotenv==1.0.1`
        },
        {
          id: 'py-dockerfile',
          name: 'Dockerfile',
          path: '/Dockerfile',
          type: 'file',
          category: 'config',
          importance: 'recommended',
          language: 'dockerfile',
          summary: 'Container blueprint for building deployable Docker images.',
          whatItDoes: 'Specifies exact base OS, Python version, dependencies, and command to run the server in a container.',
          whyItMatters: 'Ensures the app runs identically in production cloud hosts as it does locally.',
          sampleContent: `FROM python:3.11-slim

WORKDIR /app

# Prevent Python from writing .pyc files & buffer output
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`
        },
        {
          id: 'py-readme',
          name: 'README.md',
          path: '/README.md',
          type: 'file',
          category: 'docs',
          importance: 'essential',
          language: 'markdown',
          summary: 'Project documentation with Python virtualenv setup instructions.',
          whatItDoes: 'Explains how to create `.venv`, install requirements, and run FastAPI docs at `/docs`.',
          whyItMatters: 'Essential for any developer onboarding onto the repository.'
        },
        {
          id: 'py-license',
          name: 'LICENSE',
          path: '/LICENSE',
          type: 'file',
          category: 'meta',
          importance: 'essential',
          language: 'markdown',
          summary: 'Apache 2.0 or MIT open source license file.',
          whatItDoes: 'Protects the project and specifies legal use conditions.',
          whyItMatters: 'Required for open-source distribution.'
        }
      ]
    }
  },
  {
    id: 'minimal-starter',
    title: 'Minimal Starter Repository',
    tagline: 'The 5 Non-Negotiable Files for ANY Project',
    ecosystem: 'Universal',
    description: 'If you are starting your very first project on GitHub, this is the absolute cleanest foundation you should always create.',
    root: {
      id: 'root-minimal',
      name: 'my-first-github-project',
      path: '/',
      type: 'folder',
      summary: 'Minimalist starter repository layout.',
      whatItDoes: 'Stripped of complex tooling so beginners can understand the 5 files that matter most.',
      whyItMatters: 'Every successful GitHub repository shares these foundational files.',
      children: [
        {
          id: 'min-readme',
          name: 'README.md',
          path: '/README.md',
          type: 'file',
          category: 'docs',
          importance: 'essential',
          language: 'markdown',
          summary: '1. The Story & Manual: Tells people what this does.',
          whatItDoes: 'The first thing anyone sees on GitHub. Explains the purpose, installation, and usage.',
          whyItMatters: 'Without this, nobody knows what your code is for.',
          sampleContent: `# My First Project

A beginner-friendly project demonstrating clean GitHub structure.

## How to Run
1. Open \`index.html\` in any web browser!
2. That is it!`
        },
        {
          id: 'min-gitignore',
          name: '.gitignore',
          path: '/.gitignore',
          type: 'file',
          category: 'config',
          importance: 'essential',
          language: 'shell',
          summary: '2. The Shield: Blocks secrets and messy files.',
          whatItDoes: 'Ensures temporary files, secrets, and system artifacts never get pushed to the cloud.',
          whyItMatters: 'Saves you from embarrassing or dangerous security leaks.',
          sampleContent: `.env
.DS_Store
*.log`
        },
        {
          id: 'min-license',
          name: 'LICENSE',
          path: '/LICENSE',
          type: 'file',
          category: 'meta',
          importance: 'essential',
          language: 'markdown',
          summary: '3. The Permission Slip: Lets others legally use your code.',
          whatItDoes: 'Grants open source permission (usually MIT License).',
          whyItMatters: 'Without a license, nobody can legally fork or use your work.',
          sampleContent: `MIT License
Copyright (c) 2026 Your Name
...`
        },
        {
          id: 'min-env-example',
          name: '.env.example',
          path: '/.env.example',
          type: 'file',
          category: 'config',
          importance: 'essential',
          language: 'shell',
          summary: '4. The Template: Demonstrates required secret keys safely.',
          whatItDoes: 'Lists dummy environment variable names so others know what keys to create in their local `.env`.',
          whyItMatters: 'Teaches clean secret management from day one.',
          sampleContent: `API_KEY=your_key_here`
        },
        {
          id: 'min-src',
          name: 'src',
          path: '/src',
          type: 'folder',
          category: 'source',
          importance: 'essential',
          summary: '5. The Engine: Where your actual code lives.',
          whatItDoes: 'Holds your HTML, CSS, JavaScript, or Python files.',
          whyItMatters: 'Keeps project root clean and organized.',
          children: [
            {
              id: 'min-index',
              name: 'index.js',
              path: '/src/index.js',
              type: 'file',
              category: 'source',
              importance: 'essential',
              language: 'javascript',
              summary: 'Main code file.',
              whatItDoes: 'Executes your logic.',
              whyItMatters: 'The heart of your project.'
            }
          ]
        }
      ]
    }
  }
];
