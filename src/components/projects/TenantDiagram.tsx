import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/cn';

const tenants = ['Tenant A', 'Tenant B', 'Tenant C'];

// One platform, many isolated workspaces, one Master Admin above them all.
export function TenantDiagram({ className }: { className?: string }) {
  return (
    <div className={cn('bg-blueprint rounded-xl border border-line p-4 sm:p-6', className)}>
      <div className="mx-auto flex w-fit items-center gap-2 rounded-lg border-2 border-brand-strong bg-surface px-3 py-2 text-sm font-semibold text-fg">
        <ShieldCheck className="size-4 text-brand-strong" aria-hidden="true" />
        Master Admin
      </div>
      <div aria-hidden="true" className="mx-auto h-5 w-px bg-line" />
      <div className="rounded-lg border border-line bg-surface p-3">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.1em] text-muted">OrbitOps platform</p>
        <ul className="mt-3 grid grid-cols-3 gap-2">
          {tenants.map((t, i) => (
            <li
              key={t}
              className={cn(
                'rounded-md border border-dashed px-2 py-3 text-center text-xs font-medium sm:text-sm',
                ['border-layer-ui text-layer-ui', 'border-layer-api text-layer-api', 'border-layer-data text-layer-data'][i],
              )}
            >
              {t}
              <span className="mt-1 block font-mono text-[10px] text-muted">own data</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
