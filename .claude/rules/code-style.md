# Code Style

## Team rules (always apply)
- Never implement a Full Lane change without an approved spec. See specs/WORKFLOW.md for the Fast Lane exception.
- If an implementation needs to deviate from its spec, stop and discuss before continuing.
- Do not rename existing variables, functions, files, or folders to match product names. Follow whatever name already exists in that file (for example `x` in `.map((x) => ...)`, `QL`, `GL`, `myProfile`).
- Code comments explain why, not where. Never reference a spec filename, CR number, or line number in a comment. Explain the rule inline in plain English, one to four lines maximum.
- AI prompts: this repo has none today. If any are added, each must be versioned inside that feature's spec. No hardcoded prompts.

## Language and files
- Plain JavaScript with JSX. No TypeScript, no PropTypes. Do not introduce either without a spec.
- Components are `.jsx`; entry and bootstrap files (`src/index.js`, `src/App.js`) are `.js`.
- One component per folder, in `index.jsx`, using `export default function Name() {}`.
- Import React at the top (`import React, { useEffect } from 'react';`), then router, then assets, then local components/CSS.
- Use single quotes in JS imports; JSX attribute strings use double quotes (existing mixed usage is fine, do not reformat untouched lines).

## React patterns
- Function components with hooks only. No class components.
- Every page component scrolls to the top on mount with:
  `useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);`
  New pages must do the same.
- Lists rendered with `.map()` need a `key`. Prefer a stable value (`x.name`) over the index for new code.
- Images and videos must be imported as modules from `src/assets/...` (`import QL from '../assets/portfolioVideos/QuickLending.mp4'`), never referenced by a string path.
- Every new `<img>` needs a meaningful `alt` text.
- Internal navigation uses `<Link to="...">` from react-router-dom, never `<a href="/...">`. External links use `<a href="https://...">`.

## Error handling and async
- There is no backend, no data fetching, and no async code. If a future feature adds any, its spec must define how loading and errors are shown.

## Testing
- `npm test` runs Jest via react-scripts. The only test, `src/App.test.js`, is the default Create React App test and fails (it looks for "learn react"). Do not rely on it as a signal; fix or replace it only through a spec.

## Must never
- Never commit secrets or `.env` files (none exist today; `.gitignore` already covers `.env.*.local`).
- Never edit anything in `build/` or `node_modules/` by hand.
- Never run `npm run eject`.
