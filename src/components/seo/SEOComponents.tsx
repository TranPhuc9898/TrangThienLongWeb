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
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.href
    }))
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
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
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
    "name": product.title,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "category": product.category,
    "image": product.gallery,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "VND",
      "availability": product.inStock 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Trang Thiên Long Mobile"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    }
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
    "name": "Trang Thiên Long Mobile",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "VN",
      "addressLocality": "Hồ Chí Minh",
      "streetAddress": "123 Nguyễn Văn Cừ, Quận 1"
    },
    "telephone": "+84-xxx-xxx-xxx",
    "url": "https://thientranglong.vn",
    "logo": "https://thientranglong.vn/images/ttl.png",
    "sameAs": [
      "https://facebook.com/thientranglong",
      "https://instagram.com/thientranglong"
    ]
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
    "name": "Trang Thiên Long Mobile",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Nguyễn Văn Cừ",
      "addressLocality": "TP.HCM",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 10.762622,
      "longitude": 106.660172
    },
    "openingHours": "Mo-Su 08:00-22:00",
    "telephone": "+84-xxx-xxx-xxx",
    "priceRange": "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};