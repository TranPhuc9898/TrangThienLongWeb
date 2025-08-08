/** @format */
"use client";
import React from "react";
import BreadcrumbProduct from "../../components/product-page/BreadcrumbProduct";
import { mockProductsIphone } from "../../data";
import FeaturedProducts from "../../components/ProductSection/components/FeaturedProducts";

export default function SanPhamIphonePage() {
  return (
    <main className="container mx-auto py-8">
      <BreadcrumbProduct title="iPhone" />
      <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm iPhone</h1>
      <FeaturedProducts products={mockProductsIphone} />
    </main>
  );
}
