import { WorkflowStep } from '../types/repo';

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Fork & Clone Repository',
    phase: 'Local Machine',
    action: 'Download repository to your local computer',
    description: 'You copy the code from GitHub servers down to your local machine so you can edit it with VS Code or your favorite editor.',
    gitCommand: 'git clone https://github.com/organization/project-name.git\ncd project-name',
    githubActionText: 'Click "Fork" (if contributing to open-source) or click green "<> Code" button and copy the HTTPS/SSH clone URL.',
    visualGraphic: 'clone',
    tip: 'Cloning creates a hidden `.git` folder in your project that tracks every change and branch history locally on your machine.'
  },
  {
    step: 2,
    title: 'Create a Feature Branch',
    phase: 'Local Machine',
    action: 'Isolate your work from the main production code',
    description: 'Never write new code directly on the `main` branch! Creating a branch gives you an isolated sandbox where you can experiment without breaking working code.',
    gitCommand: 'git checkout -b feat/add-user-profile\n# Or modern Git:\ngit switch -c feat/add-user-profile',
    githubActionText: 'Branches will show under the Branch dropdown on GitHub once pushed.',
    visualGraphic: 'branch',
    tip: 'Use descriptive branch prefixes: `feat/` for new features, `fix/` for bug fixes, and `docs/` for documentation updates.'
  },
  {
    step: 3,
    title: 'Stage Your Changes',
    phase: 'Local Machine',
    action: 'Select which modified files to include in your next snapshot',
    description: 'Staging is the intermediate waiting room between your file edits and a permanent commit. It lets you selectively review what gets saved.',
    gitCommand: 'git status          # Check what changed\ngit add src/App.tsx # Stage specific file\n# OR stage all tracked changes:\ngit add .',
    visualGraphic: 'stage',
    tip: 'Always run `git status` or `git diff` before `git add .` to verify you aren\'t accidentally staging secret `.env` files or temporary build artifacts!'
  },
  {
    step: 4,
    title: 'Commit with Clear Intent',
    phase: 'Local Machine',
    action: 'Save a permanent, named checkpoint in your Git history',
    description: 'A commit is like a save game point. If anything goes wrong in the future, you can rewind back to any commit snapshot in history.',
    gitCommand: 'git commit -m "feat(auth): implement user profile settings page"',
    visualGraphic: 'commit',
    tip: 'Follow Conventional Commits: start with `feat:`, `fix:`, `refactor:`, `test:`, or `docs:`. Keep commit messages in the imperative present tense.'
  },
  {
    step: 5,
    title: 'Push Branch to GitHub',
    phase: 'GitHub Remote',
    action: 'Upload your local branch and commits to GitHub cloud',
    description: 'So far, all your commits exist solely on your laptop. Pushing uploads your new branch to the GitHub cloud servers so others can see and test it.',
    gitCommand: 'git push -u origin feat/add-user-profile',
    githubActionText: 'GitHub detects your push and immediately displays a yellow banner: "Compare & pull request".',
    visualGraphic: 'push',
    tip: 'The `-u` (upstream) flag links your local branch to the remote branch, so future pushes only require typing `git push`.'
  },
  {
    step: 6,
    title: 'Open a Pull Request (PR)',
    phase: 'GitHub Remote',
    action: 'Propose merging your branch into main for team review',
    description: 'A Pull Request is not a Git command—it is a GitHub collaboration feature. You are asking the repository maintainers: "Please review my changes and pull them into the main codebase."',
    gitCommand: '# Optional CLI via GitHub CLI tool:\ngh pr create --title "feat: add user profile" --body "Fixes #42"',
    githubActionText: 'On GitHub, click "New Pull Request", select base: `main` <- compare: `feat/add-user-profile`, fill out the PR description template, and assign reviewers.',
    visualGraphic: 'pr',
    tip: 'Reference related issues in your PR description by writing "Fixes #12" or "Closes #34". GitHub will automatically close the issue when the PR merges!'
  },
  {
    step: 7,
    title: 'Automated CI / CD Checks Run',
    phase: 'GitHub Remote',
    action: 'GitHub Actions automatically compiles and tests your code',
    description: 'Before any human reviews your code, GitHub Actions spins up cloud virtual machines, runs your unit tests, checks for lint errors, and builds the app.',
    githubActionText: 'GitHub displays status checks on the PR: 🟢 Green checkmark (Tests passed) or 🔴 Red X (Test failed - review logs).',
    visualGraphic: 'ci',
    tip: 'If a check turns red, click "Details" to read the error log, make a fix on your local branch, commit, and push. The PR updates automatically!'
  },
  {
    step: 8,
    title: 'Code Review & Team Discussion',
    phase: 'Collaboration',
    action: 'Teammates review your diff, comment on lines, and approve',
    description: 'Reviewers inspect the "Files changed" tab. They can ask questions, highlight potential bugs, request improvements, or click "Approve".',
    githubActionText: 'Teammates leave inline line comments, request changes, or approve the Pull Request.',
    visualGraphic: 'review',
    tip: 'Treat code reviews as collaborative learning. Address feedback constructively and push new commits to the same branch to satisfy requests.'
  },
  {
    step: 9,
    title: 'Merge into Main & Branch Cleanup',
    phase: 'Collaboration',
    action: 'Incorporate changes into production and delete feature branch',
    description: 'Once all CI checks are green and reviewers have approved, the maintainer clicks the green "Merge pull request" button. Your code is now part of main!',
    githubActionText: 'Choose "Squash and merge" (combines commits into one tidy entry) or "Merge commit", then click "Delete branch".',
    gitCommand: '# On your local machine, update main:\ngit checkout main\ngit pull origin main\ngit branch -d feat/add-user-profile',
    visualGraphic: 'merge',
    tip: '"Squash and merge" is the industry standard for feature branches—it keeps your `main` commit history clean, readable, and easy to debug.'
  }
];
