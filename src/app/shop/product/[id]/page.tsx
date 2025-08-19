"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  X,
  Package,
  Truck,
  Shield,
  CreditCard,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppDispatch } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/features/carts/cartsSlice";

interface ProductVariant {
  id: string;
  storage: string;
  color: string;
  price: string;
  image: string;
  images?: string[];
  inStock: boolean;
  quantity: number;
}

interface Product {
  id: string;
  productName: string;
  brand: string;
  condition: string;
  slug: string;
  basePrice: string;
  currency: string;
  discount?: string;
  thumbnail: string;
  description?: string;
  promotionGeneral?: string;
  promotionStudent?: string;
  installment?: string;
  category: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  inStock: boolean;
  variants: ProductVariant[];
}

interface ProductDetailPageProps {
  params: { id: string }; // id or slug (back-compat)
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Load product data
  useEffect(() => {
    loadProduct();
  }, [params.id]);

  // Auto-select first available variant
  useEffect(() => {
    if (product && product.variants.length > 0) {
      const firstVariant = product.variants[0];
      setSelectedStorage(firstVariant.storage);
      setSelectedColor(firstVariant.color);
      setSelectedVariant(firstVariant);
      setActiveImage(firstVariant.image);
    }
  }, [product]);

  // Update selected variant when storage/color changes
  useEffect(() => {
    if (product && selectedStorage && selectedColor) {
      const variant = product.variants.find(
        (v) => v.storage === selectedStorage && v.color === selectedColor
      );
      setSelectedVariant(variant || null);
      if (variant?.image) setActiveImage(variant.image);
    }
  }, [product, selectedStorage, selectedColor]);

