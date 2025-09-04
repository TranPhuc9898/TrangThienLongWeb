/** @format */

"use client";

import Head from "next/head";
import { useState, useEffect, lazy, Suspense } from "react";
import dynamic from "next/dynamic";
import "@/styles/swiper-custom.css";

// Critical above-fold components load immediately
const DynamicHeroSection = dynamic(() => import("@/components/homepage/DynamicHeroSection"), {
  loading: () => <div className="w-full h-[300px] bg-gray-100" style={{height: '300px', width: '100%'}} />,
  ssr: true
});

// Video loads later to not block LCP
const VideoHeroSection = dynamic(() => import("@/components/homepage/VideoHeroSection"), {
  loading: () => <div className="w-full h-[300px] bg-gray-900" style={{height: '300px', width: '100%'}} />,
  ssr: false
});

// Below-fold components can load lazily
const EnhancedFeaturedProductsCarousel = dynamic(() => import("@/components/homepage/EnhancedFeaturedProductsCarousel"), {
  loading: () => <div className="w-full h-[200px] bg-gray-50" style={{height: '200px', width: '100%'}} />,
  ssr: false
});

const ModernProductSection = dynamic(() => import("@/components/homepage/ModernProductSection"), {
  loading: () => <div className="w-full h-[400px] bg-gray-50" style={{height: '400px', width: '100%'}} />,
  ssr: false
});

import FloatingToolbar from "../components/FloatingToolbar";
import EditButton from "@/components/admin/EditButton";

import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

// Lightweight placeholder data to prevent layout shift
const mockProducts: Product[] = [
  {
    id: "1",
    productName: "iPhone 15 Pro",
    brand: "Apple",
    basePrice: 28990000,
    thumbnail: "/images/iphone/iphone15pro.jpg",
    category: "iPhone",
    slug: "iphone-15-pro",
    rating: 5,
    reviewCount: 128,
    inStock: true
  },
  {
    id: "2", 
    productName: "iPad Air",
    brand: "Apple",
    basePrice: 15990000,
    thumbnail: "/images/ipad/ipadair.jpg",
    category: "iPad",
    slug: "ipad-air",
    rating: 5,
    reviewCount: 95,
    inStock: true
  },
  {
    id: "3",
    productName: "Apple Watch Series 9", 
    brand: "Apple",
    basePrice: 9990000,
    thumbnail: "/images/watch/watch9.jpg",
    category: "Apple Watch",
    slug: "apple-watch-series-9",
    rating: 5,
    reviewCount: 67,
    inStock: true
  }
];

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(false);

  // Load products after initial render to avoid blocking LCP
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const products = await response.json();
          setAllProducts(products.length > 0 ? products : mockProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Keep using mock data if API fails
      }
    };

    // Load products after page is rendered
    const timer = setTimeout(loadProducts, 100);
    return () => clearTimeout(timer);
  }, []);

  // Filter products by category - using current data
  const iphoneProducts = allProducts
    .filter((p: Product) => p.category?.toLowerCase().includes("iphone"))
    .slice(0, 4); // Reduced to 4 for performance
  const ipadProducts = allProducts
    .filter((p: Product) => p.category?.toLowerCase().includes("ipad"))
    .slice(0, 4);
  const watchProducts = allProducts
    .filter((p: Product) => p.category?.toLowerCase().includes("watch"))
    .slice(0, 4);
  const airpodsProducts = allProducts
    .filter((p: Product) => p.category?.toLowerCase().includes("airpods"))
    .slice(0, 4);
  const macProducts = allProducts
    .filter((p: Product) => p.category?.toLowerCase().includes("mac"))
    .slice(0, 4);

  // Reduced featured products for faster initial load
  const featuredProducts = [
    ...iphoneProducts.slice(0, 2),
    ...ipadProducts.slice(0, 2),
    ...watchProducts.slice(0, 2)
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
