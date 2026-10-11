'use client';

import { useState } from 'react';
import { alsoWorkedWith, skillCategories, skills, type SkillCategory, type SkillLevel } from '@/data/skills';
import { tech } from '@/data/tech';
import { cn } from '@/lib/cn';
import { TechBadge, TechIcon } from '../ui/TechIcon';

type Filter = 'All' | SkillCategory;

const levelBars: Record<SkillLevel, number> = { Daily: 3, Comfortable: 2, Familiar: 1 };

export function SkillGrid() {
  const [filter, setFilter] = useState<Filter>('All');
  const visible = filter === 'All' ? skills : skills.filter((s) => s.category === filter);

  return (
    <div className="mt-16" data-reveal>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="text-xl font-semibold">Skills</h3>
        <div role="group" aria-label="Filter skills" className="flex flex-wrap gap-2">
          {(['All', ...skillCategories] as Filter[]).map((f) => (
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
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {filter === 'All' ? '' : filter.toLowerCase()} skills
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((skill) => {
          const t = tech[skill.tech];
          const bars = levelBars[skill.level];
          return (
            <li
              key={skill.tech}
              className="flex animate-fade-up gap-4 rounded-xl border border-line bg-surface p-4"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-surface-2 text-fg">
                <TechIcon icon={t.icon} className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-fg">{t.name}</p>
                  <span className="flex items-center gap-2 font-mono text-xs text-muted">
                    <span aria-hidden="true" className="flex gap-0.5">
                      {[1, 2, 3].map((n) => (
                        <span key={n} className={cn('h-3 w-1.5 rounded-sm', n <= bars ? 'bg-brand-strong' : 'bg-line')} />
                      ))}
                    </span>
                    {skill.level}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{skill.usedFor}</p>
                <p className="sr-only">Category: {skill.category}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Also worked with</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {alsoWorkedWith.map((id) => (
            <li key={id}>
              <TechBadge id={id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
