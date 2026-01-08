/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'instagram.com',
      },
      {
        protocol: 'http',
        hostname: 'handheartecobodyart.local',
      },
      
    ],
  },
   async rewrites() {
    return [
      {
        source: '/api/wp/:path*',
        destination: 'https://cmshandheart.flywheelsites.com*',
      },
    ]
  },
}

module.exports = nextConfig
