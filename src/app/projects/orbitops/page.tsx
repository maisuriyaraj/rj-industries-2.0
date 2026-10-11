import { ArrowLeft, Check, Circle, Mail } from 'lucide-react';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ArchitectureDiagram } from '@/components/projects/ArchitectureDiagram';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { TechBadge } from '@/components/ui/TechIcon';
import { orbitops as cs } from '@/data/orbitops';
import { site } from '@/data/site';
import { flowSteps, type LayerId } from '@/data/stack';
import { cn } from '@/lib/cn';

const description =
  'OrbitOps case study: a multi-tenant SaaS CRM by Raj Maisuriya. Two Next.js panels share one Fastify API over scope-separated tokens, with Sequelize and MySQL underneath.';

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

function Block({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-14 md:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-16">
          <div data-reveal>
            <div className="lg:sticky lg:top-24">
              <p className="eyebrow">{eyebrow}</p>
              <h2 id={id} className="mt-3 text-3xl font-bold">
                {title}
              </h2>
            </div>
          </div>
          <div data-reveal className="min-w-0">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeatureList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="rounded-xl border border-line bg-surface p-4">
          <p className="font-semibold text-fg">{item.title}</p>
          <p className="mt-1 text-sm text-muted">{item.body}</p>
        </li>
      ))}
    </ul>
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
          <p className="mt-4 max-w-2xl text-xl text-fg">{cs.intro}</p>
          <p className="mt-3 max-w-2xl text-lg text-muted">{cs.audience}</p>

          <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Role</dt>
              <dd className="mt-1 font-medium">{cs.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Product</dt>
              <dd className="mt-1 font-medium">Multi-tenant SaaS CRM</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Status</dt>
              <dd className="mt-1 flex items-center gap-2 font-medium">
                <span aria-hidden="true" className="size-2 rounded-full bg-success" />
                {cs.status}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Stack</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {cs.tech.map((id) => (
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

      <Block id="overview" eyebrow="01 · Overview" title="Three codebases, one API">
        {/* Stacked cards on phones, a table from tablet width up. */}
        <ul className="space-y-3 sm:hidden">
          {cs.codebases.map((c) => (
            <li key={c.name} className="rounded-xl border border-line bg-surface p-4">
              <p className="font-semibold text-fg">{c.name}</p>
              <p className="font-mono text-xs text-muted">{c.audience}</p>
              <p className="mt-2 text-sm text-muted">{c.does}</p>
            </li>
          ))}
        </ul>
        <div className="hidden overflow-hidden rounded-xl border border-line bg-surface sm:block">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">OrbitOps codebases</caption>
            <thead className="border-b border-line bg-surface-2 font-mono text-xs uppercase tracking-[0.08em] text-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Codebase</th>
                <th scope="col" className="px-4 py-3 font-medium">Audience</th>
                <th scope="col" className="px-4 py-3 font-medium">What it does</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {cs.codebases.map((c) => (
                <tr key={c.name}>
                  <th scope="row" className="px-4 py-3 font-semibold text-fg">{c.name}</th>
                  <td className="px-4 py-3 text-muted">{c.audience}</td>
                  <td className="px-4 py-3 text-muted">{c.does}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-2xl text-muted">
          <span className="font-semibold text-fg">Status: </span>
          {cs.statusDetail}
        </p>
      </Block>

      <Block id="problem" eyebrow="02 · The problem" title="No one sees the whole customer">
        <p className="mb-6 max-w-2xl text-lg text-muted">{cs.problemIntro}</p>
        <FeatureList items={cs.problems} />
      </Block>

      <Block id="solution" eyebrow="03 · The solution" title="A private workspace for every company">
        <p className="max-w-2xl text-lg text-muted">{cs.solutionIntro}</p>
        <div className="mt-8 space-y-8">
          <div>
            <h3 className="mb-4 font-semibold text-layer-ui">For subscribing companies (Main Panel)</h3>
            <FeatureList items={cs.mainPanel} />
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-brand-strong">For the operator (Master Admin)</h3>
            <FeatureList items={cs.masterAdmin} />
          </div>
        </div>
      </Block>

      <Block id="architecture" eyebrow="04 · Architecture" title="Two panels, one Fastify API">
        <ArchitectureDiagram />
        <p className="mt-6 max-w-2xl text-lg text-muted">{cs.architectureNote}</p>
        <h3 className="mt-10 font-semibold text-fg">A request, step by step (simplified)</h3>
        <ol className="mt-4 space-y-3">
          {flowSteps.map((step, i) => (
            <li key={step.code} className="flex gap-4 rounded-xl border border-line bg-surface p-4">
              <span className={cn('font-mono text-sm font-medium', layerText[step.layer])}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <code className="block break-words font-mono text-sm text-fg">{step.code}</code>
                <span className="mt-1 block text-muted">{step.note}</span>
              </span>
            </li>
          ))}
        </ol>
      </Block>

      <Block id="security" eyebrow="05 · Security" title="Auth designed with a threat model">
        <p className="max-w-2xl text-lg text-muted">{cs.securityIntro}</p>
        <h3 className="mt-8 mb-4 font-semibold text-fg">Key design choices</h3>
        <FeatureList items={cs.securityChoices} />
        <h3 className="mt-10 mb-4 font-semibold text-fg">What the audit drove</h3>
        <ul className="space-y-3">
          {cs.auditOutcomes.map((item) => (
            <li key={item} className="flex gap-3 text-muted">
              <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Block>

      <Block id="lessons" eyebrow="06 · Challenges" title="Challenges and lessons learned">
        <ul className="space-y-4">
          {cs.lessons.map((l) => (
            <li key={l.title} className="rounded-xl border border-line bg-surface p-5">
              <p className="font-semibold text-fg">{l.title}</p>
              <p className="mt-1 text-muted">{l.body}</p>
              <p className="mt-3 border-l-2 border-brand-strong pl-3 text-sm text-fg">
                <span className="font-semibold">Lesson: </span>
                {l.lesson}
              </p>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="outcomes" eyebrow="07 · Outcomes" title="Where it stands and what’s next">
        <p className="max-w-2xl text-lg text-muted">{cs.outcome}</p>
        <h3 className="mt-8 mb-4 font-semibold text-fg">Delivered so far</h3>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {cs.delivered.map((d) => (
            <div key={d.label} className="flex flex-col-reverse justify-end rounded-xl border border-line bg-surface p-4">
              <dt className="mt-1 text-sm text-muted">{d.label}</dt>
              <dd className="font-mono text-3xl font-semibold text-brand-strong">{d.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-muted">{cs.deliveredNote}</p>
        <h3 className="mt-10 mb-4 font-semibold text-fg">Next</h3>
        <ul className="space-y-2">
          {cs.next.map((item) => (
            <li key={item} className="flex gap-3 text-muted">
              <Circle className="mt-1.5 size-3 shrink-0 text-muted" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-muted">{cs.nextNote}</p>
      </Block>

      <section aria-labelledby="cta" className="border-t border-line bg-surface-2/40 py-16">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="cta" className="text-2xl font-bold">
              Want to go deeper?
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Ask me about the auth design, the tenancy model or a walkthrough of OrbitOps.
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
