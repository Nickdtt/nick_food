import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Adicionar esta linha
  images: {
    unoptimized: true, // Adicionar esta linha para desativar a otimização
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.itdg.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'png.pngtree.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
