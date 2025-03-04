import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },

  // httpAgentOptions: {
  //   keepAlive: true
  // },

  // productionBrowserSourceMaps: true,
  // reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/v0/:path*',
        destination: '/api/:path*'
      }
    ]
  }

  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/browse',
  //       permanent: true
  //     }
  //   ]
  // }
}

export default nextConfig
