/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      // České URL → anglické složky
      { source: '/prehled', destination: '/home' },
      { source: '/akce', destination: '/events' },
      { source: '/akce/:id', destination: '/events/:id' },
      { source: '/akce/:id/prihlasky', destination: '/events/:id/registrations' },
      { source: '/akce/:id/platby', destination: '/events/:id/payments' },
      { source: '/akce/:id/nastaveni', destination: '/events/:id/settings' },
      { source: '/komunikace', destination: '/communication' },
      { source: '/komunikace/nahled/:id', destination: '/communication/preview/:id' },
      { source: '/kontakty', destination: '/contacts' },
      { source: '/finance', destination: '/finances' },
      { source: '/organizace', destination: '/organization' },
      { source: '/registrace/:id', destination: '/register/:id' },
    ]
  },
}

export default nextConfig
