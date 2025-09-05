import { Metadata } from "next";
import BlogListing from "@/components/blog/BlogListing";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog - Tin tức Apple, iPhone, iPad mới nhất | Trang Thiên Long Mobile",
  description: "Cập nhật tin tức Apple mới nhất, đánh giá iPhone 15, iPad, MacBook chi tiết. Hướng dẫn sử dụng iOS, macOS và tips công nghệ hữu ích.",
  keywords: [
    "tin tức apple",
    "đánh giá iphone 15",
    "review ipad",
    "hướng dẫn ios 17",
    "so sánh iphone",
    "tips iphone",
    "tin công nghệ apple"
  ],
  openGraph: {
    title: "Blog Công Nghệ Apple - Trang Thiên Long Mobile",
    description: "Nơi cập nhật tin tức, đánh giá và hướng dẫn về sản phẩm Apple",
    type: "website",
    url: "https://trangmobile.com/blog"
  },
  alternates: {
    canonical: "https://trangmobile.com/blog"
  }
};

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* SEO H1 */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Blog Tin Tức Apple & Công Nghệ
      </h1>

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a href="/" itemProp="item">
              <span itemProp="name">Trang chủ</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <li>/</li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name" className="text-gray-600">Blog</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <BlogListing posts={blogPosts} />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <BlogSidebar />
        </aside>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "iPhone 15 Pro Max có gì mới?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "iPhone 15 Pro Max có chip A17 Pro mới, camera 48MP với zoom 5x, khung titan nhẹ hơn 19%, và nút Action Button có thể tùy chỉnh."
                }
              },
              {
                "@type": "Question",
                "name": "Nên mua iPhone nào trong năm 2024?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tùy theo nhu cầu: iPhone 15 Pro cho hiệu năng cao nhất, iPhone 15 cho cân bằng giá/hiệu năng, iPhone 14 cho ngân sách tầm trung, iPhone SE cho ngân sách tiết kiệm."
                }
              },
              {
                "@type": "Question",
                "name": "Bảo hành iPhone tại Trang Thiên Long như thế nào?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trang Thiên Long cung cấp bảo hành 12 tháng cho tất cả iPhone, hỗ trợ 1 đổi 1 trong 30 ngày nếu lỗi từ nhà sản xuất."
                }
              }
            ]
          })
        }}
      />
    </main>
  );
}