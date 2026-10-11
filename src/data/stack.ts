import type { TechId } from './tech';

export type LayerId = 'ui' | 'api' | 'data';

export type Layer = {
  id: LayerId;
  label: string;
  caption: string;
  tech: TechId[];
  built: string[];
};

export const layers: Layer[] = [
  {
    id: 'ui',
    label: 'UI layer',
    caption: 'Next.js · React · TypeScript',
    tech: ['nextjs', 'react', 'typescript', 'redux'],
    built: [
      'Both OrbitOps panels: Next.js 16 and React 19 apps with Redux Toolkit.',
      'A drag-and-drop leads Kanban where each company defines its own pipeline stages.',
      'Production React and Next.js interfaces at Zluck Solutions.',
      'This portfolio: a statically exported Next.js and TypeScript site.',
    ],
  },
  {
    id: 'api',
    label: 'API layer',
    caption: 'Fastify · Node.js',
    tech: ['fastify', 'node', 'zod'],
    built: [
      'The OrbitOps backend: a Fastify 5 modular monolith with auth, operator, leads and contacts modules.',
      'Scope-separated JWTs for company staff and the operator team, with rotating refresh tokens and reuse detection.',
      'Zod validation on inputs, and every query scoped to the caller’s organization.',
    ],
  },
  {
    id: 'data',
    label: 'Data layer',
    caption: 'Sequelize · MySQL · PostgreSQL',
    tech: ['sequelize', 'mysql', 'postgresql'],
    built: [
      'The OrbitOps database on MySQL: 18 Sequelize models and 19 versioned migrations.',
      'All SQL goes through Sequelize’s parameterised query builder.',
    ],
  },
];

// A simplified request through OrbitOps, shown in the "send a request" demo.
export type FlowStep = { layer: LayerId; code: string; note: string };

export const flowSteps: FlowStep[] = [
  { layer: 'ui', code: 'GET /api/leads · Bearer <access token>', note: 'The Main Panel asks for the signed-in company’s leads' },
  { layer: 'api', code: 'preHandler: verify org-scoped JWT', note: 'Fastify rejects tokens from the operator domain and attaches the organization' },
  { layer: 'api', code: 'Lead.findAll({ where: { organizationId } })', note: 'A service queries through a Sequelize model, scoped to that organization' },
  { layer: 'data', code: 'SELECT … FROM leads WHERE organization_id = ?', note: 'MySQL returns only that company’s rows' },
  { layer: 'ui', code: '200 OK · application/json', note: 'JSON comes back and the leads Kanban renders' },
];
