import Head from "next/head";
import { Metadata } from "next";

// 🎯 iPhone-specific SEO optimization
export const metadata: Metadata = {
  title: "iPhone Chính Hãng - Giá Tốt Nhất | Trang Thiên Long Mobile",
  description:
    "🍎 Mua iPhone chính hãng giá tốt nhất tại Trang Thiên Long Mobile. iPhone 15, iPhone 14, iPhone 13 Pro Max đầy đủ màu sắc, dung lượng. Bảo hành 12 tháng, trả góp 0%, giao hàng miễn phí.",
  keywords: [
    "iphone chinh hang",
    "iphone gia re",
    "iphone 15 pro max",
    "iphone 14 pro",
    "iphone cu like new",
    "iphone tra gop 0%",
    "cua hang iphone uy tin",
    "mua iphone tp hcm",
    "iphone bao hanh chinh hang",
  ],
  openGraph: {
    title: "iPhone Chính Hãng - Giá Tốt Nhất Việt Nam",
    description:
      "Khám phá bộ sưu tập iPhone mới nhất với giá cạnh tranh nhất. Từ iPhone 15 Pro Max đến iPhone 13, đầy đủ màu sắc và dung lượng.",
    type: "website",
    images: [
      {
        url: "/images/iphone-collection-seo.jpg",
        width: 1200,
        height: 630,
        alt: "iPhone Collection - Trang Thiên Long Mobile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iPhone Chính Hãng - Trang Thiên Long Mobile",
    description: "iPhone 15, iPhone 14 Pro Max chính hãng với giá tốt nhất",
    images: ["/images/iphone-collection-seo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://thientranglong.vn/iphone",
  },
};

const iPhoneStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "iPhone Collection - Trang Thiên Long Mobile",
  description:
    "Bộ sưu tập iPhone chính hãng đầy đủ từ iPhone 13 đến iPhone 15 Pro Max",
  url: "https://thientranglong.vn/iphone",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: "20+",
    itemListElement: [
      {
        "@type": "Product",
        "@id": "https://thientranglong.vn/iphone/iphone-15-pro-max",
        name: "iPhone 15 Pro Max",
        category: "Smartphone",
        brand: {
          "@type": "Brand",
          name: "Apple",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "VND",
          lowPrice: "29990000",
          highPrice: "45990000",
          offerCount: "4",
        },
      },
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://thientranglong.vn",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "iPhone",
        item: "https://thientranglong.vn/iphone",
      },
    ],
  },
  provider: {
    "@type": "Organization",
    name: "Trang Thiên Long Mobile",
    url: "https://thientranglong.vn",
    logo: "https://thientranglong.vn/images/ttl-logo.png",
  },
};

const SEOHead: React.FC = () => {
  return (
    <Head>
      {/* Core Meta Tags */}
      <title>iPhone Chính Hãng - Giá Tốt Nhất | Trang Thiên Long Mobile</title>
      <meta
        name="description"
        content="🍎 Mua iPhone chính hãng giá tốt nhất tại Trang Thiên Long Mobile. iPhone 15, iPhone 14, iPhone 13 Pro Max đầy đủ màu sắc, dung lượng. Bảo hành 12 tháng, trả góp 0%, giao hàng miễn phí."
      />
      <meta
        name="keywords"
        content="iphone chính hãng, iphone giá rẻ, iphone 15 pro max, iphone 14 pro, iphone cũ like new, iphone trả góp 0%, cửa hàng iphone uy tín, mua iphone tp hcm, iphone bảo hành chính hãng"
      />

      {/* Open Graph */}
      <meta
        property="og:title"
        content="iPhone Chính Hãng - Giá Tốt Nhất Việt Nam"
      />
      <meta
        property="og:description"
        content="Khám phá bộ sưu tập iPhone mới nhất với giá cạnh tranh nhất. Từ iPhone 15 Pro Max đến iPhone 13, đầy đủ màu sắc và dung lượng."
      />
      <meta
        property="og:image"
        content="https://thientranglong.vn/images/iphone-collection-seo.jpg"
      />
      <meta property="og:url" content="https://thientranglong.vn/iphone" />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="iPhone Chính Hãng - Trang Thiên Long Mobile"
      />
      <meta
        name="twitter:description"
        content="iPhone 15, iPhone 14 Pro Max chính hãng với giá tốt nhất"
      />
      <meta
        name="twitter:image"
        content="https://thientranglong.vn/images/iphone-collection-seo.jpg"
      />

      {/* Canonical URL */}
      <link rel="canonical" href="https://thientranglong.vn/iphone" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(iPhoneStructuredData),
        }}
      />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta
        name="googlebot"
        content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Language" content="vi" />

      {/* Preload Critical Resources */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </Head>
  );
};

export default SEOHead;
