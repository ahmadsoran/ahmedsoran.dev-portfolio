import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */

  // Vercel deployment optimization
  output: 'standalone',

  // Ensure CSS is properly handled
  experimental: {
    // Disable CSS optimization to avoid critters dependency issues
    optimizeCss: false,
  },

  // Webpack configuration for better CSS handling
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },

  images: {
    domains: [
      'www.gravatar.com',
      'static.ghost.org',
      'ahmed-soran.ghost.io',
      'images.unsplash.com', // Common external image source
      'cdn.ghost.org', // Ghost CDN
    ],
    // For Ghost CMS compatibility, also configure remote patterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ahmed-soran.ghost.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.ghost.io', // Any Ghost.io subdomain
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.ghost.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
