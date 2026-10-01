import JSZip from 'jszip';

export interface ProjectConfig {
  name: string;
  tagline: string;
  author: string;
  githubUser: string;
  license: 'MIT' | 'Apache-2.0' | 'GPL-3.0' | 'Unlicense';
  archetype: 'minimal' | 'fullstack-web' | 'python-app' | 'frontend-vanilla' | 'node-api';
  includeCiWorkflow: boolean;
  includeIssueTemplates: boolean;
  includePrTemplate: boolean;
  includeDependabot: boolean;
  includeContributing: boolean;
  includeCodeOfConduct: boolean;
  includeSecurityPolicy: boolean;
  includeEnvExample: boolean;
  includeGitignore: boolean;
}

export interface GeneratedFile {
  path: string;
  name: string;
  content: string;
  language: string;
  explanation: string;
}

export function generateLicenseContent(license: string, author: string, year: number = 2026): string {
  if (license === 'MIT') {
    return `MIT License

Copyright (c) ${year} ${author}

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
SOFTWARE.`;
  }

  if (license === 'Apache-2.0') {
    return `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

Copyright ${year} ${author}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`;
  }

  if (license === 'GPL-3.0') {
    return `GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) ${year} ${author}

Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.

Preamble
The GNU General Public License is a free, copyleft license for
software and other kinds of works...`;
  }

  return `This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.`;
}

