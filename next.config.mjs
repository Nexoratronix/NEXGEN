/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
};

export default nextConfig; 