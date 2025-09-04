"use client";

import React from "react";
import { Product } from "@/types/product.types";

interface GoogleShoppingProductSchemaProps {
  product: Product;
  imageUrl?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  condition?: "NewCondition" | "UsedCondition" | "RefurbishedCondition";
  priceValidUntil?: string;
}

export const GoogleShoppingProductSchema: React.FC<GoogleShoppingProductSchemaProps> = ({
  product,
  imageUrl,
  availability = "InStock",
  condition = "NewCondition",
  priceValidUntil
}) => {
  // Generate GTIN (Global Trade Item Number) - using product ID as placeholder
  // In production, this should be the actual GTIN/EAN/UPC code
  const gtin = product.id ? `8${product.id.toString().padStart(12, '0')}` : undefined;

  // Get the first image or use placeholder
  const productImage = imageUrl || product.images?.[0] || "/images/ttl.png";
  
  // Ensure absolute URL for images
  const getAbsoluteUrl = (url: string) => {
    if (url.startsWith('http')) return url;
    return `https://trangmobile.com${url.startsWith('/') ? url : `/${url}`}`;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.productName || product.name,
    description: product.description || `${product.productName || product.name} chính hãng, giá tốt nhất tại Trang Thiên Long Mobile`,
    image: [getAbsoluteUrl(productImage)],
    brand: {
      "@type": "Brand",
      name: "Apple"
    },
    sku: product.sku || `SKU-${product.id}`,
    gtin: gtin,
    mpn: product.mpn || `MPN-${product.id}`,
    offers: {
      "@type": "Offer",
      url: `https://trangmobile.com/shop/product/${product.id}`,
      priceCurrency: "VND",
      price: product.price,
      priceValidUntil: priceValidUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: `https://schema.org/${availability}`,
      itemCondition: `https://schema.org/${condition}`,
      seller: {
        "@type": "Organization",
        name: "Trang Thiên Long Mobile"
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "VND"
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "VN"
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY"
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY"
          }
        }
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "VN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn"
      }
    },
    aggregateRating: product.rating ? {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 100
    } : undefined,
    review: product.reviews?.map((review: any) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5
      },
      author: {
        "@type": "Person",
        name: review.user
      },
      reviewBody: review.content,
      datePublished: review.date
    })) || []
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Enhanced Product Schema for category pages
export const GoogleShoppingCategorySchema: React.FC<{ products: Product[] }> = ({ products }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.productName || product.name,
        image: product.images?.[0] ? `https://trangmobile.com${product.images[0]}` : "https://trangmobile.com/images/ttl.png",
        url: `https://trangmobile.com/shop/product/${product.id}`,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "VND",
          availability: "https://schema.org/InStock"
        }
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