/** @format */
"use client";
import React from "react";
import { Product } from "@/types/product.types";
import Link from "next/link";

interface FeaturedProductsProps {
  products: (Product & { iphone?: boolean })[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  // Kiểm tra nếu có ít nhất 1 sản phẩm iphone: true
  const isIphone = products.some((item) => item.iphone);

  if (!isIphone) return null; // Không render gì nếu không phải iPhone

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-full sm:max-w-screen-xl mx-auto">
      <div
        className="grid gap-4 sm:gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {products
          .filter((product) => product.iphone)
          .map((product) => {
            const hasDiscount =
              !!product.discount && product.discount.percentage > 0;
            const discountedPrice = hasDiscount
              ? Math.round(
                  product.price * (1 - product.discount.percentage / 100)
                )
              : product.price;

            return (
              <Link
                key={product.id}
                href={`/shop/product/${product.id}`}
                className="block"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="relative bg-white rounded-2xl shadow-xl flex flex-col items-center w-full max-w-xs sm:max-w-full min-h-[480px] px-4 sm:px-6 pt-8 pb-4 transition-all mx-auto hover:shadow-2xl hover:-translate-y-1 duration-200"
                  style={{
                    boxSizing: "border-box",
                  }}
                >
                  {/* Badge Sale */}
                  {hasDiscount && (
                    <span className="absolute top-2 left-2 bg-[#FF5722] text-white text-xs font-bold px-3 py-1 rounded-tr-lg rounded-bl-lg shadow z-10">
                      -{product.discount.percentage}%
                    </span>
                  )}

                  {/* Ảnh sản phẩm */}
                  <div className="flex justify-center items-center mb-6 h-40 w-full">
                    <img
                      src={product.gallery?.[0]}
                      alt={product.title}
                      className="h-full object-contain rounded-lg mx-auto"
                      style={{ maxWidth: "80%" }}
                    />
                  </div>

                  {/* Thông tin sản phẩm */}
                  <div className="flex flex-col flex-1 w-full">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-3 text-center whitespace-normal break-words">
                      {product.title}
                    </h3>

                    {/* Dung lượng */}
                    <div
                      className="grid justify-center mb-4 w-full gap-2"
                      style={{
                        gridTemplateColumns: `repeat(3, minmax(70px, 1fr))`,
                        maxWidth: "350px",
                        margin: "0 auto",
                      }}
                    >
                      {(product.storages || []).map((storage, idx) => (
                        <span
                          key={storage.label}
                          className="bg-gray-100 text-gray-800 font-medium text-[13px] px-3 py-[6px] rounded-md min-w-[54px] text-center shadow-sm border border-gray-200"
                          style={{
                            gridColumn: (idx % 3) + 1,
                            gridRow: Math.floor(idx / 3) + 1,
                          }}
                        >
                          {storage.label}
                        </span>
                      ))}
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
                        Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ
                        hạn 3-6 tháng
                      </div>
                    </div>

                    {/* Đánh giá với ngôi sao vàng */}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
