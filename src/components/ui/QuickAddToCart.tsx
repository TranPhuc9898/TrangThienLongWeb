"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useToast } from "@/components/ui/toast";
import { useFlyToCart } from "@/components/ui/FlyToCart";
import { Product } from "@/types/product.types";

interface QuickAddToCartProps {
  product: Product;
  className?: string;
  showQuantity?: boolean;
}

const QuickAddToCart: React.FC<QuickAddToCartProps> = ({
  product,
  className = "",
  showQuantity = true,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const { triggerFlight } = useFlyToCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    setIsAdding(true);

    try {
      // Find the product image for animation
      const productCard = (e.currentTarget as HTMLElement).closest(
        "[data-product-card]"
      );
      if (productCard) {
        const productImage = productCard.querySelector("img");
        if (productImage) {
          triggerFlight(productImage, product.gallery[0]);
        }
      }

      dispatch(
        addToCart({
          id: product.id,
          name: product.productName || product.title,
          srcUrl: product.gallery[0],
          price: product.price,
          attributes: ["Mặc định", "Mặc định"],
          discount: product.discount,
          quantity: quantity,
        })
      );

      // Toast disabled - using fly animation instead

      // Reset quantity after successful add
      setQuantity(1);
    } catch (error) {
      addToast({
        type: "error",
        title: "Có lỗi xảy ra!",
        description: "Không thể thêm sản phẩm vào giỏ hàng",
        duration: 3000,
      });
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showQuantity && (
        <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="p-2 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3 py-2 min-w-[40px] text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            disabled={quantity >= 99}
            className="p-2 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}

      <motion.button
        onClick={handleAddToCart}
        disabled={isAdding}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg
          hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 font-medium text-sm
          ${isAdding ? "pointer-events-none" : ""}
        `}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        {isAdding ? "Đang thêm..." : "Thêm vào giỏ"}
      </motion.button>
    </div>
  );
};

export default QuickAddToCart;
