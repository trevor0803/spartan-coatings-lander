import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync(new URL('./site.config.json', import.meta.url), 'utf8'));
const funnelMode = config.siteMode && config.siteMode !== 'full';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  async redirects() {
    return funnelMode
      ? [{ source: '/', destination: '/go', permanent: false }]
      : [];
  },
};

export default nextConfig;
