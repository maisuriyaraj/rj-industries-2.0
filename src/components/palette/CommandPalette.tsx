'use client';

import { Command } from 'cmdk';
import { ArrowRight, Copy, Download, FileText, Hash, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { navItems, site, socials } from '@/data/site';
import { applyTheme, readTheme } from '@/lib/theme';
import { SocialIcon } from '../ui/SocialIcon';

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

const itemClass =
  'flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-sm text-fg data-[selected=true]:bg-surface-2 data-[selected=true]:text-brand-strong';
const groupClass =
  '[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.1em] [&_[cmdk-group-heading]]:text-muted';

export default function CommandPalette({ open, onOpenChange }: Props) {
  const router = useRouter();

  const run = (action: () => void) => {
    onOpenChange(false);
    action();
  };

  const item = (value: string, icon: ReactNode, label: string, action: () => void) => (
    <Command.Item key={value} value={value} onSelect={() => run(action)} className={itemClass}>
      <span className="text-muted" aria-hidden="true">
        {icon}
      </span>
      {label}
    </Command.Item>
  );

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command palette"
      overlayClassName="fixed inset-0 z-70 bg-[rgb(2_6_23/0.6)] backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[12vh] z-71 w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
    >
      <Command.Input
        placeholder="Type a command or search…"
        className="w-full border-b border-line bg-transparent px-4 py-4 text-base text-fg outline-none placeholder:text-muted"
      />
      <Command.List className="max-h-[60vh] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-sm text-muted">No results.</Command.Empty>
        <Command.Group heading="Go to" className={groupClass}>
          {navItems.map((n) =>
            item(`section ${n.label}`, <Hash className="size-4" />, n.label, () => router.push(`/#${n.id}`)),
          )}
          {item('orbitops case study', <FileText className="size-4" />, 'OrbitOps case study', () =>
            router.push('/projects/orbitops'),
          )}
        </Command.Group>
        <Command.Group heading="Actions" className={groupClass}>
          {item('toggle theme dark light', <Moon className="size-4" />, 'Toggle light / dark theme', () => {
            applyTheme(readTheme() === 'dark' ? 'light' : 'dark');
            window.dispatchEvent(new Event('rj-theme-change'));
          })}
          {item('download cv resume', <Download className="size-4" />, 'Download CV', () => {
            const a = document.createElement('a');
            a.href = site.resume;
            a.download = '';
            a.click();
          })}
          {item('copy email', <Copy className="size-4" />, `Copy email (${site.email})`, () => {
            navigator.clipboard?.writeText(site.email).catch(() => {});
          })}
        </Command.Group>
        <Command.Group heading="Elsewhere" className={groupClass}>
          {socials.map((s) =>
            item(`open ${s.label}`, <SocialIcon id={s.id} className="size-4" />, s.label, () =>
              window.open(s.href, '_blank', 'noopener,noreferrer'),
            ),
          )}
        </Command.Group>
      </Command.List>
      <p className="flex items-center gap-1.5 border-t border-line px-4 py-2.5 font-mono text-[11px] text-muted">
        <ArrowRight className="size-3" aria-hidden="true" /> Enter to run · Esc to close · psst, try typing “orbit”
      </p>
    </Command.Dialog>
  );
}
