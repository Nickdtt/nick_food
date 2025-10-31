import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.itdg.com.br',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;