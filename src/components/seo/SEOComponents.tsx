/** @format */

"use client";

import React from "react";
import { Product } from "@/types/product.types";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://thientranglong.vn${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {items.map((item, index) => (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <a
                href={item.href}
                className={`inline-flex items-center text-sm font-medium ${
                  index === items.length - 1
                    ? "text-gray-500 cursor-default"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

interface ProductSchemaProps {
  product: Product;
}

export const ProductSchema: React.FC<ProductSchemaProps> = ({ product }) => {
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.productName || product.title,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    image: product.gallery.map((img) => `https://thientranglong.vn${img}`),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "VND",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Trang Thiên Long Mobile",
        url: "https://thientranglong.vn",
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: product.rating,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: "Khách hàng Trang Thiên Long",
        },
        reviewBody: `${
          product.productName || product.title
        } chất lượng tuyệt vời, giá cả hợp lý. Rất hài lòng với sản phẩm.`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const OrganizationSchema: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    name: "Trang Thiên Long Mobile",
    alternateName: "TTL Mobile",
    url: "https://thientranglong.vn",
    logo: "https://thientranglong.vn/images/ttl.png",
    description:
      "Cửa hàng điện thoại iPhone, iPad, Apple Watch, AirPods, MacBook chính hãng với giá tốt nhất Việt Nam",
    address: {
      "@type": "PostalAddress",
      addressCountry: "VN",
      addressLocality: "Hồ Chí Minh",
      addressRegion: "TP.HCM",
      streetAddress: "123 Nguyễn Văn Cừ, Quận 1",
      postalCode: "70000",
    },
    telephone: "+84-xxx-xxx-xxx",
    email: "info@thientranglong.vn",
    sameAs: [
      "https://facebook.com/thientranglong",
      "https://instagram.com/thientranglong",
      "https://youtube.com/thientranglong",
      "https://tiktok.com/@thientranglong",
    ],
    foundingDate: "2020-01-01",
    founder: {
      "@type": "Person",
      name: "Thiên Trang Long",
    },
    paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Bank Transfer"],
    currenciesAccepted: "VND",
    openingHours: "Mo-Su 08:00-22:00",
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Apple Products",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "iPhone",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "iPhone 15 Pro Max",
              },
            },
          ],
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const LocalBusinessSchema: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    name: "Trang Thiên Long Mobile",
    "@id": "https://thientranglong.vn/#business",
    url: "https://thientranglong.vn",
    telephone: "+84-xxx-xxx-xxx",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Nguyễn Văn Cừ",
      addressLocality: "Quận 1",
      addressRegion: "TP.HCM",
      postalCode: "70000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.762622,
      longitude: 106.660172,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "22:00",
      },
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      reviewCount: 1250,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: "Nguyễn Văn A",
        },
        reviewBody:
          "Cửa hàng uy tín, iPhone chính hãng, giá tốt, nhân viên tư vấn nhiệt tình.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// New: Website Schema for better site understanding
export const WebsiteSchema: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Trang Thiên Long Mobile",
    alternateName: "TTL Mobile",
    url: "https://thientranglong.vn",
    description:
      "Website bán iPhone, iPad, Apple Watch, AirPods, MacBook chính hãng giá rẻ nhất Việt Nam",
    publisher: {
      "@type": "Organization",
      name: "Trang Thiên Long Mobile",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://thientranglong.vn/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      "https://facebook.com/thientranglong",
      "https://instagram.com/thientranglong",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// New: Product Collection Schema for iPhone category
export const ProductCollectionSchema: React.FC<{ products: Product[] }> = ({
  products,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "iPhone Chính Hãng Giá Rẻ",
    description: "Bộ sưu tập iPhone chính hãng với giá tốt nhất thị trường",
    url: "https://thientranglong.vn/iphone",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "Product",
        position: index + 1,
        name: product.productName || product.title,
        description: product.description,
        image: `https://thientranglong.vn${product.gallery[0]}`,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "VND",
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
