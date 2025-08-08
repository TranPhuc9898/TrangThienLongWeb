/** @format */

import { Metadata } from "next";
import ProductListSec from "@/components/common/ProductListSec";
import { mockProductsIphone } from "@/data";
import { Breadcrumbs } from "@/components/seo/SEOComponents";

export const metadata: Metadata = {
  title: "iPhone 15 Pro Max, iPhone 14, iPhone 13 Chính Hãng Giá Rẻ | Trang Thiên Long",
  description: "Mua iPhone 15 Pro Max, iPhone 14, iPhone 13 chính hãng giá tốt nhất. iPhone like new 99% chất lượng cao. Bảo hành 12 tháng, trả góp 0%. Showroom tại TP.HCM.",
  keywords: [
    "iphone 15 pro max",
    "iphone 14 pro max",
    "iphone 13 pro max",
    "iphone chính hãng",
    "iphone giá rẻ",
    "mua iphone ở đâu", 
    "iphone like new 99%",
    "điện thoại apple"
  ],
  openGraph: {
    title: "iPhone Chính Hãng - iPhone 15, 14, 13 Pro Max | Trang Thiên Long",
    description: "iPhone mới nhất với giá cạnh tranh nhất thị trường, chất lượng like new 99%",
    url: "https://thientranglong.vn/iphone",
    images: ["/images/iphone14.png"]
  },
  alternates: {
    canonical: "https://thientranglong.vn/iphone"
  }
};

export default function iPhonePage() {
  const breadcrumbItems = [
    { name: "Trang chủ", href: "/" },
    { name: "iPhone", href: "/iphone" }
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-bold">
            iPhone Chính Hãng
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            iPhone 15 Pro Max mới nhất với Titanium Design, iPhone 14 và iPhone 13 Pro Max với giá cả cạnh tranh nhất thị trường
          </p>
        </div>

        <ProductListSec
          title="Tất cả iPhone"
          data={mockProductsIphone}
          viewAllLink="#"
        />
      </div>
    </main>
  );
}