export function generateProjectFiles(config: ProjectConfig): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const year = 2026;
  const safeName = config.name.toLowerCase().replace(/[^a-z0-9-_]/g, '-');

  // 1. README.md
  files.push({
    path: 'README.md',
    name: 'README.md',
    language: 'markdown',
    explanation: 'The homepage of your repository on GitHub. Introduces your project, displays badges, and gives step-by-step setup instructions.',
    content: `# ${config.name}

> ${config.tagline || 'A modern project built with clean GitHub architecture.'}

[![License: ${config.license}](https://img.shields.io/badge/License-${config.license}-yellow.svg)](LICENSE)
${config.includeCiWorkflow ? `[![CI Status](https://github.com/${config.githubUser}/${safeName}/actions/workflows/ci.yml/badge.svg)](https://github.com/${config.githubUser}/${safeName}/actions)` : ''}
${config.includeContributing ? `[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)` : ''}

---

## 🚀 Features
- ⚡ **Lightweight & Modular**: Clean project structure adhering to industry best practices
- 🛡️ **Secure**: Sensitive files and keys protected via \`.gitignore\` and \`.env.example\`
${config.includeCiWorkflow ? '- 🤖 **Automated CI/CD**: Pre-configured GitHub Actions pipelines' : ''}
${config.includeContributing ? '- 🤝 **Community Ready**: Issue templates and contributing guidelines' : ''}

## 📋 Prerequisites
${config.archetype === 'python-app' ? '- Python 3.10+ and pip\n- Virtual environment tool (venv or poetry)' : '- Node.js 18+ and npm'}

## 🛠️ Quickstart

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/${config.githubUser}/${safeName}.git
   cd ${safeName}
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   ${config.archetype === 'python-app' ? 'pip install -r requirements.txt' : 'npm install'}
   \`\`\`

${config.includeEnvExample ? `3. **Set up environment variables:**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your local credentials
   \`\`\`\n` : ''}
4. **Start the application:**
   \`\`\`bash
   ${config.archetype === 'python-app' ? 'python main.py' : 'npm run dev'}
   \`\`\`

## 📄 License
Distributed under the ${config.license} License. See \`LICENSE\` for more information.

## 👤 Author
- **${config.author}** - [@${config.githubUser}](https://github.com/${config.githubUser})
`
  });

  // 2. LICENSE
  files.push({
    path: 'LICENSE',
    name: 'LICENSE',
    language: 'markdown',
    explanation: 'Legal terms granting permission for others to use, modify, and distribute your code.',
    content: generateLicenseContent(config.license, config.author, year)
  });

  // 3. .gitignore
  if (config.includeGitignore) {
    let gitignoreContent = '';
    if (config.archetype === 'python-app') {
      gitignoreContent = `# Python virtual environments
.venv/
venv/
ENV/

# Python bytecode
__pycache__/
*.py[cod]
*$py.class

# Environment secrets
.env
.env.*.local
*.sqlite3

# Test caches & distribution
.pytest_cache/
.coverage
dist/
build/

# OS metadata
.DS_Store
Thumbs.db`;
    } else {
      gitignoreContent = `# Dependencies (NEVER commit node_modules!)
node_modules/
.pnp
.pnp.js

# Environment variables & secrets (CRITICAL)
.env
.env.local
.env.production.local
*.key
*.pem

# Build outputs
dist/
build/
coverage/

# OS and Editor files
.DS_Store
Thumbs.db
.idea/
.vscode/*
!.vscode/extensions.json`;
    }

    files.push({
      path: '.gitignore',
      name: '.gitignore',
      language: 'shell',
      explanation: 'Tells Git to never track secrets (.env), dependencies (node_modules), or build outputs.',
      content: gitignoreContent
    });
  }

  // 4. .env.example
  if (config.includeEnvExample) {
    files.push({
      path: '.env.example',
      name: '.env.example',
      language: 'shell',
      explanation: 'A public blueprint demonstrating required secret keys with dummy placeholders.',
      content: `# Application Server Config
PORT=3000
NODE_ENV=development

# Database Connection (Placeholder)
DATABASE_URL="postgresql://user:password@localhost:5432/${safeName}_db"

# Secret Keys (Replace with your actual keys in local .env)
API_SECRET_KEY="your-secret-key-goes-here"
PUBLIC_CLIENT_ID="pk_test_sample_client_id"`
    });
  }

  // 5. GitHub Workflows
  if (config.includeCiWorkflow) {
    if (config.archetype === 'python-app') {
      files.push({
        path: '.github/workflows/ci.yml',
        name: 'ci.yml',
        language: 'yaml',
        explanation: 'GitHub Actions workflow that runs automated tests and linter on every Pull Request.',
        content: `name: Python Quality CI

on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

      - name: Run Tests
        run: |
          python -m unittest discover tests`
      });
    } else {
      files.push({
        path: '.github/workflows/ci.yml',
        name: 'ci.yml',
        language: 'yaml',
        explanation: 'GitHub Actions workflow that runs automated tests and linter on every Pull Request.',
        content: `name: CI Test Suite

on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    name: Lint & Test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Build Check
        run: npm run build --if-present

      - name: Run Test Suite
        run: npm test --if-present`
      });
    }
  }

  // 6. Issue Templates
  if (config.includeIssueTemplates) {
    files.push({
      path: '.github/ISSUE_TEMPLATE/bug_report.md',
      name: 'bug_report.md',
      language: 'markdown',
      explanation: 'Guided template shown to users when reporting bugs on GitHub.',
      content: `---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Desktop Environment:**
 - OS: [e.g. macOS 14, Windows 11]
 - Browser: [e.g. Chrome, Safari]
 - Version: [e.g. 120]`
    });

    files.push({
      path: '.github/ISSUE_TEMPLATE/feature_request.md',
      name: 'feature_request.md',
      language: 'markdown',
      explanation: 'Template for proposing new features and enhancements.',
      content: `---
name: Feature request
about: Suggest an idea for this project
title: '[FEAT] '
labels: enhancement
assignees: ''
---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.`
    });
  }

  // 7. Pull Request Template
  if (config.includePrTemplate) {
    files.push({
      path: '.github/PULL_REQUEST_TEMPLATE.md',
      name: 'PULL_REQUEST_TEMPLATE.md',
      language: 'markdown',
      explanation: 'Standard checklist shown whenever someone opens a Pull Request.',
      content: `## Description
Please include a summary of the change and which issue is fixed.

Fixes # (issue)

## Type of change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Checklist:
- [ ] My code follows the project style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code where necessary
- [ ] I have added tests that prove my fix is effective`
    });
  }

  // 8. Dependabot
  if (config.includeDependabot) {
    files.push({
      path: '.github/dependabot.yml',
      name: 'dependabot.yml',
      language: 'yaml',
      explanation: 'Configures GitHub Dependabot to scan packages and open automated security PRs.',
      content: `version: 2
updates:
  - package-ecosystem: "${config.archetype === 'python-app' ? 'pip' : 'npm'}"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5`
    });
  }

  // 9. CONTRIBUTING.md
  if (config.includeContributing) {
    files.push({
      path: 'CONTRIBUTING.md',
      name: 'CONTRIBUTING.md',
      language: 'markdown',
      explanation: 'Rules for outside developers who want to help contribute code or documentation.',
      content: `# Contributing to ${config.name}

First off, thank you for considering contributing to ${config.name}! It's people like you that make open source such a great community.

## 🌿 How Can I Contribute?

### Reporting Bugs
- Ensure the bug was not already reported by searching on GitHub under Issues.
- Submit a detailed report using the **Bug Report** template.

### Suggesting Enhancements
- Open an issue using the **Feature Request** template.
- Explain why this enhancement would be useful to most users.

## 🚀 Pull Request Process

1. Fork the repo and create your branch from \`main\`:
   \`\`\`bash
   git checkout -b feat/my-new-feature
   \`\`\`
2. Write clean, readable code and maintain existing test coverage.
3. Commit using descriptive commit messages:
   \`\`\`bash
   git commit -m "feat: add user profile picture upload"
   \`\`\`
4. Push to your branch and open a Pull Request against \`main\`!
`
    });
  }

  // 10. CODE_OF_CONDUCT.md
  if (config.includeCodeOfConduct) {
    files.push({
      path: 'CODE_OF_CONDUCT.md',
      name: 'CODE_OF_CONDUCT.md',
      language: 'markdown',
      explanation: 'Contributor Covenant standard ensuring an inclusive and harassment-free community.',
      content: `# Contributor Covenant Code of Conduct

## Our Pledge
We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, caste, color, religion, or sexual identity and orientation.

## Enforcement
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project maintainers at: ${config.githubUser}@example.com.`
    });
  }

  // 11. SECURITY.md
  if (config.includeSecurityPolicy) {
    files.push({
      path: 'SECURITY.md',
      name: 'SECURITY.md',
      language: 'markdown',
      explanation: 'How security researchers can responsibly disclose vulnerabilities privately.',
      content: `# Security Policy

## Supported Versions
| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability
Please do **not** report security vulnerabilities through public GitHub issues!
Instead, email security concerns privately to security@example.com or use GitHub Private Vulnerability Reporting.`
    });
  }

  // 12. Archetype-specific source files & package manifests
  if (config.archetype === 'python-app') {
    files.push({
      path: 'requirements.txt',
      name: 'requirements.txt',
      language: 'shell',
      explanation: 'List of Python packages required for the project.',
      content: `requests>=2.31.0
python-dotenv>=1.0.0
pytest>=8.0.0`
    });

    files.push({
      path: 'main.py',
      name: 'main.py',
      language: 'python',
      explanation: 'Main Python entry point.',
      content: `"""
${config.name}
Author: ${config.author}
License: ${config.license}
"""
import os

def main():
    print("Welcome to ${config.name}!")
    print("Running in Python environment.")

if __name__ == "__main__":
    main()`
    });

    files.push({
      path: 'tests/test_main.py',
      name: 'test_main.py',
      language: 'python',
      explanation: 'Unit test suite discovered by test runner.',
      content: `import unittest

class TestApp(unittest.TestCase):
    def test_sample(self):
        self.assertEqual(1 + 1, 2)

if __name__ == '__main__':
    unittest.main()`
    });
  } else if (config.archetype === 'frontend-vanilla') {
    files.push({
      path: 'index.html',
      name: 'index.html',
      language: 'html',
      explanation: 'Web application HTML entry page.',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.name}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="container">
    <h1>${config.name}</h1>
    <p>${config.tagline}</p>
    <button id="btn">Click Me</button>
    <div id="output"></div>
  </main>
  <script src="app.js"></script>
</body>
</html>`
    });

    files.push({
      path: 'style.css',
      name: 'style.css',
      language: 'css',
      explanation: 'Stylesheet for clean styling.',
      content: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
.container { background: #1e293b; padding: 2.5rem; border-radius: 0.75rem; border: 1px solid #334155; text-align: center; max-width: 480px; width: 90%; }
h1 { font-size: 1.75rem; margin-bottom: 0.5rem; color: #38bdf8; }
p { color: #94a3b8; font-size: 0.95rem; margin-bottom: 1.5rem; }
button { background: #38bdf8; color: #0f172a; border: none; padding: 0.6rem 1.25rem; font-weight: 600; border-radius: 0.375rem; cursor: pointer; }
button:hover { background: #7dd3fc; }`
    });

    files.push({
      path: 'app.js',
      name: 'app.js',
      language: 'javascript',
      explanation: 'Client-side JavaScript logic.',
      content: `document.getElementById('btn').addEventListener('click', () => {
  const output = document.getElementById('output');
  output.innerText = 'App active! Welcome to ${config.name} on GitHub.';
  output.style.marginTop = '1rem';
  output.style.color = '#4ade80';
});`
    });
  } else {
    // Node / Fullstack / Minimal
    files.push({
      path: 'package.json',
      name: 'package.json',
      language: 'json',
      explanation: 'Project manifest specifying scripts, dependencies, author, and version.',
      content: `{
  "name": "${safeName}",
  "version": "1.0.0",
  "description": "${config.tagline || 'A GitHub project'}",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "dev": "node src/index.js",
    "start": "node src/index.js",
    "test": "node --test"
  },
  "keywords": ["github", "starter", "template"],
  "author": "${config.author}",
  "license": "${config.license}"
}`
    });

    files.push({
      path: 'src/index.js',
      name: 'index.js',
      language: 'javascript',
      explanation: 'Primary application source code entry point.',
      content: `/**
 * ${config.name}
 * Author: ${config.author}
 * License: ${config.license}
 */

export function main() {
  console.log("🚀 Starting ${config.name}...");
  console.log("Project loaded with full GitHub best practices structure!");
}

main();`
    });
  }

  return files;
}

export async function downloadProjectAsZip(config: ProjectConfig, files: GeneratedFile[]): Promise<void> {
  const zip = new JSZip();
  const folderName = config.name.toLowerCase().replace(/[^a-z0-9-_]/g, '-') || 'github-starter-project';

  for (const file of files) {
    zip.file(file.path, file.content);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${folderName}.zip`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
