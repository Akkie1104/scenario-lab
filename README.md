# Scenario Lab

Interactive React + TypeScript design-learning application with eight problem-solving scenarios, live previews, multiple-choice decisions, and before/after feedback. Adapted from the provided `axis_conceptor (1).tsx` source.

## Tech stack
- React 18, TypeScript, Vite 6
- Tailwind CSS, Lucide React icons
- GitHub Actions → GitHub Pages

## Local development
Requires Node.js 22.12+ and npm.

```bash
npm install
npm run dev
```

## Build
```bash
npm run typecheck
npm run build
npm run preview
```

## GitHub Pages
Go to **Settings → Pages → Build and deployment → Source: GitHub Actions**. The included workflow builds on pushes to `main` using the repository's correct Vite base path.

Expected URL: https://akkie1104.github.io/scenario-lab/

## Known limitations
- “My Cases” is a placeholder control in the supplied source; progress is not persisted.
- Before/after examples are animated React previews, not GIF assets.
- No database or backend is necessary for the current experience.
