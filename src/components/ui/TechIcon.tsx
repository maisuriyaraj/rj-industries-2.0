import type { SimpleIcon } from 'simple-icons';
import { cn } from '@/lib/cn';
import { tech, type TechId } from '@/data/tech';

export function TechIcon({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn('size-5 shrink-0 fill-current', className)}>
      <path d={icon.path} />
    </svg>
  );
}

export function TechBadge({ id, className }: { id: TechId; className?: string }) {
  const t = tech[id];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-xs text-muted',
        className,
      )}
    >
      <TechIcon icon={t.icon} className="size-3.5" />
      {t.name}
    </span>
  );
}
