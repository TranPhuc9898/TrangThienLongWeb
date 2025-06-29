/** @format */

import "@/styles/swiper-custom.css";
import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";
import FloatingToolbar from "../components/FloatingToolbar";
import ProductSection from "../components/ProductSection";
import BannerSlider from "../components/layout/Banner/BannerSlider";

export const newArrivalsData: Product[] = [
  {
    id: 1,
    title: "iPhone 13 Pro Max 256GB - 99%",
    price: 13890000,
    discount: { percentage: 24, amount: 4310000 },
    rating: 4.5,
    reviewCount: 128,
    gallery: ["/images/iphone13.png"],
    category: "smartphone",
    brand: "Apple",
    inStock: true,
    description: "iPhone 13 Pro Max với công nghệ tiên tiến",
    features: ["Face ID", "5G", "Pro Camera"],
    storages: [
      { label: "128GB", price: 12900000 },
      { label: "256GB", price: 13890000 },
    ],
  },
  {
    id: 2,
    title: "iPhone 14 Pro Max 128GB - 99%",
    price: 16790000,
    discount: { percentage: 20, amount: 3000000 },
    rating: 4.3,
    reviewCount: 95,
    gallery: ["/images/iphone14.png"],
    category: "smartphone",
    brand: "Apple",
    inStock: true,
    description: "iPhone 14 Pro Max mới nhất",
    features: ["Face ID", "5G", "Pro Camera"],
    storages: [
      { label: "128GB", price: 16790000 },
      { label: "256GB", price: 18790000 },
    ],
  },
];

export const topSellingData: Product[] = [
  {
    id: 3,
    title: "iPhone 13 Mini 128GB - 99%",
    price: 12000000,
    discount: { percentage: 10, amount: 1200000 },
    rating: 4.2,
    reviewCount: 80,
    gallery: ["/images/iphone13.png"],
    category: "smartphone",
    brand: "Apple",
    inStock: true,
    description: "iPhone 13 Mini nhỏ gọn, mạnh mẽ",
    features: ["Face ID", "5G"],
    storages: [{ label: "128GB", price: 12000000 }],
  },
  {
    id: 4,
    title: "iPhone 12 Pro 256GB - 98%",
    price: 10000000,
    discount: { percentage: 15, amount: 1500000 },
    rating: 4.0,
    reviewCount: 60,
    gallery: ["/images/iphone13.png"],
    category: "smartphone",
    brand: "Apple",
    inStock: false,
    description: "iPhone 12 Pro sang trọng",
    features: ["Face ID", "4G"],
    storages: [{ label: "256GB", price: 10000000 }],
  },
];

export const relatedProductData: Product[] = [
  {
    id: 5,
    title: "iPhone 11 64GB - 97%",
    price: 8000000,
    discount: { percentage: 5, amount: 400000 },
    rating: 3.8,
    reviewCount: 40,
    gallery: ["/images/iphone13.png"],
    category: "smartphone",
    brand: "Apple",
    inStock: true,
    description: "iPhone 11 giá rẻ, pin trâu",
    features: ["Face ID", "4G"],
    storages: [{ label: "64GB", price: 8000000 }],
  },
  {
    id: 6,
    title: "iPhone SE 2022 128GB - 99%",
    price: 7000000,
    discount: { percentage: 8, amount: 600000 },
    rating: 4.1,
    reviewCount: 30,
    gallery: ["/images/iphone13.png"],
    category: "smartphone",
    brand: "Apple",
    inStock: true,
    description: "iPhone SE nhỏ gọn, hiệu năng cao",
    features: ["Touch ID", "4G"],
    storages: [{ label: "128GB", price: 7000000 }],
  },
];

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "",
    content: '"”',
    rating: 5,
    date: "",
  },
  {
    id: 2,
    user: "",
    content: `"”`,
    rating: 5,
    date: "",
  },
  {
    id: 3,
    user: "",
    content: `""`,
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "",
    content: `""`,
    rating: 5,
    date: "August 17, 2023",
  },
  {
    id: 5,
    user: "",
    content: `""`,
    rating: 5,
    date: "August 18, 2023",
  },
  {
    id: 6,
    user: "",
    content: `""`,
    rating: 5,
    date: "August 19, 2023",
  },
];

export default function Home() {
  return (
    <>
      <FloatingToolbar />
      <BannerSlider />

      <Header />

      {/* Product Sections */}
      <ProductSection
        id="iphone-section"
        title="iPhone"
        backgroundImage="/images/home-bg-2.png"
      />
      {/* <Brands /> */}
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW IPHONE"
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
