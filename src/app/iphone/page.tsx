"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Eye,
  Heart,
  GitFork,
  Filter,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Shield,
  Truck,
  CreditCard,
  Award,
} from "lucide-react";

import { Product } from "@/types/product.types";
import PriceComparison from "@/components/iphone/PriceComparison";
import AdvancedFilters from "@/components/iphone/AdvancedFilters";
import { ProductCollectionSchema } from "@/components/seo/SEOComponents";
// SEO enhanced with Product Collection Schema

// 🎯 iPhone Page - Professional UI/UX Design
export default function iPhonePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeries, setSelectedSeries] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "comparison">("grid");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch products with pagination
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const searchParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: isMobile ? '8' : '12', // Mobile: 8, Desktop: 12
          category: 'iPhone' // Filter iPhone products (uppercase to match database)
        });

        const response = await fetch(`/api/products?${searchParams}`);
        const data = await response.json();

        if (data.products) {
          setAllProducts(data.products);
          setFilteredProducts(data.products);
          setPagination(data.pagination);
        } else {
          setAllProducts([]);
          setFilteredProducts([]);
          setPagination(null);
        }
      } catch (error) {
        console.error("Error fetching iPhone products:", error);
        setAllProducts([]);
        setFilteredProducts([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, isMobile]);

  // Determine iPhone series from a product name
  function extractSeriesFromName(name: string): string {
    const lower = name.toLowerCase();
    if (lower.includes("iphone 15")) return "iPhone 15 Series";
    if (lower.includes("iphone 14")) return "iPhone 14 Series";
    if (lower.includes("iphone 13")) return "iPhone 13 Series";
    return "Other iPhone Models";
  }

  // Group products by series (iPhone 15, iPhone 14, etc.)
  const groupedProducts = React.useMemo(() => {
    const groups: Record<string, Product[]> = {};

    filteredProducts.forEach((product) => {
      const series = extractSeriesFromName(
        product.productName || product.title || ""
      );
      if (!groups[series]) groups[series] = [];
      groups[series].push(product);
    });

    return groups;
  }, [filteredProducts]);

  const seriesOptions = [
    {
      id: "all",
      name: "Tất Cả iPhone",
      count: pagination ? pagination.totalCount : filteredProducts.length
    },
    ...Object.entries(groupedProducts).map(([series, products]) => ({
      id: series.toLowerCase().replace(/\s+/g, "-"),
      name: series,
      count: products.length,
    })),
  ];

  const displayedProducts =
    selectedSeries === "all"
      ? filteredProducts
      : groupedProducts[
          seriesOptions.find((s) => s.id === selectedSeries)?.name || ""
        ] || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải iPhone...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Product Collection Schema for SEO */}
      <ProductCollectionSchema products={allProducts} />

      {/* 🎬 Hero Section - Compact banner only */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/iphone/iPhone.png"
          alt="iPhone Chính Hãng - iPhone 15, iPhone 14 Pro Max | Trang Thiên Long"
          fill
          priority
          className="object-cover"
        />
        <div className="relative h-[360px] sm:h-[440px] lg:h-[520px]" />
      </section>

      {/* 🏷️ Series Selection Tabs */}
      <section className="py-12 bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Chọn Dòng iPhone
              </h2>
              <p className="text-gray-600">Tìm iPhone phù hợp nhất với bạn</p>
            </div>

            <div className="flex items-center gap-4">
              <AdvancedFilters
                products={allProducts}
                onFilterChange={setFilteredProducts}
              />
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  Lưới
                </button>
                <button
                  onClick={() => setViewMode("comparison")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === "comparison"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  So Sánh
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {seriesOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedSeries(option.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                  selectedSeries === option.id
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.name}
                <span className="ml-2 opacity-75">({option.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 📱 Products Grid */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSeries}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      priority={index < (isMobile ? 2 : 4)} // Priority loading cho 2-4 ảnh đầu
                    />
                  ))}
                </div>
              ) : (
                <ComparisonTable products={displayedProducts} />
              )}
            </motion.div>
          </AnimatePresence>

          {displayedProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Eye className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Không tìm thấy sản phẩm
              </h3>
              <p className="text-gray-500">
                Vui lòng chọn dòng iPhone khác hoặc liên hệ với chúng tôi.
              </p>
            </div>
          )}


          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={!pagination.hasPrevPage}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  pagination.hasPrevPage
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Trang trước
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.currentPage >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-12 h-12 rounded-lg font-medium transition-colors ${
                        pageNum === pagination.currentPage
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={!pagination.hasNextPage}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  pagination.hasNextPage
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Trang sau
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 🎯 Why Choose iPhone Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn iPhone Tại Trang Thiên Long?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cam kết chất lượng, dịch vụ tốt nhất và giá cả cạnh tranh nhất thị
              trường
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Chính Hãng 100%",
                description:
                  "Tất cả iPhone đều chính hãng, có đầy đủ giấy tờ bảo hành",
              },
              {
                icon: Shield,
                title: "Bảo Hành Tận Nơi",
                description: "Bảo hành 12 tháng chính hãng, hỗ trợ tận nơi",
              },
              {
                icon: Truck,
                title: "Giao Hàng Nhanh",
                description: "Giao hàng trong 2 giờ tại TP.HCM, toàn quốc 24h",
              },
              {
                icon: CreditCard,
                title: "Trả Góp 0%",
                description: "Hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <feature.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 💰 Price Comparison & Tracking */}
      <PriceComparison products={allProducts} />
    </div>
  );
}

