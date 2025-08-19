/** @format */

import React from "react";
import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import QuickAddToCart from "../ui/QuickAddToCart";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <div
      data-product-card
      className="flex flex-col items-start aspect-auto group"
    >
      <Link href={`/${data.slug}`} className="block w-full">
        <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden relative">
          <Image
            src={(() => {
              try {
                const gallery =
                  typeof data.gallery === "string"
                    ? JSON.parse(data.gallery)
                    : data.gallery;
                return Array.isArray(gallery) && gallery[0]
                  ? gallery[0]
                  : "/images/iphone14.png";
              } catch {
                return "/images/iphone14.png";
              }
            })()}
            width={295}
            height={298}
            className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
            alt={data.title || data.productName || "Product"}
            priority
          />

          {/* Quick Add to Cart - Hiển thị khi hover */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <QuickAddToCart
              product={data}
              className="w-full justify-center"
              showQuantity={false}
            />
          </div>
        </div>
      </Link>

      <Link href={`/${data.slug}`} className="block w-full">
        <strong className="text-black xl:text-xl hover:text-blue-600 transition-colors">
          {data.productName || data.title}
        </strong>

        {data.condition && (
          <div className="mt-1">
            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {data.condition}
            </span>
          </div>
        )}
        <div className="flex items-end mb-1 xl:mb-2">
          <Rating
            initialValue={data.rating}
            allowFraction
            SVGclassName="inline-block"
            emptyClassName="fill-gray-50"
            size={19}
            readonly
          />
          <span className="text-black text-xs xl:text-sm ml-[11px] xl:ml-[13px] pb-0.5 xl:pb-0">
            {(data.rating || 0).toFixed(1)}
            <span className="text-black/60">/5</span>
          </span>
        </div>
        <div className="flex items-center space-x-[5px] xl:space-x-2.5">
          {(() => {
            const match = data.discount
              ? String(data.discount).match(/-?(\d+)\s*%/)
              : null;
            const percent = match ? parseInt(match[1], 10) : 0;
            const basePrice =
              Number(
                String(data.basePrice || data.price || 0).replace(/\D/g, "")
              ) || 0;
            const discountedPrice =
              percent > 0
                ? Math.round(basePrice * (1 - percent / 100))
                : basePrice;

            return (
              <>
                <span className="font-bold text-red-600 text-xl xl:text-2xl">
                  {discountedPrice.toLocaleString("vi-VN")}đ
                </span>
                {percent > 0 && (
                  <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
                    {basePrice.toLocaleString("vi-VN")}đ
                  </span>
                )}
                {percent > 0 && (
                  <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                    -{percent}%
                  </span>
                )}
              </>
            );
          })()}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
