'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { applyTheme, readTheme, type Theme } from '@/lib/theme';

export function ThemeToggle() {
  // null until mounted: the real theme is only known in the browser.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readTheme());
    const onExternal = () => setTheme(readTheme());
    window.addEventListener('rj-theme-change', onExternal);
    return () => window.removeEventListener('rj-theme-change', onExternal);
  }, []);

  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
      aria-label={theme ? `Switch to ${next} theme` : 'Toggle theme'}
      className="grid size-11 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
    </button>
  );
}
