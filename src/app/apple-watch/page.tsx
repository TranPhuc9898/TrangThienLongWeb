/** @format */

import { Metadata } from "next";
import ProductListSec from "@/components/common/ProductListSec";
import { mockProductsWatch } from "@/data";
import { Breadcrumbs } from "@/components/seo/SEOComponents";

export const metadata: Metadata = {
  title: "Apple Watch Series 9, Ultra 2, SE - Apple Watch Chính Hãng | Trang Thiên Long",
  description: "Mua Apple Watch Series 9, Ultra 2, SE chính hãng giá tốt. Đồng hồ thông minh Apple Watch với tính năng sức khỏe tiên tiến. Bảo hành 12 tháng.",
  keywords: [
    "apple watch series 9",
    "apple watch ultra 2",
    "apple watch se",
    "đồng hồ apple watch",
    "apple watch chính hãng",
    "mua apple watch",
    "apple watch giá rẻ"
  ],
  openGraph: {
    title: "Apple Watch Chính Hãng - Series 9, Ultra 2, SE | Trang Thiên Long",
    description: "Apple Watch với tính năng sức khỏe tiên tiến, thiết kế đẹp mắt, giá cạnh tranh",
    url: "https://thientranglong.vn/apple-watch",
    images: ["/images/iphone14.png"]
  },
  alternates: {
    canonical: "https://thientranglong.vn/apple-watch"
  }
};

export default function AppleWatchPage() {
  const breadcrumbItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Apple Watch", href: "/apple-watch" }
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-bold">
            Apple Watch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Đồng hồ thông minh Apple Watch với tính năng sức khỏe tiên tiến, thiết kế đẹp mắt và hiệu năng vượt trội
          </p>
        </div>

        <ProductListSec
          title="Tất cả Apple Watch"
          data={mockProductsWatch}
          viewAllLink="#"
        />
      </div>
    </main>
  );
}