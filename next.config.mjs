/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Your config options go here.
  // For example, adding the caching headers from our previous conversation:
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|gif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;