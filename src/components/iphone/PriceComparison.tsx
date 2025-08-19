"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingDown,
  TrendingUp,
  DollarSign,
  Percent,
  Calendar,
  Award,
} from "lucide-react";
import { Product } from "@/types/product.types";

interface PriceComparisonProps {
  products: Product[];
}

// 💰 Advanced Price Comparison Component
const PriceComparison: React.FC<PriceComparisonProps> = ({ products }) => {
  const [timeRange, setTimeRange] = useState<"1month" | "3months" | "6months">(
    "3months"
  );

  // Mock price history data (trong thực tế sẽ lấy từ API)
  const priceHistory = {
    "iphone-15-pro-max": [
      { date: "2023-09", price: 34990000, label: "Ra mắt" },
      { date: "2023-12", price: 32990000, label: "Black Friday" },
      { date: "2024-01", price: 31990000, label: "Hiện tại" },
    ],
    "iphone-14-pro": [
      { date: "2022-09", price: 27990000, label: "Ra mắt" },
      { date: "2023-09", price: 24990000, label: "iPhone 15 launch" },
      { date: "2024-01", price: 22990000, label: "Hiện tại" },
    ],
  };

  const bestDeals = products
    .filter((p) => p.discount && p.discount !== "0%")
    .sort((a, b) => {
      const discountA = parseInt(a.discount?.replace(/[-%]/g, "") || "0");
      const discountB = parseInt(b.discount?.replace(/[-%]/g, "") || "0");
      return discountB - discountA;
    })
    .slice(0, 3);

  const calculateSavings = (originalPrice: number, currentPrice: number) => {
    const savings = originalPrice - currentPrice;
    const percentage = ((savings / originalPrice) * 100).toFixed(1);
    return { amount: savings, percentage };
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingDown className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Theo Dõi Giá iPhone
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            So sánh giá iPhone theo thời gian và tìm thời điểm tốt nhất để mua
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-sm">
            {[
              { id: "1month", label: "1 Tháng" },
              { id: "3months", label: "3 Tháng" },
              { id: "6months", label: "6 Tháng" },
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id as any)}
                className={`px-6 py-2 rounded-full transition-all font-medium ${
                  timeRange === range.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 📊 Price Trend Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Biểu Đồ Giá Theo Thời Gian
              </h3>

              {/* Mock Chart - In reality, use Chart.js or similar */}
              <div className="relative h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-lg p-4">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-end h-40">
                    {/* iPhone 15 Pro Max trend */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "120px" }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="w-8 bg-blue-500 rounded-t-lg mb-2"
                      />
                      <span className="text-xs text-gray-500">T9/23</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "100px" }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="w-8 bg-blue-400 rounded-t-lg mb-2"
                      />
                      <span className="text-xs text-gray-500">T12/23</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "90px" }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="w-8 bg-green-500 rounded-t-lg mb-2"
                      />
                      <span className="text-xs text-gray-500">T1/24</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="bg-white/80 backdrop-blur rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">iPhone 15 Pro Max</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Giá hiện tại</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-600">-8.5%</div>
                  <div className="text-sm text-gray-600">
                    Giảm so với lúc ra mắt
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-600">Q1 2024</div>
                  <div className="text-sm text-gray-600">
                    Thời điểm tốt nhất
                  </div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-yellow-600">
                    3M VNĐ
                  </div>
                  <div className="text-sm text-gray-600">Tiết kiệm được</div>
                </div>
              </div>
            </div>
          </div>

          {/* 🏆 Best Deals */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-gray-900">
                  Ưu Đãi Tốt Nhất
                </h3>
              </div>

              <div className="space-y-4">
                {bestDeals.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-red-200 bg-red-50 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {product.productName || product.title}
                      </h4>
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {product.discount}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-red-600">
                          {typeof product.basePrice === "bigint" ||
                          typeof product.basePrice === "number"
                            ? Number(product.basePrice).toLocaleString()
                            : "0"}
                          đ
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          {typeof product.basePrice === "bigint" ||
                          typeof product.basePrice === "number"
                            ? Math.round(
                                Number(product.basePrice) * 1.15
                              ).toLocaleString()
                            : "0"}
                          đ
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-600">
                          Tiết kiệm
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          {typeof product.basePrice === "bigint" ||
                          typeof product.basePrice === "number"
                            ? Math.round(
                                Number(product.basePrice) * 0.15
                              ).toLocaleString()
                            : "0"}
                          đ
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                      Mua Ngay
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Price Alert */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-blue-800">
                    Thông Báo Giá
                  </span>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Nhận thông báo khi iPhone bạn quan tâm giảm giá
                </p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                  Đăng Ký Thông Báo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceComparison;
