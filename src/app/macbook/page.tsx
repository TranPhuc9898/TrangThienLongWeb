/** @format */

import { Metadata } from "next";
import ProductListSec from "@/components/common/ProductListSec";
// import { mockProductsMac } from "@/data"; // Removed mock data
import { Breadcrumbs } from "@/components/seo/SEOComponents";

export const metadata: Metadata = {
  title:
    "MacBook Air M2, MacBook Pro, iMac Chính Hãng Giá Rẻ | Trang Thiên Long",
  description:
    "Mua MacBook Air M2, MacBook Pro M2, iMac 24 inch M1 chính hãng giá tốt. Máy tính Apple với chip M-series mạnh mẽ. Bảo hành 12 tháng, trả góp 0%.",
  keywords: [
    "macbook air m2",
    "macbook pro m2",
    "imac 24 inch",
    "máy tính apple",
    "macbook chính hãng",
    "mua macbook",
    "macbook giá rẻ",
    "laptop apple",
  ],
  openGraph: {
    title: "MacBook & iMac Chính Hãng - MacBook Air M2, Pro | Trang Thiên Long",
    description:
      "Máy tính Apple MacBook và iMac với chip M-series mạnh mẽ, thiết kế đẹp, giá cạnh tranh",
    url: "https://thientranglong.vn/macbook",
    images: ["/images/iphone14.png"],
  },
  alternates: {
    canonical: "https://thientranglong.vn/macbook",
  },
};

export default function MacBookPage() {
  const breadcrumbItems = [
    { name: "Trang chủ", href: "/" },
    { name: "MacBook & iMac", href: "/macbook" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-bold">
            MacBook & iMac
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Máy tính Apple MacBook Air, MacBook Pro và iMac với chip M-series
            mạnh mẽ, thiết kế đẹp mắt và hiệu năng vượt trội
          </p>
        </div>

        <ProductListSec
          title="Tất cả MacBook & iMac"
          data={[]}
          viewAllLink="#"
        />
      </div>
    </main>
  );
}
