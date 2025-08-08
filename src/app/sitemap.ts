/** @format */

import { MetadataRoute } from 'next';
import { 
  mockProductsIphone, 
  mockProductsIpad, 
  mockProductsWatch, 
  mockProductsAirPods, 
  mockProductsMac 
} from '@/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thientranglong.vn';

  // Combine all products
  const allProducts = [
    ...mockProductsIphone,
    ...mockProductsIpad, 
    ...mockProductsWatch,
    ...mockProductsAirPods,
    ...mockProductsMac
  ];

  // Generate product URLs
  const productUrls = allProducts.map(product => ({
    url: `${baseUrl}/${product.productType}/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/iphone`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ipad`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/apple-watch`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/airpods`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/macbook`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/thanh-toan`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...productUrls
  ];
}