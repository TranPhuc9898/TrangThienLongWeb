/** @format */
"use client";
import React from "react";
import Image from "next/image";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductCarousel from "./components/ProductCarousel";
// Removed mock data imports

interface ProductSectionProps {
  id: string;
  title: string;
  backgroundImage?: string;
  className?: string;
}

const ProductSection = ({
  id,
  title,
  backgroundImage = "/images/home-bg-2.png",
  className = "",
}: ProductSectionProps) => {
  // Get products based on section type
  const getProductsForSection = () => {
    switch (id) {
      case "iphone-section":
        return [];
      case "ipad-section":
        return [];
      case "watch-section":
        return [];
      case "airpods-section":
        return [];
      case "mac-section":
        return [];
      default:
        return [];
    }
  };

  const products = getProductsForSection();

  return (
    <section
      id={id}
      className={`relative h-auto py-10 sm:py-12 flex items-center justify-center overflow-hidden animate-fadeInUp ${className}`}
      style={{
        marginTop: 20,
        marginLeft: "clamp(16px, 5vw, 100px)",
        marginRight: "clamp(16px, 5vw, 100px)",
        maxWidth: "calc(100vw - clamp(32px, 10vw, 200px))",
        animationDelay: "0.2s",
      }}
    >
      {/* Clean animated background */}
      <div
        className="absolute inset-0 -z-10 w-full h-full animate-scaleIn"
        style={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          overflow: "hidden",
          background: "white",
          border: "1px solid rgba(0,0,0,0.06)",
          animationDelay: "0.1s",
        }}
      >
        <Image
          src={backgroundImage}
          alt={`${title} background`}
          fill
          className="object-cover w-full h-full opacity-[0.06]"
          priority={id === "iphone-section"}
          style={{
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-2 sm:px-4 lg:px-12">
        <div
          className="text-center mb-8 animate-fadeInUp"
          style={{ animationDelay: "0.4s" }}
        >
          <h2
            className="text-2xl md:text-4xl font-bold mb-2 text-gray-900 animate-scaleIn"
            style={{ animationDelay: "0.5s" }}
          >
            {title}
          </h2>
          <p
            className="text-sm md:text-lg max-w-xl mx-auto px-4 mb-4 text-gray-600 animate-fadeIn"
            style={{ animationDelay: "0.6s" }}
          >
            Khám phá {title} chính hãng, giá tốt, giao nhanh. Chọn dung lượng
            phù hợp và ưu đãi hấp dẫn.
          </p>
        </div>

        {/* Grid responsive - mobile sẽ stack vertical */}
        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 animate-slideInUp"
          style={{ animationDelay: "0.7s" }}
        >
          <div
            className="lg:col-span-3 w-full animate-slideInLeft"
            style={{ animationDelay: "0.8s" }}
          >
            <FeaturedProducts products={products} />
          </div>
          <div
            className="lg:col-span-1 w-full flex flex-col gap-4 animate-slideInRight"
            style={{ animationDelay: "0.9s" }}
          >
            <ProductCarousel />
          </div>
        </div>

        <div
          className="text-center mt-6 sm:mt-8 animate-fadeInUp"
          style={{ animationDelay: "1s" }}
        >
          <button className="bg-gray-900 text-white px-5 sm:px-7 py-3 rounded-full font-semibold hover:bg-black transition-all duration-200 shadow-sm relative overflow-hidden hover:scale-105 hover:shadow-lg hover-lift">
            <span className="relative z-10">Xem ngay {title}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform -translate-x-full transition-transform duration-300 hover:translate-x-0" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
