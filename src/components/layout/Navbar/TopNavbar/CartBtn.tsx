/** @format */

// CartBtn.tsx
"use client";
import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CartBtnProps {
  className?: string; // Nhận prop className
}

const CartBtn: React.FC<CartBtnProps> = ({ className = "" }) => {
  const { cart } = useAppSelector((state: RootState) => state.carts);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevQuantity, setPrevQuantity] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Wait for persistence rehydration before showing counter
  useEffect(() => {
    // Small delay to ensure Redux persistence has completed
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Animate when cart quantity changes
  useEffect(() => {
    const currentQuantity = cart?.totalQuantities || 0;

    if (currentQuantity > prevQuantity && isReady) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
    setPrevQuantity(currentQuantity);
  }, [cart?.totalQuantities, prevQuantity, isReady]);

  // Get display quantity
  const displayQuantity = cart?.totalQuantities || 0;

  return (
    <Link
      href="/gio-hang"
      className={`relative flex items-center justify-center group hover:scale-110 transition-transform duration-200 ${className}`}
    >
      <div data-cart-icon>
        <Image
          priority
          src="/icons/cart.svg"
          height={30}
          width={30}
          alt="cart"
          className="w-[28px] h-[28px] md:w-[30px] md:h-[30px] group-hover:opacity-80 transition-opacity"
        />
      </div>
      {/* Show counter only when ready and has items */}
      {isReady && displayQuantity > 0 && (
        <span
          className={`
            border bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs font-medium
            absolute -top-2 -right-2 min-w-[18px] text-center
            transition-all duration-200 shadow-sm
            ${isAnimating ? "animate-cart-bounce scale-125" : ""}
          `}
        >
          {displayQuantity}
        </span>
      )}
    </Link>
  );
};

export default CartBtn;
