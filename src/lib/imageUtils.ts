// Image utilities for SEO and Google crawling optimization

/**
 * Convert relative image URLs to absolute URLs for better Google crawling
 */
export function getAbsoluteImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) {
    return 'https://trangmobile.com/images/ttl.png';
  }

  // Already absolute URL
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // Ensure URL starts with slash
  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  
  // Use environment variable if available, otherwise use production URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trangmobile.com';
  
  return `${baseUrl}${path}`;
}

/**
 * Generate image set for structured data (multiple sizes)
 */
export function getImageSet(imageUrl: string | undefined): string[] {
  const absoluteUrl = getAbsoluteImageUrl(imageUrl);
  
  // Return array of images for better Google Shopping compatibility
  return [
    absoluteUrl,
    // Add thumbnail versions if using Next.js Image optimization
    absoluteUrl.includes('/_next/image') ? absoluteUrl : `${absoluteUrl}?w=800&h=800&q=75`,
    absoluteUrl.includes('/_next/image') ? absoluteUrl : `${absoluteUrl}?w=400&h=400&q=75`
  ].filter(Boolean);
}

/**
 * Generate GTIN (Global Trade Item Number) for products
 * In production, this should use actual GTIN/EAN codes
 */
export function generateGTIN(productId: number | string): string {
  // Format: 8 (prefix) + 12 digits padded
  const idString = productId.toString();
  return `8${idString.padStart(12, '0')}`;
}

/**
 * Generate SKU for products if not provided
 */
export function generateSKU(productId: number | string, variant?: string): string {
  const base = `TTL-${productId}`;
  return variant ? `${base}-${variant.toUpperCase()}` : base;
}

/**
 * Validate and format image dimensions for Google requirements
 * Google Shopping requires minimum 100x100, recommends 800x800
 */
export function validateImageDimensions(width: number, height: number): boolean {
  const MIN_SIZE = 100;
  const RECOMMENDED_SIZE = 800;
  
  return width >= MIN_SIZE && height >= MIN_SIZE;
}

/**
 * Get optimized image URL for Next.js Image component
 */
export function getOptimizedImageUrl(
  src: string,
  width: number = 800,
  quality: number = 75
): string {
  // If already optimized or external URL, return as is
  if (src.includes('/_next/image') || src.startsWith('http')) {
    return src;
  }
  
  // Build Next.js optimized URL
  const encodedSrc = encodeURIComponent(getAbsoluteImageUrl(src));
  return `/_next/image?url=${encodedSrc}&w=${width}&q=${quality}`;
}

/**
 * Extract product images for sitemap
 */
export function extractProductImages(product: any): Array<{
  url: string;
  title: string;
  caption?: string;
}> {
  const images: Array<{ url: string; title: string; caption?: string }> = [];
  
  // Main product images
  if (product.images && Array.isArray(product.images)) {
    product.images.forEach((img: string, index: number) => {
      images.push({
        url: getAbsoluteImageUrl(img),
        title: `${product.productName || product.name} - Hình ${index + 1}`,
        caption: `${product.productName || product.name} chính hãng tại Trang Thiên Long Mobile`
      });
    });
  }
  
  // Color variant images
  if (product.colors && Array.isArray(product.colors)) {
    product.colors.forEach((color: any) => {
      if (color.images && Array.isArray(color.images)) {
        color.images.forEach((img: string, index: number) => {
          images.push({
            url: getAbsoluteImageUrl(img),
            title: `${product.productName || product.name} - Màu ${color.name} - Hình ${index + 1}`,
            caption: `${product.productName || product.name} màu ${color.name}`
          });
        });
      }
    });
  }
  
  return images;
}