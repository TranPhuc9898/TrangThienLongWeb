/** @format */

"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { Product } from "@/types/product.types";
import { useToast } from "@/components/ui/toast";
import React from "react";

const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const { sizeSelection, colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );

  const handleAddToCart = () => {
    try {
      dispatch(
        addToCart({
          id: Number(data.id) || 0,
          name: data.title || data.productName || "Product",
          srcUrl:
            (data.gallery && data.gallery[0]) ||
            data.thumbnail ||
            "/images/iphone14.png",
          price: Number(data.price || data.basePrice || 0),
          attributes: [
            sizeSelection || "Mặc định",
            colorSelection?.name || "Mặc định",
          ],
          discount: { amount: 0, percentage: 0 },
          quantity: data.quantity,
        })
      );

      // Show success toast
      addToast({
        type: "success",
        title: "Thêm vào giỏ hàng thành công!",
        description: `${data.title} (x${data.quantity})`,
        duration: 3000,
      });
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
    <button
      type="button"
      className="bg-black w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-black/80 transition-all duration-200 hover:scale-105 active:scale-95"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
