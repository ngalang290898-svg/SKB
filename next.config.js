/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['uyfsrvxneioimldkubvo.supabase.co'],
  },
  // Allow longer builds for initial setup
  staticPageGenerationTimeout: 1000,
}

module.exports = nextConfig
