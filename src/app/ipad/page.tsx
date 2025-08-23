/** @format */

import { Metadata } from "next";
import ProductListSec from "@/components/common/ProductListSec";
import {
  Breadcrumbs,
  ProductCollectionSchema,
  ImageSchema,
} from "@/components/seo/SEOComponents";
import { Product } from "@/types/product.types";

export const metadata: Metadata = {
  title:
    "iPad Chính Hãng Giá Rẻ - iPad Pro, iPad Air, iPad Mini | Trang Thiên Long",
  description:
    "Mua iPad Pro M2, iPad Air, iPad Mini chính hãng giá tốt nhất. Bảo hành 12 tháng, trả góp 0%. Showroom tại TP.HCM. iPad like new 99% chất lượng cao.",
  keywords: [
    "ipad chính hãng",
    "ipad pro m2",
    "ipad air 5",
    "ipad mini",
    "ipad giá rẻ",
    "mua ipad ở đâu",
    "ipad like new 99%",
  ],
  openGraph: {
    title: "iPad Chính Hãng - iPad Pro M2, iPad Air | Trang Thiên Long",
    description:
      "iPad Pro M2 với chip mạnh mẽ, iPad Air mỏng nhẹ, giá cạnh tranh nhất thị trường",
    url: "https://thientranglong.vn/ipad",
    images: ["/images/iphone14.png"],
  },
  alternates: {
    canonical: "https://thientranglong.vn/ipad",
  },
};

import Image from "next/image";

// Fetch iPad products for SEO
async function getIpadProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const products = await response.json();
    return products.filter((p: Product) =>
      p.category?.toLowerCase().includes("ipad")
    );
  } catch (error) {
    console.error("Error fetching iPad products:", error);
    return [];
  }
}

export default async function iPadPage() {
  const ipadProducts = await getIpadProducts();
  const breadcrumbItems = [
    { name: "Trang chủ", href: "/" },
    { name: "iPad", href: "/ipad" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Product Collection Schema for SEO */}
      <ProductCollectionSchema products={ipadProducts} />

      {/* Image Schema for SEO */}
      <ImageSchema
        images={ipadProducts.map((product) => ({
          url: product.thumbnail || "/images/ipad/ipad.png",
          alt: `${
            product.productName || product.title
          } - iPad Chính Hãng | Trang Thiên Long`,
          caption: `${product.productName || product.title} ${
            product.condition || "99%"
          } chính hãng`,
          width: 1200,
          height: 630,
        }))}
        primaryImage={{
          url: "/images/ipad/ipad.png",
          alt: "iPad Collection - iPad Pro, iPad Air, iPad Mini Chính Hãng | Trang Thiên Long",
          caption: "Bộ sưu tập iPad chính hãng với giá tốt nhất",
          width: 1200,
          height: 630,
        }}
      />

      {/* Banner */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/ipad/ipad.png"
          alt="iPad Chính Hãng - iPad Pro, iPad Air, iPad Mini | Trang Thiên Long"
          fill
          priority
          className="object-cover"
        />
        <div className="relative h-[360px] sm:h-[440px] lg:h-[520px]" />
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            iPad Chính Hãng
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            iPad Pro M2 mạnh mẽ, iPad Air mỏng nhẹ, iPad thế hệ mới với giá cả
            cạnh tranh nhất thị trường
          </p>
        </div>

        <ProductListSec
          title="Tất cả iPad"
          data={ipadProducts}
          viewAllLink="#"
        />
      </div>
    </main>
  );
}
