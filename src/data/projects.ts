import type { TechId } from './tech';

export type ProjectCategory = 'SaaS' | 'Full-stack' | 'Frontend';

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  tech: TechId[];
  categories: ProjectCategory[];
  links: { live?: string; github?: string; caseStudy?: string };
  // Projects without a recording get a typographic tile instead of a video.
  media?: { video: string; poster: string };
  featured?: boolean;
};

export const projectFilters: ('All' | ProjectCategory)[] = ['All', 'SaaS', 'Full-stack', 'Frontend'];

export const projects: Project[] = [
  {
    slug: 'orbitops',
    title: 'OrbitOps',
    summary:
      'A multi-tenant SaaS CRM by RJ Industries: one Fastify API, a CRM panel for subscribing companies and a Master Admin console for the operator team. Every company’s data stays in its own workspace.',
    role: 'Founder and full-stack developer',
    tech: ['nextjs', 'react', 'redux', 'fastify', 'sequelize', 'mysql'],
    categories: ['SaaS', 'Full-stack'],
    links: { caseStudy: '/projects/orbitops' },
    featured: true,
  },
  {
    slug: 'queryloom',
    title: 'QueryLoom',
    summary: 'A social media app where people share posts and thoughts, run polls to gather opinions, and upload short-form videos.',
    role: 'Developer',
    tech: [],
    categories: ['Full-stack'],
    links: { live: 'https://queryloom.com' },
    media: { video: '/media/projects/queryloom.mp4', poster: '/media/projects/queryloom.webp' },
  },
  {
    slug: 'quicklending',
    title: 'QuickLending',
    summary: 'Lending website for a US-based finance company where the whole loan process happens online. Built the front end at Constantsys Technologies.',
    role: 'Front-end developer',
    tech: ['angular', 'bootstrap'],
    categories: ['Frontend'],
    links: { live: 'https://www.quicklending.com' },
    media: { video: '/media/projects/quicklending.mp4', poster: '/media/projects/quicklending.webp' },
  },
  {
    slug: 'glozic',
    title: 'Glozic',
    summary: 'A low-code, no-code platform for building websites with very little code. Contributed to front-end development at Constantsys Technologies.',
    role: 'Front-end developer',
    tech: ['react', 'bootstrap'],
    categories: ['Frontend'],
    links: { live: 'https://portal.glozic.com' },
    media: { video: '/media/projects/glozic.mp4', poster: '/media/projects/glozic.webp' },
  },
  {
    slug: 'graph-community',
    title: 'Graph Community',
    summary: 'A personal question-and-answer community in the spirit of Stack Overflow.',
    role: 'Solo full-stack project',
    tech: ['nextjs', 'tailwind', 'node', 'express', 'mongodb'],
    categories: ['Full-stack'],
    links: {},
    media: { video: '/media/projects/graph-community.mp4', poster: '/media/projects/graph-community.webp' },
  },
  {
    slug: 'chat-app',
    title: 'Real-time Chat',
    summary: 'A MERN app for real-time one-to-one chat, with a simulated money transfer between users (no real bank accounts).',
    role: 'Solo full-stack project',
    tech: ['react', 'tailwind', 'node', 'express'],
    categories: ['Full-stack'],
    links: {},
    media: { video: '/media/projects/chat-app.mp4', poster: '/media/projects/chat-app.webp' },
  },
  {
    slug: 'e-commerce',
    title: 'Online Bookstore',
    summary: 'E-commerce front end for a bookstore, with a catalogue, product pages, cart and account screens.',
    role: 'Front-end developer',
    tech: ['angular', 'bootstrap'],
    categories: ['Frontend'],
    links: {},
    media: { video: '/media/projects/e-commerce.mp4', poster: '/media/projects/e-commerce.webp' },
  },
  {
    slug: 'movie-booking',
    title: 'Movie Ticket Booking',
    summary: 'A movie ticket booking system built as a college project during the BCA.',
    role: 'College project',
    tech: ['angular', 'node', 'express', 'mongodb'],
    categories: ['Full-stack'],
    links: {},
    media: { video: '/media/projects/movie-booking.mp4', poster: '/media/projects/movie-booking.webp' },
  },
  {
    slug: 'muthoot-clone',
    title: 'Muthoot Finance Clone',
    summary: 'A responsive clone of the Muthoot Finance website, built with plain HTML, CSS, JavaScript and Bootstrap.',
    role: 'Practice project',
    tech: ['html', 'css', 'bootstrap'],
    categories: ['Frontend'],
    links: {},
    media: { video: '/media/projects/muthoot-clone.mp4', poster: '/media/projects/muthoot-clone.webp' },
  },
];
