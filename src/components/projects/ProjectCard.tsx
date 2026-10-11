'use client';

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/cn';
import { ExternalLink } from '../ui/ExternalLink';
import { SocialIcon } from '../ui/SocialIcon';
import { TechBadge } from '../ui/TechIcon';
import { ProjectMedia } from './ProjectMedia';
import { TenantDiagram } from './TenantDiagram';

const linkClass =
  'inline-flex min-h-9 items-center gap-1.5 rounded-md text-sm font-semibold text-brand-strong underline-offset-4 hover:underline';

export function ProjectCard({ project }: { project: Project }) {
  const [hovering, setHovering] = useState(false);
  const { media } = project;

  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-brand-strong',
        project.featured && 'lg:flex-row',
      )}
    >
      {media ? (
        <ProjectMedia project={{ ...project, media }} hovering={hovering} />
      ) : project.featured ? (
        <div className="border-b border-line p-4 lg:w-1/2 lg:border-b-0 lg:border-r">
          <TenantDiagram className="h-full" />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="bg-blueprint grid aspect-video place-items-center border-b border-line bg-surface-2"
        >
          <span className="font-logo text-3xl text-brand-strong">{project.title}</span>
        </div>
      )}

      <div className={cn('flex flex-1 flex-col p-5 sm:p-6', project.featured && 'lg:justify-center lg:p-10')}>
        {project.featured && <p className="eyebrow mb-2">Flagship · {project.role}</p>}
        <h3
          id={`project-${project.slug}`}
          className={cn('font-bold text-fg', project.featured ? 'text-3xl' : 'text-xl')}
        >
          {project.title}
        </h3>
        {!project.featured && <p className="mt-1 font-mono text-xs text-muted">{project.role}</p>}
        <p className="mt-3 text-muted">{project.summary}</p>

        {project.tech.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech used">
            {project.tech.map((id) => (
              <li key={id}>
                <TechBadge id={id} />
              </li>
            ))}
          </ul>
        )}

        {(project.links.caseStudy || project.links.live || project.links.github) && (
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-5">
            {project.links.caseStudy && (
              <Link href={project.links.caseStudy} className={linkClass}>
                Read the case study
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            )}
            {project.links.live && (
              <ExternalLink href={project.links.live} className={linkClass}>
                Live site
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </ExternalLink>
            )}
            {project.links.github && (
              <ExternalLink href={project.links.github} className={linkClass}>
                <SocialIcon id="github" className="size-4" />
                Code
              </ExternalLink>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
