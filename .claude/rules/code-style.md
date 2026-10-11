# Code Style

## Team rules (always apply)
- Never implement a Full Lane change without an approved spec. See specs/WORKFLOW.md for the Fast Lane exception.
- If an implementation needs to deviate from its spec, stop and discuss before continuing.
- Do not rename existing variables, functions, files, or folders to match product names. Follow whatever name already exists in that file.
- Code comments explain why, not where. Never reference a spec filename, CR number, or line number in a comment. Explain the rule inline in plain English, one to four lines maximum.
- AI prompts: this repo has none today. If any are added, each must be versioned inside that feature's spec. No hardcoded prompts.

## Language and files
- TypeScript everywhere (`strict`, `noUncheckedIndexedAccess`). No `any`; no `.js`/`.jsx` app code.
- Components: PascalCase file per component, named export (`export function Hero()`). Route files in `src/app/` use Next's default exports.
- Imports use the `@/` alias for anything under `src/`.
- Content lives in typed `src/data/*.ts` files, never hardcoded inside components (see project-structure.md).

## React and Next.js
- Server components by default. Add `'use client'` only for state, effects or browser APIs, and keep client components small (for example `TypedRole`, `ProjectMedia`).
- The site is a static export: no API routes, no server actions, no `next/image` optimisation (`images.unoptimized`). Anything dynamic must work in the browser alone.
- Internal links use `next/link`; external links use `components/ui/ExternalLink` (new tab, `rel="noopener noreferrer"`, screen-reader hint).
- Every interactive element is a real `<button>` or `<a>`, reachable by keyboard, with an accessible name. Icons are `aria-hidden`.
- Every image has meaningful `alt` text, or `alt=""` when purely decorative.
- One `<h1>` per page; headings never skip a level.
- Animations must respect `prefers-reduced-motion` (global CSS rule plus `useReducedMotion` in `src/lib`). Content must stay visible without JavaScript.
- No animation library: CSS transitions and keyframes only. `motion` was removed to keep the home page light.

## Checks before committing
- `npm run typecheck`, `npm run lint` and `npm run build` must all pass.

## Must never
- Never commit secrets or `.env*` files. `NEXT_PUBLIC_WEB3FORMS_KEY` is public by design but still lives in the build environment, not in code.
- Never edit `out/`, `.next/`, `node_modules/` or `media-src/` contents by hand.
