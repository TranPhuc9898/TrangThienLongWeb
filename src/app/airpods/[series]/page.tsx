"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Eye, Heart, Grid3X3, List, ArrowLeft } from "lucide-react";

import { Product } from "@/types/product.types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface SeriesPageProps {
  params: { series: string };
}

const seriesMapping: Record<string, string> = {
  "airpods-pro-2-series": "AirPods Pro 2",
  "airpods-4-series": "AirPods 4",
  "airpods-3-series": "AirPods 3",
  "airpods-max-series": "AirPods Max",
};

export default function AirPodsSeriesPage({ params }: SeriesPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("newest");

  const seriesName = seriesMapping[params.series];

  if (!seriesName) {
    notFound();
  }

  useEffect(() => {
    const fetchSeriesProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        const filteredProducts = data.filter((p: Product) => {
          const tag = p.tag || "";
          const category = p.category || "";
          const productName = p.productName || p.title || "";

          return (
            category.toLowerCase().includes("airpods") &&
            (tag === seriesName ||
              tag.toLowerCase().includes(seriesName.toLowerCase()) ||
              productName.toLowerCase().includes(seriesName.toLowerCase()))
          );
        });

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching series products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesProducts();
  }, [seriesName]);

  const sortedProducts = React.useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case "price-low":
        return sorted.sort(
          (a, b) => Number(a.basePrice || 0) - Number(b.basePrice || 0)
        );
      case "price-high":
        return sorted.sort(
          (a, b) => Number(b.basePrice || 0) - Number(a.basePrice || 0)
        );
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "newest":
      default:
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
        );
    }
  }, [products, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải {seriesName}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/airpods">AirPods</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{seriesName} Series</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {seriesName} Series
            </h1>
            <p className="text-xl mb-6 opacity-90">
              Khám phá toàn bộ dòng {seriesName} với đầy đủ các biến thể
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/airpods"
                className="flex items-center text-gray-600 hover:text-gray-900 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Trở lại AirPods
              </Link>

              <span className="text-gray-400">|</span>

              <p className="text-gray-600">
                Tìm thấy{" "}
                <span className="font-semibold text-gray-900">
                  {sortedProducts.length}
                </span>{" "}
                sản phẩm
              </p>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-low">Giá thấp → cao</option>
                <option value="price-high">Giá cao → thấp</option>
                <option value="rating">Đánh giá cao</option>
              </select>

              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {sortedProducts.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-6"
              }
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Eye className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Chưa có sản phẩm {seriesName}
              </h3>
              <p className="text-gray-500 mb-6">
                Series này sẽ sớm có mặt tại Trang Thiên Long
              </p>
              <Link
                href="/airpods"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Xem tất cả AirPods
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const parsePrice = (price: any): number => {
    if (typeof price === "number") return price;
    if (typeof price === "bigint") return Number(price);
    const digits = String(price || "").replace(/\D/g, "");
    return digits ? Number(digits) : 0;
  };

  const getDiscountPercent = (discount: any): number => {
    const match = String(discount || "").match(/-?(\d+)\s*%/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const basePrice = parsePrice(product.basePrice);
  const discountPercent = getDiscountPercent(product.discount);
  const finalPrice =
    discountPercent > 0
      ? Math.round(basePrice * (1 - discountPercent / 100))
      : basePrice;
  const hasDiscount = discountPercent > 0;

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
            -{discountPercent}%
          </div>
        )}

        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors z-10">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>

        <div className="relative w-full h-full">
          <Image
            src={product.thumbnail || "/icons/airpods.svg"}
            alt={product.productName || "AirPods"}
            fill
            className={`object-contain transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
          {product.productName || product.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {product.condition} • {product.brand}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-indigo-600">
            {finalPrice.toLocaleString("vi-VN")}đ
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {basePrice.toLocaleString("vi-VN")}đ
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(product.rating || 4.5)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">
            ({product.reviewCount || 0})
          </span>
        </div>

        <Link
          href={`/${product.slug}`}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-center block text-sm"
        >
          Xem chi tiết
        </Link>
      </div>
    </motion.div>
  );
};
