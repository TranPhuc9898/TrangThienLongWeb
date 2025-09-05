"use client";

import React from "react";
import { PiTrashFill } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import CartCounter from "@/components/ui/CartCounter";
import { Button } from "../ui/button";
import {
  addToCart,
  CartItem,
  remove,
  removeCartItem,
} from "@/lib/features/carts/cartsSlice";
import { useAppDispatch } from "@/lib/hooks/redux";

type ProductCardProps = {
  data: CartItem;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-start space-x-4">
      <Link
        href={`/shop/product/${data.id}`}
        className="bg-[#F0EEED] rounded-lg w-full min-w-[100px] max-w-[100px] sm:max-w-[124px] aspect-square overflow-hidden"
      >
        <Image
          src={data.srcUrl}
          width={124}
          height={124}
          className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
          alt={data.name}
          priority
        />
      </Link>
      <div className="flex w-full self-stretch flex-col">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Link
              href={`/shop/product/${data.id}`}
              className="text-black font-bold text-base xl:text-xl hover:text-blue-600 transition-colors"
            >
              {data.name}
            </Link>
            {/* Hiển thị xuất xứ và tình trạng */}
            <div className="flex gap-2 mt-1">
              {data.regionCode && (
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  {data.regionCode}
                </span>
              )}
              {data.condition && (
                <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                  data.condition === "100%" || data.condition === "New"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : data.condition === "99%"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-gray-100 text-gray-800 border border-gray-200"
                }`}>
                  {data.condition === "100%" || data.condition === "New" 
                    ? "Máy mới 100%" 
                    : data.condition === "99%" 
                    ? "Like new 99%"
                    : data.condition === "Refurbished"
                    ? "Tân trang"
                    : data.condition}
                </span>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 md:h-9 md:w-9"
            onClick={() =>
              dispatch(
                remove({
                  id: data.id,
                  attributes: data.attributes,
                  quantity: data.quantity,
                })
              )
            }
          >
            <PiTrashFill className="text-xl md:text-2xl text-red-600" />
          </Button>
        </div>
        {/* Hiển thị thông tin chi tiết sản phẩm */}
        <div className="space-y-1 mt-2">
          {data.storage && (
            <div className="flex items-center">
              <span className="text-black text-xs md:text-sm mr-1 font-medium">Dung lượng:</span>
              <span className="text-black/70 text-xs md:text-sm">
                {data.storage}
              </span>
            </div>
          )}
          {data.color && (
            <div className="flex items-center">
              <span className="text-black text-xs md:text-sm mr-1 font-medium">Màu sắc:</span>
              <span className="text-black/70 text-xs md:text-sm">
                {data.color}
              </span>
            </div>
          )}
          {/* Fallback to attributes if no specific storage/color */}
          {!data.storage && !data.color && data.attributes && data.attributes.length > 0 && (
            <>
              {data.attributes[0] && (
                <div className="flex items-center">
                  <span className="text-black text-xs md:text-sm mr-1 font-medium">Dung lượng:</span>
                  <span className="text-black/70 text-xs md:text-sm">
                    {data.attributes[0]}
                  </span>
                </div>
              )}
              {data.attributes[1] && (
                <div className="flex items-center">
                  <span className="text-black text-xs md:text-sm mr-1 font-medium">Màu sắc:</span>
                  <span className="text-black/70 text-xs md:text-sm">
                    {data.attributes[1]}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex items-center flex-wrap justify-between mt-3">
          <div className="flex items-center space-x-[5px] xl:space-x-2.5">
            {data.discount.percentage > 0 ? (
              <span className="font-bold text-blue-600 text-2xl xl:text-3xl">
                {`${Math.round(
                  data.price - (data.price * data.discount.percentage) / 100
                ).toLocaleString("vi-VN")}đ`}
              </span>
            ) : data.discount.amount > 0 ? (
              <span className="font-bold text-blue-600 text-2xl xl:text-3xl">
                {`${(data.price - data.discount.amount).toLocaleString("vi-VN")}đ`}
              </span>
            ) : (
              <span className="font-bold text-blue-600 text-2xl xl:text-3xl">
                {data.price.toLocaleString("vi-VN")}đ
              </span>
            )}
            {data.discount.percentage > 0 && (
              <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
                {data.price.toLocaleString("vi-VN")}đ
              </span>
            )}
            {data.discount.amount > 0 && (
              <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
                {data.price.toLocaleString("vi-VN")}đ
              </span>
            )}
            {data.discount.percentage > 0 ? (
              <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-${data.discount.percentage}%`}
              </span>
            ) : (
              data.discount.amount > 0 && (
                <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                  {`-${data.discount.amount.toLocaleString("vi-VN")}đ`}
                </span>
              )
            )}
          </div>
          <CartCounter
            initialValue={data.quantity}
            onAdd={() => dispatch(addToCart({ ...data, quantity: 1 }))}
            onRemove={() =>
              data.quantity === 1
                ? dispatch(
                    remove({
                      id: data.id,
                      attributes: data.attributes,
                      quantity: data.quantity,
                    })
                  )
                : dispatch(
                    removeCartItem({ id: data.id, attributes: data.attributes })
                  )
            }
            isZeroDelete
            className="px-5 py-3 max-h-8 md:max-h-10 min-w-[105px] max-w-[105px] sm:max-w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
