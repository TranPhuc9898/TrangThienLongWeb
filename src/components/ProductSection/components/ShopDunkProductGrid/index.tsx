"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types/product.types";
import { useAppDispatch } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useToast } from "@/components/ui/toast";
import { useFlyToCart } from "@/components/ui/FlyToCart";

interface ShopDunkProductGridProps {
  products: Product[];
  sectionId: string; // để determine color theme
}

const ShopDunkProductGrid: React.FC<ShopDunkProductGridProps> = ({
  products,
  sectionId,
}) => {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const { triggerFlight } = useFlyToCart();

  // Get theme colors based on section
  const getTheme = () => {
    switch (sectionId) {
      case "iphone-section":
        return {
          gradient: "from-blue-600 to-purple-600",
          buttonBg: "bg-gradient-to-r from-blue-600 to-purple-600",
          buttonHover: "hover:from-blue-700 hover:to-purple-700",
          selectedBg: "bg-blue-600",
          selectedText: "text-white",
        };
      case "ipad-section":
        return {
          gradient: "from-purple-600 to-pink-600",
          buttonBg: "bg-gradient-to-r from-purple-600 to-pink-600",
          buttonHover: "hover:from-purple-700 hover:to-pink-700",
          selectedBg: "bg-purple-600",
          selectedText: "text-white",
        };
      case "watch-section":
        return {
          gradient: "from-green-600 to-teal-600",
          buttonBg: "bg-gradient-to-r from-green-600 to-teal-600",
          buttonHover: "hover:from-green-700 hover:to-teal-700",
          selectedBg: "bg-green-600",
          selectedText: "text-white",
        };
      case "airpods-section":
        return {
          gradient: "from-orange-600 to-red-600",
          buttonBg: "bg-gradient-to-r from-orange-600 to-red-600",
          buttonHover: "hover:from-orange-700 hover:to-red-700",
          selectedBg: "bg-orange-600",
          selectedText: "text-white",
        };
      case "mac-section":
        return {
          gradient: "from-gray-700 to-gray-900",
          buttonBg: "bg-gradient-to-r from-gray-700 to-gray-900",
          buttonHover: "hover:from-gray-800 hover:to-black",
          selectedBg: "bg-gray-700",
          selectedText: "text-white",
        };
      default:
        return {
          gradient: "from-blue-600 to-purple-600",
          buttonBg: "bg-gradient-to-r from-blue-600 to-purple-600",
          buttonHover: "hover:from-blue-700 hover:to-purple-700",
          selectedBg: "bg-blue-600",
          selectedText: "text-white",
        };
    }
  };

  const theme = getTheme();
  const [selectedStorage, setSelectedStorage] = useState<{
    [key: string]: string;
  }>({});

  // Get storage options for a product
  const getStorageOptions = (product: Product) => {
    // Mock storage options based on product type
    if (product.productName.toLowerCase().includes("iphone")) {
      return ["128GB", "256GB", "512GB", "1TB"];
    } else if (product.productName.toLowerCase().includes("ipad")) {
      return ["64GB", "256GB", "512GB"];
    } else if (product.productName.toLowerCase().includes("mac")) {
      return ["256GB", "512GB", "1TB", "2TB"];
    }
    return ["128GB", "256GB"];
  };

  // Calculate discount percentage
  const getDiscountPercentage = (product: Product) => {
    if (product.discount) {
      return product.discount.percentage;
    }
    // Mock discount for demo
    return Math.floor(Math.random() * 20) + 5; // 5-25%
  };

  const displayProducts = products.slice(0, 4); // Show first 4 products

  // Handle add to cart with fly animation
  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    try {
      const storage =
        selectedStorage[product.id] || getStorageOptions(product)[0];

      // Find the product image element to start animation from
      console.log("🖱️ Button clicked for product:", product.productName);

      const productCard = (event.currentTarget as HTMLElement).closest(
        ".product-card"
      );
      console.log("📦 Product card found:", productCard);

      if (productCard) {
        const productImage = productCard.querySelector("img");
        console.log("🖼️ Product image found:", productImage);
        if (productImage) {
          triggerFlight(
            productImage,
            product.thumbnail || product.gallery?.[0] || "/images/iphone14.png"
          );
        } else {
          console.error("❌ No image found in product card");
        }
      } else {
        console.error("❌ No product card found with .product-card selector");
      }

      dispatch(
        addToCart({
          id: product.id,
          name: product.productName,
          srcUrl:
            product.thumbnail || product.gallery?.[0] || "/images/iphone14.png",
          price: product.basePrice || product.price,
          attributes: [storage, "Mặc định"],
          discount: product.discount,
          quantity: 1,
        })
      );

      // Toast disabled - using fly animation instead
      // setTimeout(() => {
      //   addToast({
      //     type: "success",
      //     title: "Thêm vào giỏ hàng thành công!",
      //     description: `${product.productName} (${storage})`,
      //     duration: 2000,
      //   });
      // }, 500);
    } catch (error) {
      addToast({
        type: "error",
        title: "Có lỗi xảy ra!",
        description: "Không thể thêm sản phẩm vào giỏ hàng",
        duration: 3000,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Product Grid */}
      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayProducts.map((product, index) => {
            const storageOptions = getStorageOptions(product);
            const discountPercent = getDiscountPercentage(product);
            const originalPrice = product.discount
              ? product.basePrice || product.price + product.discount.amount
              : Math.floor(product.basePrice || product.price * 1.2);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="product-card bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Discount Badge */}
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      -{discountPercent}%
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="relative aspect-square p-8 bg-gray-50">
                    <Image
                      src={
                        product.thumbnail ||
                        product.gallery?.[0] ||
                        "/images/iphone14.png"
                      }
                      alt={product.productName}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Brand */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-600 text-sm font-medium">
                      {product.brand}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className="font-bold text-lg text-gray-900 mb-4 line-clamp-2">
                    {product.productName}
                  </h3>

                  {/* Storage Options */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {storageOptions.map((storage, idx) => (
                        <button
                          key={storage}
                          onClick={() =>
                            setSelectedStorage({
                              ...selectedStorage,
                              [product.id]: storage,
                            })
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            selectedStorage[product.id] === storage ||
                            (!selectedStorage[product.id] && idx === 0)
                              ? `${theme.selectedBg} ${theme.selectedText}`
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {storage}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-red-600">
                        {product.basePrice || product.price.toLocaleString()}đ
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {originalPrice.toLocaleString()}đ
                      </span>
                    </div>
                  </div>

                  {/* Promotions */}
                  <div className="space-y-1 mb-4 text-sm">
                    <p className="text-red-600 font-medium">
                      Ưu đãi giảm thêm đến{" "}
                      <span className="font-bold">200.000đ</span>
                    </p>
                    <p className="text-red-600 font-medium">
                      Sinh viên/Học sinh giảm thêm đến{" "}
                      <span className="font-bold">300.000đ</span>
                    </p>
                    <p className="text-gray-600">
                      Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ
                      hạn 3-6 tháng
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    onClick={(e) => handleAddToCart(product, e)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full ${theme.buttonBg} ${theme.buttonHover} text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Thêm vào giỏ
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Sidebar với thông tin thêm */}
      <div className="lg:col-span-1">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
        >
          {/* Product Showcase */}
          <div className="text-center mb-6">
            <div className="relative w-40 h-40 mx-auto mb-4">
              <Image
                src="/images/iphone14.png"
                alt="Featured Product"
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
            <h4
              className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient} mb-2`}
            >
              Sản phẩm được quan tâm nhiều nhất
            </h4>
            <p className="text-gray-600 text-sm">
              Khám phá những sản phẩm hot nhất với công nghệ tiên tiến
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${theme.gradient}`}
              ></div>
              <span className="text-sm text-gray-700">Chính hãng 100%</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${theme.gradient}`}
              ></div>
              <span className="text-sm text-gray-700">Bảo hành 12 tháng</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${theme.gradient}`}
              ></div>
              <span className="text-sm text-gray-700">Trả góp 0% lãi suất</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${theme.gradient}`}
              ></div>
              <span className="text-sm text-gray-700">
                Giao hàng nhanh toàn quốc
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
            <Link
              href={`/${sectionId.replace("-section", "")}`}
              className={`block w-full ${theme.buttonBg} ${theme.buttonHover} text-white text-center font-semibold py-3 rounded-xl transition-all duration-300`}
            >
              Xem tất cả sản phẩm
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopDunkProductGrid;
