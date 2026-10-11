import { ArrowRight, Download } from 'lucide-react';
import { site } from '@/data/site';
import { ButtonAnchor, ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { OrbitVisual } from './OrbitVisual';
import { TypedRole } from './TypedRole';

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] motion-safe:animate-[grid-pan_6s_linear_infinite]" />
        <div className="absolute left-[10%] top-[10%] size-[40vmax] rounded-full bg-layer-ui opacity-[0.12] blur-[90px] motion-safe:animate-[glow-drift_18s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[5%] size-[36vmax] rounded-full bg-layer-data opacity-[0.12] blur-[90px] motion-safe:animate-[glow-drift_22s_ease-in-out_infinite_reverse]" />
      </div>

      <Container className="grid items-center gap-12 pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-[1.15fr_1fr] lg:pt-20">
        <div>
          <p className="eyebrow">RJ Industries · {site.location}</p>
          <h1 id="hero-title" className="mt-4 text-[clamp(2.5rem,1.6rem+4vw,4rem)] font-extrabold">
            {site.name}
            <span className="block bg-gradient-to-r from-layer-ui via-brand-strong to-layer-data bg-clip-text text-transparent">
              ships the whole stack.
            </span>
          </h1>
          <div className="mt-5">
            <TypedRole roles={site.heroRoles} />
          </div>
          <p className="mt-5 max-w-xl text-lg text-muted">
            I build products end to end: Next.js and TypeScript interfaces, Fastify APIs, and SQL data modelled with
            Sequelize. Right now that means OrbitOps, a multi-tenant SaaS CRM.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/projects/orbitops">
              View OrbitOps
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#projects" variant="secondary">
              See projects
            </ButtonLink>
            <ButtonAnchor href={site.resume} download variant="ghost">
              <Download className="size-4" aria-hidden="true" />
              Download CV
            </ButtonAnchor>
          </div>
        </div>
        <OrbitVisual />
      </Container>
    </section>
  );
}
