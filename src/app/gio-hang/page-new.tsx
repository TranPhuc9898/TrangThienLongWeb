/** @format */

"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Import ALL icons from lucide-react only
import { 
  ArrowRight, 
  Tag, 
  Truck, 
  Shield, 
  Gift, 
  CreditCard,
  ShoppingBag,
  AlertCircle,
  CheckCircle,
  Lock,
  Package,
  Sparkles,
  TrendingUp,
  ChevronRight
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Thêm Schema Markup cho SEO
  const generateCartSchema = () => {
    if (!cart || cart.items.length === 0) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "ShoppingCart",
      "potentialAction": {
        "@type": "BuyAction",
        "target": "https://trangmobile.com/thanh-toan"
      },
      "item": cart.items.map(item => ({
        "@type": "Product",
        "name": item.name,
        "image": item.srcUrl,
        "offers": {
          "@type": "Offer",
          "price": item.price,
          "priceCurrency": "VND",
          "availability": "https://schema.org/InStock",
          "itemCondition": item.condition === "100%" || item.condition === "New" 
            ? "https://schema.org/NewCondition" 
            : "https://schema.org/RefurbishedCondition"
        },
        "brand": {
          "@type": "Brand",
          "name": "Apple"
        }
      }))
    };
  };

  // Hàm gửi thông báo Slack khi thanh toán
  const sendSlackNotification = async () => {
    if (!cart || cart.items.length === 0) return;
    
    const orderDetails = {
      items: cart.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        regionCode: item.regionCode || "VN/A",
        condition: item.condition || "100%",
        storage: item.storage,
        color: item.color
      })),
      totalPrice: adjustedTotalPrice,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch("/api/sendOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `🛍️ Đơn hàng mới từ giỏ hàng:\n${JSON.stringify(orderDetails, null, 2)}`
        }),
      });
    } catch (error) {
      console.error("Error sending Slack notification:", error);
    }
  };

  const handleCheckout = async () => {
    await sendSlackNotification();
    router.push("/thanh-toan");
  };

  const handleApplyPromo = () => {
    setIsApplyingPromo(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplyingPromo(false);
      // Handle promo code logic here
    }, 1000);
  };

  // Calculate discount amount
  const discountAmount = totalPrice - adjustedTotalPrice;
  const discountPercent = totalPrice > 0 ? Math.round((discountAmount / totalPrice) * 100) : 0;

  return (
    <>
      {/* Schema Markup for SEO */}
      {cart && cart.items.length > 0 && (
        <Script
          id="cart-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateCartSchema())
          }}
        />
      )}
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
          {cart && cart.items.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BreadcrumbCart />
              
              {/* Modern Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Giỏ hàng
                  </h1>
                </div>
                <p className="text-gray-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Bạn có <span className="font-semibold text-blue-600">{cart.totalQuantities}</span> sản phẩm đã chọn</span>
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Products Section */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Premium Shipping Banner */}
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-2xl p-5 text-white shadow-lg"
                  >
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                          <Truck className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-lg flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Miễn phí vận chuyển
                          </p>
                          <p className="text-white/90 text-sm">
                            Áp dụng cho đơn hàng từ 5,000,000đ
                          </p>
                        </div>
                      </div>
                      <TrendingUp className="w-8 h-8 text-white/30" />
                    </div>
                  </motion.div>

                  {/* Product Cards Container */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                      <h2 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                        <Package className="w-5 h-5 text-gray-600" />
                        Sản phẩm đã chọn ({cart.items.length})
                      </h2>
                    </div>
                    <AnimatePresence>
                      {cart.items.map((product, idx) => (
                        <motion.div
                          key={`${product.id}-${idx}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="relative hover:bg-gray-50/50 transition-colors"
                        >
                          <div className="p-6">
                            <ProductCard data={product} />
                          </div>
                          {idx < cart.items.length - 1 && (
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Premium Features */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Shield, text: "Bảo hành 12 tháng", gradient: "from-blue-500 to-blue-600" },
                      { icon: Lock, text: "Bảo mật tuyệt đối", gradient: "from-green-500 to-emerald-600" },
                      { icon: Truck, text: "Giao hàng 2h", gradient: "from-purple-500 to-purple-600" },
                      { icon: Gift, text: "Quà tặng hấp dẫn", gradient: "from-orange-500 to-red-500" }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="group cursor-pointer"
                      >
                        <div className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                          <div className={`w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-r ${item.gradient} p-2.5`}>
                            <item.icon className="w-full h-full text-white" />
                          </div>
                          <p className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                            {item.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Modern Order Summary */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4"
                  >
                    {/* Header with gradient */}
                    <div className="p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Chi tiết thanh toán
                      </h2>
                    </div>

                    {/* Price Details */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-2">
                          <span className="text-gray-600 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Tạm tính
                          </span>
                          <span className="font-medium text-gray-900">
                            {totalPrice.toLocaleString("vi-VN")}đ
                          </span>
                        </div>
                        
                        {discountAmount > 0 && (
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg"
                          >
                            <span className="flex items-center gap-2 text-green-700">
                              <Gift className="w-4 h-4" />
                              <span className="font-medium">Ưu đãi ({discountPercent}%)</span>
                            </span>
                            <span className="font-bold text-green-600">
                              -{discountAmount.toLocaleString("vi-VN")}đ
                            </span>
                          </motion.div>
                        )}
                        
                        <div className="flex items-center justify-between py-2">
                          <span className="text-gray-600 flex items-center gap-2">
                            <Truck className="w-4 h-4" />
                            Phí vận chuyển
                          </span>
                          <span className="font-medium text-green-600">
                            Miễn phí
                          </span>
                        </div>
                      </div>

                      {/* Total with emphasis */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-gray-900">
                            Tổng thanh toán
                          </span>
                          <div className="text-right">
                            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                              {Math.round(adjustedTotalPrice).toLocaleString("vi-VN")}đ
                            </p>
                            <p className="text-xs text-gray-500">
                              (Đã bao gồm VAT)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Promo Code Section */}
                      <div className="pt-4 border-t border-gray-100">
                        <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Mã khuyến mãi
                        </label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              placeholder="Nhập mã giảm giá"
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                          </div>
                          <Button
                            onClick={handleApplyPromo}
                            disabled={!promoCode || isApplyingPromo}
                            className="px-6 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium disabled:opacity-50 transition-all"
                          >
                            {isApplyingPromo ? (
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              "Áp dụng"
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <motion.button
                        onClick={handleCheckout}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full relative group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-xl" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 group-hover:shadow-xl transition-all">
                          <span>Tiến hành thanh toán</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.button>

                      {/* Payment Methods */}
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Hình thức thanh toán
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {["Visa", "Mastercard", "VNPay", "Momo"].map((method) => (
                            <div key={method} className="p-2 bg-gray-50 rounded-lg text-center">
                              <span className="text-xs text-gray-600">{method}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Security Badge */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <Lock className="w-5 h-5 text-green-600" />
                          <div className="flex-1">
                            <p className="text-xs font-medium text-green-800">
                              Giao dịch bảo mật
                            </p>
                            <p className="text-xs text-green-600">
                              Mã hóa SSL 256-bit
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center min-h-[60vh]"
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Giỏ hàng trống
                </h2>
                <p className="text-gray-600 mb-8">
                  Khám phá ngay các sản phẩm Apple chính hãng
                </p>
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-blue-600/20 inline-flex items-center gap-2"
                >
                  <Link href="/shop">
                    <ShoppingBag className="w-5 h-5" />
                    Mua sắm ngay
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}