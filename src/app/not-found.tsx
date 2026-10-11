import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-blueprint" aria-labelledby="nf-title">
      <Container className="flex min-h-[70vh] flex-col items-start justify-center py-24">
        <p className="eyebrow">404 · route not found</p>
        <h1 id="nf-title" className="mt-3 text-4xl font-bold sm:text-5xl">
          This page drifted out of orbit.
        </h1>
        <p className="mt-4 max-w-lg text-lg text-muted">
          The link may be old or mistyped. The portfolio now lives on a single page, with the OrbitOps case study on
          its own.
        </p>
        <pre className="mt-6 max-w-full whitespace-pre-wrap break-words rounded-lg border border-line bg-surface px-4 py-3 font-mono text-sm text-muted" aria-hidden="true">
          {'reply.code(404).send({ error: "Not Found" })'}
        </pre>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/projects/orbitops" variant="secondary">
            OrbitOps case study
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
