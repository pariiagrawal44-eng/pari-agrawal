# 🚀 RepoCraft — The Beginner's Guide & Project Scaffolder for GitHub

> An interactive visual handbook, repository scaffolder, and workflow simulator designed to teach beginners standard GitHub project structures, essential files, and open-source practices.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](.github/workflows/ci.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## 🌟 What This Project Does

RepoCraft demystifies GitHub for beginners through practical, interactive tools:
- 🛠️ **Built-in Project Scaffolder**: Configure and download a complete, production-ready repository blueprint (`.zip`) with `.github/` workflows, `.gitignore`, `.env.example`, `LICENSE`, and package manifests.
- 🗂️ **Interactive Repo Explorer**: Browse realistic project file trees (Full-Stack Node/React, Python FastAPI, Minimal Starter) and inspect line-by-line file anatomies.
- 📜 **The 8 Cornerstone Files Guide**: Side-by-side comparisons of the clean way vs. common rookie pitfalls for `README.md`, `.gitignore`, `LICENSE`, `.env.example`, `package.json`, `.github/`, `CONTRIBUTING.md`, and `SECURITY.md`.
- 🔄 **Git vs GitHub Workflow Simulator**: Step-by-step interactive simulator covering the 9-stage branch lifecycle from `git clone` to PR reviews and CI status checks.
- ✍️ **README Generator**: Customize markdown sections and badges, preview live in GitHub styling, and export clean markdown.
- 🎯 **Knowledge Quiz & Jargon Decoder**: Scenario challenges and plain-English metaphors for developer terms like *Fork*, *PR*, *Merge Conflict*, and *HEAD*.

---

## 🏗️ Repository Structure

Here is how this repository itself is structured following standard GitHub conventions:

```text
├── .github/
│   └── workflows/
│       └── ci.yml             # Automated CI pipeline for linting & tests
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # Tab navigation & layout
│   │   ├── ProjectBuilder.tsx # Turnkey project scaffolder & ZIP bundler
│   │   ├── RepoExplorer.tsx   # Interactive file tree browser
│   │   ├── FileInspector.tsx  # Line-by-line file breakdown & pitfalls
│   │   ├── EssentialFilesGuide.tsx # The 8 cornerstone files deep dive
│   │   ├── WorkflowSimulator.tsx   # 9-stage Git vs GitHub visualizer
│   │   ├── ReadmeBuilder.tsx  # Live README markdown editor
│   │   ├── QuizSection.tsx    # 8-scenario knowledge challenge
│   │   └── GlossarySection.tsx# Plain-English jargon decoder
│   ├── data/                  # Curated repository blueprints & guides
│   ├── types/                 # TypeScript interfaces
│   ├── utils/
│   │   └── projectGenerator.ts# In-browser ZIP packaging with JSZip
│   ├── App.tsx                # Main entry component
│   ├── index.css              # Tailwind CSS styling
│   └── main.tsx               # React 19 DOM root
├── .env.example               # Safe environment variable placeholders
├── .gitignore                 # Shields secrets & node_modules from Git
├── CONTRIBUTING.md            # Guidelines for open-source contributors
├── LICENSE                    # MIT open-source license
├── package.json               # Dependencies and runnable scripts
├── tsconfig.json              # TypeScript strict configuration
└── vite.config.ts             # Vite bundler configuration
```

---

## 🚀 Quickstart & Build Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (version 20 or higher recommended)
- `npm` or `pnpm`

### 1. Clone the repository
```bash
git clone https://github.com/your-username/repocraft.git
cd repocraft
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
```
This generates the optimized, production-ready static bundle inside the `dist/` directory.

### 5. Run type checks & linter
```bash
npm run lint
```

---

## 🤝 Contributing
Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on code style and pull request guidelines.

## 📄 License
This project is open-source and distributed under the [MIT License](LICENSE).
