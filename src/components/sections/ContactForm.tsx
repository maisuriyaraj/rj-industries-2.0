'use client';

import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';
import { buttonClass } from '../ui/Button';

type Field = 'name' | 'email' | 'message';
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  else if (values.name.length > 80) errors.name = 'Please keep your name under 80 characters.';
  if (!EMAIL.test(values.email.trim())) errors.email = 'Please enter a valid email address, like you@example.com.';
  const len = values.message.trim().length;
  if (len < 10) errors.message = 'Please write at least 10 characters so I know how to help.';
  else if (len > 2000) errors.message = `Please keep it under 2000 characters (currently ${len}).`;
  return errors;
}

// Web3Forms keys are designed to be public: they only allow sending to the owner's inbox.
export function ContactForm({ accessKey }: { accessKey: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    };
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as Field[])[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // Hidden field that only bots fill in; pretend success and send nothing.
    if (data.get('botcheck')) {
      setStatus('success');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio message from ${values.name.trim()}`,
          from_name: 'raj-maisuriya.web.app',
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error('send failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
        <CheckCircle2 className="size-10 text-success" aria-hidden="true" />
        <h3 className="text-2xl font-bold">Thanks, message sent!</h3>
        <p className="text-muted">I’ll reply to your email soon, usually within a day or two.</p>
        <button type="button" onClick={() => setStatus('idle')} className={buttonClass('secondary')}>
          Send another message
        </button>
      </div>
    );
  }

  const field = (name: Field, label: string, input: (props: Record<string, unknown>) => ReactNode) => {
    const error = errors[name];
    return (
      <div>
        <label htmlFor={`contact-${name}`} className="mb-1.5 block text-sm font-medium text-fg">
          {label}
        </label>
        {input({
          id: `contact-${name}`,
          name,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? `contact-${name}-error` : undefined,
          onInput: () => error && setErrors((e) => ({ ...e, [name]: undefined })),
          className: cn(
            'w-full rounded-lg border bg-bg px-3.5 py-2.5 text-fg placeholder:text-muted/70 focus:outline-none focus-visible:border-brand-strong focus-visible:ring-2 focus-visible:ring-brand-strong/30',
            error ? 'border-danger' : 'border-line',
          ),
        })}
        {error && (
          <p id={`contact-${name}-error`} className="mt-1.5 text-sm text-danger">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-5 rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8"
    >
      {field('name', 'Your name', (p) => <input {...p} type="text" autoComplete="name" required maxLength={80} />)}
      {field('email', 'Your email', (p) => <input {...p} type="email" autoComplete="email" required inputMode="email" />)}
      {field('message', 'Message', (p) => (
        <textarea {...p} rows={5} required maxLength={2000} placeholder="Tell me about the role, project or idea" />
      ))}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {status === 'error' && (
        <p role="alert" className="rounded-lg border border-danger/40 bg-danger/5 px-3.5 py-2.5 text-sm text-danger">
          Sorry, the message didn’t send. Please try again, or email me directly at{' '}
          <a href={`mailto:${site.email}`} className="font-semibold underline">
            {site.email}
          </a>
          .
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className={buttonClass('primary', 'w-full sm:w-auto')}>
        {status === 'sending' ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        {status === 'sending' ? 'Sending…' : status === 'error' ? 'Try again' : 'Send message'}
      </button>
    </form>
  );
}
