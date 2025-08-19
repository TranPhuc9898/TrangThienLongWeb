"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Image from "next/image";

interface FlyToCartItem {
  id: string;
  imageUrl: string;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
}

interface FlyToCartProps {
  children: React.ReactNode;
}

let globalTriggerFlight:
  | ((item: Omit<FlyToCartItem, "endPosition">) => void)
  | null = null;

export const useFlyToCart = () => {
  const triggerFlight = useCallback(
    (productElement: HTMLElement, imageUrl: string) => {
      console.log("🚀 Trigger flight called:", { productElement, imageUrl });

      if (!globalTriggerFlight) {
        console.error("❌ globalTriggerFlight not found!");
        return;
      }

      // Get product position
      const productRect = productElement.getBoundingClientRect();
      console.log("📍 Product position:", productRect);

      // Find cart icon in header
      let cartIcon = document.querySelector("[data-cart-icon]");

      // Fallback selectors if main selector fails
      if (!cartIcon) {
        console.warn("⚠️ [data-cart-icon] not found, trying fallbacks...");
        cartIcon = document.querySelector('img[alt="cart"]');
      }
      if (!cartIcon) {
        cartIcon = document.querySelector('a[href="/thanh-toan"]');
      }
      if (!cartIcon) {
        console.error("❌ Cart icon not found with any selector!");
        // Set default position (top right)
        const defaultCartRect = {
          left: window.innerWidth - 100,
          top: 50,
          width: 30,
          height: 30,
          getBoundingClientRect: () => ({
            left: window.innerWidth - 100,
            top: 50,
            width: 30,
            height: 30,
          }),
        };
        cartIcon = defaultCartRect as any;
      }

      const cartRect = cartIcon?.getBoundingClientRect();
      console.log("🛒 Cart position:", cartRect);

      // Trigger flight animation
      globalTriggerFlight({
        id: Date.now().toString(),
        imageUrl,
        startPosition: {
          x: productRect.left + productRect.width / 2,
          y: productRect.top + productRect.height / 2,
        },
      });

      console.log("✅ Flight animation triggered!");
    },
    []
  );

  return { triggerFlight };
};

export const FlyToCartProvider: React.FC<FlyToCartProps> = ({ children }) => {
  const [flyingItems, setFlyingItems] = useState<FlyToCartItem[]>([]);

  const triggerFlight = useCallback(
    (item: Omit<FlyToCartItem, "endPosition">) => {
      console.log("🎬 Provider triggerFlight called:", item);

      // Find cart icon
      let cartIcon = document.querySelector("[data-cart-icon]");

      // Fallback selectors
      if (!cartIcon) {
        console.warn(
          "⚠️ Provider: [data-cart-icon] not found, trying fallbacks..."
        );
        cartIcon = document.querySelector('img[alt="cart"]');
      }
      if (!cartIcon) {
        cartIcon = document.querySelector('a[href="/thanh-toan"]');
      }
      if (!cartIcon) {
        console.error("❌ Provider: Cart icon not found with any selector!");
        // Use default position
        const defaultRect = {
          left: window.innerWidth - 100,
          top: 50,
          width: 30,
          height: 30,
          getBoundingClientRect: () => ({
            left: window.innerWidth - 100,
            top: 50,
            width: 30,
            height: 30,
          }),
        };
        cartIcon = defaultRect as any;
      }

      const cartRect = cartIcon?.getBoundingClientRect();

      const fullItem: FlyToCartItem = {
        ...item,
        endPosition: {
          x: (cartRect?.left || 0) + (cartRect?.width || 0) / 2,
          y: (cartRect?.top || 0) + (cartRect?.height || 0) / 2,
        },
      };

      console.log("🎯 Full item with positions:", fullItem);
      setFlyingItems((prev) => [...prev, fullItem]);

      // Remove item after animation
      setTimeout(() => {
        setFlyingItems((prev) => prev.filter((i) => i.id !== item.id));
        console.log("🧹 Removed flying item:", item.id);
      }, 2500); // Increased to match new 2s duration
    },
    []
  );

  // Set global trigger
  React.useEffect(() => {
    globalTriggerFlight = triggerFlight;
    return () => {
      globalTriggerFlight = null;
    };
  }, [triggerFlight]);

  return (
    <>
      {children}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {flyingItems.map((item) => (
              <FlyingProduct key={item.id} item={item} />
            ))}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

const FlyingProduct: React.FC<{ item: FlyToCartItem }> = ({ item }) => {
  const { startPosition, endPosition, imageUrl } = item;

  // Calculate control point for parabola (arc)
  const controlX = startPosition.x + (endPosition.x - startPosition.x) / 2;
  const controlY = Math.min(startPosition.y, endPosition.y) - 100; // Arc upward

  console.log("✈️ FlyingProduct rendered:", {
    startPosition,
    endPosition,
    controlX,
    controlY,
    imageUrl,
  });

  return (
    <motion.div
      initial={{
        position: "fixed",
        left: startPosition.x - 40,
        top: startPosition.y - 40,
        width: 80,
        height: 80,
        zIndex: 9999,
        pointerEvents: "none",
      }}
      animate={{
        left: [startPosition.x - 40, controlX - 40, endPosition.x - 20],
        top: [startPosition.y - 40, controlY - 40, endPosition.y - 20],
        scale: [1, 1.5, 0.5],
        opacity: [1, 1, 0.8],
      }}
      transition={{
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94], // Smooth bezier
        times: [0, 0.5, 1],
      }}
      className="rounded-lg overflow-hidden shadow-2xl bg-white border-4 border-red-500"
    >
      <Image
        src={imageUrl}
        alt="Flying product"
        width={80}
        height={80}
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

export default FlyToCartProvider;
