import Link from 'next/link';

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="font-logo text-xl tracking-wide text-fg">
      RJ<span className="text-brand-strong">INDUSTRIES</span>
      <span className="sr-only">, home</span>
    </Link>
  );
}
