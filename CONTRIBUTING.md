# Contributing to RepoCraft

Thank you for your interest in contributing to RepoCraft! We welcome contributions to help beginners learn GitHub repository structures and open-source workflows.

## 🌿 Contribution Workflow

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/repocraft.git
   cd repocraft
   ```
3. **Create a descriptive feature branch**:
   ```bash
   git checkout -b feat/add-new-template
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Run the local dev server**:
   ```bash
   npm run dev
   ```
6. **Verify the build and linting before committing**:
   ```bash
   npm run lint
   npm run build
   ```
7. **Commit using Conventional Commits**:
   ```bash
   git commit -m "feat: add Go CLI repository template"
   ```
8. **Push to your fork and submit a Pull Request** against the `main` branch.

## 🛡️ Coding Guidelines
- Ensure strict TypeScript typing with zero any escapes.
- Use Tailwind CSS utility classes and clean, accessible semantic HTML.
- Avoid committing any `.env` secrets or unwanted build outputs.
