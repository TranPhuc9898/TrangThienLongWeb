import { Metadata } from "next";

// 🎯 SEO Metadata cho trang iPhone
export const metadata: Metadata = {
  title: "iPhone Chính Hãng - Giá Tốt Nhất | Trang Thiên Long Mobile",
  description:
    "🍎 Mua iPhone chính hãng giá tốt nhất tại Trang Thiên Long Mobile. iPhone 15, iPhone 14, iPhone 13 Pro Max đầy đủ màu sắc, dung lượng. Bảo hành 12 tháng, trả góp 0%, giao hàng miễn phí.",
  keywords:
    "iphone chính hãng, iphone giá rẻ, iphone 15 pro max, iphone 14 pro, iphone cũ like new, iphone trả góp 0%, cửa hàng iphone uy tín, mua iphone tp hcm, iphone bảo hành chính hãng",

  openGraph: {
    title: "iPhone Chính Hãng - Giá Tốt Nhất Việt Nam",
    description:
      "Khám phá bộ sưu tập iPhone mới nhất với giá cạnh tranh nhất. Từ iPhone 15 Pro Max đến iPhone 13, đầy đủ màu sắc và dung lượng.",
    type: "website",
    url: "https://thientranglong.vn/iphone",
    images: [
      {
        url: "/images/iphone-collection-og.jpg",
        width: 1200,
        height: 630,
        alt: "iPhone Collection - Trang Thiên Long Mobile",
      },
    ],
    siteName: "Trang Thiên Long Mobile",
  },

  twitter: {
    card: "summary_large_image",
    title: "iPhone Chính Hãng - Trang Thiên Long Mobile",
    description: "iPhone 15, iPhone 14 Pro Max chính hãng với giá tốt nhất",
    images: ["/images/iphone-collection-og.jpg"],
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
    canonical: "https://thientranglong.vn/iphone",
  },

  other: {
    "geo.region": "VN",
    "geo.placename": "Ho Chi Minh City",
    "geo.position": "10.762622,106.660172",
  },
};

// 📋 Structured Data for iPhone Collection
const structuredData = {
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
      {
        "@type": "Product",
        "@id": "https://thientranglong.vn/iphone/iphone-14-pro",
        name: "iPhone 14 Pro",
        category: "Smartphone",
        brand: {
          "@type": "Brand",
          name: "Apple",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "VND",
          lowPrice: "24990000",
          highPrice: "34990000",
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

export default function iPhoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Breadcrumb Schema */}
      <nav aria-label="Breadcrumb" className="hidden">
        <ol itemScope itemType="https://schema.org/BreadcrumbList">
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <a href="/" itemProp="item">
              <span itemProp="name">Trang chủ</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <span itemProp="name">iPhone</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {children}
    </>
  );
}
