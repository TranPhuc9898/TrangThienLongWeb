"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingCart,
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
import { Product as BaseProduct, ProductVariant as BaseProductVariant } from "@/types/product.types";

// Extend the base types with our additional fields
interface ProductVariant extends Omit<BaseProductVariant, 'price'> {
  price: number | bigint;
  images?: string[];
}

interface RegionPrice {
  id: string;
  regionCode: string;
  price: number | bigint;
}

interface ProductColor {
  id: string;
  color: string;
  images: string[]; // Array of 5 image URLs
}

// Extend the base Product type with our custom fields
interface Product extends Omit<BaseProduct, 'variants' | 'colors'> {
  productName: string;
  basePrice: number | bigint;
  currency: string;
  variants: ProductVariant[];
  colors: ProductColor[]; // Our custom colors structure for image galleries
  regionCode?: string; // Product's default region code
  regionPrices?: RegionPrice[]; // Prices per region
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
        setActiveImage(String(firstVariant.image || product.thumbnail || ""));
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) return notFound();

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.productName,
    "description": product.description || `${product.productName} chính hãng tại TrangMobile. Bảo hành chính hãng, trả góp 0%, giao hàng toàn quốc.`,
    "image": getCurrentColorImages().length > 0 ? getCurrentColorImages() : [product.thumbnail],
    "brand": {
      "@type": "Brand",
      "name": "Apple"
    },
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "url": `https://trangmobile.com/shop/product/${product.id}`,
      "priceCurrency": "VND",
      "price": selectedVariant ? Number(getRegionPrice() || selectedVariant.price) : Number(product.basePrice),
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "TrangMobile"
      },
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": product.rating ? {
      "@type": "AggregateRating",
      "ratingValue": product.rating.toString(),
      "reviewCount": product.reviewCount?.toString() || "0",
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "review": [],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Dung lượng",
        "value": getStorageOptions().join(", ")
      },
      {
        "@type": "PropertyValue",
        "name": "Màu sắc",
        "value": getColorOptions().join(", ")
      }
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TrangMobile",
    "alternateName": "Trang Mobile",
    "url": "https://trangmobile.com",
    "logo": "https://trangmobile.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-385-795-791",
      "contactType": "customer service",
      "areaServed": "VN",
      "availableLanguage": "Vietnamese"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "15i Trần Phú",
      "addressLocality": "Quận 5",
      "addressRegion": "TP.HCM",
      "postalCode": "70000",
      "addressCountry": "VN"
    },
    "sameAs": [
      "https://facebook.com/trangmobile",
      "https://zalo.me/84385795791"
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "21:00"
      }
    ]
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang chủ",
        "item": "https://trangmobile.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": product.category?.toLowerCase().includes("iphone") ? "iPhone" : "Sản phẩm",
        "item": `https://trangmobile.com/${product.category?.toLowerCase().includes("iphone") ? "iphone" : "shop"}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.productName,
        "item": `https://trangmobile.com/shop/product/${product.id}`
      }
    ]
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
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
                      : "Sản phẩm"}
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

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Gallery Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
                <img
                  src={activeImage}
                  alt={`${product.productName} ${selectedStorage} ${selectedColor} - Hình ảnh sản phẩm chính hãng tại TrangMobile`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* Thumbnail Carousel */}
              {getCurrentColorImages().length > 1 && (
                <Carousel className="w-full">
                  <CarouselContent>
                    {getCurrentColorImages().map((image, index) => (
                      <CarouselItem key={index} className="basis-1/4">
                        <button
                          onClick={() => setActiveImage(image)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 ${
                            activeImage === image
                              ? "border-blue-600"
                              : "border-gray-200"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.productName} ${selectedColor} - Hình ${index + 1} - TrangMobile`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.productName}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} đánh giá)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-red-600">
                    {selectedVariant
                      ? `${Number(getRegionPrice() || selectedVariant.price).toLocaleString(
                          "vi-VN"
                        )}đ`
                      : `${Number(product.basePrice).toLocaleString("vi-VN")}đ`}
                  </span>
                  {product.discount && (
                    <span className="text-xl text-gray-400 line-through">
                      {Number(product.basePrice).toLocaleString("vi-VN")}đ
                    </span>
                  )}
                </div>
                {product.discount && (
                  <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded-md text-sm">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Region Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Mã vùng
                </label>
                <div className="flex flex-wrap gap-2">
                  {["VN/A", "LL/A", "ZA/A", "CH/A", "ZP/A"].map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`px-4 py-2 rounded-md border ${
                        selectedRegion === region
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Dung lượng
                </label>
                <div className="flex flex-wrap gap-2">
                  {getStorageOptions().map((storage) => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`px-4 py-2 rounded-md border ${
                        selectedStorage === storage
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Màu sắc
                </label>
                <div className="flex flex-wrap gap-2">
                  {getColorOptions().map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-md border ${
                        selectedColor === color
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Mua ngay
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Thêm vào giỏ
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Truck className="text-blue-600" size={20} />
                  <span className="text-sm text-gray-700">
                    Miễn phí vận chuyển
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="text-green-600" size={20} />
                  <span className="text-sm text-gray-700">
                    Bảo hành chính hãng
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="text-purple-600" size={20} />
                  <span className="text-sm text-gray-700">
                    Đổi trả trong 7 ngày
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="text-orange-600" size={20} />
                  <span className="text-sm text-gray-700">
                    Trả góp 0% lãi suất
                  </span>
                </div>
              </div>

              {/* Promotion Box */}
              <PromotionBox product={product} />
            </div>
          </div>

          {/* Product Description */}
          {product.description && (
            <section className="border-t border-gray-200 p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Mô tả sản phẩm
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>{product.description}</p>
              </div>
            </section>
          )}

          {/* Technical Specifications - Only for iPhone products */}
          {product.category?.toLowerCase().includes('iphone') && (
            <TechnicalSpecs productName={product.productName} />
          )}
        </div>
        
        {/* Related Products Section */}
        {product && (
          <RelatedProducts 
            currentProduct={{
              ...product,
              colors: product.colors?.map(c => c.color) || [],
              variants: product.variants as any
            } as BaseProduct}
            category={product.category}
            limit={8}
          />
        )}
      </div>
    </div>
    </>
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
    <section className="border-t border-gray-200 p-6 lg:p-8" aria-label="Thông số kỹ thuật">
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              📱 Thông Số Kỹ Thuật
            </h2>
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
              <h3 className="font-semibold text-blue-800">Màn Hình</h3>
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
              <h3 className="font-semibold text-green-800">Camera</h3>
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
              <h3 className="font-semibold text-purple-800">Hiệu Năng</h3>
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
              <h3 className="font-semibold text-orange-800">Thiết Kế & Pin</h3>
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
              <h3 className="font-semibold text-cyan-800">Kết Nối & Hệ Điều Hành</h3>
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
                  <h4 className="font-semibold text-gray-800 mb-2">Màu sắc có sẵn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {specs.design.colors.map((color, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Tùy chọn dung lượng:</h4>
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
    </section>
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
