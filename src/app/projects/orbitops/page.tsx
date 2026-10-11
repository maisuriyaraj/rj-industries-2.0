import { ArrowLeft, Mail } from 'lucide-react';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { TenantDiagram } from '@/components/projects/TenantDiagram';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { TechBadge } from '@/components/ui/TechIcon';
import { projects } from '@/data/projects';
import { flowSteps, type LayerId } from '@/data/stack';
import { site } from '@/data/site';
import type { TechId } from '@/data/tech';
import { cn } from '@/lib/cn';

const orbitops = projects.find((p) => p.slug === 'orbitops')!;

const description =
  'How OrbitOps, a multi-tenant SaaS CRM by Raj Maisuriya, keeps every company’s data in its own workspace, built with Next.js, TypeScript, Fastify, Sequelize and PostgreSQL.';

export const metadata: Metadata = {
  title: 'OrbitOps case study: a multi-tenant SaaS CRM',
  description,
  alternates: { canonical: '/projects/orbitops' },
  openGraph: {
    type: 'article',
    url: '/projects/orbitops',
    title: 'OrbitOps case study | Raj Maisuriya',
    description,
  },
  twitter: { title: 'OrbitOps case study | Raj Maisuriya', description },
};

const layerText: Record<LayerId, string> = { ui: 'text-layer-ui', api: 'text-layer-api', data: 'text-layer-data' };

const decisions: { layer: LayerId; title: string; tech: TechId[]; points: string[] }[] = [
  {
    layer: 'ui',
    title: 'Next.js + TypeScript for the dashboard',
    tech: ['nextjs', 'react', 'typescript'],
    points: [
      'One typed codebase for every screen, so data shapes from the API are checked before they reach users.',
      'Components and layouts are shared across tenants; only the data changes.',
    ],
  },
  {
    layer: 'api',
    title: 'Fastify for the API',
    tech: ['fastify', 'node'],
    points: [
      'Hooks run before every route, which is the natural place to check the session and attach the tenant.',
      'Schema validation on inputs keeps bad data out at the edge.',
    ],
  },
  {
    layer: 'data',
    title: 'Sequelize + PostgreSQL for data',
    tech: ['sequelize', 'postgresql'],
    points: [
      'CRM data is relational by nature: contacts, companies and activity all point at each other.',
      'Models, associations and migrations keep the schema versioned as features grow.',
    ],
  },
];

function Block({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-14 md:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div data-reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={id} className="mt-3 text-3xl font-bold">
              {title}
            </h2>
          </div>
          <div data-reveal className="min-w-0">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function OrbitOpsPage() {
  return (
    <article>
      <header className="bg-blueprint relative overflow-hidden">
        <Container className="pb-14 pt-10 md:pb-20 md:pt-16">
          <ButtonLink href="/#projects" variant="ghost" className="-ml-3 mb-8">
            <ArrowLeft className="size-4" aria-hidden="true" />
            All projects
          </ButtonLink>
          <p className="eyebrow">Case study · SaaS</p>
          <h1 className="mt-3 font-logo text-[clamp(2.75rem,2rem+4vw,4.5rem)] font-normal tracking-wide text-brand-strong">
            OrbitOps
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-muted">
            A multi-tenant SaaS CRM I’m building under RJ Industries: one platform, many companies, and every company
            working in its own private workspace.
          </p>
          <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Role</dt>
              <dd className="mt-1 font-medium">{orbitops.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Product</dt>
              <dd className="mt-1 font-medium">Multi-tenant SaaS CRM</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Stack</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {orbitops.tech.map((id) => (
                    <li key={id}>
                      <TechBadge id={id} />
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </Container>
      </header>

      <Block id="problem" eyebrow="01 · The problem" title="One CRM, many companies">
        <div className="max-w-2xl space-y-4 text-lg text-muted">
          <p>
            A CRM holds a company’s most sensitive information: its customers, its deals and its conversations. Offering
            one as a SaaS means many companies share the same platform.
          </p>
          <p>
            So two things have to be true at once. Every company must only ever see its own records. And the people
            running the platform still need one place to look after everyone.
          </p>
        </div>
      </Block>

      <Block id="tenancy" eyebrow="02 · Architecture" title="Tenants and the Master Admin">
        <div className="grid gap-8 xl:grid-cols-[1fr_1fr] xl:items-center">
          <TenantDiagram />
          <div className="space-y-4 text-lg text-muted">
            <p>
              Each company is a <span className="text-fg">tenant</span> with its own workspace. Users inside a tenant
              only see that tenant’s contacts and activity.
            </p>
            <p>
              Above all tenants sits the <span className="text-fg">Master Admin</span> role, which oversees the
              platform as a whole: every tenant workspace, managed from one place.
            </p>
          </div>
        </div>
      </Block>

      <Block id="request" eyebrow="03 · Request flow" title="How a request stays inside its tenant">
        <p className="max-w-2xl text-lg text-muted">
          A simplified example of one call moving through the stack. The tenant is attached before any handler runs,
          and every query is scoped to it.
        </p>
        <ol className="mt-6 space-y-3">
          {flowSteps.map((step, i) => (
            <li key={step.code} className="flex gap-4 rounded-xl border border-line bg-surface p-4">
              <span className={cn('font-mono text-sm font-medium', layerText[step.layer])}>{String(i + 1).padStart(2, '0')}</span>
              <span className="min-w-0">
                <code className="block break-words font-mono text-sm text-fg">{step.code}</code>
                <span className="mt-1 block text-muted">{step.note}</span>
              </span>
            </li>
          ))}
        </ol>
      </Block>

      <Block id="stack-decisions" eyebrow="04 · Decisions" title="Why this stack">
        <ul className="grid gap-4 md:grid-cols-3">
          {decisions.map((d) => (
            <li key={d.title} className="flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-card">
              <p className={cn('font-mono text-xs font-medium uppercase tracking-[0.1em]', layerText[d.layer])}>{d.layer} layer</p>
              <h3 className="mt-2 text-lg font-semibold">{d.title}</h3>
              <ul className="mt-4 flex-1 space-y-3 text-muted">
                {d.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools">
                {d.tech.map((id) => (
                  <li key={id}>
                    <TechBadge id={id} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Block>

      <section aria-labelledby="cta" className="border-t border-line bg-surface-2/40 py-16">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="cta" className="text-2xl font-bold">
              Want to go deeper?
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Ask me about the tenancy model, the API design or a walkthrough of OrbitOps.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/#contact">
              <Mail className="size-4" aria-hidden="true" />
              Get in touch
            </ButtonLink>
            <ButtonAnchor href={`mailto:${site.email}?subject=About%20OrbitOps`} variant="secondary">
              Email directly
            </ButtonAnchor>
          </div>
        </Container>
      </section>
    </article>
  );
}
