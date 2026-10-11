'use client';

import { useState } from 'react';
import { projectFilters, projects, type ProjectCategory } from '@/data/projects';
import { cn } from '@/lib/cn';
import { ProjectCard } from './ProjectCard';

type Filter = 'All' | ProjectCategory;

export function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>('All');
  const visible = filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2" data-reveal>
        {projectFilters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              'min-h-9 rounded-full border px-3.5 text-sm font-medium transition-colors',
              filter === f ? 'border-brand-strong bg-brand-strong text-on-brand' : 'border-line bg-surface text-muted hover:text-fg',
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>

      {/* Cards that stay visible keep their key, so only newly shown cards play the fade-in. */}
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.slug} className={cn('animate-fade-up', project.featured && 'md:col-span-2 lg:col-span-3')}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </>
  );
}
