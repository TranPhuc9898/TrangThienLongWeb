import { Metadata } from "next";
import ProductDetailPage from "../shop/product/[id]/page";

// Fetch product data for metadata generation
async function getProductForMetadata(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const products = await response.json();
    return products.find((p: any) => p.slug === slug || p.id === slug);
  } catch (error) {
    console.error("Error fetching product for metadata:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductForMetadata(params.slug);

  if (!product) {
    return {
      title: "Sản phẩm không tìm thấy | Trang Thiên Long Mobile",
      description: "Sản phẩm bạn tìm kiếm không tồn tại hoặc đã được xóa.",
    };
  }

  const productPrice = product.basePrice || product.price || "0";
  const formattedPrice =
    typeof productPrice === "bigint"
      ? Number(productPrice).toLocaleString("vi-VN")
      : productPrice.toString();

  return {
    title: `${
      product.productName || product.title
    } - Chính Hãng Giá Tốt Nhất | TTL Mobile`,
    description: `${
      product.productName || product.title
    } chính hãng giá ${formattedPrice}đ. ${
      product.condition || "99%"
    }. Bảo hành 12 tháng, trả góp 0%. Giao hàng toàn quốc.`,
    keywords: [
      product.productName || product.title,
      `${product.brand} ${product.productName || product.title}`,
      `${product.category} chính hãng`,
      `${product.productName || product.title} giá rẻ`,
      `${product.productName || product.title} trả góp`,
      `${product.productName || product.title} bảo hành`,
    ],
    openGraph: {
      title: `${
        product.productName || product.title
      } - Chính Hãng | TTL Mobile`,
      description: `${
        product.productName || product.title
      } chính hãng với giá ${formattedPrice}đ. ${
        product.condition || "99%"
      } chất lượng cao.`,
      url: `https://thientranglong.vn/${product.slug || product.id}`,
      images: [
        {
          url: product.thumbnail || "/images/iphone14.png",
          width: 1200,
          height: 630,
          alt: product.productName || product.title,
        },
      ],
      type: "website",
      siteName: "Trang Thiên Long Mobile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.productName || product.title} - Chính Hãng`,
      description: `${
        product.productName || product.title
      } giá ${formattedPrice}đ chính hãng`,
      images: [product.thumbnail || "/images/iphone14.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://thientranglong.vn/${product.slug || product.id}`,
    },
    other: {
      "product:price:amount": formattedPrice,
      "product:price:currency": "VND",
      "product:availability": product.inStock ? "in stock" : "out of stock",
      "product:condition": product.condition || "new",
    },
  };
}

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
