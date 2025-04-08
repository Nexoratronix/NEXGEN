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
        "fs/promises": false,
        "timers/promises": false,
      };
    }
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true, // Optional: Ignores all ESLint errors during build
    rules: {
      'react/no-unescaped-entities': 0, // Specifically disable this rule
    },
  },
};

export default nextConfig;