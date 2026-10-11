import { Mail } from 'lucide-react';
import { site, socials } from '@/data/site';
import { ButtonAnchor } from '../ui/Button';
import { ExternalLink } from '../ui/ExternalLink';
import { Section } from '../ui/Section';
import { SocialIcon } from '../ui/SocialIcon';
import { ContactForm } from './ContactForm';
import { CopyEmail } from './CopyEmail';

// Set at build time; without it the section falls back to email and social links only.
const formKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s build something"
      intro="Hiring for a role, planning a freelance project, or curious about OrbitOps? Send a message and I’ll reply by email."
      className="border-t border-line bg-surface-2/40"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div data-reveal className="space-y-8">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Email</h3>
            <div className="mt-2 flex items-center gap-1">
              <a
                href={`mailto:${site.email}`}
                className="break-all text-lg font-semibold text-brand-strong underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
              <CopyEmail email={site.email} />
            </div>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Elsewhere</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {socials.map((s) => (
                <li key={s.id}>
                  <ExternalLink
                    href={s.href}
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3 transition-colors hover:border-brand-strong"
                  >
                    <SocialIcon id={s.id} className="text-fg" />
                    <span className="min-w-0">
                      <span className="block font-semibold text-fg">{s.label}</span>
                      <span className="block truncate text-sm text-muted">{s.handle}</span>
                    </span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-muted">
            Based in {site.location}. Comfortable in {site.languages.join(' and ')}. Freelance clients get daily
            progress updates.
          </p>
        </div>

        <div data-reveal>
          {formKey ? (
            <ContactForm accessKey={formKey} />
          ) : (
            <div className="flex h-full flex-col items-start justify-center gap-4 rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
              <Mail className="size-8 text-brand-strong" aria-hidden="true" />
              <h3 className="text-2xl font-bold">The fastest way to reach me is email</h3>
              <p className="text-muted">Tell me a little about the role or project, and I’ll get back to you.</p>
              <ButtonAnchor href={`mailto:${site.email}?subject=Hello%20from%20your%20portfolio`}>
                <Mail className="size-4" aria-hidden="true" />
                Write an email
              </ButtonAnchor>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
