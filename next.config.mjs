/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance Optimizations
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trangmobile.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    // ✅ ENABLED: Image optimization for better performance and SEO
    // unoptimized: false, // Default is false, so we don't need this line
  },

  // SEO & Performance
  compress: true,
  poweredByHeader: false,

  // Headers for images only
  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/uploads/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },

  // Rewrites for SEO-friendly URLs
  async rewrites() {
    return [
      {
        source: "/iphone/:slug*",
        destination: "/shop/product/iphone/:slug*",
      },
    ];
  },

  // Remove experimental features that cause build errors
};

export default nextConfig;
