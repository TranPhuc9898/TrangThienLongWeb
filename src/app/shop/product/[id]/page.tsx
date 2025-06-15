/** @format */
"use client";
import React from "react";
import { notFound } from "next/navigation";
import { mockProductsIphone } from "@/data/index";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import Product3DViewer from "@/components/threejs/Product3DViewer";

interface ProductDetailPageProps {
  params: { id: string };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const productId = Number(params.id);
  const product = mockProductsIphone.find((p) => p.id === productId);

  if (!product) return notFound();

  const hasDiscount = product.discount && product.discount.percentage > 0;
  const discountedPrice = hasDiscount
    ? Math.round(product.price * (1 - product.discount.percentage / 100))
    : product.price;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
      <BreadcrumbShop productName={product.title} />
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-lg p-6">
        {/* Ảnh sản phẩm */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <Product3DViewer modelPath="/models/iphone13/source/iPHONE.glb" />
        </div>
        {/* Thông tin sản phẩm */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-red-600 text-2xl font-bold">
              {discountedPrice.toLocaleString()}đ
            </span>
            {hasDiscount && (
              <span className="text-gray-400 line-through text-lg">
                {product.price.toLocaleString()}đ
              </span>
            )}
            {hasDiscount && (
              <span className="bg-[#FF5722] text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount.percentage}%
              </span>
            )}
          </div>
          <div className="flex gap-2 items-center text-yellow-500 text-lg">
            {Array.from({ length: Math.round(product.rating) }).map((_, i) => (
              <span key={i}>★</span>
            ))}
            <span className="text-gray-600 text-base ml-2">
              ({product.reviewCount} đánh giá)
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Dung lượng: </span>
            {product.storages.map((storage) => (
              <span
                key={storage.label}
                className="inline-block bg-gray-100 border border-gray-300 rounded px-3 py-1 mx-1 text-sm font-medium"
              >
                {storage.label}
              </span>
            ))}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Tính năng nổi bật: </span>
            {product.features.map((f, idx) => (
              <span
                key={idx}
                className="inline-block bg-blue-50 text-blue-700 rounded px-2 py-1 mx-1 text-xs"
              >
                {f}
              </span>
            ))}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Mô tả: </span>
            <span className="text-gray-700">{product.description}</span>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-lg transition">
              Mua ngay
            </button>
            <button className="bg-white border border-red-600 text-red-600 font-bold py-3 rounded-lg text-lg transition hover:bg-red-50">
              Trả góp 0% qua thẻ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
