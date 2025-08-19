/** @format */

import { Metadata } from "next";
import ProductListSec from "@/components/common/ProductListSec";
import { mockProductsIpad } from "@/data";
import { Breadcrumbs } from "@/components/seo/SEOComponents";

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

export default function iPadPage() {
  const breadcrumbItems = [
    { name: "Trang chủ", href: "/" },
    { name: "iPad", href: "/ipad" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Banner */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/ipad/ipad.png"
          alt="iPad banner"
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
          data={mockProductsIpad}
          viewAllLink="#"
        />
      </div>
    </main>
  );
}
