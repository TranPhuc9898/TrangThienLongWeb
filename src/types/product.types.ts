/** @format */

export type Discount = {
  amount: number;
  percentage: number;
};

export type ProductType = 'iphone' | 'ipad' | 'watch' | 'airpods' | 'mac';

export interface Product {
  id: number;
  title: string;
  price: number;
  discount: {
    percentage: number;
    amount: number;
  };
  rating: number;
  reviewCount: number;
  gallery: string[];
  category: string;
  brand: string;
  inStock: boolean;
  description: string;
  features: string[];
  storages: {
    label: string;
    price: number;
  }[];
  originalPrice?: number;
  productType: ProductType;
  colors?: string[];
  sizes?: string[]; // For Watch
  bands?: string[]; // For Watch  
  ramOptions?: string[]; // For Mac
  screenSize?: string; // For iPad, Mac
  connectivity?: 'wifi' | 'cellular'; // For iPad
  slug: string;
}

// Extended interfaces for specific product types
export interface ProductIphone extends Product {
  productType: 'iphone';
  iphone: boolean;
}

export interface ProductIpad extends Product {
  productType: 'ipad';
  screenSize: string;
  connectivity: 'wifi' | 'cellular';
}

export interface ProductWatch extends Product {
  productType: 'watch';
  sizes: string[];
  bands: string[];
  gpsOnly?: boolean;
  cellular?: boolean;
}

export interface ProductAirPods extends Product {
  productType: 'airpods';
  noiseCancellation?: boolean;
  spatialAudio?: boolean;
}

export interface ProductMac extends Product {
  productType: 'mac';
  ramOptions: string[];
  screenSize: string;
  processor: string;
}
