/** @format */

export type StorageOption = {
  label: string; // "256GB"
  price: number;
};

export type Discount = {
  percentage: number;
  amount: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  discount: Discount;
  rating: number;
  reviewCount: number;
  gallery: string[];
  category: string;
  brand: string;
  inStock: boolean;
  description: string;
  features: string[];
  storages: StorageOption[]; // <-- Thêm dòng này
  originalPrice?: number;
};

export type ProductIphone = {
  id: number;
  title: string;
  price: number;
  discount: Discount;
  rating: number;
  reviewCount: number;
  gallery: string[];
  category: string;
  brand: string;
  inStock: boolean;
  description: string;
  features: string[];
  storages: StorageOption[]; // <-- Thêm dòng này
  originalPrice?: number;
  iphone?: boolean; // Thêm trường này để phân biệt sản phẩm iPhone
};
