/** @format */

export type Discount = {
  amount: number;
  percentage: number;
};

export type ProductType = "iphone" | "ipad" | "watch" | "airpods" | "mac";

// Updated Product interface to match new database schema
export interface ProductVariant {
  id: string;
  storage: string;
  color: string;
  price: bigint | number;
  image: string;
  inStock: boolean;
  quantity: number;
}

export interface Product {
  // Core fields (matching Prisma schema)
  id: string;
  productName?: string;
  brand: string;
  condition?: string;
  slug: string;
  tag?: string; // ✅ Add tag field
  basePrice?: bigint | number;
  currency?: string;
  discount?: string; // "-5%" format
  thumbnail?: string;
  description?: string;
  promotionGeneral?: string;
  promotionStudent?: string;
  installment?: string;
  category: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  inStock: boolean;
  variants?: ProductVariant[];
  createdAt?: string; // ✅ Add createdAt field
  updatedAt?: string; // ✅ Add updatedAt field

  // Legacy fields (for backward compatibility)
  title?: string;
  price?: number;
  gallery?: string[];
  features?: string[];
  storages?: {
    label: string;
    price: number;
  }[];
  originalPrice?: number;
  productType?: ProductType;
  colors?: string[];
  sizes?: string[]; // For Watch
  bands?: string[]; // For Watch
  ramOptions?: string[]; // For Mac
  screenSize?: string; // For iPad, Mac
  connectivity?: "wifi" | "cellular"; // For iPad
}

// Extended interfaces for specific product types
export interface ProductIphone extends Product {
  productType: "iphone";
  iphone: boolean;
}

export interface ProductIpad extends Product {
  productType: "ipad";
  screenSize: string;
  connectivity: "wifi" | "cellular";
}

export interface ProductWatch extends Product {
  productType: "watch";
  sizes: string[];
  bands: string[];
  gpsOnly?: boolean;
  cellular?: boolean;
}

export interface ProductAirPods extends Product {
  productType: "airpods";
  noiseCancellation?: boolean;
  spatialAudio?: boolean;
}

export interface ProductMac extends Product {
  productType: "mac";
  ramOptions: string[];
  screenSize: string;
  processor: string;
}
