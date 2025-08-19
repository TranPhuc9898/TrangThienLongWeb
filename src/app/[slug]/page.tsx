"use client";

import ProductDetailPage from "../shop/product/[id]/page";

export default function SlugProductPage({
  params,
}: {
  params: { slug: string };
}) {
  // Reuse existing page by passing slug in place of id
  // The API already accepts id or slug
  // @ts-expect-error reuse same component signature
  return <ProductDetailPage params={{ id: params.slug }} />;
}
