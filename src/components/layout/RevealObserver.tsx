'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Reveals each [data-reveal] element once, the first time it scrolls into view. It marks them with a
// data-revealed attribute rather than a class: React rewrites className whenever a client
// component re-renders, which would hide an already revealed element again.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-revealed', ''));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', '');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
