/**
 * Google Ads & Analytics tracking utilities
 *
 * Setup:
 * 1. Google Ads đã được config trong layout.tsx
 * 2. Conversion ID: AW-785944712 (đã có)
 * 3. Cần thêm conversion labels từ Google Ads dashboard
 */

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Track product view event
 * Gọi khi user vào product detail page
 */
export const trackProductView = (product: {
  id: string;
  name: string;
  price: number;
  category?: string;
  brand?: string;
}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'view_item', {
    currency: 'VND',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category || 'Uncategorized',
        item_brand: product.brand || 'Apple',
        price: product.price,
        quantity: 1,
      },
    ],
  });

  console.log('📊 Tracked product view:', product.name);
};

/**
 * Track add to cart event
 * Gọi khi user thêm sản phẩm vào giỏ hàng
 */
export const trackAddToCart = (product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'add_to_cart', {
    currency: 'VND',
    value: product.price * product.quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: product.quantity,
      },
    ],
  });

  console.log('🛒 Tracked add to cart:', product.name);
};

/**
 * Track begin checkout event
 * Gọi khi user vào trang checkout
 */
export const trackBeginCheckout = (cartItems: Array<{
  id: string;
  name: string;
  price: number;
  quantity: number;
}>, totalValue: number) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'begin_checkout', {
    currency: 'VND',
    value: totalValue,
    items: cartItems.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });

  console.log('💳 Tracked begin checkout:', totalValue);
};

/**
 * Track purchase conversion
 * Gọi khi đơn hàng thành công
 *
 * ⚠️ QUAN TRỌNG: Cần thêm conversion_label từ Google Ads dashboard
 * Vào Google Ads > Conversions > Tạo conversion action > Lấy label
 */
export const trackPurchase = (
  orderId: string,
  orderTotal: number,
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    category?: string;
  }>
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  // Track conversion to Google Ads
  // TODO: Thêm conversion_label khi có từ Google Ads
  window.gtag('event', 'conversion', {
    send_to: 'AW-785944712/YOUR_CONVERSION_LABEL', // ⚠️ CẦN THAY ĐỔI
    value: orderTotal,
    currency: 'VND',
    transaction_id: orderId,
  });

  // Track purchase for enhanced ecommerce
  window.gtag('event', 'purchase', {
    transaction_id: orderId,
    value: orderTotal,
    currency: 'VND',
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
  });

  console.log('✅ Tracked purchase:', orderId, orderTotal);
};

/**
 * Track search event
 * Gọi khi user search sản phẩm
 */
export const trackSearch = (searchTerm: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'search', {
    search_term: searchTerm,
  });

  console.log('🔍 Tracked search:', searchTerm);
};

/**
 * Track page view
 * Tự động track bởi Next.js router, nhưng có thể dùng cho custom tracking
 */
export const trackPageView = (url: string, title: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_title: title,
    page_location: url,
    page_path: url,
  });

  console.log('📄 Tracked page view:', url);
};

/**
 * Track custom event
 * Dùng cho các event khác không có sẵn
 */
export const trackCustomEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, params);

  console.log('🎯 Tracked custom event:', eventName, params);
};