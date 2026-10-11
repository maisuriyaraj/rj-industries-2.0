import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-[background-color,color,border-color,transform] duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-strong text-on-brand hover:bg-[color-mix(in_srgb,var(--brand-strong)_88%,var(--text))]',
  secondary: 'border border-line bg-surface text-fg hover:border-brand-strong hover:text-brand-strong',
  ghost: 'text-fg hover:bg-surface-2',
};

export function buttonClass(variant: Variant = 'primary', className?: string) {
  return cn(base, variants[variant], className);
}

type LinkProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = 'primary', className, ...props }: LinkProps) {
  return <Link {...props} className={buttonClass(variant, className)} />;
}

type AnchorProps = ComponentProps<'a'> & { variant?: Variant };

export function ButtonAnchor({ variant = 'primary', className, ...props }: AnchorProps) {
  return <a {...props} className={buttonClass(variant, className)} />;
}
