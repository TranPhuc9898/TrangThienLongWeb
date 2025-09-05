/** @format */

"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineLocalOffer, MdLocalShipping, MdSecurity } from "react-icons/md";
import { TbBasketExclamation } from "react-icons/tb";
import { BiShield, BiGift } from "react-icons/bi";
import { BsCreditCard } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
        <div className="max-w-7xl mx-auto px-4 xl:px-0">
          {cart && cart.items.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BreadcrumbCart />
              
              {/* Header Section */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Giỏ hàng của bạn
                </h1>
                <p className="text-gray-600">
                  Bạn có <span className="font-semibold text-blue-600">{cart.totalQuantities}</span> sản phẩm trong giỏ hàng
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Products Section */}
                <div className="lg:col-span-2">
                  {/* Free Shipping Banner */}
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3"
                  >
                    <MdLocalShipping className="text-green-600 text-2xl" />
                    <div>
                      <p className="text-sm font-semibold text-green-800">
                        🎉 Miễn phí vận chuyển cho đơn hàng từ 5,000,000đ
                      </p>
                      <p className="text-xs text-green-700">
                        Áp dụng cho tất cả sản phẩm Apple chính hãng
                      </p>
                    </div>
                  </motion.div>

                  {/* Product Cards */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                      <h2 className="font-semibold text-lg text-gray-900">
                        Sản phẩm ({cart.items.length})
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
                          className="relative"
                        >
                          <div className="p-6">
                            <ProductCard data={product} />
                          </div>
                          {idx < cart.items.length - 1 && (
                            <hr className="border-gray-100" />
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {[
                      { icon: BiShield, text: "Bảo hành chính hãng", color: "text-blue-600" },
                      { icon: MdSecurity, text: "Thanh toán an toàn", color: "text-green-600" },
                      { icon: MdLocalShipping, text: "Giao hàng nhanh", color: "text-purple-600" },
                      { icon: BiGift, text: "Quà tặng hấp dẫn", color: "text-orange-600" }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:shadow-md transition-shadow"
                      >
                        <item.icon className={`text-3xl mb-2 mx-auto ${item.color}`} />
                        <p className="text-xs font-medium text-gray-700">{item.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Order Summary Section */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-4"
                  >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Tóm tắt đơn hàng
                      </h2>
                    </div>

                    {/* Price Details */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Tạm tính</span>
                          <span className="font-medium text-gray-900">
                            {totalPrice.toLocaleString("vi-VN")}đ
                          </span>
                        </div>
                        
                        {discountAmount > 0 && (
                          <div className="flex items-center justify-between text-green-600">
                            <span className="flex items-center gap-1">
                              <BiGift className="text-lg" />
                              Giảm giá ({discountPercent}%)
                            </span>
                            <span className="font-medium">
                              -{discountAmount.toLocaleString("vi-VN")}đ
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Phí vận chuyển</span>
                          <span className="font-medium text-green-600">
                            Miễn phí
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-gray-900">
                            Tổng cộng
                          </span>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">
                              {Math.round(adjustedTotalPrice).toLocaleString("vi-VN")}đ
                            </p>
                            <p className="text-xs text-gray-500">
                              (Đã bao gồm VAT)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Promo Code */}
                      <div className="pt-4">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Mã giảm giá
                        </label>
                        <div className="flex gap-2">
                          <InputGroup className="flex-1 bg-gray-50 border border-gray-200 rounded-xl">
                            <InputGroup.Text>
                              <MdOutlineLocalOffer className="text-gray-400 text-xl" />
                            </InputGroup.Text>
                            <InputGroup.Input
                              type="text"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              placeholder="Nhập mã giảm giá"
                              className="bg-transparent placeholder:text-gray-400 text-sm"
                            />
                          </InputGroup>
                          <Button
                            onClick={handleApplyPromo}
                            disabled={!promoCode || isApplyingPromo}
                            className="px-6 bg-gray-900 hover:bg-gray-800 text-white rounded-xl disabled:opacity-50"
                          >
                            {isApplyingPromo ? (
                              <span className="inline-block animate-spin">⏳</span>
                            ) : (
                              "Áp dụng"
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={handleCheckout}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-300 group"
                        >
                          <span className="flex items-center justify-center gap-2">
                            Tiến hành thanh toán
                            <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </motion.div>

                      {/* Payment Methods */}
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-xs font-medium text-gray-700 mb-3">
                          Chấp nhận thanh toán
                        </p>
                        <div className="flex items-center gap-3">
                          <Image 
                            src="/images/visa.svg" 
                            alt="Visa" 
                            width={40} 
                            height={24}
                            className="opacity-70 hover:opacity-100 transition-opacity"
                          />
                          <Image 
                            src="/images/mastercard.svg" 
                            alt="Mastercard" 
                            width={40} 
                            height={24}
                            className="opacity-70 hover:opacity-100 transition-opacity"
                          />
                          <Image 
                            src="/images/vnpay.svg" 
                            alt="VNPay" 
                            width={40} 
                            height={24}
                            className="opacity-70 hover:opacity-100 transition-opacity"
                          />
                          <BsCreditCard className="text-2xl text-gray-400" />
                        </div>
                      </div>

                      {/* Security Note */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-start gap-2">
                          <MdSecurity className="text-green-600 text-lg mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-gray-700">
                              Thanh toán an toàn
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Thông tin thanh toán của bạn được mã hóa và bảo mật 100%
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
                <TbBasketExclamation className="text-8xl text-gray-300 mx-auto mb-6" strokeWidth={1} />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Giỏ hàng trống
                </h2>
                <p className="text-gray-600 mb-8">
                  Hãy khám phá các sản phẩm Apple chính hãng tại cửa hàng của chúng tôi
                </p>
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-blue-600/20"
                >
                  <Link href="/shop">
                    Khám phá sản phẩm
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