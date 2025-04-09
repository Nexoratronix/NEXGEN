// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false, // Explicitly disable App Router to use Pages Router
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        child_process: false,
        fs: false,
        dns: false,
        net: false,
        tls: false,
        'fs/promises': false,
        'timers/promises': false,
      };
    }
    return config;
  },
  eslint: {
    
    ignoreDuringBuilds: true,
    rules: {
      'react/no-unescaped-entities': 'off', // Valid severity level
    },
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;