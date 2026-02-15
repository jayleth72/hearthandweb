import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local WordPress development
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
      // Production WordPress
      {
        protocol: 'https',
        hostname: 'handheartecobodyart.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      // Instagram CDN domains (all possible patterns)
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent-*.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'instagram.*.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'scontent-*.xx.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'video-*.cdninstagram.com',
      },
      // API proxy route
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/wp-image/**',
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: false, // Enable optimization
  },
};

export default nextConfig;
