/** @format */

"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import "@/styles/swiper-custom.css";
import ModernHeroSection from "@/components/homepage/ModernHeroSection";
import DynamicHeroSection from "@/components/homepage/DynamicHeroSection";
import VideoHeroSection from "@/components/homepage/VideoHeroSection";
import EnhancedFeaturedProductsCarousel from "@/components/homepage/EnhancedFeaturedProductsCarousel";
import ModernProductSection from "@/components/homepage/ModernProductSection";

import FloatingToolbar from "../components/FloatingToolbar";
import EditButton from "@/components/admin/EditButton";

import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

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
      {/* SEO Metadata */}
      <Head>
        <title>
          Trang Thiên Long Mobile - iPhone, iPad, MacBook Chính Hãng Giá Tốt
          Nhất
        </title>
        <meta
          name="description"
          content="⭐ Cửa hàng Apple uy tín hàng đầu Việt Nam ⭐ iPhone 15, iPad, MacBook, Apple Watch chính hãng ⭐ Giá tốt nhất ⭐ Bảo hành 12 tháng ⭐ Trả góp 0% ⭐ Giao hàng toàn quốc"
        />
        <meta
          name="keywords"
          content="iphone giá rẻ, ipad chính hãng, apple watch vietnam, airpods pro, macbook air m2, điện thoại cũ like new, trang thiên long mobile"
        />
        <meta
          property="og:title"
          content="Trang Thiên Long Mobile - Chuyên Apple Products"
        />
        <meta
          property="og:description"
          content="Điện thoại iPhone, iPad, Apple Watch chính hãng với giá cạnh tranh nhất thị trường. Bảo hành 12 tháng, trả góp 0%, giao hàng tận nơi."
        />
        <meta property="og:url" content="https://thientranglong.vn" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Trang Thiên Long Mobile" />
        <meta property="og:image" content="/images/ttl.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Trang Thiên Long Mobile" />
        <meta
          name="twitter:description"
          content="Apple Products chính hãng giá tốt nhất Việt Nam"
        />
        <meta name="twitter:image" content="/images/ttl.png" />
        <link rel="canonical" href="https://thientranglong.vn" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="VN" />
        <meta name="geo.placename" content="Ho Chi Minh City" />
        <meta name="geo.position" content="10.762622,106.660172" />
      </Head>

      {/* <FloatingToolbar /> */}

      {/* 🎯 NEW: Modern Hero Section with 3D iPhone */}
      <div className="relative">
        <ModernHeroSection />
        <EditButton
          componentName="Modern Hero"
          onEdit={() => handleEditComponent("modern-hero")}
        />
      </div>

      {/* 📸 DYNAMIC: Banner Carousel với Edit Mode */}
      <DynamicHeroSection />

      {/* 🎬 ORIGINAL: Video Hero Section with Apple World */}
      <div className="relative">
        <VideoHeroSection />
        <EditButton
          componentName="Video Hero"
          onEdit={() => handleEditComponent("video-hero")}
        />
      </div>

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
