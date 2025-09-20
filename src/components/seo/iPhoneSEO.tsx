import { Metadata } from "next";

// 🎯 iPhone-specific SEO optimization - Updated to Next.js 13+ metadata API
export const metadata: Metadata = {
  title: "iPhone Chính Hãng - Giá Tốt Nhất | TrangMobile",
  description:
    "🍎 Mua iPhone chính hãng giá tốt nhất tại TrangMobile. iPhone 15, iPhone 14, iPhone 13 Pro Max đầy đủ màu sắc, dung lượng. Bảo hành 12 tháng, trả góp 0%, giao hàng miễn phí.",
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
    url: "https://trangmobile.com/iphone",
    images: [
      {
        url: "/images/iphone-collection-seo.jpg",
        width: 1200,
        height: 630,
        alt: "iPhone Collection - TrangMobile",
      },
    ],
    siteName: "TrangMobile",
  },
  twitter: {
    card: "summary_large_image",
    title: "iPhone Chính Hãng - TrangMobile",
    description: "iPhone 15, iPhone 14 Pro Max chính hãng với giá tốt nhất",
    images: ["/images/iphone-collection-seo.jpg"],
    creator: "@thientranglong",
    site: "@thientranglong",
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
    canonical: "https://trangmobile.com/iphone",
  },
  other: {
    "geo.region": "VN",
    "geo.placename": "Ho Chi Minh City",
    "geo.position": "10.762622,106.660172",
  },
};

const iPhoneStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "iPhone Collection - TrangMobile",
  description:
    "Bộ sưu tập iPhone chính hãng đầy đủ từ iPhone 13 đến iPhone 15 Pro Max",
  url: "https://trangmobile.com/iphone",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: "20+",
    itemListElement: [
      {
        "@type": "Product",
        "@id": "https://trangmobile.com/iphone/iphone-15-pro-max",
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
        item: "https://trangmobile.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "iPhone",
        item: "https://trangmobile.com/iphone",
      },
    ],
  },
  provider: {
    "@type": "Organization",
    name: "TrangMobile",
    url: "https://trangmobile.com",
    logo: "https://trangmobile.com/images/ttl-logo.png",
  },
};

// ✅ Removed deprecated Head component - using Next.js 13+ metadata API instead
