/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚀 PERFECT SEO PERFORMANCE OPTIMIZATIONS
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trangmobile.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
    ],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 🎯 MAXIMUM SEO & PERFORMANCE
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // 🚀 AGGRESSIVE BUNDLE OPTIMIZATION  
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-icons'],
    optimizeCss: false, // Prevent build errors
    scrollRestoration: true,
  },
  
  // 🎯 WEBPACK BUNDLE OPTIMIZATIONS
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              enforce: true,
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },

  // 🔥 PERFECT CACHING & SEO HEADERS
  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        source: "/uploads/(.*)",
        headers: [
          {
            key: "Cache-Control", 
            value: "public, max-age=86400, s-maxage=604800",
          },
        ],
      },
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
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },

  // 🎯 PERFECT SEO-FRIENDLY URLs
  async rewrites() {
    return [
      {
        source: "/iphone/:slug*",
        destination: "/shop/product/iphone/:slug*",
      },
      {
        source: "/iphone-15-pro-max-256gb-gia-tot",
        destination: "/landing/iphone-15-pro-max-256gb",
      },
      {
        source: "/mua-iphone-tra-gop-0-phan-tram", 
        destination: "/landing/tra-gop-0-phan-tram",
      },
      {
        source: "/so-sanh-iphone",
        destination: "/tools/so-sanh-iphone",
      },
    ];
  },

  // 🚀 SAFE BUILD OPTIMIZATION
  swcMinify: true,
  trailingSlash: false,
  reactStrictMode: true,
};

export default nextConfig;
