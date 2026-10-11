import Image from 'next/image';
import { site } from '@/data/site';
import { Section } from '../ui/Section';

const facts = [
  { label: 'Based in', value: site.location },
  { label: 'Currently', value: 'React & Next.js Developer at Zluck Solutions' },
  { label: 'Building', value: 'OrbitOps, under RJ Industries' },
  { label: 'Studying', value: 'Master of Computer Applications (MCA)' },
  { label: 'Speaks', value: site.languages.join(' and ') },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="From college projects to a SaaS of my own">
      <div className="grid gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14">
        <div data-reveal className="relative mx-auto w-full max-w-80">
          <div aria-hidden="true" className="absolute -inset-3 -z-10 rounded-3xl border border-dashed border-line" />
          <Image
            src="/media/about/raj.webp"
            alt="Raj Maisuriya standing on a tree-lined street in Surat, wearing sunglasses and a patterned shirt"
            width={640}
            height={800}
            sizes="(min-width: 768px) 320px, 90vw"
            className="h-auto w-full rounded-2xl border border-line object-cover shadow-card"
          />
        </div>

        <div data-reveal className="space-y-5 text-lg text-muted">
          <p>
            I’m Raj, a full-stack developer from Surat. I studied for my BCA at Veer Narmad South Gujarat University
            (2021 to 2024), where I built projects like a movie ticket booking system.
          </p>
          <p>
            At <span className="text-fg">Constantsys Technologies</span> I built interfaces for client products: the
            lending platform QuickLending and the low-code builder Glozic, working in React, Angular and Redux. Today I’m a React and Next.js developer at <span className="text-fg">Zluck Solutions</span>, and I’m
            studying for my MCA.
          </p>
          <p>
            Under the RJ Industries name I’m building <span className="text-fg">OrbitOps</span>, a multi-tenant CRM. It
            is where my whole stack comes together: Next.js and TypeScript on the front, Fastify in the middle, and
            Sequelize with PostgreSQL underneath.
          </p>

          <dl className="grid gap-x-8 gap-y-4 border-t border-line pt-6 text-base sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{fact.label}</dt>
                <dd className="mt-1 font-medium text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
