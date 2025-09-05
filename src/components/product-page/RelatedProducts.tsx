"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product.types";
import { formatPrice } from "@/lib/utils";

interface RelatedProductsProps {
  currentProduct: Product;
  category?: string;
  limit?: number;
}

export default function RelatedProducts({
  currentProduct,
  category,
  limit = 8
}: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedProducts();
  }, [currentProduct.id]);

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const allProducts = await response.json();
      
      // Filter related products
      const related = allProducts.filter((product: Product) => {
        // Don't include current product
        if (product.id === currentProduct.id) return false;
        
        // Filter by category if provided
        if (category) {
          return product.category?.toLowerCase() === category.toLowerCase();
        }
        
        // Otherwise filter by same category as current product
        return product.category?.toLowerCase() === currentProduct.category?.toLowerCase();
      });

      // Shuffle and limit
      const shuffled = related.sort(() => 0.5 - Math.random());
      setRelatedProducts(shuffled.slice(0, limit));
    } catch (error) {
      console.error('Error fetching related products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50" aria-labelledby="related-products-heading">
      <div className="container mx-auto px-4">
        <h2 id="related-products-heading" className="text-2xl md:text-3xl font-bold mb-8">
          Sản phẩm liên quan
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop/product/${product.slug || product.id}`}
              className="group"
            >
              <article 
                className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-full"
                itemScope 
                itemType="https://schema.org/Product"
              >
                {/* Product Image */}
                <div className="aspect-square relative overflow-hidden bg-gray-50 rounded-t-lg">
                  <Image
                    src={product.thumbnail || "/placeholder.jpg"}
                    alt={`${product.productName || product.title} - ${product.condition || ""}`.trim()}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                  
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discount}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-sm md:text-base mb-1 line-clamp-2" itemProp="name">
                    {product.productName || product.title}
                  </h3>

                  {/* Display variant info if available */}
                  {product.variants && product.variants.length > 0 && (
                    <p className="text-xs text-gray-600 mb-2">
                      {product.variants.length} phiên bản
                    </p>
                  )}

                  <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <span className="text-lg font-bold text-red-600" itemProp="price">
                      {formatPrice(product.basePrice || product.price || 0)}
                    </span>
                    {product.originalPrice && product.originalPrice > (product.basePrice || product.price || 0) && (
                      <span className="text-xs text-gray-400 line-through ml-2">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    <meta itemProp="priceCurrency" content="VND" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Internal Links for SEO */}
        <div className="mt-8 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">Khám phá thêm</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/iphone" className="text-blue-600 hover:underline">
              iPhone chính hãng
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/iphone/iphone-15" className="text-blue-600 hover:underline">
              iPhone 15 Series
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/iphone/iphone-14" className="text-blue-600 hover:underline">
              iPhone 14 Series
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/ipad" className="text-blue-600 hover:underline">
              iPad Pro & Air
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/mac" className="text-blue-600 hover:underline">
              MacBook
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/apple-watch" className="text-blue-600 hover:underline">
              Apple Watch
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/airpods" className="text-blue-600 hover:underline">
              AirPods
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/deal-hot-hom-nay" className="text-red-600 hover:underline font-semibold">
              Deal Hot Hôm Nay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}