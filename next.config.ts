import type { NextConfig } from "next";

// Node.js 22+ exposes a non-functional `localStorage` on globalThis that
// breaks SSR code checking `typeof localStorage !== 'undefined'`.
if (typeof window === 'undefined' && typeof globalThis.localStorage !== 'undefined') {
  delete (globalThis as any).localStorage;
}

const nextConfig: NextConfig = {
  basePath: '/nickfood',
  assetPrefix: '/nickfood',
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
