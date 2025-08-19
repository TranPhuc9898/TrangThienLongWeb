"use client";

import ProductDetailPage from "../shop/product/[id]/page";

export default function SlugProductPage({
  params,
}: {
  params: { slug: string };
}) {
  // Reuse existing page by passing slug in place of id (API accepts id or slug)
  return (
    // @ts-ignore - reusing component with same prop shape
    <ProductDetailPage params={{ id: params.slug }} />
  );
}
