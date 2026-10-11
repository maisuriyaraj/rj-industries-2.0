'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// cmdk and the terminal are only downloaded the first time they are opened.
const CommandPalette = dynamic(() => import('./CommandPalette'), { ssr: false });
const OrbitTerminal = dynamic(() => import('./OrbitTerminal'), { ssr: false });

const SECRET = 'orbit';

export function PaletteLauncher() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteLoaded, setPaletteLoaded] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const typed = useRef('');

  useEffect(() => {
    const openPalette = () => {
      setPaletteLoaded(true);
      setPaletteOpen(true);
    };
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteLoaded(true);
        setPaletteOpen((open) => !open);
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]') || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key.length !== 1) return;
      typed.current = (typed.current + event.key.toLowerCase()).slice(-SECRET.length);
      if (typed.current === SECRET && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        typed.current = '';
        setTerminalOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('rj-open-palette', openPalette);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('rj-open-palette', openPalette);
    };
  }, []);

  return (
    <>
      {paletteLoaded && <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />}
      {terminalOpen && <OrbitTerminal onClose={() => setTerminalOpen(false)} />}
    </>
  );
}
