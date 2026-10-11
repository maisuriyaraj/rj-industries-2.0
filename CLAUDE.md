# CLAUDE.md

## What This Is
RJ INDUSTRIES is Raj Maisuriya's personal portfolio: a single-page site (Hero, About, Stack, Projects, Experience, Contact) plus an OrbitOps case study, built so the design itself shows his stack (Next.js, React, TypeScript, Fastify, Sequelize, PostgreSQL). All content is in typed data files; there is no backend. Full context: PRODUCT_OVERVIEW.md.

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript, static export (`output: 'export'`)
- Tailwind CSS 4 with CSS-variable design tokens (no tailwind.config.js)
- lucide-react (UI icons), simple-icons (tech logos), cmdk (command palette)
- Firebase Hosting (serves `out/`)

## Key Commands
- `npm run dev`: local dev server at http://localhost:3000
- `npm run build`: static export into `out/`
- `npm run typecheck` / `npm run lint`: must pass before committing
- `npm run media`: re-optimise videos, images, favicons and OG image from `media-src/` (needs ffmpeg)
- `npm run build && firebase deploy --only hosting`: publish (only with the owner's go-ahead)

## Folder Map
- `src/app/`: routes, layout, metadata, sitemap/robots/manifest, `globals.css` (design tokens)
- `src/components/`: `layout/`, `ui/`, `sections/`, `stack/`, `projects/`, `palette/`
- `src/data/`: all site content (profile, skills, projects, experience, stack)
- `src/lib/`: theme script, small hooks, `cn`
- `public/`: optimised media, icons, OG image, resume
- `scripts/`: media optimisation script; `media-src/`: original media (git-ignored)
- `docs/screenshots/`: before/after screenshots of the redesign
- `specs/`, `SPEC.md`: SDD specs; `.claude/`: rules and SDD skills

## Naming Rules
- The brand is written "RJ INDUSTRIES" (logo wordmark "RJINDUSTRIES") and the package is "rj-industries". The site is about the person, Raj Maisuriya. Keep each existing spelling where it already is.

## Undocumented Architecture
This file is read in full every session, every line here is a fixed cost paid on every task. Keep this section lean; a feature-specific invariant belongs in that feature's own spec, not here.
- Static export only: no API routes, server actions or image optimisation. Anything dynamic must run in the browser. See `.claude/rules/project-structure.md`.
- An inline script in `<head>` (`src/lib/theme.ts`) sets the theme before paint, marks `<html class="js">` for scroll reveals, and forwards old `/#/profile` links. Keep it tiny and dependency-free.

## Rules
Rules live in `.claude/rules/`: `code-style.md` (team rules, TypeScript and React patterns), `design-system.md` (design and theming: tokens, fonts, layout), `project-structure.md` (routes, content, media, deploy). Specs live in `specs/` (see `specs/INDEX.md`).

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
