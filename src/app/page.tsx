/** @format */

import "@/styles/swiper-custom.css";
import ModernHeroSection from "@/components/homepage/ModernHeroSection";
import HeroSection from "@/components/homepage/HeroSection";
import VideoHeroSection from "@/components/homepage/VideoHeroSection";
import EnhancedFeaturedProductsCarousel from "@/components/homepage/EnhancedFeaturedProductsCarousel";
import ModernProductSection from "@/components/homepage/ModernProductSection";
import StatsSection from "@/components/homepage/StatsSection";
import NewsletterSection from "@/components/homepage/NewsletterSection";
import FloatingToolbar from "../components/FloatingToolbar";
import {
  mockProductsIphone,
  mockProductsIpad,
  mockProductsWatch,
  mockProductsAirPods,
  mockProductsMac,
} from "@/data";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

// Legacy exports for backward compatibility
export const newArrivalsData: Product[] = mockProductsIphone.slice(0, 2);
export const topSellingData: Product[] = mockProductsIphone.slice(1, 3);
export const relatedProductData: Product[] = mockProductsIphone;

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    content: "Sản phẩm chất lượng, giao hàng nhanh!",
    rating: 5,
    date: "2024-01-15",
  },
  {
    id: 2,
    user: "Trần Thị B",
    content: "iPhone mới 99%, giống như mới tinh!",
    rating: 5,
    date: "2024-01-16",
  },
  {
    id: 3,
    user: "Lê Văn C",
    content: "Dịch vụ tốt, nhân viên tư vấn nhiệt tình",
    rating: 5,
    date: "2024-01-17",
  },
];

// Combine all products for carousel
const allProducts = [
  ...mockProductsIphone,
  ...mockProductsIpad,
  ...mockProductsWatch,
  ...mockProductsAirPods,
  ...mockProductsMac,
];

export default function Home() {
  return (
    <>
      <FloatingToolbar />
      
      {/* 🎯 NEW: Modern Hero Section with 3D iPhone */}
      <ModernHeroSection />
      
      {/* 📸 ORIGINAL: Banner Carousel */}
      <HeroSection />
      
      {/* 🎬 ORIGINAL: Video Hero Section with Apple World */}
      <VideoHeroSection />
      
      {/* 🎠 NEW: Enhanced Carousel với ALL products */}
      <EnhancedFeaturedProductsCarousel products={allProducts} />
      
      {/* 📱 REDESIGNED: Product Sections cho FloatingToolbar */}
      <ModernProductSection
        id="iphone-section"
        title="iPhone"
        backgroundImage="/images/home-bg-2.png"
      />
      
      <ModernProductSection
        id="ipad-section"
        title="iPad"
        backgroundImage="/images/home-bg-2.png"
      />
      
      <ModernProductSection
        id="watch-section"
        title="Apple Watch"
        backgroundImage="/images/home-bg-2.png"
      />
      
      <ModernProductSection
        id="airpods-section"
        title="AirPods"
        backgroundImage="/images/home-bg-2.png"
      />
      
      <ModernProductSection
        id="mac-section"
        title="Mac"
        backgroundImage="/images/home-bg-2.png"
      />
      
      {/* 📊 NEW: Stats Section */}
      <StatsSection />
      
      {/* 📧 NEW: Newsletter Signup */}
      <NewsletterSection />
    </>
  );
}
