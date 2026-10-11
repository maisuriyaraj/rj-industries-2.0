import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | Full-stack developer`,
    short_name: 'Raj Maisuriya',
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#0068c9',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
