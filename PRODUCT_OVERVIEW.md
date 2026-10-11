# Product Overview: RJ INDUSTRIES

## What is it?

RJ INDUSTRIES is the personal portfolio website of Raj Maisuriya, a full stack
web developer based in Surat, Gujarat, India. "RJ INDUSTRIES" is the brand name
shown in the site header; the site itself is about one person and their work.

It is live at https://raj-maisuriya.web.app/ (hosted on Firebase).

## Who is it for?

- Recruiters and hiring managers looking at Raj as a possible employee.
- Clients looking for a freelance web developer (the contact section promises
  daily progress updates on freelance work).
- Other developers or contacts who want to see Raj's work or get in touch.

## What can a visitor do?

The site is one long page plus a case study.

1. **Hero**: who Raj is, a rotating line of roles, and buttons to view OrbitOps,
   see projects, or download the CV.
2. **About**: a short story (BCA in Surat, Constantsys, Zluck Solutions, MCA,
   OrbitOps), a portrait and quick facts.
3. **Stack**: an interactive diagram of Raj's three layers (Next.js / React /
   TypeScript, Fastify, Sequelize / PostgreSQL). Visitors can click a layer to
   see what was built with it, or press "Send a request" to watch a request
   travel through the stack and back. Below it, skill cards can be filtered by
   Frontend, Backend, Database and Tools.
4. **Projects**: filterable cards. OrbitOps is the featured project. Other
   projects (QueryLoom, QuickLending, Glozic, Graph Community, a real-time chat
   app, an online bookstore, a movie booking system, a Muthoot Finance clone)
   show a silent video preview on hover and a full demo on click, with live
   links where they exist.
5. **Experience**: a timeline of roles and education.
6. **Contact**: email (with a copy button), social links, and a contact form
   once a form key is configured.
7. **OrbitOps case study** (its own page): the problem, how tenants and the
   Master Admin fit together, how a request stays inside its tenant, and why
   this stack.

Extras: light and dark themes, a command palette (Ctrl/Cmd+K), and a small
easter egg for visitors who type "orbit".

## How is it different from similar sites?

- **The design explains the stack.** Instead of a list of logos, visitors can
  click through the layers and watch a request move from UI to database.
- **Video instead of screenshots.** Projects preview as short screen
  recordings, which only load when someone asks for them.
- **A real product at the centre.** OrbitOps, a multi-tenant SaaS CRM, gets
  its own case study.

## Other useful facts

- All content (text, projects, skills, experience, contact links) lives in
  typed data files in the code. There is no admin panel or database.
  Updating the site means editing those files and redeploying.
- The look is a light or dark "blueprint" style: a faint grid, a bright blue
  accent, one colour per stack layer, the Inter font for text, JetBrains Mono
  for labels, and Audiowide for the logo.
