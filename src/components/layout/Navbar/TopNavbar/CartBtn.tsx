/** @format */

// CartBtn.tsx
"use client";
import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CartBtnProps {
  className?: string; // Nhận prop className
}

const CartBtn: React.FC<CartBtnProps> = ({ className = "" }) => {
  const { cart } = useAppSelector((state: RootState) => state.carts);

  return (
    <Link
      href="/thanh-toan"
      className={"relative flex items-center justify-center " + className}
    >
      <Image
        priority
        src="/icons/cart.svg"
        height={30}
        width={30}
        alt="cart"
        className="w-[28px] h-[28px] md:w-[30px] md:h-[30px]"
      />
      {cart && cart.totalQuantities > 0 && (
        <span className="border bg-black text-white rounded-full px-1 text-xs absolute -top-3 left-1/2 -translate-x-1/2">
          {cart.totalQuantities}
        </span>
      )}
    </Link>
  );
};

export default CartBtn;
