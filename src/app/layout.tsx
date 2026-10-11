import type { Metadata, Viewport } from 'next';
import { Audiowide, Inter, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { RevealObserver } from '@/components/layout/RevealObserver';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { PaletteLauncher } from '@/components/palette/PaletteLauncher';
import { site, socials } from '@/data/site';
import { headScript } from '@/lib/theme';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
// Only Inter is needed for the first paint; the mono and logo fonts load without competing for it.
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap', preload: false });
const audiowide = Audiowide({ subsets: ['latin'], weight: '400', variable: '--font-audiowide', display: 'swap', preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: ['Raj Maisuriya', 'full-stack developer', 'Next.js', 'TypeScript', 'React', 'Fastify', 'Sequelize', 'PostgreSQL', 'OrbitOps', 'Surat'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: 'en_IN',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Raj Maisuriya, full-stack developer: Next.js, TypeScript, Fastify, PostgreSQL' }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@Rj8703',
    title: site.title,
    description: site.description,
    images: ['/og.png'],
  },
  icons: {
    icon: [
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1120' },
  ],
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: 'Full-stack developer',
  email: `mailto:${site.email}`,
  image: `${site.url}/media/about/raj.webp`,
  address: { '@type': 'PostalAddress', addressLocality: 'Surat', addressRegion: 'Gujarat', addressCountry: 'IN' },
  worksFor: { '@type': 'Organization', name: 'Zluck Solutions' },
  knowsAbout: ['Next.js', 'React', 'TypeScript', 'Fastify', 'Sequelize', 'PostgreSQL'],
  sameAs: socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable} ${audiowide.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <a
          href="#content"
          className="fixed left-4 top-3 z-80 -translate-y-20 rounded-lg bg-brand-strong px-4 py-2 font-semibold text-on-brand transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        <main id="content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <PaletteLauncher />
      </body>
    </html>
  );
}
