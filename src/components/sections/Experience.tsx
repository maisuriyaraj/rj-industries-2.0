import Image from 'next/image';
import { GraduationCap, Rocket } from 'lucide-react';
import { education, formatPeriod, roles } from '@/data/experience';
import { Section } from '../ui/Section';
import { TechBadge } from '../ui/TechIcon';

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I’ve built things">
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <ol className="relative space-y-10 border-l border-line pl-8">
          {roles.map((role) => {
            const period = formatPeriod(role);
            return (
              <li key={role.company} data-reveal className="relative">
                {/* Company logos are dark-on-white artwork, so the marker always uses the light palette. */}
                <span
                  aria-hidden="true"
                  data-theme="light"
                  className="absolute -left-[calc(2rem+1px)] top-1 grid size-8 -translate-x-1/2 place-items-center overflow-hidden rounded-full border border-line bg-surface"
                >
                  {role.logo ? (
                    <Image src={role.logo} alt="" width={32} height={32} className="size-6 object-contain" />
                  ) : (
                    <Rocket className="size-4 text-brand-strong" />
                  )}
                </span>
                <h3 className="text-xl font-semibold text-fg">{role.title}</h3>
                <p className="mt-1 text-muted">
                  <span className="font-medium text-fg">{role.company}</span>
                  {role.location && ` · ${role.location}`}
                </p>
                <p className="mt-1 font-mono text-sm text-muted">{period ?? 'Ongoing'}</p>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-muted marker:text-brand-strong">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${role.company} tech`}>
                  {role.tech.map((id) => (
                    <li key={id}>
                      <TechBadge id={id} />
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        <div data-reveal>
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <GraduationCap className="size-5 text-brand-strong" aria-hidden="true" />
            Education
          </h3>
          <ul className="mt-5 space-y-4">
            {education.map((item) => (
              <li key={item.degree} className="flex gap-4 rounded-xl border border-line bg-surface p-4 shadow-card">
                {item.logo && (
                  <Image src={item.logo} alt="" width={48} height={48} className="size-12 shrink-0 object-contain" />
                )}
                <div>
                  <p className="font-semibold text-fg">{item.degree}</p>
                  <p className="text-sm text-muted">{item.school}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{item.period}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
