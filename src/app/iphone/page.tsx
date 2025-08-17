/** @format */

import { Metadata } from "next";
import ProductListSec from "@/components/common/ProductListSec";
import {
  Breadcrumbs,
  FAQSchema,
  ProductSchema,
} from "@/components/seo/SEOComponents";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "iPhone Chính Hãng Giá Rẻ Nhất 2024 - iPhone 15, 14, 13 Pro Max | Trang Thiên Long",
  description:
    "⭐ Mua iPhone chính hãng giá tốt nhất thị trường ⭐ iPhone 15 Pro Max, iPhone 14, iPhone 13 Pro Max like new 99% ⭐ Bảo hành 12 tháng ⭐ Trả góp 0% ⭐ Giao hàng toàn quốc",
  keywords: [
    "iphone",
    "mua iphone",
    "iphone chính hãng",
    "iphone giá rẻ",
    "iphone 15 pro max",
    "iphone 14 pro max",
    "iphone 13 pro max",
    "điện thoại iphone",
    "apple iphone vietnam",
    "iphone like new 99%",
    "cửa hàng iphone uy tín",
    "iphone trả góp 0%",
  ],
  openGraph: {
    title: "iPhone Chính Hãng Giá Rẻ Nhất Việt Nam 2024 | Trang Thiên Long",
    description:
      "Mua iPhone chính hãng với giá tốt nhất. iPhone 15 Pro Max, iPhone 14, iPhone 13 Pro Max. Bảo hành 12 tháng, trả góp 0%",
    url: "https://thientranglong.vn/iphone",
    images: [
      {
        url: "/images/iphone14.png",
        width: 1200,
        height: 630,
        alt: "iPhone chính hãng giá rẻ tại Trang Thiên Long",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://thientranglong.vn/iphone",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

// FAQ Data for iPhone page
const iphoneFAQs = [
  {
    question: "iPhone chính hãng và iPhone like new 99% khác gì?",
    answer:
      "iPhone chính hãng là máy mới 100% từ Apple. iPhone like new 99% là máy đã qua sử dụng nhưng được restore về trạng thái như mới, kiểm tra kỹ càng và có bảo hành 12 tháng.",
  },
  {
    question: "Mua iPhone ở đâu uy tín và giá tốt nhất?",
    answer:
      "Trang Thiên Long Mobile là đại lý ủy quyền Apple, cung cấp iPhone chính hãng với giá cạnh tranh nhất thị trường, bảo hành chính hãng 12 tháng.",
  },
  {
    question: "iPhone có được trả góp 0% lãi suất không?",
    answer:
      "Có, chúng tôi hỗ trợ trả góp 0% lãi suất cho tất cả dòng iPhone, thủ tục đơn giản, duyệt nhanh trong 15 phút.",
  },
  {
    question: "iPhone 15 Pro Max có gì mới so với iPhone 14?",
    answer:
      "iPhone 15 Pro Max có thiết kế Titanium nhẹ hơn, chip A17 Pro mạnh mẽ hơn, camera 48MP cải tiến, Action Button thay thế mute switch và cổng USB-C.",
  },
  {
    question: "Có nên mua iPhone 13 hay iPhone 14 năm 2024?",
    answer:
      "iPhone 13 vẫn rất tốt cho nhu cầu cơ bản với giá hợp lý. iPhone 14 có camera tốt hơn và Dynamic Island (bản Pro). Tùy vào ngân sách và nhu cầu sử dụng.",
  },
];

// Fetch iPhone products from API
async function getIphoneProducts() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/products`,
      {
        cache: "no-store", // Always fetch fresh data
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    // Filter products by iPhone category (case insensitive)
    const iphoneProducts = products.filter((product: any) =>
      product.category?.toLowerCase().includes("iphone")
    );

    return iphoneProducts;
  } catch (error) {
    console.error("Error fetching iPhone products:", error);
    return []; // Return empty array on error
  }
}

export default async function iPhonePage() {
  const breadcrumbItems = [
    { name: "Trang chủ", href: "/" },
    { name: "iPhone", href: "/iphone" },
  ];

  // Fetch iPhone products from API
  const iphoneProducts = await getIphoneProducts();

  return (
    <>
      <FAQSchema faqs={iphoneFAQs} />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Hero Section with Rich Content */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                iPhone Chính Hãng
                <br />
                <span className="text-blue-600">Giá Rẻ Nhất Việt Nam</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
                Mua iPhone chính hãng với giá cạnh tranh nhất thị trường. iPhone
                15 Pro Max mới nhất với Titanium Design, iPhone 14 và iPhone 13
                Pro Max like new 99% chất lượng cao. Bảo hành 12 tháng, trả góp
                0%, giao hàng toàn quốc.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="text-2xl font-bold text-green-600">
                    12 tháng
                  </div>
                  <div className="text-sm text-gray-600">
                    Bảo hành chính hãng
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="text-2xl font-bold text-blue-600">0%</div>
                  <div className="text-sm text-gray-600">Lãi suất trả góp</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="text-2xl font-bold text-red-600">99%</div>
                  <div className="text-sm text-gray-600">Like new quality</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-gray-600">Hỗ trợ khách hàng</div>
                </div>
              </div>
            </div>

            {/* iPhone Models Showcase */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="text-center">
                  <Image
                    src="/images/iphone14.png"
                    alt="iPhone 15 Pro Max"
                    width={200}
                    height={300}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">iPhone 15 Pro Max</h3>
                  <p className="text-gray-600 mb-4">
                    Titanium Design, Camera 48MP
                  </p>
                  <div className="text-2xl font-bold text-blue-600">
                    29.990.000₫
                  </div>
                  <Link
                    href="/shop/product/iphone/iphone-15-pro-max-256gb-chinh-hang"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="text-center">
                  <Image
                    src="/images/iphone14.png"
                    alt="iPhone 14 Pro Max"
                    width={200}
                    height={300}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">iPhone 14 Pro Max</h3>
                  <p className="text-gray-600 mb-4">
                    Dynamic Island, Camera 48MP
                  </p>
                  <div className="text-2xl font-bold text-blue-600">
                    24.990.000₫
                  </div>
                  <Link
                    href="/shop/product/iphone/iphone-14-pro-max-128gb-like-new"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="text-center">
                  <Image
                    src="/images/iphone13.png"
                    alt="iPhone 13 Pro Max"
                    width={200}
                    height={300}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">iPhone 13 Pro Max</h3>
                  <p className="text-gray-600 mb-4">
                    Camera Pro 12MP, A15 Bionic
                  </p>
                  <div className="text-2xl font-bold text-blue-600">
                    19.990.000₫
                  </div>
                  <Link
                    href="/shop/product/iphone/iphone-13-pro-max-256gb-99-percent"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Tại Sao Chọn Mua iPhone Tại Trang Thiên Long?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Chính Hãng 100%</h3>
                <p className="text-gray-600">
                  Đại lý ủy quyền Apple, cam kết chính hãng
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Giá Tốt Nhất</h3>
                <p className="text-gray-600">
                  Cam kết giá cạnh tranh nhất thị trường
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Trả Góp 0%</h3>
                <p className="text-gray-600">Hỗ trợ trả góp không lãi suất</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Bảo Hành 12 Tháng
                </h3>
                <p className="text-gray-600">
                  Bảo hành chính hãng Apple 12 tháng
                </p>
              </div>
            </div>
          </section>

          {/* Products Section */}
          <ProductListSec
            title="Tất Cả iPhone Chính Hãng"
            data={iphoneProducts}
            viewAllLink="/shop"
          />

          {/* iPhone Comparison Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              So Sánh iPhone 15 vs iPhone 14 vs iPhone 13
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4">Tính năng</th>
                    <th className="text-center py-4 px-4">iPhone 15 Pro Max</th>
                    <th className="text-center py-4 px-4">iPhone 14 Pro Max</th>
                    <th className="text-center py-4 px-4">iPhone 13 Pro Max</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Chip</td>
                    <td className="text-center py-4 px-4">A17 Pro</td>
                    <td className="text-center py-4 px-4">A16 Bionic</td>
                    <td className="text-center py-4 px-4">A15 Bionic</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Camera</td>
                    <td className="text-center py-4 px-4">48MP Pro</td>
                    <td className="text-center py-4 px-4">48MP</td>
                    <td className="text-center py-4 px-4">12MP Pro</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Thiết kế</td>
                    <td className="text-center py-4 px-4">Titanium</td>
                    <td className="text-center py-4 px-4">Stainless Steel</td>
                    <td className="text-center py-4 px-4">Stainless Steel</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Giá từ</td>
                    <td className="text-center py-4 px-4 text-blue-600 font-bold">
                      29.990.000₫
                    </td>
                    <td className="text-center py-4 px-4 text-blue-600 font-bold">
                      24.990.000₫
                    </td>
                    <td className="text-center py-4 px-4 text-blue-600 font-bold">
                      19.990.000₫
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Câu Hỏi Thường Gặp Về iPhone
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                {iphoneFAQs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b pb-6 last:border-b-0 last:pb-0"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Sẵn Sàng Sở Hữu iPhone Mới?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Liên hệ ngay để được tư vấn và nhận ưu đãi tốt nhất!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Xem Tất Cả iPhone
              </Link>
              <a
                href="tel:+84123456789"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Gọi Ngay: 0123 456 789
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
