/** @format */

import React from "react";
import { Flame, Clock, Tag, Star } from "lucide-react";

// Extended hot deals for the dedicated page
const allHotDeals = [
  {
    id: 1,
    title: "iPhone 15 Pro Max 256GB",
    originalPrice: 29990000,
    salePrice: 26990000,
    discount: 10,
    image: "/images/iphone14.png",
    badge: "Giảm 3 triệu",
    rating: 4.8,
    sold: 234,
    timeLeft: "2 ngày 14 giờ",
    category: "iPhone",
  },
  {
    id: 2,
    title: "iPad Air M2 256GB WiFi",
    originalPrice: 18990000,
    salePrice: 16990000,
    discount: 11,
    image: "/images/pic1.png",
    badge: "Mới ra mắt",
    rating: 4.9,
    sold: 156,
    timeLeft: "1 ngày 8 giờ",
    category: "iPad",
  },
  {
    id: 3,
    title: "Apple Watch Series 9 45mm",
    originalPrice: 8990000,
    salePrice: 7990000,
    discount: 11,
    image: "/images/pic4.png",
    badge: "Bán chạy",
    rating: 4.7,
    sold: 189,
    timeLeft: "3 ngày 2 giờ",
    category: "Apple Watch",
  },
  {
    id: 4,
    title: 'MacBook Air M2 13" 256GB',
    originalPrice: 25990000,
    salePrice: 22990000,
    discount: 12,
    image: "/images/pic2.png",
    badge: "Siêu hot",
    rating: 4.9,
    sold: 87,
    timeLeft: "5 ngày 10 giờ",
    category: "MacBook",
  },
  {
    id: 5,
    title: "AirPods Pro 2nd Gen",
    originalPrice: 6490000,
    salePrice: 5490000,
    discount: 15,
    image: "/images/pic3.png",
    badge: "Giá sốc",
    rating: 4.8,
    sold: 312,
    timeLeft: "1 ngày 4 giờ",
    category: "AirPods",
  },
  {
    id: 6,
    title: "iPhone 14 Pro 128GB",
    originalPrice: 24990000,
    salePrice: 21990000,
    discount: 12,
    image: "/images/iphone13.png",
    badge: "Hết hàng sớm",
    rating: 4.7,
    sold: 445,
    timeLeft: "6 giờ 23 phút",
    category: "iPhone",
  },
];

export default function DealHotHomNayPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Flame className="w-8 h-8 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Deal Hot Hôm Nay
              </h1>
              <Flame className="w-8 h-8 ml-3" />
            </div>
            <p className="text-lg opacity-90">
              Chương trình khuyến mãi có thời hạn - Số lượng có hạn!
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-sm">
              <Clock className="w-4 h-4" />
              <span>Cập nhật: Hôm nay, 09:00 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allHotDeals.map((deal, index) => (
            <div
              key={deal.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slideInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image & Badge */}
              <div className="relative">
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10 animate-bounce">
                  {deal.badge}
                </div>
                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  -{deal.discount}%
                </div>
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-64 object-contain bg-gray-50"
                />
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-xs px-2 py-1 rounded flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-red-500" />
                  {deal.timeLeft}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {deal.category}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {deal.rating}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2">
                  {deal.title}
                </h3>

                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-red-600">
                    {deal.salePrice.toLocaleString()}đ
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {deal.originalPrice.toLocaleString()}đ
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Tag className="w-4 h-4 mr-1" />
                    Đã bán: {deal.sold}
                  </div>
                  <div className="text-sm text-red-600 font-medium">
                    Tiết kiệm:{" "}
                    {(deal.originalPrice - deal.salePrice).toLocaleString()}đ
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105">
                  Mua ngay - Deal có hạn
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy sản phẩm ưng ý?
          </h2>
          <p className="text-gray-600 mb-6">
            Khám phá thêm hàng ngàn sản phẩm Apple chính hãng với giá tốt nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition-colors">
              Xem tất cả iPhone
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors">
              Xem tất cả iPad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
