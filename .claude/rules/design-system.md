# Design System ("Stack Blueprint")

All tokens live in `src/app/globals.css`: CSS variables on `:root` / `[data-theme='light']` and `[data-theme='dark']`, mapped into Tailwind 4 with `@theme inline`. There is no `tailwind.config.js`.

## Colour tokens (Tailwind class → use)
| Class | Use |
|---|---|
| `bg-bg`, `bg-surface`, `bg-surface-2` | page, cards, chips/hover |
| `border-line` | borders, dividers |
| `text-fg`, `text-muted` | body text, secondary text |
| `text-brand-strong`, `bg-brand-strong` + `text-on-brand` | links, primary buttons, focus ring (passes AA in both themes) |
| `brand` | decoration only (logo glow, packet, gradients); fails AA as text in light mode |
| `layer-ui` / `layer-api` / `layer-data` | the three stack layers (Next.js/React/TS, Fastify, Sequelize/PostgreSQL) |
| `success`, `danger` | form states |

Every text/background pair is AA in both themes. Re-check contrast if you change a value.

## Typography (via `next/font` in `src/app/layout.tsx`)
- Inter: body and headings (`font-sans`, default).
- JetBrains Mono: labels, code, eyebrows (`font-mono`, `.eyebrow` class).
- Audiowide: the RJ INDUSTRIES wordmark and the OrbitOps name only (`font-logo`).

## Layout and shape
- `components/ui/Container` (max 1200px, gutters 16/24/32px) wraps all page content.
- `components/ui/Section` gives each home section its eyebrow, `h2`, intro and `py-16 md:py-24` spacing.
- Cards: `rounded-2xl border border-line bg-surface shadow-card`. Chips: `components/ui/TechIcon` → `TechBadge`.
- Buttons: `components/ui/Button` (`ButtonLink`, `ButtonAnchor`, `buttonClass()` with `primary` / `secondary` / `ghost`).
- `.bg-blueprint` is the faint grid background. `animate-fade-up` is the enter animation.
- Scroll reveal: add `data-reveal`; `RevealObserver` marks it `data-revealed`. Never switch it to a class, because React rewrites `className` on re-render and the element would hide again.

## Theme
- `data-theme` on `<html>` is set before paint by `headScript` in `src/lib/theme.ts` (system preference, then remembered choice in `localStorage`).
- Use the `dark:` variant only when a token can't express it. A subtree can force a palette with `data-theme="light"` or `"dark"` (used by timeline logo markers and the terminal).

## Hard rules
- Use the tokens above. Never add a raw hex colour or a new font without a spec that says so.
- Reuse `Container`, `Section`, `Button`, `TechBadge`, `ExternalLink` and `SocialIcon` before creating new primitives.
- Tech logos come from `simple-icons` via `src/data/tech.ts` (monochrome, `currentColor`), never from image files.
