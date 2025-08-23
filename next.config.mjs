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
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    // 🔥 FIX: Disable optimization for local uploads to prevent 400 errors
    unoptimized: process.env.NODE_ENV === "development",
  },

  // SEO & Performance
  compress: true,
  poweredByHeader: false,

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
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

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
};

export default nextConfig;
