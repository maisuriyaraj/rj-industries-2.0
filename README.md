# RJ INDUSTRIES · Raj Maisuriya's portfolio

Live at **https://raj-maisuriya.web.app**

The portfolio of Raj Maisuriya, a full-stack developer from Surat, India. The design itself shows the stack:
an interactive diagram follows a request from a Next.js + TypeScript UI, through a Fastify API, to
Sequelize and PostgreSQL. OrbitOps, a multi-tenant SaaS CRM, is the flagship case study.

## Stack

- Next.js 15 (App Router), React 19, TypeScript, static export
- Tailwind CSS 4 with light/dark design tokens
- Firebase Hosting

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm run typecheck
npm run lint
```

## Deploy

```bash
npm run build
firebase deploy --only hosting
```

`firebase.json` serves `out/` with clean URLs, long-lived caching for hashed assets, security headers,
and redirects from the old `/profile` and `/portfolio` paths.

## Contact form

The form sends through [Web3Forms](https://web3forms.com). Set the access key at build time:

```bash
NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key npm run build
```

Without a key, the contact section shows email and social links instead.

## Media

Original recordings and photos go in `media-src/` (not committed). `npm run media` (needs ffmpeg) writes
cropped, compressed videos, posters, the portrait, logos, favicons and the social preview image into
`public/`.

## Content

All text lives in `src/data/`: `site.ts`, `skills.ts`, `projects.ts`, `experience.ts`, `stack.ts`.
