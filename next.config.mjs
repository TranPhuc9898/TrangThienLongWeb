/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance Optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Enhanced Package optimizations - Aggressive bundle splitting
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-icons', 
      'framer-motion',
      'swiper',
      '@reduxjs/toolkit',
      'embla-carousel-react'
    ],
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],
    serverComponentsExternalPackages: ['sharp'],
  },
  
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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

  // Headers for security and caching
  async headers() {
    return [
      // Security headers for all routes
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
      // Cache headers for images
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
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      // Cache Next.js static files
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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