// 🎴 Modern Product Card Component
const ProductCard: React.FC<{ product: Product; priority?: boolean }> = ({ product, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const storageOptions = product.variants?.map((v) => v.storage) || [];
  const uniqueStorages = Array.from(new Set(storageOptions));

  const pickBasePriceRaw = selectedStorage
    ? product.variants?.find((v) => v.storage === selectedStorage)?.price
    : (product.basePrice as any) ?? (product.price as any);

  const parseNumber = (val: any): number => {
    const digits = String(val ?? "").replace(/\D/g, "");
    return digits ? Number(digits) : 0;
  };

  const getPercent = (discount: any): number => {
    const match = String(discount ?? "").match(/-?(\d+)\s*%/);
    const p = match ? parseInt(match[1], 10) : 0;
    return Number.isFinite(p) && p > 0 ? p : 0;
  };

  const basePrice = parseNumber(pickBasePriceRaw);
  const percent = getPercent(product.discount);
  const finalPrice =
    percent > 0 ? Math.round(basePrice * (1 - percent / 100)) : basePrice;
  const hasDiscount = percent > 0;

  // Intersection Observer for lazy loading
  React.useEffect(() => {
    // Priority images load immediately
    if (priority) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Start loading 100px before visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <motion.div
      ref={cardRef}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
            -{percent}%
          </div>
        )}

        <div className="absolute top-4 right-4 z-10">
          <button className="p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="relative w-full h-full">
          {!isVisible ? (
            // Skeleton placeholder
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg">
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-400 text-sm">Loading...</div>
              </div>
            </div>
          ) : (
            <Image
              src={product.thumbnail || "/images/iphone14.png"}
              alt={product.productName || product.title || "iPhone"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className={`object-contain transition-all duration-300 ${
                isHovered ? "scale-110" : "scale-100"
              } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              loading="lazy"
              quality={85}
              onLoad={() => setImageLoaded(true)}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlmYTJhNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+Cjwvc3ZnPg=="
            />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/5 flex items-center justify-center"
        >
          <div className="flex gap-2">
            <button className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-gray-50 transition-colors">
              <Eye className="w-4 h-4 inline mr-2" />
              Xem Nhanh
            </button>
            <button className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-gray-50 transition-colors">
              <GitFork className="w-4 h-4 inline mr-2" />
              So Sánh
            </button>
          </div>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
            {product.productName || product.title || "iPhone"}
          </h3>
          <p className="text-sm text-gray-500">
            {product.condition || "99%"} • {product.brand}
          </p>
        </div>

        {/* Storage Selection */}
        {uniqueStorages.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Dung lượng:</p>
            <div className="flex flex-wrap gap-2">
              {uniqueStorages.map((storage) => (
                <button
                  key={storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    selectedStorage === storage
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-indigo-600">
              {finalPrice.toLocaleString("vi-VN")}đ
            </span>
            {hasDiscount && basePrice > 0 && (
              <span className="text-lg text-gray-500 line-through">
                {basePrice.toLocaleString("vi-VN")}đ
              </span>
            )}
          </div>
        </div>

        {/* Promotions */}
        {product.promotionGeneral && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              🎁 {product.promotionGeneral}
            </p>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
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
          </div>
          <span className="text-sm text-gray-600">
            ({product.reviewCount || 0} đánh giá)
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Link
            href={`/${product.slug}`}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors text-center block"
          >
            Xem Chi Tiết
          </Link>
          <button className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-xl font-medium hover:bg-indigo-50 transition-colors">
            Thêm Vào Giỏ
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// 📊 Comparison Table Component
const ComparisonTable: React.FC<{ products: Product[] }> = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(
    products.slice(0, 3)
  );

  const comparisonFeatures = [
    { key: "productName", label: "Tên sản phẩm" },
    { key: "basePrice", label: "Giá khởi điểm", format: "price" },
    { key: "condition", label: "Tình trạng" },
    { key: "variants", label: "Biến thể", format: "variants" },
    { key: "promotionGeneral", label: "Khuyến mãi" },
    { key: "rating", label: "Đánh giá", format: "rating" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-xl font-bold text-gray-900 mb-2">So Sánh iPhone</h3>
        <p className="text-gray-600">Chọn tối đa 3 sản phẩm để so sánh</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-4 font-semibold">Tính năng</th>
              {selectedProducts.map((product) => (
                <th key={product.id} className="text-center p-4 min-w-[250px]">
                  <div className="space-y-2">
                    <div className="w-20 h-20 mx-auto relative">
                      <Image
                        src={product.thumbnail || "/images/iphone14.png"}
                        alt={product.productName || product.title || "iPhone"}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="font-semibold text-sm">
                      {product.productName || product.title || "iPhone"}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((feature, index) => (
              <tr
                key={feature.key}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="p-4 font-medium">{feature.label}</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    {renderFeatureValue(product, feature.key, feature.format)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper function to render feature values in comparison table
const renderFeatureValue = (product: Product, key: string, format?: string) => {
  const value = (product as any)[key];

  if (!value) return "—";

  switch (format) {
    case "price":
      return `${
        typeof value === "bigint" || typeof value === "number"
          ? Number(value).toLocaleString()
          : "0"
      }đ`;
    case "variants":
      return `${product.variants?.length || 0} biến thể`;
    case "rating":
      return (
        <div className="flex items-center justify-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span>{value}</span>
        </div>
      );
    default:
      return typeof value === "string" ? value : JSON.stringify(value);
  }
};
