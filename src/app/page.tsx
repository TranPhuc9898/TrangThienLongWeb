/** @format */

"use client";

import Head from "next/head";
import { useState, useEffect, lazy, Suspense } from "react";
import dynamic from "next/dynamic";
import "@/styles/swiper-custom.css";

// Lazy load heavy components
const DynamicHeroSection = dynamic(() => import("@/components/homepage/DynamicHeroSection"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true
});

const VideoHeroSection = dynamic(() => import("@/components/homepage/VideoHeroSection"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: false // Video components usually don't need SSR
});

const EnhancedFeaturedProductsCarousel = dynamic(() => import("@/components/homepage/EnhancedFeaturedProductsCarousel"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true
});

const ModernProductSection = dynamic(() => import("@/components/homepage/ModernProductSection"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true
});

import FloatingToolbar from "../components/FloatingToolbar";
import EditButton from "@/components/admin/EditButton";

import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

// Fetch products from API in client component with caching
function getProducts() {
  return fetch(`/api/products`, {
    cache: "force-cache",
    next: { revalidate: 3600 }, // Revalidate every hour
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      return [];
    });
}

const reviewsData: Review[] = [
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

// Products will be fetched dynamically from API

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    getProducts()
      .then((products) => {
        setAllProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Đang tải sản phẩm...</div>
      </div>
    );
  }

  // Create dynamic data from real products
  const newArrivalsData: Product[] = allProducts.slice(0, 2);
  const topSellingData: Product[] = allProducts.slice(1, 3);
  const relatedProductData: Product[] = allProducts;

  // Filter products by category
  const iphoneProducts = allProducts
    .filter((p: Product) => p.category?.toLowerCase().includes("iphone"))
    .slice(0, 6); // 🎯 Giới hạn tối đa 6 sản phẩm iPhone
  const ipadProducts = allProducts.filter((p: Product) =>
    p.category?.toLowerCase().includes("ipad")
  );
  const watchProducts = allProducts.filter((p: Product) =>
    p.category?.toLowerCase().includes("watch")
  );
  const airpodsProducts = allProducts.filter((p: Product) =>
    p.category?.toLowerCase().includes("airpods")
  );
  const macProducts = allProducts.filter((p: Product) =>
    p.category?.toLowerCase().includes("mac")
  );

  // Combined all products for sections that need mixed data
  const featuredProducts = [
    ...iphoneProducts,
    ...ipadProducts,
    ...watchProducts,
    ...airpodsProducts,
    ...macProducts,
  ];
  const handleEditComponent = (componentName: string) => {
    // Open admin dashboard for component editing
    window.open(`/admin-admin/dashboard?edit=${componentName}`, "_blank");
  };

  return (
    <>
      <FloatingToolbar />
      {/* Removed duplicate Head component - SEO handled in layout.tsx and metadata export */}

      {/* Hero Sections - Unified for all devices */}
      <main role="main">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Trang Thiên Long Mobile - iPhone, iPad, MacBook, Apple Watch Chính Hãng Giá Tốt Nhất Việt Nam
        </h1>

        {/* Video Hero Section with Apple World */}
        <section aria-labelledby="hero-video">
          <div className="relative">
            <VideoHeroSection />
            <EditButton
              componentName="Video Hero"
              onEdit={() => handleEditComponent("video-hero")}
            />
          </div>
        </section>

        {/* Banner Carousel */}
        <section aria-labelledby="hero-carousel">
          <DynamicHeroSection />
        </section>
      </main>

      {/* 🎠 NEW: Enhanced Carousel với ALL products */}
      <div className="relative">
        <EnhancedFeaturedProductsCarousel products={featuredProducts} />
        <EditButton
          componentName="Featured Carousel"
          onEdit={() => handleEditComponent("featured-carousel")}
        />
      </div>

      {/* 📱 REAL DATA: Product Sections với API data theo category */}
      <ModernProductSection
        id="iphone-section"
        title="iPhone"
        products={iphoneProducts}
        backgroundImage="/images/home-bg-2.png"
      />

      <ModernProductSection
        id="ipad-section"
        title="iPad"
        products={ipadProducts}
        backgroundImage="/images/home-bg-2.png"
      />

      <ModernProductSection
        id="watch-section"
        title="Apple Watch"
        products={watchProducts}
        backgroundImage="/images/home-bg-2.png"
      />

      <ModernProductSection
        id="airpods-section"
        title="AirPods"
        products={airpodsProducts}
        backgroundImage="/images/home-bg-2.png"
      />

      <ModernProductSection
        id="mac-section"
        title="Mac"
        products={macProducts}
        backgroundImage="/images/home-bg-2.png"
      />
    </>
  );
}
