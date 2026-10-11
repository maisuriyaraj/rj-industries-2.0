export const site = {
  name: 'Raj Maisuriya',
  brand: 'RJ INDUSTRIES',
  url: 'https://raj-maisuriya.web.app',
  title: 'Raj Maisuriya | Full-Stack Developer (Next.js, TypeScript, Fastify)',
  description:
    'Raj Maisuriya is a full-stack developer in Surat, India, building with Next.js, React and TypeScript on the front end and Fastify, Sequelize and PostgreSQL on the back end. Creator of OrbitOps, a multi-tenant SaaS CRM.',
  role: 'Full-stack developer',
  location: 'Surat, Gujarat, India',
  email: 'maisuriyaraj664@gmail.com',
  resume: '/raj-maisuriya-resume.pdf',
  repo: 'https://github.com/maisuriyaraj/rj-industries-2.0',
  languages: ['English', 'Hindi'],
  heroRoles: ['Full-stack developer', 'Next.js + TypeScript', 'Fastify APIs', 'Building OrbitOps'],
} as const;

export type SocialId = 'github' | 'linkedin' | 'x' | 'youtube';

export type Social = { id: SocialId; label: string; handle: string; href: string };

export const socials: Social[] = [
  { id: 'github', label: 'GitHub', handle: 'maisuriyaraj', href: 'https://github.com/maisuriyaraj' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'raj-maisuriya',
    href: 'https://www.linkedin.com/in/raj-maisuriya-671274237',
  },
  { id: 'x', label: 'X (Twitter)', handle: '@Rj8703', href: 'https://x.com/Rj8703' },
  { id: 'youtube', label: 'YouTube', handle: '@111_MaisuriyaRaj', href: 'https://www.youtube.com/@111_MaisuriyaRaj' },
];

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof navItems)[number]['id'];
