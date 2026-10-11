'use client';

import { useEffect, useRef, useState } from 'react';

const lines = [
  '$ npx create-rj-app orbitops',
  '✔ next.js + typescript ........ ui ready',
  '✔ fastify ..................... api listening on :3000',
  '✔ sequelize + postgresql ...... migrations applied',
  '✔ tenants ..................... isolated',
  '',
  '🚀 Orbit reached. Thanks for exploring, and say hi below!',
];

// Easter egg: typing "orbit" anywhere on the page opens this.
export default function OrbitTerminal({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  useEffect(() => {
    if (shown >= lines.length) return;
    const timer = window.setTimeout(() => setShown((n) => n + 1), shown === 0 ? 200 : 450);
    return () => window.clearTimeout(timer);
  }, [shown]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      aria-label="OrbitOps terminal"
      data-theme="dark"
      className="m-auto w-[min(640px,calc(100vw-2rem))] max-w-none overflow-hidden rounded-xl border border-line bg-bg p-0 text-fg shadow-card backdrop:bg-[rgb(2_6_23/0.7)]"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-xs text-muted">rj@industries: ~/orbitops</span>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="rounded px-2 py-1 font-mono text-xs text-muted hover:text-fg"
        >
          esc
        </button>
      </div>
      <pre className="min-h-56 whitespace-pre-wrap p-4 font-mono text-[13px] leading-7" aria-live="polite">
        {lines.slice(0, shown).join('\n')}
        {shown < lines.length && <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-brand align-middle" />}
      </pre>
    </dialog>
  );
}
