import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'handheartecobodyart.local',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'handheartecobodyart.local',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/wp-image/**',
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true, // Disable optimization for proxied images
  },
};

export default nextConfig;
