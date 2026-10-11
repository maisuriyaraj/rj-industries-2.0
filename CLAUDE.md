# CLAUDE.md

## What This Is
RJ INDUSTRIES is Raj Maisuriya's personal portfolio website: a three-page site (Home, Profile, Portfolio) that presents him as a full stack web developer to recruiters and clients, with an online CV, project screen recordings, and a downloadable resume. All content is hardcoded in the page files; there is no backend. Full context: PRODUCT_OVERVIEW.md.

## Stack
- React 18 single-page app, built with Create React App (react-scripts 5)
- React Router 6 (`HashRouter`)
- Tailwind CSS 3 plus small plain CSS files
- Bootstrap Icons, react-helmet (page title and meta tags)
- Firebase Hosting (serves `build/`)

## Key Commands
- `npm start`: run locally at http://localhost:3000
- `npm run build`: production build into `build/`
- `npm test`: Jest tests (the only test is the stock CRA one and currently fails)
- `firebase deploy`: publish `build/` (Firebase CLI, installed separately)

## Folder Map
- `src/`: all app code; pages in `Home/`, `Profile/`, `Portfolio/`, shared pieces in `components/`, media in `assets/`
- `public/`: `index.html` template, favicon, manifest
- `build/`: generated build output (git-ignored, do not edit)
- `.firebase/`: Firebase CLI cache (do not edit)
- `specs/`: SDD specs, workflow, template, and index
- `.claude/`: rules and SDD skills for Claude Code

## Naming Rules
- Brand is written "RJ INDUSTRIES" in the header logo but "RjIndustries" in the footer and "rj-industries" in package.json. The site is about the person, Raj Maisuriya. Keep each existing spelling where it already is.

## Undocumented Architecture
This file is read in full every session, every line here is a fixed cost paid on every task. Keep this section lean; a feature-specific invariant belongs in that feature's own spec, not here.
- `HashRouter` is deliberate: Firebase Hosting has no single-page-app rewrite, so browser-style URLs would 404 on refresh. See `.claude/rules/project-structure.md`.
- Several Tailwind classes in use (`text-primary`, `text-secondary`, `hero-gradient-*`) are not defined in `tailwind.config.js` and do nothing. See `.claude/rules/design-system.md`.

## Rules
Rules live in `.claude/rules/`: `code-style.md` (team rules, React patterns), `design-system.md` (design and theming: colours, fonts, layout), `project-structure.md` (pages, routing, content, assets, deploy). Specs live in `specs/` (see `specs/INDEX.md`).

## Session Startup
At the start of every session:
1. Read CLAUDE.md.
2. Read specs/WORKFLOW.md.
3. Read specs/INDEX.md to know what specs exist (names, paths, one-line descriptions only, not full spec contents).
4. Wait for a task. Only read a specific spec file when a relevant task comes in.

Available commands:
- `/sdd-audit`: read and report on a module, touch nothing
- `/sdd-spec`: create a new spec for a new feature
- `/sdd-change`: update an existing spec when requirements change
- `/sdd-implement`: implement an approved spec
- `/sdd-cleanup`: repo-wide housekeeping pass, run occasionally, not part of daily work

## Communication
Always respond in plain, simple English. Avoid technical jargon where possible. Keep responses short and clear unless the task genuinely needs detail.
