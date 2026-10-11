import type { TechId } from './tech';

// Dates are 'YYYY-MM'. end undefined means the role is ongoing.
export type Role = {
  company: string;
  title: string;
  location?: string;
  start?: string;
  end?: string;
  logo?: string;
  points: string[];
  tech: TechId[];
};

export const roles: Role[] = [
  {
    company: 'RJ Industries',
    title: 'Founder, OrbitOps',
    points: [
      'Building OrbitOps, a multi-tenant SaaS CRM, end to end.',
      'Next.js and TypeScript front end; Fastify, Sequelize and PostgreSQL API.',
      'Master Admin role that oversees every tenant workspace.',
    ],
    tech: ['nextjs', 'typescript', 'fastify', 'sequelize', 'postgresql'],
  },
  {
    company: 'Zluck Solutions',
    title: 'React & Next.js Developer',
    location: 'Surat, Gujarat',
    start: '2024-12',
    logo: '/media/logos/zluck.webp',
    points: ['Develop and maintain web application interfaces with React and Next.js.'],
    tech: ['react', 'nextjs'],
  },
  {
    company: 'Constantsys Technologies',
    title: 'Junior Full-Stack Developer',
    location: 'Surat, Gujarat',
    start: '2023-05',
    end: '2024-11',
    logo: '/media/logos/constantsys.webp',
    points: [
      'Built interactive interfaces with React, Angular and Redux, with exposure to Node.js and MongoDB.',
      'Front end for QuickLending, an online lending platform for a US company.',
      'Front-end work on Glozic, a low-code website builder.',
    ],
    tech: ['react', 'angular', 'redux', 'node', 'mongodb'],
  },
];

export type Education = { degree: string; school: string; period: string; logo?: string };

export const education: Education[] = [
  { degree: 'Master of Computer Applications (MCA)', school: 'In progress', period: 'Currently pursuing' },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Veer Narmad South Gujarat University, Surat',
    period: '2021 – 2024',
    logo: '/media/logos/vnsgu.webp',
  },
];

const monthName = (ym: string) =>
  new Date(`${ym}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });

// Counted like LinkedIn: both the first and last month are included.
// Ongoing roles are measured up to the build date, so they refresh on each deploy.
export function formatPeriod(role: Role, now = new Date()): string | undefined {
  if (!role.start) return undefined;
  const [sy, sm] = role.start.split('-').map(Number) as [number, number];
  const [ey, em] = role.end
    ? (role.end.split('-').map(Number) as [number, number])
    : [now.getUTCFullYear(), now.getUTCMonth() + 1];
  const months = (ey - sy) * 12 + (em - sm) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  const length = [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ');
  return `${monthName(role.start)} – ${role.end ? monthName(role.end) : 'Present'} · ${length}`;
}
