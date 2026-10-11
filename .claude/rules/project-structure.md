# Project Structure, Content, Media and Deploy

## Routes (`src/app/`)
- `/` (`page.tsx`): one page of sections with ids `about`, `stack`, `projects`, `experience`, `contact`. The nav (`data/site.ts` → `navItems`) and the active-section highlight depend on these ids.
- `/projects/orbitops`: OrbitOps case study. `not-found.tsx`: custom 404.
- `sitemap.ts`, `robots.ts`, `manifest.ts` need `export const dynamic = 'force-static'` for static export. Add new routes to `sitemap.ts`.
- Per-page metadata uses the `metadata` export. Shared defaults (OG/Twitter, icons, JSON-LD `Person`) are in `layout.tsx`.

## Components (`src/components/`)
- `layout/` (header, footer, theme, scroll progress, reveal), `ui/` (primitives), `sections/` (one per home section), `stack/`, `projects/`, `palette/` (Ctrl/Cmd+K palette and the "orbit" easter egg, both lazy-loaded).

## Content (`src/data/`)
- Edit content here, not in components: `site.ts` (name, links, hero roles), `skills.ts`, `projects.ts`, `experience.ts`, `stack.ts` (layers and the example request flow), `tech.ts` (tech names and icons).
- Experience durations are calculated by `formatPeriod()` at build time, so ongoing roles update on each deploy.
- Do not invent facts about OrbitOps or other projects. OrbitOps facts come from Raj's case study in `src/data/orbitops.ts`: it runs on MySQL (not PostgreSQL) with Redux Toolkit and Zod.

## Media
- Originals go in `media-src/` (git-ignored). `npm run media` (`scripts/optimize-media.mjs`, needs ffmpeg) writes optimised files to `public/`: project videos and posters, portrait, logos, favicons, `og.png`.
- Videos are cropped below the browser bar and above the taskbar (they leaked personal tabs). New recordings need their own `cropTop` / `cropBottom` values.
- Project videos never load until hover or "Watch demo". Keep it that way.
- The resume is always served at `/raj-maisuriya-resume.pdf`; replace that file to update it.

## Old URLs
- `/profile` and `/portfolio` get 301s in `firebase.json`. Old hash links (`/#/profile`, `/#/portfolio`) are rewritten by `headScript` in `src/lib/theme.ts`.

## Build and deploy
- `npm run build` exports static files to `out/`. Firebase Hosting serves `out/` with clean URLs, cache headers and security headers (`firebase.json`).
- Deploy: `npm run build && firebase deploy --only hosting`. Never deploy without the owner's go-ahead.
- Contact form: set `NEXT_PUBLIC_WEB3FORMS_KEY` in the build environment to enable it; without it the section shows email and social links.
- Local check: the Firebase emulator on Windows ignores `redirects` and `headers` (superstatic builds globs with backslashes). Verify those on Linux or a preview channel.
