import { NextResponse } from 'next/server';
import { extractProductImages } from '@/lib/imageUtils';

async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trangmobile.com';
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch products for image sitemap');
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products for image sitemap:', error);
    return [];
  }
}

export async function GET() {
  try {
    const products = await getProducts();
    const baseUrl = 'https://trangmobile.com';
    
    // Start building the image sitemap
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
    
    // Homepage images
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}</loc>\n`;
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${baseUrl}/images/ttl.png</image:loc>\n`;
    xml += `      <image:title>Trang Thiên Long Mobile - Logo</image:title>\n`;
    xml += `      <image:caption>Cửa hàng Apple products chính hãng tại Việt Nam</image:caption>\n`;
    xml += `    </image:image>\n`;
    xml += `  </url>\n`;
    
    // Product pages with images
    products.forEach((product: any) => {
      const productUrl = `${baseUrl}/shop/product/${product.id}`;
      const images = extractProductImages(product);
      
      if (images.length > 0) {
        xml += `  <url>\n`;
        xml += `    <loc>${productUrl}</loc>\n`;
        
        // Add up to 1000 images per URL (Google's limit)
        images.slice(0, 1000).forEach((img) => {
          xml += `    <image:image>\n`;
          xml += `      <image:loc>${img.url}</image:loc>\n`;
          xml += `      <image:title>${escapeXml(img.title)}</image:title>\n`;
          if (img.caption) {
            xml += `      <image:caption>${escapeXml(img.caption)}</image:caption>\n`;
          }
          xml += `    </image:image>\n`;
        });
        
        xml += `  </url>\n`;
      }
    });
    
    // Category pages
    const categories = ['iphone', 'ipad', 'mac', 'watch', 'airpods'];
    categories.forEach((category) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/${category}</loc>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${baseUrl}/images/${category}-banner.jpg</image:loc>\n`;
      xml += `      <image:title>${category.charAt(0).toUpperCase() + category.slice(1)} chính hãng</image:title>\n`;
      xml += `      <image:caption>Danh mục ${category} tại Trang Thiên Long Mobile</image:caption>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    });
    
    xml += '</urlset>';
    
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Error generating image sitemap:', error);
    
    // Return basic sitemap on error
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://trangmobile.com</loc>
    <image:image>
      <image:loc>https://trangmobile.com/images/ttl.png</image:loc>
      <image:title>Trang Thiên Long Mobile</image:title>
    </image:image>
  </url>
</urlset>`;
    
    return new NextResponse(fallbackXml, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });
  }
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}