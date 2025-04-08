import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '4mb'
    }
  },

  httpAgentOptions: {
    keepAlive: false
  },

  logging: {
    fetches: {
      fullUrl: true
    }
  },

  // poweredByHeader: false,
  productionBrowserSourceMaps: true,
  // reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/browse',
        permanent: true
      }
    ]
  },

  async rewrites() {
    return [
      {
        source: '/v0/:path*',
        destination: '/api/:path*'
      }
    ]
  }
}

export default nextConfig
