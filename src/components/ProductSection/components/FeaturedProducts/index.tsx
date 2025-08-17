/** @format */
"use client";
import React, { useState } from "react";
import { Product } from "@/types/product.types";
import Link from "next/link";
import { ShoppingCart, Plus } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useToast } from "@/components/ui/toast";
import { useFlyToCart } from "@/components/ui/FlyToCart";

interface FeaturedProductsProps {
  products: (Product & { iphone?: boolean })[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const { triggerFlight } = useFlyToCart();
  const [selectedStorageById, setSelectedStorageById] = useState<
    Record<number, number>
  >({});

  if (!products || products.length === 0) return null;

  const handleAddToCart = (
    e: React.MouseEvent,
    product: Product,
    storageIndex: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const selectedStorage = product.storages?.[storageIndex];

      // Find the product image for animation
      const productCard = (e.currentTarget as HTMLElement).closest(
        "[data-product-card]"
      );
      if (productCard) {
        const productImage = productCard.querySelector("img");
        if (productImage) {
          triggerFlight(productImage, product.gallery?.[0] || "");
        }
      }

      dispatch(
        addToCart({
          id: product.id,
          name: product.productName || product.title,
          srcUrl: product.gallery?.[0] || "",
          price: selectedStorage?.price || product.price,
          attributes: [selectedStorage?.label || "Default", "Mặc định"],
          discount: product.discount,
          quantity: 1,
        })
      );

      // Toast disabled - using fly animation instead
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
    <div className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-full sm:max-w-screen-xl mx-auto animate-fadeInUp">
      <div
        className="grid gap-4 sm:gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {products.map((product, index) => {
          const storageIndex = selectedStorageById[product.id] ?? 0;
          const basePrice =
            product.storages?.[storageIndex]?.price ?? product.price;
          const hasDiscount =
            !!product.discount && product.discount.percentage > 0;
          const discountedPrice = hasDiscount
            ? Math.round(basePrice * (1 - product.discount.percentage / 100))
            : basePrice;

          return (
            <div
              key={product.id}
              className="group animate-slideInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link
                href={`/shop/product/${product.id}`}
                className="block"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="product-card relative bg-white rounded-2xl shadow-lg flex flex-col w-full max-w-xs sm:max-w-full h-[680px] px-4 sm:px-6 pt-8 pb-4 mx-auto border border-gray-100 hover:border-blue-300"
                  style={{
                    boxSizing: "border-box",
                  }}
                >
                  {/* Badge Sale */}
                  {hasDiscount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-tr-lg rounded-bl-lg shadow z-10 animate-bounce">
                      -{product.discount.percentage}%
                    </span>
                  )}

                  {/* Ảnh sản phẩm */}
                  <div className="flex justify-center items-center mb-6 h-40 w-full group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={product.gallery?.[0]}
                      alt={product.productName || product.title}
                      className="h-full object-contain rounded-lg mx-auto animate-scaleIn"
                      style={{
                        maxWidth: "80%",
                        animationDelay: `${index * 0.1 + 0.2}s`,
                      }}
                    />
                  </div>

                  {/* Thông tin sản phẩm */}
                  <div className="flex flex-col flex-1 w-full justify-between">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-3 text-center whitespace-normal break-words">
                        {product.productName || product.title}
                      </h3>

                      {/* Interactive Dung lượng */}
                      <div
                        className="grid justify-center mb-4 w-full gap-2"
                        style={{
                          gridTemplateColumns: `repeat(3, minmax(70px, 1fr))`,
                          maxWidth: "350px",
                          margin: "0 auto",
                        }}
                      >
                        {(product.storages || []).map((storage, idx) => {
                          const isSelected = storageIndex === idx;
                          return (
                            <button
                              key={storage.label}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedStorageById({
                                  ...selectedStorageById,
                                  [product.id]: idx,
                                });
                              }}
                              className={`font-medium text-[13px] px-3 py-[6px] rounded-md min-w-[54px] text-center shadow-sm border transition-all duration-200 hover:scale-105 ${
                                isSelected
                                  ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                  : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
                              }`}
                              style={{
                                gridColumn: (idx % 3) + 1,
                                gridRow: Math.floor(idx / 3) + 1,
                              }}
                            >
                              {storage.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Giá sản phẩm */}
                      <div
                        className="flex flex-col items-start gap-1 mb-2 mt-4"
                        style={{ paddingLeft: 0 }}
                      >
                        <div className="flex items-end gap-2 justify-start">
                          <span
                            className="text-red-600 font-bold"
                            style={{ fontSize: 16, fontWeight: 700 }}
                          >
                            {discountedPrice.toLocaleString()}đ
                          </span>
                          {hasDiscount && (
                            <span
                              className="text-gray-400 line-through"
                              style={{ fontSize: 16 }}
                            >
                              {product.price.toLocaleString()}đ
                            </span>
                          )}
                        </div>
                        {/* Ưu đãi giảm thêm */}
                        <span className="text-base font-medium text-gray-700 mt-1">
                          Ưu đãi giảm thêm đến{" "}
                          <span className="text-red-600 font-semibold">
                            200.000đ
                          </span>
                        </span>
                        <span className="text-base font-medium text-gray-700">
                          Sinh viên/Học sinh giảm thêm đến{" "}
                          <span className="text-red-600 font-semibold">
                            300.000đ
                          </span>
                        </span>
                        {/* Box nhỏ thông báo */}
                        <div
                          className="bg-gray-100 text-gray-700 text-base rounded-md px-3 py-2 mt-3 w-full"
                          style={{ fontWeight: 500 }}
                        >
                          Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng
                          kỳ hạn 3-6 tháng
                        </div>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="mt-auto pt-4">
                      <button
                        onClick={(e) =>
                          handleAddToCart(e, product, storageIndex)
                        }
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105 hover:shadow-lg"
                      >
                        <ShoppingCart size={18} />
                        <span>Thêm vào giỏ</span>
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Đánh giá với ngôi sao vàng */}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
