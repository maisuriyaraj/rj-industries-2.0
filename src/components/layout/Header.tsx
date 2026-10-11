'use client';

import { Command, Download, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { navItems, site } from '@/data/site';
import { cn } from '@/lib/cn';
import { useActiveSection } from '@/lib/use-active-section';
import { buttonClass } from '../ui/Button';
import { Container } from '../ui/Container';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

const sectionIds = navItems.map((item) => item.id);

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const active = useActiveSection(sectionIds, isHome);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // While the mobile menu is open: lock page scroll, close on Esc, keep Tab inside the panel.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button') ?? []);
    focusables()[0]?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'Tab') {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) close(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, close]);

  const openPalette = () => window.dispatchEvent(new Event('rj-open-palette'));

  const navLink = (id: string, label: string, mobile = false) => {
    const current = active === id;
    return (
      <Link
        key={id}
        href={isHome ? `#${id}` : `/#${id}`}
        aria-current={current ? 'location' : undefined}
        onClick={mobile ? () => close(false) : undefined}
        className={cn(
          'rounded-md transition-colors',
          mobile
            ? 'block px-4 py-3 text-2xl font-semibold'
            : 'relative px-3 py-2 text-sm font-medium after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand-strong after:transition-transform after:duration-200',
          current ? 'text-brand-strong after:scale-x-100' : 'text-muted after:scale-x-0 hover:text-fg',
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b transition-[background-color,border-color] duration-200',
          scrolled || open ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-[var(--header-h)] items-center justify-between gap-4">
          <Logo onClick={open ? () => close(false) : undefined} />
  
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>{navLink(item.id, item.label)}</li>
              ))}
            </ul>
          </nav>
  
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={openPalette}
              className="hidden h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 font-mono text-xs text-muted transition-colors hover:border-brand-strong hover:text-fg lg:inline-flex"
              aria-label="Open command palette (Ctrl+K)"
            >
              <Command className="size-3.5" aria-hidden="true" />K
            </button>
            <ThemeToggle />
            <a href={site.resume} download className={buttonClass('primary', 'ml-1 px-4 max-sm:hidden')}>
              <Download className="size-4" aria-hidden="true" />
              Download CV
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => (open ? close() : setOpen(true))}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-11 place-items-center rounded-lg text-fg hover:bg-surface-2 lg:hidden"
            >
              {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Outside <header>: its backdrop-filter would otherwise trap this fixed panel inside the bar. */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto border-t border-line bg-bg lg:hidden"
      >
        <Container className="flex min-h-full flex-col justify-between gap-8 py-8">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>{navLink(item.id, item.label, true)}</li>
              ))}
            </ul>
          </nav>
          <a href={site.resume} download className={buttonClass('primary', 'w-full text-base')} onClick={() => close(false)}>
            <Download className="size-4" aria-hidden="true" />
            Download CV
          </a>
        </Container>
      </div>
    </>
  );
}
