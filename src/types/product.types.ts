/** @format */

export type Discount = {
  amount: number;
  percentage: number;
};

export interface Product {
  id: number;
  title: string;
  price: number;
  discount: {
    percentage: number;
    amount: number;
  };
  rating: number;
  reviewCount: number; // Thêm dòng này
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
  originalPrice?: number; // Thêm dòng này nếu bạn dùng originalPrice ở UI
}
