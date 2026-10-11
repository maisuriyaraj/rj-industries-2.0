'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1800;

// The first role is rendered on the server, so the line is never empty
// (good for no-JS visitors and for the largest-contentful-paint measurement).
export function TypedRole({ roles }: { roles: readonly string[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0] ?? '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || roles.length < 2) return;
    const target = roles[index] ?? '';
    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && text === target) delay = HOLD_MS;

    const timer = window.setTimeout(() => {
      if (!deleting && text === target) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      } else {
        setText(deleting ? text.slice(0, -1) : target.slice(0, text.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [text, deleting, index, roles, reduced]);

  return (
    <p className="font-mono text-base text-muted sm:text-lg">
      <span className="text-layer-ui" aria-hidden="true">
        ~/rj ${' '}
      </span>
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden="true" className="text-fg">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-brand motion-safe:animate-[caret-blink_1s_steps(1)_infinite]"
      />
    </p>
  );
}
