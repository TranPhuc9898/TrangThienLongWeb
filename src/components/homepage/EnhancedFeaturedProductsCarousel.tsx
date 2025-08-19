"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/types/product.types";

interface EnhancedFeaturedProductsCarouselProps {
  products: Product[];
}

const EnhancedFeaturedProductsCarousel: React.FC<
  EnhancedFeaturedProductsCarouselProps
> = ({ products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll mượt và rõ ràng
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let isPaused = false;
    const scrollSpeed = 1.5; // Tăng tốc độ lên để thấy rõ hơn

    const autoScroll = () => {
      if (isPaused) return;

      const currentScroll = scrollContainer.scrollLeft;
      const maxScroll =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const cardWidth = 320 + 24; // 320px card width + 24px gap

      if (currentScroll >= maxScroll * 0.6) {
        // Reset về đầu khi scroll đến 60%
        scrollContainer.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        // Scroll từ từ
        scrollContainer.scrollTo({
          left: currentScroll + scrollSpeed,
          behavior: "auto",
        });
      }
    };

    // Pause khi hover
    const handleMouseEnter = () => {
      isPaused = true;
    };
    const handleMouseLeave = () => {
      isPaused = false;
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    const interval = setInterval(autoScroll, 30); // Chạy mượt hơn

    return () => {
      clearInterval(interval);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Triple products for infinite effect
  const infiniteProducts = [...products, ...products, ...products];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Sản Phẩm
            </span>{" "}
            Nổi Bật
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá toàn bộ hệ sinh thái Apple với carousel tự động
          </p>
        </motion.div>

        {/* Infinite Carousel Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {infiniteProducts.map((product, index) => (
              <motion.div
                key={`${product.id}-${index}`}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group flex-shrink-0 w-80"
              >
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                  {/* Product Image với hover effects */}
                  <div className="relative aspect-square p-6 bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-500">
                    <Image
                      src={product.thumbnail || "/images/iphone14.png"}
                      alt={
                        product.productName || product.title || "Product Image"
                      }
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-50 transition-colors"
                      >
                        <Eye className="w-5 h-5 text-gray-700" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-50 transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5 text-gray-700" />
                      </motion.button>
                    </div>

                    {/* Discount Badge */}
                    {product.discount &&
                      ((() => {
                        const match = String(product.discount || "").match(
                          /-?(\d+)\s*%/
                        );
                        return match ? parseInt(match[1], 10) : 0;
                      })() > 0 ||
                        0 > 0) && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {(() => {
                            const match = String(product.discount || "").match(
                              /-?(\d+)\s*%/
                            );
                            return match ? parseInt(match[1], 10) : 0;
                          })() > 0
                            ? `-${(() => {
                                const match = String(
                                  product.discount || ""
                                ).match(/-?(\d+)\s*%/);
                                return match ? parseInt(match[1], 10) : 0;
                              })()}%`
                            : `-${0}đ`}
                        </div>
                      )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {product.brand || "Apple"}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-600">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.productName ||
                        product.productName ||
                        product.title}
                    </h3>

                    {product.condition && (
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mb-2">
                        {product.condition}
                      </span>
                    )}

                    <div className="flex items-center gap-2 mb-4">
                      {product.discount ? (
                        <>
                          <span className="text-2xl font-bold text-red-600">
                            {(() => {
                              const basePrice = Number(
                                product.basePrice || product.price
                              );
                              const discountMatch =
                                product.discount.match(/-(\d+)%/);
                              const discountPercent = discountMatch
                                ? parseInt(discountMatch[1])
                                : 0;
                              const discountedPrice =
                                basePrice - (basePrice * discountPercent) / 100;
                              return Math.round(
                                discountedPrice
                              ).toLocaleString();
                            })()}
                            đ
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            {Number(
                              product.basePrice || product.price
                            ).toLocaleString()}
                            đ
                          </span>
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                            {product.discount}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-gray-900">
                          {Number(
                            product.basePrice || product.price
                          ).toLocaleString()}
                          đ
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/${product.slug}`}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Mua Ngay
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default EnhancedFeaturedProductsCarousel;
