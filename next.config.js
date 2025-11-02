/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Enable App Router optimizations
  experimental: {
    appDir: true,
  },

  // ✅ Optimize images and fonts
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'supabase.co',
      'skbebulohlabuan.supabase.co',
      'avatars.githubusercontent.com',
      'img.icons8.com'
    ],
    formats: ['image/avif', 'image/webp']
  },

  // ✅ Improve build caching
  swcMinify: true,
  poweredByHeader: false,

  // ✅ Runtime caching hints
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=300' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
