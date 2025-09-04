import { NextResponse } from 'next/server';
import { getAbsoluteImageUrl, generateGTIN, generateSKU } from '@/lib/imageUtils';

async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trangmobile.com';
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch products for feed');
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products for feed:', error);
    return [];
  }
}

export async function GET() {
  try {
    const products = await getProducts();
    const baseUrl = 'https://trangmobile.com';
    
    // Build RSS 2.0 feed with Google Shopping namespace
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n';
    xml += '  <channel>\n';
    xml += '    <title>Trang Thiên Long Mobile - Product Feed</title>\n';
    xml += `    <link>${baseUrl}</link>\n`;
    xml += '    <description>Apple Products chính hãng - iPhone, iPad, MacBook, Apple Watch, AirPods</description>\n';
    
    // Add products to feed
    products.forEach((product: any) => {
      // Base product entry
      if (product.variants && product.variants.length > 0) {
        // Create separate entries for each variant
        product.variants.forEach((variant: any) => {
          xml += createProductItem(product, variant, baseUrl);
        });
      } else {
        // Single product without variants
        xml += createProductItem(product, null, baseUrl);
      }
    });
    
    xml += '  </channel>\n';
    xml += '</rss>';
    
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Error generating product feed:', error);
    
    // Return minimal valid feed on error
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Trang Thiên Long Mobile</title>
    <link>https://trangmobile.com</link>
    <description>Product Feed</description>
  </channel>
</rss>`;
    
    return new NextResponse(fallbackXml, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });
  }
}

function createProductItem(product: any, variant: any, baseUrl: string): string {
  const productId = variant ? `${product.id}-${variant.storage}` : product.id;
  const productName = variant 
    ? `${product.productName || product.name} ${variant.storage}`
    : (product.productName || product.name);
  const price = variant ? variant.price : product.price;
  const imageUrl = getAbsoluteImageUrl(product.gallery?.[0] || product.thumbnail);
  
  let item = '    <item>\n';
  
  // Required fields
  item += `      <g:id>${escapeXml(productId.toString())}</g:id>\n`;
  item += `      <g:title>${escapeXml(productName)}</g:title>\n`;
  item += `      <g:description>${escapeXml(product.description || `${productName} chính hãng, bảo hành 12 tháng, giá tốt nhất tại Trang Thiên Long Mobile`)}</g:description>\n`;
  item += `      <g:link>${baseUrl}/shop/product/${product.id}</g:link>\n`;
  item += `      <g:image_link>${imageUrl}</g:image_link>\n`;
  item += `      <g:condition>new</g:condition>\n`;
  item += `      <g:availability>in stock</g:availability>\n`;
  item += `      <g:price>${price} VND</g:price>\n`;
  
  // Google Shopping specific fields
  item += `      <g:brand>Apple</g:brand>\n`;
  item += `      <g:gtin>${generateGTIN(productId)}</g:gtin>\n`;
  item += `      <g:mpn>${generateSKU(product.id, variant?.storage)}</g:mpn>\n`;
  
  // Category and product type
  item += `      <g:google_product_category>Electronics > Communications > Telephony > Mobile Phones</g:google_product_category>\n`;
  item += `      <g:product_type>${getCategoryType(product.category)}</g:product_type>\n`;
  
  // Additional images
  if (product.gallery && product.gallery.length > 1) {
    product.gallery.slice(1, 10).forEach((img: string) => {
      item += `      <g:additional_image_link>${getAbsoluteImageUrl(img)}</g:additional_image_link>\n`;
    });
  }
  
  // Color variants
  if (product.colors && product.colors.length > 0) {
    item += `      <g:color>${escapeXml(product.colors[0].name)}</g:color>\n`;
  }
  
  // Shipping
  item += '      <g:shipping>\n';
  item += '        <g:country>VN</g:country>\n';
  item += '        <g:service>Standard</g:service>\n';
  item += '        <g:price>0 VND</g:price>\n';
  item += '      </g:shipping>\n';
  
  // Tax (Vietnam VAT)
  item += '      <g:tax>\n';
  item += '        <g:country>VN</g:country>\n';
  item += '        <g:rate>10</g:rate>\n';
  item += '      </g:tax>\n';
  
  // Product identifiers
  item += `      <g:identifier_exists>yes</g:identifier_exists>\n`;
  
  // Sale price if applicable
  if (product.originalPrice && product.originalPrice > price) {
    item += `      <g:sale_price>${price} VND</g:sale_price>\n`;
    item += `      <g:sale_price_effective_date>${getEffectiveDate()}</g:sale_price_effective_date>\n`;
  }
  
  item += '    </item>\n';
  
  return item;
}

function getCategoryType(category: string): string {
  const categoryMap: { [key: string]: string } = {
    'iphone': 'Điện thoại > iPhone',
    'ipad': 'Máy tính bảng > iPad',
    'mac': 'Máy tính > MacBook',
    'macbook': 'Máy tính > MacBook',
    'watch': 'Đồng hồ thông minh > Apple Watch',
    'airpods': 'Tai nghe > AirPods',
    'accessories': 'Phụ kiện > Apple'
  };
  
  const lowerCategory = category?.toLowerCase() || '';
  for (const [key, value] of Object.entries(categoryMap)) {
    if (lowerCategory.includes(key)) {
      return value;
    }
  }
  
  return 'Điện tử > Apple Products';
}

function getEffectiveDate(): string {
  const now = new Date();
  const future = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
  
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:00+07:00`; // Vietnam timezone
  };
  
  return `${formatDate(now)}/${formatDate(future)}`;
}

function escapeXml(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}