"use client";

import React, { useState } from "react";
import { Flame, Clock, Tag, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ImageSkeleton } from "@/components/ui/loading-skeleton";

// Top 4 hottest deals for homepage
const topHotDeals = [
  {
    id: 1,
    title: "iPhone 15 Pro Max 256GB",
    originalPrice: 29990000,
    salePrice: 26990000,
    discount: 10,
    image: "/images/iphone14.webp",
    badge: "Giảm 3 triệu",
    rating: 4.8,
    sold: 234,
    timeLeft: "2 ngày 14 giờ",
    category: "iPhone",
  },
  {
    id: 5,
    title: "AirPods Pro 2nd Gen",
    originalPrice: 6490000,
    salePrice: 5490000,
    discount: 15,
    image: "/images/iphone14.webp",
    badge: "Giá sốc",
    rating: 4.8,
    sold: 312,
    timeLeft: "1 ngày 4 giờ",
    category: "AirPods",
  },
  {
    id: 4,
    title: 'MacBook Air M2 13" 256GB',
    originalPrice: 25990000,
    salePrice: 22990000,
    discount: 12,
    image: "/images/iphone14.webp",
    badge: "Siêu hot",
    rating: 4.9,
    sold: 87,
    timeLeft: "5 ngày 10 giờ",
    category: "MacBook",
  },
  {
    id: 6,
    title: "iPhone 14 Pro 128GB",
    originalPrice: 24990000,
    salePrice: 21990000,
    discount: 12,
    image: "/images/iphone13.webp",
    badge: "Hết hàng sớm",
    rating: 4.7,
    sold: 445,
    timeLeft: "6 giờ 23 phút",
    category: "iPhone",
  },
];

export default function DealHotHomNaySection() {
  const [imageLoading, setImageLoading] = useState<{[key: number]: boolean}>({});
  const [imageError, setImageError] = useState<{[key: number]: boolean}>({});

  const handleImageLoad = (dealId: number) => {
    setImageLoading(prev => ({ ...prev, [dealId]: false }));
    setImageError(prev => ({ ...prev, [dealId]: false }));
  };

  const handleImageLoadStart = (dealId: number) => {
    setImageLoading(prev => ({ ...prev, [dealId]: true }));

    // 🚀 TIMEOUT AFTER 2 SECONDS - NO MORE INFINITE LOADING!
    setTimeout(() => {
      setImageLoading(prev => {
        if (prev[dealId]) {
          setImageError(prevErr => ({ ...prevErr, [dealId]: true }));
          return { ...prev, [dealId]: false };
        }
        return prev;
      });
    }, 2000);
  };

  const handleImageError = (dealId: number) => {
    setImageLoading(prev => ({ ...prev, [dealId]: false }));
    setImageError(prev => ({ ...prev, [dealId]: true }));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Flame className="w-8 h-8 mr-3 text-red-500 animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Deal Hot Hôm Nay
            </h2>
            <Flame className="w-8 h-8 ml-3 text-red-500 animate-bounce" />
          </div>
          <p className="text-lg text-gray-600 mb-4">
            Khám phá toàn bộ hệ sinh thái Apple với carousel tự động
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-red-600">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Cập nhật hôm nay • Số lượng có hạn</span>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {topHotDeals.map((deal, index) => (
            <div
              key={deal.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              style={{ 
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Image & Badges */}
              <div className="relative">
                {imageLoading[deal.id] && (
                  <ImageSkeleton className="absolute inset-0 w-full h-48 rounded-t-xl" />
                )}
                {imageError[deal.id] && (
                  <div className="absolute inset-0 w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    🖼️ Đang tải ảnh...
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 animate-pulse">
                  {deal.badge}
                </div>
                <div className="absolute top-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{deal.discount}%
                </div>
                <Image
                  src={deal.image}
                  alt={deal.title}
                  width={400}
                  height={300}
                  className={`w-full h-48 object-contain bg-gray-50 group-hover:scale-105 transition-all duration-300 ${
                    imageLoading[deal.id] || imageError[deal.id] ? 'opacity-0' : 'opacity-100'
                  }`}
                  loading="eager"
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
                  priority={true}
                  onLoadStart={() => handleImageLoadStart(deal.id)}
                  onLoad={() => handleImageLoad(deal.id)}
                  onError={() => handleImageError(deal.id)}
                />
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-xs px-2 py-1 rounded-full flex items-center shadow-md">
                  <Clock className="w-3 h-3 mr-1 text-red-500" />
                  <span className="font-medium text-red-600">{deal.timeLeft}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                    {deal.category}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1 font-medium">
                      {deal.rating}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-sm text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {deal.title}
                </h3>

                <div className="flex flex-col space-y-1 mb-3">
                  <span className="text-lg font-bold text-red-600">
                    {deal.salePrice.toLocaleString()}đ
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {deal.originalPrice.toLocaleString()}đ
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-xs text-gray-600">
                    <Tag className="w-3 h-3 mr-1" />
                    <span>Đã bán: {deal.sold}</span>
                  </div>
                  <div className="text-xs text-red-600 font-medium">
                    Tiết kiệm: {(deal.originalPrice - deal.salePrice).toLocaleString()}đ
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 active:scale-95">
                  Mua ngay
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link 
            href="/deal-hot-hom-nay"
            className="inline-flex items-center bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            <Flame className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Xem tất cả Deal Hot
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Cập nhật mỗi ngày • Số lượng có hạn • Giá sốc chỉ hôm nay
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}