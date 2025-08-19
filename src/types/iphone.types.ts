// 🎯 iPhone-specific types for better organization
export interface iPhoneModel {
  id: string;
  name: string; // "iPhone 15 Pro", "iPhone 14", etc.
  series: string; // "iPhone 15 Series", "iPhone 14 Series"
  isLatest: boolean;
  launchYear: number;
  features: string[]; // ["Dynamic Island", "48MP Camera", etc.]
  startingPrice: number;
  variants: iPhoneVariant[];
  heroImage: string; // Main promotional image
  colors: iPhoneColor[];
}

export interface iPhoneVariant {
  id: string;
  storage: string;
  color: string;
  price: number;
  originalPrice?: number; // For discount display
  image: string;
  inStock: boolean;
  isPopular?: boolean; // Most chosen variant
}

export interface iPhoneColor {
  name: string;
  hex: string;
  image: string;
}

export interface iPhoneComparison {
  feature: string;
  models: Record<string, string>; // modelId -> feature value
}

// SEO & Marketing
export interface iPhoneModelSEO {
  title: string;
  description: string;
  keywords: string[];
  structuredData: any;
  ogImage: string;
}

export interface iPhonePromotion {
  id: string;
  modelIds: string[];
  title: string;
  description: string;
  discountPercent?: number;
  discountAmount?: number;
  validUntil: Date;
  conditions: string[];
}
