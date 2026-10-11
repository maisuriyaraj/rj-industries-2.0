import type { ComponentProps } from 'react';

// External links open in a new tab; screen-reader users are told so.
export function ExternalLink({ children, ...props }: Omit<ComponentProps<'a'>, 'target' | 'rel'>) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
