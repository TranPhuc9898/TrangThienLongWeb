/** @format */

import { MetadataRoute } from "next";

// Fetch products from database for dynamic sitemap
async function getProductsForSitemap() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://trangmobile.com";

  // Fetch real products from database
  const allProducts = await getProductsForSitemap();

  // 🎯 PERFECT PRODUCT URLs WITH CATEGORY-BASED PRIORITY
  const productUrls = allProducts.map((product: any) => {
    // Higher priority for iPhone products (most valuable)
    let priority = 0.8;
    if (product.category?.toLowerCase().includes('iphone')) {
      priority = 0.9;
    } else if (product.category?.toLowerCase().includes('ipad')) {
      priority = 0.85;
    }

    return {
      url: `${baseUrl}/shop/product/${product.category?.toLowerCase() || 'product'}/${product.slug || product.id}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: priority,
    };
  });

  // 🚀 PERFECT SEO SITEMAP WITH TARGET KEYWORDS
  return [
    // 🎯 HOMEPAGE - HIGHEST PRIORITY
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    
    // 📱 HIGH-VALUE CATEGORY PAGES
    {
      url: `${baseUrl}/iphone`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ipad`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/apple-watch`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/airpods`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/macbook`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mac`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },

    // 🎯 TARGET KEYWORD LANDING PAGES
    {
      url: `${baseUrl}/iphone-15-pro-max-256gb-gia-tot`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/mua-iphone-tra-gop-0-phan-tram`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/so-sanh-iphone`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },

    // 🛒 SHOPPING & DEALS
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/deal-hot-hom-nay`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },

    // 📄 IMPORTANT POLICY PAGES
    {
      url: `${baseUrl}/chinh-sach-bao-hanh`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/huong-dan-mua-hang`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/huong-dan-mua-hang-tra-gop`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },

    // 📦 DYNAMIC PRODUCT PAGES
    ...productUrls,
  ];
}
