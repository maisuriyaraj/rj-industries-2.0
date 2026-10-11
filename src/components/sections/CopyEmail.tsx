'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard can be blocked; the mailto link next to this button still works.
        }
      }}
      className="grid size-11 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
      aria-label={copied ? 'Email copied' : 'Copy email address'}
    >
      {copied ? <Check className="size-4 text-success" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </button>
  );
}
