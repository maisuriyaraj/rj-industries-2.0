import type { TechId } from './tech';

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Tools';

// Levels describe how often a tool is used, not a made-up percentage.
export type SkillLevel = 'Daily' | 'Comfortable' | 'Familiar';

export type Skill = { tech: TechId; category: SkillCategory; level: SkillLevel; usedFor: string };

export const skillCategories: SkillCategory[] = ['Frontend', 'Backend', 'Database', 'Tools'];

export const skills: Skill[] = [
  { tech: 'nextjs', category: 'Frontend', level: 'Daily', usedFor: 'App Router apps at Zluck and the OrbitOps dashboard' },
  { tech: 'react', category: 'Frontend', level: 'Daily', usedFor: 'Component-driven UIs since 2023' },
  { tech: 'typescript', category: 'Frontend', level: 'Daily', usedFor: 'Typed UI and API code across OrbitOps' },
  { tech: 'tailwind', category: 'Frontend', level: 'Daily', usedFor: 'Design tokens and responsive layouts' },
  { tech: 'html', category: 'Frontend', level: 'Daily', usedFor: 'Semantic, accessible markup' },
  { tech: 'fastify', category: 'Backend', level: 'Comfortable', usedFor: 'The OrbitOps REST API, plugins and hooks' },
  { tech: 'node', category: 'Backend', level: 'Comfortable', usedFor: 'APIs, scripts and real-time services' },
  { tech: 'postgresql', category: 'Database', level: 'Comfortable', usedFor: 'Relational data for multi-tenant OrbitOps' },
  { tech: 'sequelize', category: 'Database', level: 'Comfortable', usedFor: 'Models, associations and migrations' },
  { tech: 'git', category: 'Tools', level: 'Daily', usedFor: 'Branching, reviews and open-source work' },
  { tech: 'firebase', category: 'Tools', level: 'Comfortable', usedFor: 'Hosting this portfolio' },
  { tech: 'vercel', category: 'Tools', level: 'Comfortable', usedFor: 'Deploying Next.js projects' },
];

export const alsoWorkedWith: TechId[] = ['angular', 'redux', 'express', 'mongodb', 'mysql', 'socketio', 'bootstrap', 'mui', 'render'];
