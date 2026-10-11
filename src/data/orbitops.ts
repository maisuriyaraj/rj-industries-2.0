import type { TechId } from './tech';

// Content from Raj's OrbitOps case study (Oct 2026). Keep it factual: no usage numbers
// until pilot customers are live.

export const orbitops = {
  intro:
    'A multi-tenant SaaS CRM by RJ Industries. One platform serves many subscribing companies, and each company’s data stays isolated in its own workspace.',
  audience:
    'Built for small-to-midsize sales teams that have outgrown spreadsheets but don’t want five separate tools for CRM, pipeline, marketing, ads and billing.',
  role: 'Founder and full-stack developer',
  status: 'In active development',
  statusDetail:
    'The operator side (plans, trial bookings, organization onboarding) and the leads and contacts modules are wired to live data. Marketing automation, ads management and billing are on the roadmap.',
  tech: ['nextjs', 'react', 'redux', 'shadcn', 'fastify', 'zod', 'sequelize', 'mysql'] as TechId[],

  codebases: [
    {
      name: 'Backend API',
      audience: 'Both panels',
      does: 'Fastify 5 + Sequelize/MySQL modular monolith: auth, organizations, plans, leads, contacts',
    },
    {
      name: 'Main Panel',
      audience: 'Staff at subscribing companies',
      does: 'Daily CRM: leads Kanban, contacts, dashboard, team settings',
    },
    {
      name: 'Master Admin',
      audience: 'The OrbitOps operations team',
      does: 'Onboarding companies, pricing plans, trial bookings, support, GST compliance',
    },
  ],

  problemIntro:
    'Growing teams run sales, marketing and finance on separate tools, so no one sees the whole customer. OrbitOps set out to fix four pain points:',
  problems: [
    { title: 'Fragmented customer data', body: 'Leads, conversations, deals and invoices sit in different systems that fall out of sync.' },
    { title: 'Generic pipelines', body: 'Off-the-shelf CRMs force fixed stages, but each company sells differently.' },
    { title: 'No accountability on handoffs', body: 'When a lead moves between reps, the history of who owned it and why is lost.' },
    {
      title: 'Heavy operator overhead',
      body: 'The team running the platform needs one console to onboard companies, set usage limits and negotiate custom pricing. In India, it also needs to track each client’s GST filing status.',
    },
  ],

  solutionIntro:
    'OrbitOps gives each subscribing company a private CRM workspace, and gives the operator a separate master console to run the business behind it.',
  mainPanel: [
    { title: 'Leads Kanban', body: 'Drag-and-drop between stages. Each organization defines its own pipeline stages, with names, colours and order.' },
    { title: 'Lead detail', body: 'Priority (low to urgent), lead score, deal value, probability, temperature and tags.' },
    { title: 'Assignment history', body: 'Records who handed a lead to whom, with remarks.' },
    { title: 'Follow-ups', body: 'By call, meeting, email, WhatsApp or demo, each with a due date and status.' },
    { title: 'Activity, notes and attachments', body: 'A timeline on every lead.' },
    { title: 'Contacts', body: 'With a path to convert a lead into a contact.' },
    { title: 'Lead analytics', body: 'And a dashboard.' },
    { title: 'Team management', body: 'Four roles: Super Admin, Admin, Manager and Employee.' },
  ],
  masterAdmin: [
    { title: 'Trial and demo bookings', body: 'A public form, then a status workflow from confirmed to completed.' },
    { title: 'Organization onboarding', body: 'Plan, seat and contact limits, billing cycle, currency, timezone and subscription dates.' },
    { title: 'Pricing plans', body: 'Monthly, yearly or custom billing, with a “recommended” flag.' },
    {
      title: 'Support, reports and GST compliance',
      body: 'Support tickets, platform reports and a GST dashboard (GSTIN, filing status, tax liability, audit exports). Some of these screens still use sample data.',
    },
  ],

  architectureNote:
    'Requests carry a Bearer access token. A rotating refresh token travels in an httpOnly cookie, and each panel’s Axios interceptor refreshes it silently. Controllers stay thin, and business logic lives in services.',

  securityIntro:
    'Auth was designed with a threat model from the start. An internal audit on 6 Sep 2026 described the architecture as “genuinely well-designed”.',
  securityChoices: [
    { title: 'Two auth domains', body: 'Company users and master admins get scope-separated JWTs, so a token from one domain can’t be used in the other.' },
    {
      title: 'Rotating refresh tokens with reuse detection',
      body: 'Each refresh issues a new token in the same family. Reusing an old token after a short grace window revokes the whole family. A row lock guards against races between tabs.',
    },
    { title: 'Cookie hygiene', body: 'Refresh tokens live only in httpOnly, SameSite=Strict, path-scoped cookies and never appear in JSON responses.' },
    { title: 'Forced password reset', body: 'For newly provisioned accounts.' },
    { title: 'Tenant isolation as a hard rule', body: 'Every query is scoped to the caller’s organization.' },
    { title: 'Central validation', body: 'Zod schemas on inputs; all SQL goes through Sequelize’s parameterised builder.' },
  ],
  auditOutcomes: [
    'Auth went from zero tests to 13 backend and 20 frontend tests, covering cookie handling, rotation, reuse detection and session expiry.',
    'The rotation race between browser tabs was closed with a grace window and is now covered by tests.',
    'Password storage (bcrypt), SQL injection, CORS, CSRF and token leakage were checked and found clean.',
    'A short list of higher-priority access-control fixes is being worked through before release.',
  ],

  lessons: [
    {
      title: 'Schema drift',
      body: 'Early core tables were created by sequelize.sync() and had no migration history. Later modules (leads, contacts, refresh tokens) shipped with 19 versioned migrations.',
      lesson: 'Use migrations from the first table.',
    },
    {
      title: 'Contracts between three codebases',
      body: 'Two apps call one API, so small mismatches break things end to end. One example was a cookie name the route guard expected but the backend never set.',
      lesson: 'Write the contract in a spec before building either side.',
    },
    {
      title: 'Spec-driven development',
      body: 'Each codebase keeps a specs/ folder with an index, template and workflow. Features such as auth and leads are specified first and marked Implemented when done.',
      lesson: 'It made audits faster and kept AI-assisted work consistent.',
    },
    {
      title: 'Audit before release',
      body: 'Structured audits of the backend, auth and admin panel turned vague worries into ranked, fixable items.',
      lesson: 'Schedule them early, while the fixes are still one-line changes.',
    },
    {
      title: 'Duplicate logic',
      body: 'Org and master auth started as near-copies, and pagination was duplicated across four services.',
      lesson: 'Both are tracked as tech debt to consolidate.',
    },
  ],

  outcome:
    'OrbitOps now has a working multi-tenant foundation: two auth domains, an operator console, and live leads and contacts modules for subscribing companies.',
  delivered: [
    { value: '3', label: 'codebases on one API' },
    { value: '18', label: 'data models' },
    { value: '19', label: 'versioned migrations' },
    { value: '7', label: 'backend modules' },
    { value: '33', label: 'automated auth tests' },
  ],
  deliveredNote: 'Modules: auth, admin, master, app, user, leads and contacts. Specs exist for auth, leads, navigation and the leads UI.',
  next: [
    'Close the remaining pre-release audit items',
    'Move the remaining core tables onto migrations and add foreign keys',
    'Connect the dashboard, support and GST screens to live data',
    'Build marketing automation (visual workflows, email sequences)',
    'Build ads management (Meta Ads, lead sync, ROI tracking)',
    'Build billing and invoicing next to the CRM',
  ],
  nextNote:
    'There is no production usage data yet. Results such as adoption, conversion lift or time saved will be added once pilot customers are onboarded.',
};
