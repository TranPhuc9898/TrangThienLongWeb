"use client";

import { Product } from "@/types/product.types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface ModernProductSectionProps {
  id: string;
  title: string;
  products: Product[];
  backgroundImage?: string;
}

export default function ModernProductSection({
  id,
  title,
  products,
  backgroundImage,
}: ModernProductSectionProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      className="py-16 relative overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-white/80 text-lg">
            Khám phá bộ sưu tập {title} mới nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <Card
              key={product.id}
              className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 overflow-hidden group"
            >
              <Link href={`/shop/product/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.images?.[0] || "/images/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-apple-blue">
                      {formatPrice(product.price)}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {products.length > 8 && (
          <div className="text-center mt-8">
            <Button
              asChild
              className="bg-apple-blue hover:bg-apple-blue/90 text-white px-8 py-3"
            >
              <Link href={`/shop?category=${title.toLowerCase()}`}>
                Xem thêm {title}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}