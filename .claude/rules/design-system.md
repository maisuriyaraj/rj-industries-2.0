# Design System

There is no central token file. Values live in these places:
- `tailwind.config.js`: only adds `font-audiowide`. No custom colours.
- `src/index.css`: Tailwind layers plus Google Fonts imports (Audiowide, Poppins).
- `src/App.css`: Poppins on `p, h1-h6, button`; `.img-animation` (bounce); `.img-filter` (hue-rotate 75deg, recolours SVG illustrations to the blue accent).
- `src/components/Header/index.css`: mobile nav panel styles (below 1025px).
- Everything else is Tailwind utility classes written inline in each `.jsx` file.

## Colours actually in use
| Role | Value | Where |
|---|---|---|
| Primary accent (buttons, active nav, logo "INDUSTRIES") | `#0095ff` as `bg-[#0095ff]` / `text-[#0095ff]` | Header, Home, Profile |
| Accent tint (skill logo background) | `#0095ff0f` | Profile |
| Active mobile nav item | `#001969` | Header/index.css |
| Header background after scrolling | `#f5fafd` | Header/index.jsx (inline style) |
| Home headings | `#37474F`, `#424242` | Home |
| Page backgrounds | `bg-white`, `bg-gray-50`, `bg-gray-100` | Profile, Portfolio, Footer |
| Body text | `text-gray-500` / `600` / `700` / `800` | Profile, Portfolio, Footer |
| Links in Profile side panel | `text-blue-600` | Profile |
| Location icon | `text-red-600` | Profile |
| Home decorative SVG | `#B0C5B2` at 0.35 opacity | Home |

Classes that do nothing: `text-primary`, `text-secondary`, `from-hero-gradient-start`, `to-hero-gradient-end`, `bg-hero-gradient-start`, `text-black-400` are used in the code but are not defined in `tailwind.config.js`. They have no effect. Do not copy them into new code; use the real values above.

## Typography
- Body and headings: Poppins (set globally in `App.css`). Do not add a font-family class for it.
- Logo only: `font-audiowide`.
- Section headings in Profile: `text-xl md:text-2xl font-semibold`. Portfolio project titles: `text-4xl font-bold text-gray-800`. Small text: `text-sm text-gray-600`.
- Icons: Bootstrap Icons (`<i className="bi bi-..."></i>`), loaded globally in `App.js`.

## Layout and spacing
- Page wrapper: `style={{ maxWidth: 1536, margin: "auto", width: "100%" }}`, then an inner `m-auto w-[90%]` where needed. Reuse this for new pages.
- Section padding: `p-4 md:p-6` (Profile), `p-8` (Portfolio).
- Cards: `bg-white rounded-lg shadow-lg` (panels) or `shadow-md` (list items).
- Primary button: `rounded bg-[#0095ff] py-[6px] px-[12px] font-medium text-white drop-shadow-sm`.
- Breakpoints: Tailwind defaults (`sm`, `md`, `lg`, `xl`); the header switches to the mobile menu below `lg` (1025px in CSS).
- Light theme only. The footer has `dark:` classes, but there is no dark mode toggle; do not build on them.

## Hard rules
- Always use the colours, fonts, and patterns listed above. Never introduce a new colour or font that is not already in the codebase without a spec that says so.
- For the accent colour use `#0095ff` exactly; do not use Tailwind `blue-500` or similar as a substitute.
- Reuse existing components before creating new ones: `components/Header`, `components/footer`, `components/techStack` (logo grid, takes `skills` = array of image imports).
- If a spec decides to centralise tokens (for example adding `primary` to `tailwind.config.js`), update this file in the same change.
