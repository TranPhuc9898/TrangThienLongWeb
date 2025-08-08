/** @format */

import "@/styles/swiper-custom.css";
import ProductListSec from "@/components/common/ProductListSec";
import DressStyle from "@/components/homepage/DressStyle";
import Reviews from "@/components/homepage/Reviews";
import HeroSection from "@/components/homepage/HeroSection";
import VideoHeroSection from "@/components/homepage/VideoHeroSection";
import CategoriesGrid from "@/components/homepage/CategoriesGrid";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";
import FloatingToolbar from "../components/FloatingToolbar";
import ProductSection from "../components/ProductSection";
import { mockProductsIphone } from "@/data";

// Legacy data - now replaced by data from /data/index.ts
export const newArrivalsData: Product[] = mockProductsIphone.slice(0, 2);
export const topSellingData: Product[] = mockProductsIphone.slice(1, 3);
export const relatedProductData: Product[] = mockProductsIphone;

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
      
      {/* Hero Section - Banners only */}
      <HeroSection />
      
      {/* Video Hero Section - Separate video with animations */}
      <VideoHeroSection />
      
      {/* Categories Grid */}
      <CategoriesGrid />

      {/* Product Sections for each category */}
      <ProductSection
        id="iphone-section"
        title="iPhone"
        backgroundImage="/images/home-bg-2.png"
      />
      
      <ProductSection
        id="ipad-section"
        title="iPad"
        backgroundImage="/images/home-bg-2.png"
      />
      
      <ProductSection
        id="watch-section"
        title="Apple Watch"
        backgroundImage="/images/home-bg-2.png"
      />
      
      <ProductSection
        id="airpods-section"
        title="AirPods"
        backgroundImage="/images/home-bg-2.png"
      />
      
      <ProductSection
        id="mac-section"
        title="Mac"
        backgroundImage="/images/home-bg-2.png"
      />

      <main className="my-[50px] sm:my-[72px]">
        {/* Featured iPhone Products */}
        <ProductListSec
          title="iPhone Nổi Bật"
          data={mockProductsIphone.slice(0, 4)}
          viewAllLink="/iphone"
        />
        
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        
        
        
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
