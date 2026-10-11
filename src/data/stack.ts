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
    tech: ['nextjs', 'react', 'typescript', 'tailwind'],
    built: [
      'The OrbitOps dashboard: tenant-aware screens with typed API clients.',
      'Production React and Next.js interfaces at Zluck Solutions.',
      'This portfolio: a statically exported Next.js site.',
    ],
  },
  {
    id: 'api',
    label: 'API layer',
    caption: 'Fastify · Node.js',
    tech: ['fastify', 'node'],
    built: [
      'The OrbitOps REST API: route plugins, auth hooks and schema validation.',
      'Every request is scoped to the tenant it belongs to before any data is touched.',
    ],
  },
  {
    id: 'data',
    label: 'Data layer',
    caption: 'Sequelize · PostgreSQL',
    tech: ['sequelize', 'postgresql'],
    built: [
      'OrbitOps data models, associations and migrations in Sequelize.',
      'PostgreSQL as the relational store behind every tenant workspace.',
    ],
  },
];

// An illustrative request through the stack, shown in the "send a request" demo.
export type FlowStep = { layer: LayerId; code: string; note: string };

export const flowSteps: FlowStep[] = [
  { layer: 'ui', code: 'GET /api/contacts', note: 'React screen asks for the signed-in tenant’s contacts' },
  { layer: 'api', code: 'preHandler: auth + tenant scope', note: 'Fastify hook checks the session and attaches the tenant' },
  { layer: 'api', code: 'Contact.findAll({ where: { tenantId } })', note: 'Route handler queries through a Sequelize model' },
  { layer: 'data', code: 'SELECT … WHERE tenant_id = $1', note: 'PostgreSQL returns only that tenant’s rows' },
  { layer: 'ui', code: '200 OK · application/json', note: 'Typed JSON comes back and the list renders' },
];
