# Project Structure, Routing, and Content

## Pages and components
- Pages live in their own top-level folder under `src/` with a PascalCase name: `src/Home/`, `src/Profile/`, `src/Portfolio/`. A new page follows the same pattern.
- Shared pieces live in `src/components/<name>/index.jsx`. Existing folder names are mixed case (`Header`, `footer`, `techStack`); keep them as they are and do not rename.
- A component's own CSS sits next to it as `index.css` and is imported in `index.jsx` (see `components/Header`). Prefer Tailwind classes; add a CSS file only when Tailwind cannot do it (for example the mobile nav slide-in).

## Routing
- `src/App.js` uses `HashRouter`, so real URLs look like `/#/profile`. Keep HashRouter: Firebase Hosting has no rewrite rule for single-page apps (`firebase.json`), so switching to `BrowserRouter` would break page refreshes unless the spec also adds a rewrite.
- Routes are declared only in `src/App.js`. A new page needs a `<Route>` there and a nav link in `components/Header/index.jsx` (both the active-state check on `currentPath` and the `toggleNav()` click handler).
- Page-wide `<title>` and Open Graph tags are set once in `App.js` with `react-helmet`.

## Content
- All site content (profile text, skills, experience, contact links, portfolio projects) is written directly in the page files:
  - Profile skills: the `skills` array in `src/Profile/index.jsx` (`{ img, name }`).
  - Portfolio projects: the `projects` array in `src/Portfolio/index.jsx` (`{ name, video, techs, description, projectLink? }`). `techs` is an array of image imports passed to `TechStack`.
  - Experience and education: hardcoded JSX blocks in `src/Profile/index.jsx`.
- To add a portfolio project: add the `.mp4` to `src/assets/portfolioVideos/`, import it at the top of `Portfolio/index.jsx`, and add an entry to `projects`. Reuse existing tech logo imports.
- The resume downloaded from the header is `src/assets/resume/resume-2025.pdf`, imported in `components/Header/index.jsx`. To update the CV, replace that import, do not edit the PDF path elsewhere.

## Assets
- Images: `src/assets/images/`. Videos: `src/assets/portfolioVideos/`. Resume PDFs: `src/assets/resume/`.
- Videos are bundled into the build, so large files make the deploy bigger. Keep new recordings short and compressed.

## Build and deploy
- `npm run build` writes to `build/`, which Firebase Hosting serves (`firebase.json`, project `raj-maisuriya` in `.firebaserc`).
- Deploy is manual: `npm run build` then `firebase deploy` (needs the Firebase CLI, not listed in package.json).
- `.firebase/` is a Firebase CLI cache folder; do not edit it.
