import type { NextConfig } from 'next';

// Static export: Firebase Hosting serves the generated out/ folder as plain files,
// so there is no server, no API routes and no on-the-fly image optimisation.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
