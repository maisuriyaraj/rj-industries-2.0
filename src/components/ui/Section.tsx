import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, intro, children, className }: Props) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn('py-16 md:py-24', className)}>
      <Container>
        <header className="mb-10 max-w-2xl md:mb-14" data-reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={headingId} className="mt-3 text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] font-bold">
            {title}
          </h2>
          {intro && <div className="mt-4 text-lg text-muted">{intro}</div>}
        </header>
        {children}
      </Container>
    </section>
  );
}
