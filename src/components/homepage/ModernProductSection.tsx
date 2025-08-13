"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import FeaturedProducts from "@/components/ProductSection/components/FeaturedProducts";
import ProductCarousel from "@/components/ProductSection/components/ProductCarousel";
import {
  mockProductsIphone,
  mockProductsIpad,
  mockProductsWatch,
  mockProductsAirPods,
  mockProductsMac,
} from "@/data";

interface ModernProductSectionProps {
  id: string;
  title: string;
  backgroundImage?: string;
  className?: string;
}

const ModernProductSection = ({
  id,
  title,
  backgroundImage = "/images/home-bg-2.png",
  className = "",
}: ModernProductSectionProps) => {
  // Get products based on section type
  const getProductsForSection = () => {
    switch (id) {
      case "iphone-section":
        return mockProductsIphone;
      case "ipad-section":
        return mockProductsIpad;
      case "watch-section":
        return mockProductsWatch;
      case "airpods-section":
        return mockProductsAirPods;
      case "mac-section":
        return mockProductsMac;
      default:
        return mockProductsIphone;
    }
  };

  const products = getProductsForSection();

  // Dynamic colors based on section
  const getSectionTheme = () => {
    switch (id) {
      case "iphone-section":
        return {
          gradient: "from-blue-600 to-purple-600",
          bgGradient: "from-blue-50 to-purple-50",
          accentColor: "blue-600"
        };
      case "ipad-section":
        return {
          gradient: "from-purple-600 to-pink-600",
          bgGradient: "from-purple-50 to-pink-50",
          accentColor: "purple-600"
        };
      case "watch-section":
        return {
          gradient: "from-green-600 to-teal-600",
          bgGradient: "from-green-50 to-teal-50",
          accentColor: "green-600"
        };
      case "airpods-section":
        return {
          gradient: "from-orange-600 to-red-600",
          bgGradient: "from-orange-50 to-red-50",
          accentColor: "orange-600"
        };
      case "mac-section":
        return {
          gradient: "from-gray-700 to-gray-900",
          bgGradient: "from-gray-50 to-gray-100",
          accentColor: "gray-700"
        };
      default:
        return {
          gradient: "from-blue-600 to-purple-600",
          bgGradient: "from-blue-50 to-purple-50",
          accentColor: "blue-600"
        };
    }
  };

  const theme = getSectionTheme();

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`relative py-20 overflow-hidden ${className}`}
    >
      {/* Modern Background với Glassmorphism */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient} opacity-60`} />
        <Image
          src={backgroundImage}
          alt={`${title} background`}
          fill
          className="object-cover opacity-5"
          priority={id === "iphone-section"}
        />
        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-gray-700 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Danh mục sản phẩm
          </motion.div>

          {/* Title với Gradient Text */}
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>
            {title}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Khám phá {title} chính hãng với công nghệ tiên tiến nhất. 
            Thiết kế đột phá, hiệu năng vượt trội, giá cả cạnh tranh.
          </p>
        </motion.div>

        {/* Modern Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* Main Products - Glassmorphism Card */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
              <FeaturedProducts products={products} />
            </div>
          </div>

          {/* Side Carousel - Glassmorphism Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 h-full">
              <ProductCarousel />
            </div>
          </div>
        </motion.div>

        {/* Modern CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href={`/${title.toLowerCase()}`}
            className={`group inline-flex items-center px-8 py-4 bg-gradient-to-r ${theme.gradient} text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300`}
          >
            <span className="relative z-10">Xem tất cả {title}</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Floating Elements for visual appeal */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute top-20 right-20 w-20 h-20 bg-gradient-to-r ${theme.gradient} rounded-full opacity-10 blur-xl`}
      />
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className={`absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r ${theme.gradient} rounded-full opacity-5 blur-2xl`}
      />
    </motion.section>
  );
};

export default ModernProductSection;