  const loadProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else if (response.status === 404) {
        notFound();
      }
    } catch (error) {
      console.error("Error loading product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const discountMatch = product.discount?.match(/-(\d+)%/);
    const discountPercent = discountMatch ? parseInt(discountMatch[1]) : 0;

    dispatch(
      addToCart({
        id: Number(product.id),
        name: `${product.productName} ${selectedVariant.storage} ${selectedVariant.color}`,
        srcUrl: selectedVariant.image,
        price: Number(selectedVariant.price),
        attributes: [selectedVariant.storage, selectedVariant.color],
        discount: { amount: 0, percentage: discountPercent },
        quantity: 1,
      })
    );

    alert("Đã thêm vào giỏ hàng!");
  };

  const handleBuyNow = () => {
    if (!product || !selectedVariant) return;

    const productData = {
      id: product.id,
      title: `${product.productName} ${selectedVariant.storage} ${selectedVariant.color}`,
      price: Number(selectedVariant.price),
      originalPrice: Number(product.basePrice),
      image: selectedVariant.image,
      storage: selectedVariant.storage,
      color: selectedVariant.color,
    };

    const params = new URLSearchParams({
      product: JSON.stringify(productData),
    });

    router.push(`/thanh-toan?${params.toString()}`);
  };

  const getStorageOptions = () => {
    if (!product) return [];
    const storages = Array.from(
      new Set(product.variants.map((v) => v.storage))
    );
    return storages;
  };

  const getColorOptions = () => {
    if (!product) return [];
    const colors = Array.from(new Set(product.variants.map((v) => v.color)));
    return colors;
  };

  const calculateDiscountedPrice = (basePrice: string, discount?: string) => {
    if (!discount) return Number(basePrice);

    const discountMatch = discount.match(/-(\d+)%/);
    const discountPercent = discountMatch ? parseInt(discountMatch[1]) : 0;
    const price = Number(basePrice);
    return Math.round(price - (price * discountPercent) / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between gap-4 mb-5 sm:mb-9">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Trang chủ</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={
                      product.category?.toLowerCase().includes("iphone")
                        ? "/iphone"
                        : "/shop"
                    }
                  >
                    {product.category?.toLowerCase().includes("iphone")
                      ? "iPhone"
                      : "Shop"}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.productName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                <img
                  src={
                    activeImage || selectedVariant?.image || product.thumbnail
                  }
                  alt={`${product.productName} ${selectedVariant?.color || ""}`}
                  className="w-full h-full object-contain p-8"
                />
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}
                  </div>
                )}
                {product.condition && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.condition}
                  </div>
                )}
              </div>

              {/* Thumbnails as carousel - show selected variant gallery (up to 5) and other variants as selectors */}
              {product.variants.length > 0 && (
                <Carousel className="w-full">
                  <CarouselContent>
                    {[
                      selectedVariant?.image,
                      ...(selectedVariant?.images || []),
                    ]
                      .filter(Boolean)
                      .slice(0, 5)
                      .map((url, idx) => (
                        <CarouselItem
                          key={`main-${idx}`}
                          className="basis-1/4 sm:basis-1/6"
                        >
                          <button
                            onClick={() => setActiveImage(String(url))}
                            className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 ${
                              activeImage === url
                                ? "border-blue-500"
                                : "border-gray-200"
                            }`}
                          >
                            <img
                              src={String(url)}
                              alt="preview"
                              className="w-full h-full object-contain p-2"
                            />
                          </button>
                        </CarouselItem>
                      ))}
                    {product.variants.map((variant) => (
                      <CarouselItem
                        key={variant.id}
                        className="basis-1/4 sm:basis-1/6"
                      >
                        <button
                          onClick={() => {
                            setSelectedStorage(variant.storage);
                            setSelectedColor(variant.color);
                            setActiveImage(variant.image);
                          }}
                          className={`w-full relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 ${
                            selectedVariant?.id === variant.id
                              ? "border-blue-500"
                              : "border-gray-200"
                          }`}
                        >
                          <img
                            src={variant.image}
                            alt={`${variant.color} ${variant.storage}`}
                            className="w-full h-full object-contain p-2"
                          />
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-end gap-2 mt-2">
                    <CarouselPrevious className="h-8 w-8" />
                    <CarouselNext className="h-8 w-8" />
                  </div>
                </Carousel>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {product.brand}
                  </span>
                  {product.featured && (
                    <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.productName}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviewCount} đánh giá)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-b border-gray-200 py-4">
                {product.discount ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-red-600">
                        {calculateDiscountedPrice(
                          selectedVariant?.price || product.basePrice,
                          product.discount
                        ).toLocaleString()}
                        đ
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {Number(
                          selectedVariant?.price || product.basePrice
                        ).toLocaleString()}
                        đ
                      </span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">
                      Tiết kiệm{" "}
                      {(
                        Number(selectedVariant?.price || product.basePrice) -
                        calculateDiscountedPrice(
                          selectedVariant?.price || product.basePrice,
                          product.discount
                        )
                      ).toLocaleString()}
                      đ
                    </p>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {Number(
                      selectedVariant?.price || product.basePrice
                    ).toLocaleString()}
                    đ
                  </span>
                )}
              </div>

              {/* Variants Selection */}
              <div className="space-y-4">
                {/* Storage Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Dung lượng
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {getStorageOptions().map((storage) => (
                      <button
                        key={storage}
                        onClick={() => setSelectedStorage(storage)}
                        className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-colors ${
                          selectedStorage === storage
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Màu sắc
                  </h3>
                  <div className="space-y-2">
                    {getColorOptions().map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-full px-4 py-3 text-left rounded-lg border-2 transition-colors ${
                          selectedColor === color
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{color}</span>
                          {selectedColor === color && (
                            <Check className="w-5 h-5" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Promotions */}
              <PromotionBox product={product} />

              {/* Installment */}
              {product.installment && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Trả góp 0%
                  </h3>
                  <p className="text-sm text-gray-700">{product.installment}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedVariant || !selectedVariant.inStock}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {selectedVariant?.inStock ? "Thêm vào giỏ" : "Hết hàng"}
                  </button>
                  <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={!selectedVariant || !selectedVariant.inStock}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-colors"
                >
                  Mua ngay
                </button>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-2">
                    <Truck className="w-6 h-6 text-blue-600 mx-auto" />
                    <p className="text-xs text-gray-600">Miễn phí giao hàng</p>
                  </div>
                  <div className="space-y-2">
                    <Shield className="w-6 h-6 text-green-600 mx-auto" />
                    <p className="text-xs text-gray-600">Bảo hành 12 tháng</p>
                  </div>
                  <div className="space-y-2">
                    <Package className="w-6 h-6 text-purple-600 mx-auto" />
                    <p className="text-xs text-gray-600">Đổi trả 7 ngày</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="border-t border-gray-200 p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Mô tả sản phẩm
              </h3>
              <div className="prose max-w-none text-gray-700">
                <p>{product.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

// --- PromotionBox component: 3 groups mapping from current fields ---
const PromotionBox: React.FC<{ product: Product }> = ({ product }) => {
  const hasGroupI = Boolean(product.discount || product.installment);
  const hasGroupII = false; // placeholder; no field yet
  const hasGroupIII = Boolean(
    product.promotionGeneral || product.promotionStudent
  );

  if (!hasGroupI && !hasGroupII && !hasGroupIII) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      <div className="border-b border-gray-200 px-4 py-3 text-sm text-gray-600">
        ( Khuyến mãi dự kiến áp dụng đến 23h59 | 31/08/2025 )
      </div>
      <div className="p-4 space-y-4 text-sm text-gray-700">
        {hasGroupI && (
          <div>
            <p className="font-semibold mb-2">I. Ưu đãi thanh toán</p>
            <div className="space-y-1">
              {product.installment && <p>• {product.installment}</p>}
              {product.discount && <p>• Giảm giá {product.discount}</p>}
            </div>
          </div>
        )}

        {hasGroupII && (
          <div>
            <p className="font-semibold mb-2">II. Ưu đãi mua kèm</p>
            <div className="space-y-1">
              <p>• Đang cập nhật</p>
            </div>
          </div>
        )}

        {hasGroupIII && (
          <div>
            <p className="font-semibold mb-2">III. Ưu đãi khác</p>
            <div className="space-y-1">
              {product.promotionGeneral && <p>• {product.promotionGeneral}</p>}
              {product.promotionStudent && <p>• {product.promotionStudent}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
