/** @format */

"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import "@/styles/swiper-custom.css";
import ModernHeroSection from "@/components/homepage/ModernHeroSection";
import DynamicHeroSection from "@/components/homepage/DynamicHeroSection";
import VideoHeroSection from "@/components/homepage/VideoHeroSection";
import DealHotHomNaySection from "@/components/homepage/DealHotHomNaySection";
import ModernProductSection from "@/components/homepage/ModernProductSection";

import FloatingToolbar from "../components/FloatingToolbar";
import EditButton from "@/components/admin/EditButton";
import { 
  WebsiteSchema, 
  ProductCollectionSchema,
  FAQSchema 
} from "@/components/seo/SEOComponents";

import { Product } from "@/types/product.types";

// Fetch products from API in client component
function getProducts() {
  return fetch(`/api/products`, {
    cache: "no-store",
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

// FAQ Data for SEO
const faqData = [
  {
    question: "iPhone 15 Pro Max 256GB giá bao nhiều?",
    answer: "iPhone 15 Pro Max 256GB tại TrangMobile.com có giá từ 29.990.000đ, hỗ trợ trả góp 0% lãi suất.",
  },
  {
    question: "Có bảo hành chính hãng không?",
    answer: "Tất cả sản phẩm iPhone, iPad tại TrangMobile.com đều được bảo hành chính hãng 12 tháng toàn quốc.",
  },
  {
    question: "Giao hàng trong bao lâu?",
    answer: "TrangMobile.com giao hàng trong 2h tại TP.HCM, miễn phí ship toàn quốc cho đơn hàng trên 500k.",
  },
  {
    question: "Có hỗ trợ trả góp 0% không?",
    answer: "Có, TrangMobile.com hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng và các công ty tài chính uy tín.",
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

  // Get featured products for SEO schema
  const featuredProducts = [
    ...iphoneProducts,
    ...ipadProducts,
    ...watchProducts,
    ...airpodsProducts,
    ...macProducts,
  ].slice(0, 10);
  const handleEditComponent = (componentName: string) => {
    // Open admin dashboard for component editing
    window.open(`/admin-admin/dashboard?edit=${componentName}`, "_blank");
  };

  return (
    <>
      {/* 🎯 PERFECT SEO STRUCTURED DATA */}
      <WebsiteSchema />
      <FAQSchema faqs={faqData} />
      {featuredProducts.length > 0 && (
        <ProductCollectionSchema products={featuredProducts} />
      )}

      <FloatingToolbar />
      {/* Removed duplicate Head component - SEO handled in layout.tsx and metadata export */}

      {/* MOBILE: Apple Thế Giới section first */}
      <div className="block lg:hidden">
        {/* 🎬 MOBILE: Video Hero Section with Apple World - Show first on mobile */}
        <div className="relative">
          <VideoHeroSection />
          <EditButton
            componentName="Video Hero"
            onEdit={() => handleEditComponent("video-hero")}
          />
        </div>

        {/* 📸 MOBILE: Banner Carousel */}
        <DynamicHeroSection />
      </div>

      {/* DESKTOP: Original order */}
      <div className="hidden lg:block">
        {/* 🎯 DESKTOP: Modern Hero Section with 3D iPhone */}
        <div className="relative">
          <ModernHeroSection />
          <EditButton
            componentName="Modern Hero"
            onEdit={() => handleEditComponent("modern-hero")}
          />
        </div>

        {/* 📸 DESKTOP: Banner Carousel */}
        <DynamicHeroSection />

        {/* 🎬 DESKTOP: Video Hero Section with Apple World */}
        <div className="relative">
          <VideoHeroSection />
          <EditButton
            componentName="Video Hero"
            onEdit={() => handleEditComponent("video-hero")}
          />
        </div>
      </div>

      {/* 🔥 NEW: Deal Hot Hôm Nay Section */}
      <div className="relative">
        <DealHotHomNaySection />
        <EditButton
          componentName="Deal Hot Hôm Nay"
          onEdit={() => handleEditComponent("deal-hot-hom-nay")}
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
