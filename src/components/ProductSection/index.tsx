/** @format */
"use client";
import React from "react";
import Image from "next/image";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductCarousel from "./components/ProductCarousel";
import { mockProductsIphone } from "../../data";

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
  return (
    <section
      id={id}
      className={`relative h-auto py-8 flex items-center justify-center overflow-hidden ${className}`}
      style={{
        marginTop: 20,
        // Responsive margins - mobile sẽ có margin nhỏ hơn
        marginLeft: "clamp(16px, 5vw, 100px)",
        marginRight: "clamp(16px, 5vw, 100px)",
        // Responsive max width
        maxWidth: "calc(100vw - clamp(32px, 10vw, 200px))",
      }}
    >
      {/* Background Image: full width, blurred, not boxed */}
      <div
        className="absolute inset-0 -z-10 w-full h-full"
        style={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          overflow: "hidden",
        }}
      >
        <Image
          src={backgroundImage}
          alt={`${title} background`}
          fill
          className="object-cover w-full h-full"
          priority={id === "iphone-section"}
          style={{
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF6B2C]/80 via-[#FF6B2C]/40 to-white/80 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-2 sm:px-4 lg:px-12">
        <div className="text-center text-white mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-2">{title}</h2>
          <p className="text-sm md:text-lg max-w-xl mx-auto px-4 mb-4">
            Khám phá bộ sưu tập {title.toLowerCase()} mới nhất với công nghệ
            tiên tiến
          </p>
        </div>

        {/* Grid responsive - mobile sẽ stack vertical */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="lg:col-span-3 w-full">
            <FeaturedProducts products={mockProductsIphone} />
          </div>
          <div className="lg:col-span-1 w-full flex flex-col gap-4">
            <ProductCarousel />
            {/* Khung ảnh old.png */}
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <button className="bg-white text-black px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base">
            Xem Ngay
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
