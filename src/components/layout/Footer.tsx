import { site, socials } from '@/data/site';
import { Container } from '../ui/Container';
import { ExternalLink } from '../ui/ExternalLink';
import { SocialIcon } from '../ui/SocialIcon';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {site.name}. Built with Next.js, TypeScript and Tailwind CSS.{' '}
            <ExternalLink href={site.repo} className="font-medium text-brand-strong underline-offset-4 hover:underline">
              View source
            </ExternalLink>
          </p>
        </div>
        <ul className="flex gap-1" aria-label="Social links">
          {socials.map((s) => (
            <li key={s.id}>
              <ExternalLink
                href={s.href}
                className="grid size-11 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <SocialIcon id={s.id} />
                <span className="sr-only">{s.label}</span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
