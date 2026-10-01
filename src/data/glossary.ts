import { GlossaryTerm } from '../types/repo';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Repository ("Repo")',
    category: 'GitHub',
    definition: 'The main folder and container that houses all files, folders, commit history, and branches for a project.',
    beginnerMetaphor: 'Like a project binder containing all your project documents and every historical draft ever made.',
    example: 'https://github.com/facebook/react'
  },
  {
    term: 'Fork',
    category: 'GitHub',
    definition: 'A personal copy of someone else\'s repository created under your own GitHub account.',
    beginnerMetaphor: 'Like taking a photocopy of a recipe book so you can tweak the ingredients in your own kitchen without altering the original book.',
    example: 'You fork an open-source library to fix a bug, then submit a Pull Request back to the original repo.'
  },
  {
    term: 'Pull Request (PR)',
    category: 'GitHub',
    definition: 'A formal proposal asking the maintainers of a repository to review, test, and merge your branch into their main codebase.',
    beginnerMetaphor: 'Like submitting an essay to your editor with suggestions and revisions highlighted for approval.',
    example: 'Opened PR #104: "fix: prevent login form submission when email is invalid".'
  },
  {
    term: 'Branch',
    category: 'Git',
    definition: 'An independent line of development that diverges from the main codebase to allow working on a feature without affecting other code.',
    beginnerMetaphor: 'Like a parallel universe where you can experiment freely without touching the reality of the main timeline.',
    example: '`git checkout -b feat/dark-mode`'
  },
  {
    term: 'Commit',
    category: 'Git',
    definition: 'A permanent snapshot of staged changes saved to your Git history with a descriptive message and author timestamp.',
    beginnerMetaphor: 'Like a "Save Point" in a video game that you can always return to if things go wrong.',
    example: '`git commit -m "fix(auth): handle expired JWT tokens"`'
  },
  {
    term: 'Staging Area (Index)',
    category: 'Git',
    definition: 'The intermediate waiting area where files are prepared and inspected before being packaged into a commit.',
    beginnerMetaphor: 'Like putting items in your shopping cart before proceeding to the checkout register.',
    example: '`git add src/App.tsx` stages the file for the next commit.'
  },
  {
    term: 'Merge Conflict',
    category: 'Git',
    definition: 'An event that occurs when two branches modify the exact same lines of code in different ways, and Git cannot automatically decide which version is correct.',
    beginnerMetaphor: 'Like two people writing two different sentences in the same blank on a paper form at the same time.',
    example: 'Git inserts `<<<<<<< HEAD` markers indicating where human resolution is needed.'
  },
  {
    term: 'Clone',
    category: 'Git',
    definition: 'Downloading a full copy of a remote repository from GitHub to your local hard drive.',
    beginnerMetaphor: 'Downloading a file from Google Drive to your laptop.',
    example: '`git clone https://github.com/user/project.git`'
  },
  {
    term: 'Origin & Upstream',
    category: 'Git',
    definition: '`origin` is the default shorthand name Git gives to the remote repository you cloned from. `upstream` refers to the original parent repo if you created a fork.',
    beginnerMetaphor: '`origin` is your own cloud backup; `upstream` is the original source factory.',
    example: '`git push origin main`'
  },
  {
    term: 'GitHub Actions',
    category: 'GitHub',
    definition: 'GitHub\'s built-in Continuous Integration and Continuous Delivery (CI/CD) automation platform.',
    beginnerMetaphor: 'A free robotic assistant in the cloud that runs your tests and builds your app every time you push code.',
    example: 'Configured in `.github/workflows/ci.yml`.'
  },
  {
    term: 'Issues',
    category: 'GitHub',
    definition: 'A built-in tracking system to report bugs, request features, organize tasks, and discuss project plans.',
    beginnerMetaphor: 'A public digital to-do list and discussion forum attached directly to the code.',
    example: 'Issue #12: "Search bar does not filter lowercase letters".'
  },
  {
    term: 'Squash & Merge',
    category: 'GitHub',
    definition: 'A merge method that combines all individual commits from a feature branch into a single neat commit on the main branch.',
    beginnerMetaphor: 'Taking 10 draft iterations of a document and pressing them into one polished final publication.',
    example: 'Keeps main branch history clean: 1 commit per completed feature instead of "fixed typo", "fix typo 2", "try again".'
  }
];
