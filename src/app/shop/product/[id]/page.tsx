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
  Smartphone,
  Monitor,
  Camera,
  Zap,
  Battery,
  Wifi,
} from "lucide-react";

// Import iPhone specifications database
import { 
  IPHONE_SPECS_DATABASE, 
  getSpecsByModel, 
  getAvailableModels
} from '@/constants/iphone-specs';
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
import RelatedProducts from "@/components/product-page/RelatedProducts";

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

interface RegionPrice {
  id: string;
  regionCode: string;
  price: string;
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
  colors: ProductColor[]; // ✅ Add colors array
  regionCode?: string; // Product's default region code
  regionPrices?: RegionPrice[]; // Prices per region
}

interface ProductColor {
  // ✅ Add interface
  id: string;
  color: string;
  images: string[]; // Array of 5 image URLs
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
  const [selectedRegion, setSelectedRegion] = useState<string>("VN/A"); // Default to VN/A
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

      // Set default region code if available
      if ((product as any).regionCode) {
        setSelectedRegion((product as any).regionCode);
      }

      // ✅ Get first image from color gallery, not variant
      const colorData = product.colors.find(
        (c) => c.color === firstVariant.color
      );
      if (colorData?.images?.length && colorData.images.length > 0) {
        setActiveImage(colorData.images[0]);
      } else {
        setActiveImage(firstVariant.image || product.thumbnail);
      }
    }
  }, [product]);

  // Update selected variant when storage/color changes
  useEffect(() => {
    if (product && selectedStorage && selectedColor) {
      const variant = product.variants.find(
        (v) => v.storage === selectedStorage && v.color === selectedColor
      );
      setSelectedVariant(variant || null);

      // ✅ Only change image when COLOR changes, not storage
    }
  }, [product, selectedStorage, selectedColor]);

  // ✅ New effect: Change image only when color changes
  useEffect(() => {
    if (product && selectedColor) {
      const colorData = product.colors.find((c) => c.color === selectedColor);
      if (colorData?.images?.length && colorData.images.length > 0) {
        setActiveImage(colorData.images[0]); // Show first image of new color
      }
    }
  }, [selectedColor]); // Only trigger on color change, not storage

  // ✅ Get current color's images
  const getCurrentColorImages = () => {
    if (!product || !selectedColor) return [];
    const colorData = product.colors.find((c) => c.color === selectedColor);
    return colorData?.images || [];
  };

  // Get price for selected region
  const getRegionPrice = () => {
    if (!product || !selectedRegion || !selectedVariant) return selectedVariant?.price;
    
    const regionPrices = (product as any).regionPrices;
    if (!regionPrices || !Array.isArray(regionPrices)) return selectedVariant?.price;
    
    const regionPrice = regionPrices.find((rp: any) => rp.regionCode === selectedRegion);
    return regionPrice?.price || selectedVariant?.price;
  };

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
    const regionPrice = getRegionPrice();

    dispatch(
      addToCart({
        id: Number(product.id),
        name: `${product.productName} ${selectedVariant.storage} ${selectedVariant.color} (${selectedRegion})`,
        srcUrl: selectedVariant.image,
        price: Number(regionPrice || selectedVariant.price),
        attributes: [selectedVariant.storage, selectedVariant.color, selectedRegion],
        discount: { amount: 0, percentage: discountPercent },
        quantity: 1,
      })
    );

    alert("Đã thêm vào giỏ hàng!");
  };

  const handleBuyNow = () => {
    if (!product || !selectedVariant) return;
    const regionPrice = getRegionPrice();

    const productData = {
      id: product.id,
      title: `${product.productName} ${selectedVariant.storage} ${selectedVariant.color} (${selectedRegion})`,
      price: Number(regionPrice || selectedVariant.price),
      originalPrice: Number(product.basePrice),
      image: selectedVariant.image,
      storage: selectedVariant.storage,
      color: selectedVariant.color,
      regionCode: selectedRegion,
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

  const calculateDiscountedPrice = (basePrice: string | number, discount?: string) => {
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

              {/* Thumbnails as carousel - FIXED: Only for photo viewing */}
              {/* ✅ FIXED: Gallery shows current color's images */}
              {getCurrentColorImages().length > 0 && (
                <Carousel className="w-full">
                  <CarouselContent>
                    {getCurrentColorImages().map((imageUrl, idx) => (
                      <CarouselItem
                        key={`color-image-${idx}`}
                        className="basis-1/4 sm:basis-1/6"
                      >
                        <button
                          onClick={() => setActiveImage(imageUrl)} // ✅ Only change active image
                          className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 ${
                            activeImage === imageUrl
                              ? "border-blue-500"
                              : "border-gray-200"
                          }`}
                        >
                          <img
                            src={imageUrl}
                            alt={`${selectedColor} view ${idx + 1}`}
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

              {/* ✅ REMOVED: Variant preview section - not needed anymore */}
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
                  {(product as any).regionCode && ` (${(product as any).regionCode})`}
                </h1>

                {/* Product Condition Badge */}
                {product.condition && (
                  <div className="mb-3">
                    <span 
                      className={`inline-block px-3 py-1.5 text-sm font-medium rounded-full ${
                        product.condition === "New" || product.condition === "100%" 
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : product.condition === "99%" 
                          ? "bg-blue-100 text-blue-800 border border-blue-200"
                          : product.condition === "Refurbished"
                          ? "bg-gray-100 text-gray-800 border border-gray-200"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.condition === "New" || product.condition === "100%" 
                        ? "🆕 Máy mới 100%" 
                        : product.condition === "99%" 
                        ? "✨ Like new 99%"
                        : product.condition === "Refurbished"
                        ? "♻️ Máy tân trang"
                        : product.condition}
                    </span>
                  </div>
                )}

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
                {(() => {
                  // Lấy giá theo mã vùng nếu có
                  // Use getRegionPrice to get price based on selected region
                  let displayPrice = getRegionPrice() || selectedVariant?.price || product.basePrice;
                  
                  return product.discount ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold text-red-600">
                          {calculateDiscountedPrice(
                            displayPrice,
                            product.discount
                          ).toLocaleString()}
                          đ
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          {Number(displayPrice).toLocaleString()}
                          đ
                        </span>
                      </div>
                      <p className="text-sm text-green-600 font-medium">
                        Tiết kiệm{" "}
                        {(
                          Number(displayPrice) -
                          calculateDiscountedPrice(
                            displayPrice,
                            product.discount
                          )
                        ).toLocaleString()}
                        đ
                      </p>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">
                      {Number(displayPrice).toLocaleString()}
                      đ
                    </span>
                  );
                })()}
              </div>

              {/* Variants Selection - Keep independent */}
              <div className="space-y-4">
                {/* Storage Selection - INDEPENDENT */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Dung lượng
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {getStorageOptions().map((storage) => (
                      <button
                        key={storage}
                        onClick={() => setSelectedStorage(storage)} // ✅ Only way to change storage
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

                {/* Color Selection - INDEPENDENT */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Màu sắc
                  </h3>
                  <div className="space-y-2">
                    {getColorOptions().map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)} // ✅ Only way to change color
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

                {/* Region Code Selection - NEW */}
                {product.regionPrices && product.regionPrices.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Phiên bản (Mã vùng)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {/* Show all available regions with prices */}
                      {product.regionPrices.map((rp) => {
                        const regionNames: Record<string, string> = {
                          "VN/A": "Việt Nam",
                          "LL/A": "Mỹ",
                          "ZP/A": "Hong Kong",
                          "CH/A": "Trung Quốc",
                          "J/A": "Nhật Bản"
                        };
                        const basePrice = Number(product.basePrice);
                        const regionPrice = Number(rp.price);
                        const priceDiff = regionPrice - basePrice;
                        
                        return (
                          <button
                            key={rp.regionCode}
                            onClick={() => setSelectedRegion(rp.regionCode)}
                            className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                              selectedRegion === rp.regionCode
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-gray-300 text-gray-700"
                            }`}
                          >
                            <div className="text-left">
                              <div className="font-medium">{rp.regionCode}</div>
                              <div className="text-xs text-gray-500">{regionNames[rp.regionCode] || ""}</div>
                              <div className="text-xs mt-1 font-semibold">
                                {regionPrice.toLocaleString("vi-VN")}đ
                              </div>
                              {priceDiff !== 0 && (
                                <div className={`text-xs ${priceDiff < 0 ? "text-green-600" : "text-red-600"}`}>
                                  {priceDiff < 0 ? "↓" : "↑"} {Math.abs(priceDiff).toLocaleString("vi-VN")}đ
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      * Bạn có thể thiết lập giá khác nhau cho từng mã vùng. Nếu không thiết lập, sẽ sử dụng giá cơ bản.
                    </p>
                  </div>
                )}
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

          {/* Technical Specifications - Only for iPhone products */}
          {product.category?.toLowerCase().includes('iphone') && (
            <TechnicalSpecs productName={product.productName} />
          )}
        </div>
      </div>
    </div>
  );
};

// Technical Specifications Component
const TechnicalSpecs: React.FC<{ productName: string }> = ({ productName }) => {
  // Try to match product name with specs database
  const availableModels = getAvailableModels();
  const matchedModel = availableModels.find(model => 
    productName.toLowerCase().includes(model.toLowerCase()) ||
    model.toLowerCase().includes(productName.toLowerCase().split(' ').slice(0, 3).join(' ').toLowerCase())
  );

  if (!matchedModel) {
    return null; // Don't show specs if no match found
  }

  const specs = getSpecsByModel(matchedModel);
  if (!specs) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 p-6 lg:p-8">
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              📱 Thông Số Kỹ Thuật
            </h3>
            <p className="text-sm text-gray-600">
              {matchedModel} - Dữ liệu từ cơ sở dữ liệu kỹ thuật chính thức
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Display Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-800">Màn Hình</h4>
            </div>
            <div className="space-y-2 pl-7">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Kích thước:</span>
                <span className="text-sm font-medium">{specs.display.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Loại:</span>
                <span className="text-sm font-medium">{specs.display.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Độ phân giải:</span>
                <span className="text-sm font-medium">{specs.display.resolution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tần số quét:</span>
                <span className="text-sm font-medium">{specs.display.refreshRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Độ sáng:</span>
                <span className="text-sm font-medium">{specs.display.brightness}</span>
              </div>
            </div>
          </div>

          {/* Camera Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-800">Camera</h4>
            </div>
            <div className="space-y-2 pl-7">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Chính:</span>
                <span className="text-sm font-medium">{specs.camera.main}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Góc rộng:</span>
                <span className="text-sm font-medium">{specs.camera.ultrawide}</span>
              </div>
              {specs.camera.telephoto && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Telephoto:</span>
                  <span className="text-sm font-medium">{specs.camera.telephoto}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Zoom:</span>
                <span className="text-sm font-medium">{specs.camera.zoom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Selfie:</span>
                <span className="text-sm font-medium">{specs.camera.selfie}</span>
              </div>
            </div>
          </div>

          {/* Performance Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-purple-800">Hiệu Năng</h4>
            </div>
            <div className="space-y-2 pl-7">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Chip:</span>
                <span className="text-sm font-medium">{specs.performance.chip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">CPU:</span>
                <span className="text-sm font-medium">{specs.performance.cpu}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">GPU:</span>
                <span className="text-sm font-medium">{specs.performance.gpu}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">RAM:</span>
                <span className="text-sm font-medium">{specs.performance.ram}</span>
              </div>
              {specs.performance.benchmark.antutu && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">AnTuTu:</span>
                  <span className="text-sm font-medium">{specs.performance.benchmark.antutu}</span>
                </div>
              )}
            </div>
          </div>

          {/* Design & Battery Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Battery className="w-5 h-5 text-orange-600" />
              <h4 className="font-semibold text-orange-800">Thiết Kế & Pin</h4>
            </div>
            <div className="space-y-2 pl-7">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Kích thước:</span>
                <span className="text-sm font-medium">{specs.design.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Trọng lượng:</span>
                <span className="text-sm font-medium">{specs.design.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Vật liệu:</span>
                <span className="text-sm font-medium">{specs.design.materials}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Dung lượng pin:</span>
                <span className="text-sm font-medium">{specs.battery.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Thời gian sử dụng:</span>
                <span className="text-sm font-medium">{specs.battery.life}</span>
              </div>
            </div>
          </div>

          {/* Connectivity Section */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Wifi className="w-5 h-5 text-cyan-600" />
              <h4 className="font-semibold text-cyan-800">Kết Nối & Hệ Điều Hành</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 pl-7">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">SIM:</span>
                  <span className="text-sm font-medium">{specs.connectivity.sim}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cổng sạc:</span>
                  <span className="text-sm font-medium">{specs.connectivity.port}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Wi-Fi:</span>
                  <span className="text-sm font-medium">{specs.connectivity.wifi}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bluetooth:</span>
                  <span className="text-sm font-medium">{specs.connectivity.bluetooth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Hệ điều hành:</span>
                  <span className="text-sm font-medium">{specs.other.os}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Kháng nước:</span>
                  <span className="text-sm font-medium">{specs.other.waterResistance}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Colors and Storage */}
          <div className="space-y-4 md:col-span-2">
            <div className="bg-white/60 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Màu sắc có sẵn:</h5>
                  <div className="flex flex-wrap gap-2">
                    {specs.design.colors.map((color, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Tùy chọn dung lượng:</h5>
                  <div className="flex flex-wrap gap-2">
                    {specs.other.storage.map((storage, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {storage}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Thông số kỹ thuật chính thức từ Apple - Cập nhật mới nhất
            </div>
            <div className="text-xs text-gray-500">
              Model: {matchedModel}
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products Section */}
      <RelatedProducts 
        currentProduct={product}
        category={product.category}
        limit={8}
      />
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
