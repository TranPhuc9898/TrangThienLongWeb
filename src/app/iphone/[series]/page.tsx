"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Eye,
  Heart,
  ShoppingCart,
  Filter,
  Grid3X3,
  List,
  ArrowLeft,
  Sparkles,
  Shield,
  Truck,
  CreditCard,
  Award,
} from "lucide-react";

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

// Series mapping để convert URL slug thành search term
const seriesMapping: Record<string, string> = {
  "iphone-17-pro-max-series": "iPhone 17 Pro Max",
  "iphone-17-pro-series": "iPhone 17 Pro",
  "iphone-16-pro-max-series": "iPhone 16 Pro Max",
  "iphone-16-pro-series": "iPhone 16 Pro",
  "iphone-16-series": "iPhone 16",
  "iphone-15-pro-max-series": "iPhone 15 Pro Max",
  "iphone-15-pro-series": "iPhone 15 Pro",
  "iphone-15-series": "iPhone 15",
  "iphone-14-pro-max-series": "iPhone 14 Pro Max",
  "iphone-14-series": "iPhone 14",
  "iphone-13-series": "iPhone 13",
};

export default function SeriesPage({ params }: SeriesPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("newest");

  const seriesName = seriesMapping[params.series];

  if (!seriesName) {
    notFound();
  }

  // Fetch products theo series
  useEffect(() => {
    const fetchSeriesProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        // ✅ Filter by tag field (ACCURATE)
        const filteredProducts = data.filter((p: Product) => {
          const tag = p.tag || "";
          const category = p.category || "";
          const productName = p.productName || p.title || "";

          return (
            category.toLowerCase().includes("iphone") &&
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

  // Sort products
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải {seriesName}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/iphone">iPhone</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{seriesName} Series</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
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
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Chính hãng 100%
              </div>
              <div className="flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Giao hàng nhanh 2H
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Bảo hành chính hãng
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="bg-white border-b border-gray-200 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/iphone"
                className="flex items-center text-gray-600 hover:text-gray-900 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Trở lại iPhone
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
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-low">Giá thấp → cao</option>
                <option value="price-high">Giá cao → thấp</option>
                <option value="rating">Đánh giá cao</option>
              </select>

              {/* View Mode */}
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

      {/* Products Grid/List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {sortedProducts.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-6"
                }
              >
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
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
                href="/iphone"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Xem tất cả iPhone
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn {seriesName} Tại Trang Thiên Long?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Chính Hãng 100%",
                description: `Tất cả ${seriesName} đều chính hãng VN/A`,
              },
              {
                icon: Shield,
                title: "Bảo Hành 12 Tháng",
                description: "Bảo hành chính hãng Apple Việt Nam",
              },
              {
                icon: Truck,
                title: "Giao Hàng Nhanh",
                description: "Giao hàng trong 2 giờ tại TP.HCM",
              },
              {
                icon: CreditCard,
                title: "Trả Góp 0%",
                description: "Hỗ trợ trả góp 0% qua thẻ tín dụng",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Product Card Component
const ProductCard: React.FC<{
  product: Product;
  viewMode: "grid" | "list";
}> = ({ product, viewMode }) => {
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

  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6"
      >
        <div className="flex gap-6">
          <div className="relative w-32 h-32 flex-shrink-0">
            <Image
              src={product.thumbnail || "/images/iphone14.png"}
              alt={product.productName || "iPhone"}
              fill
              className="object-contain rounded-lg"
            />
            {hasDiscount && (
              <div className="absolute -top-2 -left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{discountPercent}%
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {product.productName || product.title}
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              {product.condition} • {product.brand}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-blue-600">
                {finalPrice.toLocaleString("vi-VN")}đ
              </span>
              {hasDiscount && (
                <span className="text-lg text-gray-500 line-through">
                  {basePrice.toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating || 4.5)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  ({product.reviewCount || 0})
                </span>
              </div>

              <div className="flex gap-2">
                <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <Link
                  href={`/${product.slug}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

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
            src={product.thumbnail || "/images/iphone14.png"}
            alt={product.productName || "iPhone"}
            fill
            className={`object-contain transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/5 flex items-center justify-center"
        >
          <div className="flex gap-2">
            <button className="bg-white px-3 py-2 rounded-full text-xs font-medium shadow-lg hover:bg-gray-50 transition-colors">
              <Eye className="w-3 h-3 inline mr-1" />
              Xem nhanh
            </button>
            <button className="bg-white px-3 py-2 rounded-full text-xs font-medium shadow-lg hover:bg-gray-50 transition-colors">
              <ShoppingCart className="w-3 h-3 inline mr-1" />
              Thêm vào giỏ
            </button>
          </div>
        </motion.div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
          {product.productName || product.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {product.condition} • {product.brand}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-blue-600">
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block text-sm"
        >
          Xem chi tiết
        </Link>
      </div>
    </motion.div>
  );
};
