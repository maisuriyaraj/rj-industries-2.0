# Spec: Portfolio Redesign (Stack Showcase + Bug Fixes)

## Status
Implemented

## Type
Improvement (redesign, bug fixes, and framework migration)

## Goal
Make the portfolio far more attractive and interactive, and let the design itself show Raj's stack (Next.js, React, TypeScript, Fastify, Sequelize, PostgreSQL), with OrbitOps as the flagship project. Fix every UI bug found in the audit below.

> SDD note: this spec lives at the repo root because it was asked for as `SPEC.md`. It is listed in `specs/INDEX.md` like any other spec. It changes rules that the `.claude/rules/` files state today (plain JS only, keep HashRouter, no new fonts or colours). Those rules files get updated as part of this work (task T15).

---

## 1. Current State Audit

Audited on 2026-10-11 against the live site (https://raj-maisuriya.web.app/) and the `main` branch (`ae69d44`).

### Tech
| Area | Today |
|---|---|
| Framework | React 18, Create React App (`react-scripts` 5). CRA is no longer maintained (the React team deprecated it in Feb 2025). |
| Language | Plain JavaScript (`.js` / `.jsx`), no types |
| Routing | `react-router-dom` 6 with `HashRouter` (`/#/profile`) |
| Styling | Tailwind CSS 3.4 utilities inline, plus `App.css` and `Header/index.css`. No design tokens; `#0095ff` is repeated 10 times. |
| Fonts | Google Fonts loaded through CSS `@import` (all 18 Poppins weights, plus Audiowide) |
| Icons | `bootstrap-icons` (the whole font is loaded for 2 icons) |
| Head and meta tags | `react-helmet`, set only by JavaScript in the browser |
| Hosting | Firebase Hosting, static files from `build/`. No rewrites, no cache headers. Deploy is manual with `firebase deploy`. |
| Tests | One test, the default CRA sample, which fails |

### Pages and components
- `Home`: hero text, a "See My Profile!" button, an animated SVG illustration, and a decorative SVG.
- `Profile`: photo, education, skill logos, two experience cards, a long description, and a side panel of contact links.
- `Portfolio`: 7 projects, each with a video, a description, and tech logos (`components/techStack`).
- Shared: `components/Header` (sticky nav, mobile slide-in menu, Download CV) and `components/footer`.

### Baseline scores (Lighthouse 12.3, local headless Chrome, live site)
| Page | Form factor | Perf | A11y | Best Pr. | SEO | LCP | CLS | Page weight |
|---|---|---|---|---|---|---|---|---|
| Home | Mobile | 94 | 92 | 100 | 92 | 2.8 s | 0 | 292 KiB |
| Home | Desktop | 94 | 92 | 100 | 92 | 1.1 s | 0 | 156 KiB |
| Portfolio | Mobile | 87 | 100 | 100 | 92 | 3.3 s | 0.054 | 8.3 MB |
| Portfolio | Desktop | **77** | 94 | 100 | 92 | 1.1 s | **0.387** | 11.2 MB |

Profile was not measured. Lighthouse loads hash routes inconsistently, so the after-scores will be taken on real page URLs.

Failing audits: colour contrast, heading order, links that crawlers cannot follow, missing preconnect for fonts, short cache lifetime on static files, very large page size (Portfolio), layout shift (Portfolio), wrongly sized images, unused JavaScript.

### Other baseline facts
- **Console:** no errors or warnings on any page.
- **Sideways scroll:** only on Profile at 768px (page is 865px wide). See B2.
- **Media:** the 7 videos in use total about 226 MB (`chat-3.mp4` alone is 96 MB). 7 more unused videos add about 115 MB more to the repo. The deployed `build/` folder is 228 MB.
- **Missing files:** `/sitemap.xml` returns 404. `/favicon.ico` (listed in `manifest.json`) returns 404.
- **Screenshots:** saved in `docs/screenshots/before/` (375, 768 and 1440 wide; mobile menu open; computer set to dark mode).

---

## 2. Bug List

Severity levels:
- **High:** broken, hurts many visitors, or costs money.
- **Medium:** clearly wrong, or an accessibility or SEO failure.
- **Low:** polish.

Because the site is being rebuilt (see section 5), most fixes happen while each piece is ported. Each bug has a matching acceptance check in section 7.

| # | Sev | Bug | Planned fix |
|---|---|---|---|
| B1 | High | **Huge videos.** About 226 MB of video is bundled into the site. Portfolio downloads 8 to 11 MB just on page load. Firebase's free plan allows only about 360 MB of transfer per day, so a handful of visitors can use it up. | Re-encode with ffmpeg (720p, H.264, about CRF 28, no audio, trimmed to 20 to 30 s, target 4 MB or less each). Add a poster image. Use `preload="none"` and only load a video when its card comes into view or is hovered. Delete unused videos. |
| B2 | High | **Profile breaks at 768px.** The page scrolls sideways (865px). The side panel is squeezed, the "Portfolio Projects" button text wraps over itself, and long URLs run out of the card. | The redesign replaces this layout with a stacked, mobile-first grid. Long links show short labels ("LinkedIn") instead of full URLs and use `break-words`. |
| B3 | Medium | **Invisible button in the mobile menu.** "Download CV" is a `#0095ff` button on a `#0095ff` panel, so it has no visible edge. | New menu uses a surface token background with a contrasting primary button. |
| B4 | Medium | **Low contrast.** White text on `#0095ff` is about 3.1:1, and `#0095ff` text on white is the same. WCAG AA needs 4.5:1 for normal text (Lighthouse flags it). | New `--brand-strong` token (about `#0068C9`, 4.5:1 or better) for buttons and links. `#0095ff` stays only for large text and decoration. |
| B5 | Medium | **Logo and footer are not links.** The header logo is `<a to="/">` with no `href`, so it is not clickable or reachable by keyboard. The footer's `<a>RjIndustries</a>` has no `href` either. Lighthouse flags both as "links not crawlable". | Logo becomes a real `<Link href="/">`. Footer text becomes plain text or a real link. |
| B6 | Medium | **Mobile menu is not accessible.** The burger button's only label is `alt="ICON"`, it has no `aria-expanded`, Esc does not close the menu, focus is not kept inside it, and the close "button" is a `<p>`. The menu is opened by changing the page directly (`classList`). Clicking a nav link on desktop also toggles the `open` class, so the menu shows up open after resizing to mobile. | Rebuild as a React-state component: a real `<button>` with `aria-label`, `aria-expanded` and `aria-controls`; Esc closes; focus stays inside while open; body scroll locked; closes on route change. |
| B7 | Medium | **Missing alt text.** The profile photo has `alt=""`. Portfolio tech logos use the array index as alt text (`"0"`, `"1"`). | All images get meaningful alt text; purely decorative images get `alt=""` plus `aria-hidden`. Typed data makes alt text required. |
| B8 | Medium | **Broken heading order.** Portfolio has 7 `<h1>`s. Profile puts an `<h1>` under `<h2>`s. Home uses `<h5>` straight after `<h1>`. | One `<h1>` per page, then `h2` for sections and `h3` for cards. |
| B9 | Medium | **No page landmarks.** There is no `<main>` and no "skip to content" link. | Layout adds `<header>`, `<main id="content">`, `<footer>`, and a skip link. |
| B10 | Medium | **SEO is weak.** The title says "Fullstack Developer" but the description says "Web Developer". Every route shares the same title and description. Hash URLs cannot be indexed as separate pages. Meta tags only exist after JavaScript runs. There is no canonical link, no Twitter card, no sitemap, `favicon.ico` is missing, and the manifest is still "Create React App Sample" with `#000000`. | Pre-rendered HTML with a title, description, canonical and OG/Twitter tags for each page. Add `sitemap.xml`, `robots.txt`, a real favicon set, a fixed manifest, a JSON-LD `Person`, and a static 1200x630 OG image. |
| B11 | Medium | **Footer goes dark on its own.** It uses `dark:` classes, and Tailwind applies them automatically when the computer is in dark mode. Footer becomes grey `rgb(31,41,55)` while the page stays white (see `home-1440-darkOS.png`). | Replaced by a real light/dark theme system (feature F6). |
| B12 | Medium | **Portfolio layout shift (CLS 0.387, desktop).** Videos have no size set, so content jumps as they load. | Fixed `aspect-ratio` box plus a poster for every video or preview. |
| B13 | Low | **Hero leftovers.** "Hey &nbsp; I am" prints a double space. Empty `<span className="text-primary" />` tags. Undefined classes (`text-primary`, `text-secondary`, `hero-gradient-*`, `text-black-400`) do nothing, so the intended gradient never shows. | Removed in the rewrite. Every class used maps to a real token. |
| B14 | Low | **Hero layout.** On desktop there is a big empty gap, and `md:mt-[90px]` pushes the text off centre. The decorative SVG overlaps the header next to "Download CV". | New hero layout (F1). |
| B15 | Low | **Edges don't line up.** The logo starts at x=72, the Profile card at x=24, and the Portfolio video at x=32 (at 1440px). | A single `Container` component (max 1200px, fixed gutters) used everywhere. |
| B16 | Low | **Lonely profile photo.** The photo sits in a large, mostly empty white card on desktop. | The About section uses a sized and cropped portrait. |
| B17 | Low | **Header visual seam.** The header is white over a `gray-100` page, and only gets a background after scrolling 40px. The scroll listener is not passive. | Header uses a translucent surface with blur. Scroll state comes from `IntersectionObserver` or a passive listener. |
| B18 | Low | **Typos and copy errors.** "E-Commarce", "Collage Project", "Technologies in I can work on", "Programming Expertise:Node.js" (missing space), "Bootstrap" listed twice. The footer year "© 2024" is hard-coded. | Copy rewritten (Raj to review). The footer year is computed. |
| B19 | Low | **Stack mismatch.** The skills shown (Angular, MongoDB, and so on) don't match the stack Raj now leads with. TypeScript, Fastify, Sequelize and PostgreSQL are missing. | New stack data (F2). Older tools move to an "Also worked with" group. |
| B20 | Low | **Project links never shown.** `projectLink` exists (QuickLending) but is never rendered. No GitHub links anywhere. | Project cards render live and GitHub links when they exist. |
| B21 | Low | **Personal info in recordings.** Videos show the browser's tab strip and bookmarks bar (open tabs and bookmarks are visible). | Crop the browser bar while re-encoding (B1). |
| B22 | Low | **Phone link has a space.** `tel:+91 7623870030`. | Change to `tel:+917623870030`, if the number stays public (see Open Questions). |
| B23 | Low | **Fonts and icons slow the first paint.** Google Fonts `@import` blocks rendering (flagged "preconnect"). All 18 Poppins weights and a full icon font are loaded. | `next/font` self-hosts only the weights used. Icons become inline SVG (lucide-react, tree-shaken). |
| B24 | Low | **Short caching.** Hashed static files are served with `max-age=3600`. | `firebase.json` headers: `/_next/static/**` gets `public, max-age=31536000, immutable`. |
| B25 | Low | **Broken test and dead weight.** The only test fails. Unused files are in the repo (old resume, `me.jpg`, `me.webp`, `rj*.png`, `logo.svg`, 7 videos). The `.firebase/` cache is committed. | Remove the dead test and unused files. Add `.firebase/` to `.gitignore` and stop tracking it. Add `lint` and `typecheck` scripts. |
| B26 | Low | **External links.** External links open in the same tab and have no `rel`. | External links open in a new tab with `rel="noopener noreferrer"` and a visible "opens in new tab" cue for screen readers. |

---

## 3. Design Direction

### Three options

**A. "Stack Blueprint" (recommended)**
- **Idea:** an engineering-blueprint look. A faint grid background, thin "wire" lines, and monospace labels. The page reads like an architecture diagram of Raj's stack.
- **Colours:** each stack layer gets one accent colour (UI, API, Data), so the page itself teaches the stack.
- **Theme:** dark mode first, with an equally polished light mode.
- **Why:** it directly meets "the design itself communicates my tech stack". It turns the stack section into the visual centrepiece without being a gimmick.

**B. "IDE / Terminal"**
- **Idea:** the site looks like a code editor: file tabs as navigation, syntax-coloured headings, and a terminal hero.
- **Pros:** memorable, and very "developer".
- **Cons:** long text is harder to read, the look is overused, and recruiters who don't code may find it noisy.
- **Use:** only as the Easter egg (F10).

**C. "Clean SaaS Product"**
- **Idea:** a Linear or Vercel style landing page: gradient mesh, glass cards, big type.
- **Pros:** polished, and fits "builds SaaS products" (OrbitOps).
- **Cons:** generic; it doesn't say anything specific about the stack.
- **Use:** Direction A borrows its spacing and type scale.

### Visual identity (Direction A)

**Colour tokens.** Defined as CSS variables on `:root` and `[data-theme="dark"]`, and mapped into Tailwind's theme. The final values will be checked for 4.5:1 contrast with a script in T5.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F8FAFC` | `#0B1120` | page background |
| `--surface` | `#FFFFFF` | `#111827` | cards, header |
| `--surface-2` | `#F1F5F9` | `#1E293B` | chips, code blocks, hover |
| `--border` | `#E2E8F0` | `#1F2A3D` | lines, grid |
| `--text` | `#0F172A` | `#E2E8F0` | body text |
| `--text-muted` | `#475569` | `#94A3B8` | secondary text |
| `--brand` | `#0095FF` | `#38B2FF` | logo, large accents (kept from the current identity) |
| `--brand-strong` | `#0068C9` | `#7CC8FF` | buttons, links, focus ring (passes AA) |
| `--layer-ui` | `#0891B2` | `#22D3EE` | Next.js / React / TS layer |
| `--layer-api` | `#B45309` | `#FBBF24` | Fastify layer |
| `--layer-data` | `#4F46E5` | `#818CF8` | Sequelize / PostgreSQL layer |
| `--success` / `--danger` | `#15803D` / `#B91C1C` | `#4ADE80` / `#F87171` | form states |

**Typography** (all via `next/font`, self-hosted, only the weights used):
- **Inter** (400, 500, 600, 700): body and headings.
- **JetBrains Mono** (400, 500): labels, code, the data-flow diagram, and the typed hero role.
- **Audiowide**: logo wordmark only, so "RJ INDUSTRIES" keeps its look. It can be swapped for an SVG wordmark later.
- **Poppins** is dropped. This is a deliberate change from today's design rules.
- **Type scale (fluid, using `clamp`):**
  - display 40 to 64px
  - h2 28 to 40px
  - h3 20 to 24px
  - body 16 to 18px
  - small 14px
  - mono label 12 to 13px, uppercase, tracking 0.08em

**Spacing and shape:**
- 4px base scale (4, 8, 12, 16, 24, 32, 48, 64, 96).
- Section padding: 64px on mobile, 96px on desktop.
- `Container`: max 1200px, gutters 16px on mobile, 24px on tablet, 32px on desktop.
- Corner radius 8, 12 or 16px. Two shadow levels in light mode; dark mode uses border plus glow instead.

**Motion:**
- Durations 150, 250 and 400ms with `cubic-bezier(.2,.8,.2,1)`.
- Everything is wrapped in a `prefers-reduced-motion` check: no motion, instant reveal, no typing effect.

**Theme:**
- Light/dark toggle that starts from the system setting and remembers the visitor's choice in `localStorage`.
- No flash of the wrong theme: a tiny inline script in `<head>` sets `data-theme` before the page paints.

---

## 4. Feature Plan

### Information architecture
The site moves from 3 separate pages to:
- **`/`** (home): one long page with sections Hero, About, Stack, Projects, Experience, Contact.
- **`/projects/orbitops`**: the OrbitOps case study.
- **`/404`**: a custom not-found page.

Old links keep working. A small script on `/` maps `/#/profile` to `/#about` and `/#/portfolio` to `/#projects`.

### Features

Effort key: **S** is a few hours, **M** is about half a day to a day, **L** is more than a day.

| # | Feature | Include? | Effort |
|---|---|---|---|
| F1 | Hero: typed rotating role, animated blueprint grid background, CTAs | Yes | M |
| F2 | Stack centrepiece: interactive layered architecture diagram, plus filterable skill cards | Yes | L |
| F3 | "How my stack fits together" data-flow animation | Yes, **merged into F2** (one diagram, a "Send a request" button) to avoid two similar sections | (in F2) |
| F4 | Projects: filterable cards, hover video preview, tech badges, live/GitHub links | Yes | M |
| F5 | OrbitOps case study page | Yes (needs content from Raj) | M |
| F6 | Dark/light theme toggle (system setting + remembered) | Yes | S |
| F7 | Scroll reveal, smooth scroll, scroll progress bar, sticky nav with active-section highlight | Yes | S |
| F8 | About story, experience timeline, resume download | Yes | M |
| F9 | Contact form (validation, success and error states) plus social links | Yes (needs a form service key, see Open Questions) | M |
| F10 | Command palette (Ctrl/Cmd+K) and a small Easter egg | Yes, last priority (P3) | S |
| F11 | Custom cursor | **No.** It adds JavaScript on every mouse move, often hurts usability, and adds little for recruiters. Revisit only if Raj insists. | (none) |

### Acceptance criteria

**F1 Hero**
- Shows "Raj Maisuriya", a rotating role line typed in mono ("Full-stack developer", "Next.js + TypeScript", "Fastify APIs", "Building OrbitOps"), and a one-line value statement.
- Primary CTA "View OrbitOps"; secondary CTAs "See projects" and "Download CV".
- The background is a CSS/SVG blueprint grid with a slow gradient glow. No canvas and no particle library.
- With reduced motion: static text (first role) and a static background.
- LCP element is text, so LCP is under 2.5s on Lighthouse mobile.

**F2/F3 Stack centrepiece**
- **Diagram:** an SVG/HTML diagram of three stacked layers:
  - UI: Next.js, React, TypeScript
  - API: Fastify
  - Data: Sequelize, PostgreSQL

  Each layer is drawn in its `--layer-*` colour.
- **Interacting with a layer:** hover, focus, click or tap opens a panel with what Raj built with it (for example "Tenant-aware Fastify plugins in OrbitOps"). It is fully keyboard operable (buttons, `aria-expanded`). On mobile it works by tap and the panel appears below the diagram.
- **"Send a request" button:** animates a packet from the UI to the Fastify route, through the Sequelize query, to PostgreSQL and back, with mono captions for each step (`GET /api/tenants/:id/contacts` → `preHandler: auth + tenant scope` → `Contact.findAll({ where: { tenantId } })` → `SELECT … WHERE tenant_id = $1` → `200 OK JSON`). With reduced motion the steps show as a numbered list.
- **Skill cards:** filter chips for All / Frontend / Backend / Database / Tools, built from a typed `skills.ts`.
  - Each card shows a logo, name, a level and a one-line "used for".
  - **Levels are Daily / Comfortable / Familiar instead of % bars.** Percentages are made up and recruiters distrust them.
  - The filter state is announced to screen readers (`aria-live`).
  - An "Also worked with" group keeps Angular, MongoDB, Express and Bootstrap.

**F4 Projects**
- **Cards** come from a typed `projects.ts`, with fields: slug, title, summary, role, tech[], category, links{live?, github?, caseStudy?}, media{poster, preview?}, featured.
- **Filters:** All / Full-stack / Frontend / SaaS. The filtered list animates with a layout transition, or appears instantly with reduced motion.
- **Hover preview:** on desktop with hover, a muted inline preview plays on hover or focus and pauses on leave. On touch devices only the poster shows, with a play button that opens the full video.
- **No layout shift:** every card has a fixed aspect-ratio media box (CLS under 0.1).
- **Links:** live and GitHub links render only when present. OrbitOps is shown first as a large featured card.

**F5 OrbitOps case study** (`/projects/orbitops`)
- Sections:
  - Overview
  - The problem
  - Multi-tenant architecture: a diagram showing tenant isolation and request scoping
  - Roles and permissions: Master Admin vs tenant admin vs user
  - Modules
  - Tech decisions: why Fastify, Sequelize, PostgreSQL
  - Challenges and how they were solved
  - Results
  - What's next
- It has its own title, description, OG tags and a canonical URL, and is included in the sitemap.
- The content is Raj-approved. No placeholder or made-up numbers are shipped (see Open Questions).

**F6 Theme**
- The toggle has an accessible label and states, starts from the system setting, and remembers the choice.
- There is no wrong-theme flash on reload (checked with throttled reload).
- Both themes pass AA contrast.

**F7 Navigation and motion**
- **Sticky header:** highlights the section in view (`IntersectionObserver`, `aria-current`) and offsets anchor scrolling for the header height.
- **Progress bar:** a 2px bar at the top, purely decorative (`aria-hidden`).
- **Reveal:** an IntersectionObserver plus CSS class reveals each section once. With reduced motion everything is visible immediately.

**F8 About, Experience, Resume**
- **About:** a short story (Surat, BCA, how Raj got into full-stack, what drives OrbitOps), a portrait, and quick facts.
- **Experience timeline:** a vertical timeline with Constantsys (May 2023 to Nov 2024), Zluck Solutions (Dec 2024 to …), and RJ Industries / OrbitOps. Each has its role, dates, 2 to 3 bullets and tech chips. Durations are calculated, not typed by hand.
- **Resume:** a "Download CV" button in the header and Hero. The file is served at the stable URL `/raj-maisuriya-resume.pdf`.

**F9 Contact**
- **Fields:** name, email, message, plus a hidden honeypot field.
- **Validation:** client-side (required fields, email format, message 10 to 2000 characters). Errors are shown inline and linked with `aria-describedby`.
- **States:** idle, sending, success (a thank-you panel) and error (a retry button plus a mailto fallback).
- **Sending:** the form posts to a static-friendly form service (Web3Forms recommended: free, and its access key is designed to be public). With no key set, the form is hidden and a mailto plus social links are shown instead.
- **Social links:** GitHub, LinkedIn, X, YouTube, email, with icons and accessible names.

**F10 Command palette and Easter egg**
- **Palette:** Ctrl/Cmd+K opens a dialog to jump to sections, open the case study, toggle the theme, download the CV, or copy the email. It uses the `cmdk` library, loaded only when first opened. It is fully keyboard operable and focus returns to where it was.
- **Easter egg:** typing `orbit` (or the Konami code) switches the hero into a mini terminal that prints `npx create-rj-app` style lines. Esc exits. It is off with reduced motion.

---

## 5. Architecture Decision

**Recommendation: move to Next.js 15 (App Router) + TypeScript + Tailwind CSS 4, using static export (`output: 'export'`), still served by Firebase Hosting.**

### Why
1. **The site should prove the stack.** Raj leads with Next.js and TypeScript. A portfolio built on deprecated CRA and plain JavaScript works against that message, and recruiters do look at the repo.
2. **Static export fits Firebase Hosting with no new cost.** Every page is pre-rendered to HTML at build time and served from Firebase's CDN, exactly like today.
   - **Why not SSR:** SSR would need Firebase App Hosting or Cloud Functions, which means the paid Blaze plan, slow cold starts, and more to run. Nothing on this site changes per request, so it gains nothing.
3. **It fixes real bugs.** Pre-rendered HTML with page-level metadata fixes B10 (SEO), B5 (real links) and B23 (`next/font`). Real URLs replace hash URLs. Code is split per route automatically.
4. **The extra effort is small.** The redesign rewrites every component anyway (today there are only about 600 lines across 6 components). Moving to Next.js adds about half a day.

### Alternatives considered
- **Keep CRA + JavaScript:** no migration work, but CRA is deprecated, pages cannot be pre-rendered, and it misses the "show the stack" goal. Rejected.
- **Vite + React + TypeScript:** cheap and fast, but it still only renders in the browser (meta tags need JavaScript), and pre-rendering would need extra plugins. It also doesn't show Next.js. Second choice.

### Limits of static export, and how each is handled
- **No API routes, so no server for the contact form.** Use a form service (F9).
- **`next/image` cannot optimise images at request time.** Images are pre-optimised at build time (sharp script to AVIF/WebP at 1x and 2x) and rendered with `unoptimized` and explicit width and height.
- **The Fastify, Sequelize and PostgreSQL part of the stack is shown through content** (the diagram and the OrbitOps case study), not by running a backend for a static portfolio. This is stated honestly on the page.

### Libraries
| Add | Why | Size |
|---|---|---|
| `next`, `react`, `react-dom`, `typescript` | framework | (base) |
| `tailwindcss` v4 | tokens through CSS variables | build time only |
| `motion` (Framer Motion) with `LazyMotion` + `domAnimation`, **only in the stack diagram and project filter** | layout and sequence animations that are painful in plain CSS | about 18 KB gzipped, loaded only with those sections |
| `lucide-react` | icons, tree-shaken | only the icons used |
| `cmdk` | command palette, loaded on demand | about 6 KB, lazy |

Removed: `react-scripts`, `react-router-dom`, `react-helmet`, `bootstrap-icons`, `web-vitals`, and the testing-library packages tied to CRA.

### Firebase Hosting changes (`firebase.json`)
- `"public": "out"`
- `cleanUrls: true`, `trailingSlash: false`
- A custom 404 using `out/404.html`
- `headers`: one year `immutable` for `/_next/static/**` and the font and media files; `no-cache` for HTML
- Deploy command stays `firebase deploy` (run after `npm run build`).

---

## 6. Affected Files

**Removed:**
- `src/App.js`, `src/App.css`, `src/App.test.js`, `src/index.js`, `src/index.css`
- `src/reportWebVitals.js`, `src/setupTests.js`, `src/logo.svg`
- `src/Home/`, `src/Profile/`, `src/Portfolio/`, `src/components/*`
- `public/index.html`, `public/manifest.json` (replaced)
- `tailwind.config.js`
- The unused assets listed in B25

**Modified:**
- `package.json`, `package-lock.json`
- `firebase.json`
- `.gitignore` (add `out/`, `.next/`, `.firebase/`)
- `README.md`
- `CLAUDE.md` (Stack, Key Commands, Folder Map, Undocumented Architecture)
- `.claude/rules/code-style.md`, `design-system.md`, `project-structure.md` (rewritten for TS, Next, tokens)
- `specs/INDEX.md`

**Created:**
- `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`
- `src/app/`: `layout.tsx`, `page.tsx`, `not-found.tsx`, `projects/orbitops/page.tsx`, `sitemap.ts`, `robots.ts`, `manifest.ts`, `globals.css` (tokens)
- `src/components/`: `layout/`, `ui/`, `sections/`, `stack/`, `projects/`
- `src/data/`: `skills.ts`, `projects.ts`, `experience.ts`, `site.ts`
- `src/lib/`: `theme`, `motion`, `use-active-section`
- `public/`: media, posters, favicons, OG image, resume
- `scripts/optimize-media.mjs`: ffmpeg + sharp, run by hand, not at build time

---

## 7. Task Breakdown (priority order) and Done Checklist

Work happens on a branch `redesign`, one small commit per task or less. Each task ends with:
1. `npm run build`
2. A console-error check
3. Screenshots at 375, 768 and 1440 wide, saved to `docs/screenshots/after/`

**P0: Foundation and bug fixes (keep today's look, fix the bugs)**
- [x] T1 Scaffold Next.js 15 + TS + Tailwind 4 static export. Update `firebase.json` (out, cleanUrls, headers, 404). Update `.gitignore`. `npm run build` produces `out/`.
- [x] T2 Media pipeline:
  - Re-encode and crop the 7 used videos (B1, B21)
  - Generate posters
  - Optimise the portrait, logos and favicons
  - Delete unused assets and the old resume (B25)
  - Stop tracking `.firebase/`
- [x] T3 Port the current content into typed `src/data/*.ts` and plain components. This fixes:
  - B5 (real links), B6 (accessible mobile menu), B7 (alt text), B8 (headings), B9 (landmarks)
  - B13, B17, B18 (copy, after Raj reviews), B20 (project links), B22 (phone link), B26 (external links)
  - Result: a deployable checkpoint with all P0 bugs fixed.
- [x] T4 SEO base (B10): per-page metadata, canonical, OG/Twitter tags, static OG image, `sitemap.ts`, `robots.ts`, `manifest.ts`, favicons, JSON-LD Person, old hash-URL redirect. Plus B24 cache headers.

**P1: Design system**
- [x] T5 Tokens in `globals.css` (light/dark), Tailwind theme mapping, `next/font` (B23), and a contrast-check script (B4).
- [x] T6 Theme toggle with no flash (F6, fixes B11). UI primitives: `Container` (B15), `Section`, `Button`, `Badge`, `Card`, `Chip`, `SkipLink`.
- [x] T7 New header (sticky, active section, mobile menu, B3), footer, scroll progress, reveal helper (F7).

**P2: Features**
- [x] T8 Hero (F1, fixes B14)
- [x] T9 About, Experience timeline and Resume (F8, fixes B16)
- [x] T10 Stack centrepiece with data flow (F2/F3, fixes B19)
- [x] T11 Projects grid with filters and previews (F4, fixes B2 by replacing the layout, and B12)
- [x] T12 OrbitOps case study page (F5)
- [x] T13 Contact form (F9)

**P3: Extras**
- [x] T14 Command palette and Easter egg (F10)

**Wrap-up**
- [x] T15 Update the `.claude/rules/*` files, `CLAUDE.md` and `README.md` for the new stack.
- [x] T16 Verify: Lighthouse (mobile and desktop) on `/` and `/projects/orbitops`; the full bug checklist below; a keyboard-only pass; screenshots at 3 widths in both themes. Update this spec's Implementation Notes and set Status to Implemented.

### Done checklist (quality bar)
- [x] No sideways scroll at 320, 375, 768, 1024, 1440 and 1920 wide, in both themes
- [x] Lighthouse 90 or more in all four categories on mobile and desktop for `/` and `/projects/orbitops`
- [ ] CLS under 0.1 and LCP under 2.5s (mobile). CLS is 0 everywhere and `/projects/orbitops` LCP is 2.6s, but `/` is 3.1s in Lighthouse's simulated mobile run (the real measured LCP on a throttled phone profile was about 1.2s). See Implementation Notes.
- [x] No console errors or warnings on any page
- [x] Every interactive element reachable by keyboard, with a visible focus ring (`--brand-strong`, 2px outline, 2px offset)
- [x] One `<h1>` per page, logical heading order, landmarks, skip link
- [x] All text meets WCAG AA contrast in both themes
- [x] All images have correct alt text; videos show a lazy-loaded poster image and the `<video>` element is only created on hover or "Watch demo" (stricter than `preload="none"`)
- [x] Page weight of `/` under 1 MB on first load (videos excluded until a visitor plays one)
- [x] `sitemap.xml`, `robots.txt`, favicon, manifest, OG/Twitter tags all served correctly
- [x] `npm run lint`, `npm run typecheck` and `npm run build` all pass
- [x] Every bug B1 to B26 is fixed or explicitly noted as won't-fix with a reason
- [x] `firebase.json` serves `out/`; the deploy command is confirmed as `npm run build && firebase deploy` (Claude does not deploy without asking)

---

## Risks
- **Old links:** `/#/profile` links people have saved need the redirect script, or they land on the home top. This is covered in T4.
- **Firebase deploy:** the first deploy after switching to `out/` replaces everything. Firebase keeps old releases, so a rollback is one click in the console.
- **Video quality:** re-encoding lowers it. Raj should check each video before deleting the originals. Originals stay in git history.
- **Fonts:** Audiowide plus 2 new font families add font weight. Mitigated by subsets, `display: swap`, and only the needed weights.
- **Case study accuracy:** the OrbitOps case study must not contain made-up claims. Content waits on Raj.

## Open Questions
These don't block approval. Each blocks only the task named.

1. **OrbitOps content (T12):** what are the modules? How are tenants kept apart (a shared database with a `tenant_id` column, a schema per tenant, or a database per tenant)? What can the Master Admin do? Are there screenshots or recordings, a public URL, and real numbers you're happy to share?
2. **Contact form (T13):** OK to use Web3Forms? If so, create a free access key for maisuriyaraj664@gmail.com. Otherwise I'll ship mailto plus social links only.
3. **Current role (T9):** are you still at Zluck Solutions? Which role and dates should RJ Industries / OrbitOps show?
4. **Phone number:** keep it public on the site? I recommend removing it and keeping email plus the form.
5. **Projects (T11):** live and GitHub links for each project? Which older projects should be dropped (for example the Muthoot clone or the Movie booking college project)?
6. **Resume (T9):** is `resume-2025.pdf` still current, or is there a 2026 version?
7. **Copy (T3):** OK for me to rewrite the profile text for tone and typos? You review it before it ships.

## Implementation Notes

Implemented 2026-10-11 on branch `redesign`. Not deployed.

### Results (Lighthouse 12.3: Performance / Accessibility / Best Practices / SEO)
| Page | Before, mobile | After, mobile | Before, desktop | After, desktop |
|---|---|---|---|---|
| Home `/` | 94 / 92 / 100 / 92 | **91 / 100 / 100 / 100** | 94 / 92 / 100 / 92 | **100 / 100 / 100 / 100** |
| Portfolio → now `/#projects` | 87 / 100 / 100 / 92 | (part of `/`) | 77 / 94 / 100 / 92 | (part of `/`) |
| `/projects/orbitops` | (new) | **96 / 100 / 100 / 100** | (new) | **100 / 100 / 100 / 100** |

- "Before" was measured on the live site. "After" was measured on the local `out/` build, served with the same `firebase.json` rules plus gzip (Firebase compresses in production).
- **Page weight:** `/` is 374 KiB on first load, down from 8 to 11 MB on the old Portfolio page. No video downloads until a visitor hovers a card or presses "Watch demo".
- **Media size:** used videos went from 226 MB to 9.4 MB, and the deployed folder from 228 MB to about 12 MB.
- **Browser checks:** 36 page/width/theme combinations (3 pages × 6 widths × 2 themes) have no sideways scroll, no console errors, one `h1`, no skipped heading levels, and no images missing alt text.
- **Interaction checks:** 19 automated checks pass: mobile menu, theme, skip link, focus rings, stack tabs and request, filters, video, palette, easter egg, old links, active nav, reduced motion, and no-JS. The contact form was tested separately with a mocked Web3Forms service (7 checks pass).
- **Screenshots:** in `docs/screenshots/after/`.

### Bug checklist
- **Fixed:**
  - B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13
  - B14, B15, B16, B17, B18, B19, B20, B21, B23, B24, B25, B26
- **B22:** the phone link was removed from the site (an open question, resolved by default). The number is still printed in the downloadable resume.

### Deviations from the plan
1. **No animation library.** `motion` was added, then removed. It weighed about 48 KB gzipped, more than double the planned 18 KB. The `domAnimation` feature set also cannot do the layout animations it was chosen for. CSS transitions and keyframes now do the packet movement and the card fade-ins. Home-page JavaScript dropped from 181 KB to 140 KB.
2. **No "old look" checkpoint (T3).** Content went straight into the new components. Each P0 bug was fixed in the component that replaced it, rather than first rebuilding the old design.
3. **Resume.** Raj added a new `Raj_Maisuriya_Resume_2.pdf` during the work. It is now served at `/raj-maisuriya-resume.pdf`; the 2025 and older resumes were removed.
4. **Content added from that resume:**
   - QueryLoom as a project (live link, no tech listed).
   - The MCA in progress.
   - Glozic's live link (portal.glozic.com).
5. **Video crops.** The recordings also cut off the Windows taskbar (three of them showed it), not only the browser bar.
6. **Commit fix.** Commit `ce500f3` described `firebase.json` changes that were not actually in it, because the file write had silently failed. Commit `adbcbe4` adds them. It also (unannounced in its message) removed the old tech-logo SVGs, the old hero illustration and `public/robots.txt`, which were replaced by simple-icons and `src/app/robots.ts`.

### Content Raj should review
- **Skill levels** (Daily / Comfortable / Familiar) and their one-line "used for" text in `src/data/skills.ts`. Claude assigned these from the resume and the stack Raj stated.
- **OrbitOps case study:** now built from Raj's own case study (see Change Request History). The example request (`GET /api/leads`, `organization_id` filter) is labelled as simplified; the column name is illustrative.

### Known limitations and follow-ups
- **Home mobile LCP:** Lighthouse's simulation puts it at 3.1s, above the 2.5s target. The hero text is the LCP element, and a real throttled run measured about 1.2s. The remaining cost is mostly hydration work on a long page (about 1,000 DOM nodes).
- **Contact form:** off until `NEXT_PUBLIC_WEB3FORMS_KEY` is set at build time. Until then the section shows email and social links.
- **Poster sizes:** posters are 960px wide even on phones (Lighthouse estimates 15 to 46 KB could be saved with a 480px version).
- **Next.js advisory:** `npm audit` reports a PostCSS advisory in the copy bundled inside Next 15. It is build-time only, processes only our own CSS, and is fixed in Next 16.
- **Local testing:** the Firebase CLI 13.5.2 emulator crashes on Node 22, and on Windows all Firebase emulators ignore `redirects` and `headers` (superstatic builds globs with backslashes). Redirects and headers were verified with superstatic on POSIX paths. Check them again on a preview channel before the first deploy.
- **Old build folder:** the old `build/` folder from Create React App is still on disk (git-ignored, about 228 MB) and can be deleted.

## Change Request History
- 2026-10-11 | Stack layer panel fixed (it vanished after switching layers); QueryLoom recording added; OrbitOps case study rebuilt from Raj's own write-up, and OrbitOps facts corrected to MySQL, Redux Toolkit and Zod (not PostgreSQL/TypeScript) across the site | Bug report plus new source material from Raj | Raj Maisuriya
