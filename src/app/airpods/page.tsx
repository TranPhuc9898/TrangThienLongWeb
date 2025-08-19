/** @format */

import { Metadata } from "next";
import ProductListSec from "@/components/common/ProductListSec";
// import { mockProductsAirPods } from "@/data"; // Removed mock data
import { Breadcrumbs } from "@/components/seo/SEOComponents";

export const metadata: Metadata = {
  title:
    "AirPods Pro 2, AirPods 3, AirPods Max Chính Hãng Giá Rẻ | Trang Thiên Long",
  description:
    "Mua AirPods Pro 2, AirPods 3, AirPods Max chính hãng giá tốt. Tai nghe không dây Apple với Spatial Audio, Active Noise Cancellation. Bảo hành 12 tháng.",
  keywords: [
    "airpods pro 2",
    "airpods 3",
    "airpods max",
    "tai nghe apple",
    "airpods chính hãng",
    "mua airpods",
    "airpods giá rẻ",
    "tai nghe không dây apple",
  ],
  openGraph: {
    title: "AirPods Chính Hãng - Pro 2, AirPods 3, Max | Trang Thiên Long",
    description:
      "Tai nghe không dây Apple AirPods với chất lượng âm thanh tuyệt vời, giá cạnh tranh",
    url: "https://thientranglong.vn/airpods",
    images: ["/images/iphone14.png"],
  },
  alternates: {
    canonical: "https://thientranglong.vn/airpods",
  },
};

export default function AirPodsPage() {
  const breadcrumbItems = [
    { name: "Trang chủ", href: "/" },
    { name: "AirPods", href: "/airpods" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-bold">
            AirPods
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tai nghe không dây Apple AirPods với Spatial Audio, Active Noise
            Cancellation và chất lượng âm thanh tuyệt vời
          </p>
        </div>

        <ProductListSec title="Tất cả AirPods" data={[]} viewAllLink="#" />
      </div>
    </main>
  );
}
