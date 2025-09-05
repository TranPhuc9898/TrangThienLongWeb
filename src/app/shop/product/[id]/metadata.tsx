import { Metadata } from "next";

interface ProductData {
  id: string;
  productName: string;
  description?: string;
  basePrice: number | bigint;
  discount?: string;
  thumbnail?: string;
  category?: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  variants?: Array<{
    storage: string;
    color: string;
    price: number | bigint;
    image?: string;
  }>;
  colors?: Array<{
    id: string;
    color: string;
    images: string[];
  }>;
}

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  try {
    // Fetch product data from API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products/${params.id}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      return {
        title: "Sản phẩm không tìm thấy | TrangMobile",
        description: "Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const product: ProductData = await response.json();

    // Calculate discounted price if discount exists
    const calculateDiscountedPrice = (basePrice: number | bigint, discount?: string) => {
      if (!discount) return Number(basePrice);
      const discountMatch = discount.match(/-(\d+)%/);
      const discountPercent = discountMatch ? parseInt(discountMatch[1]) : 0;
      const price = Number(basePrice);
      return Math.round(price - (price * discountPercent) / 100);
    };

    const finalPrice = product.discount
      ? calculateDiscountedPrice(product.basePrice, product.discount)
      : Number(product.basePrice);

    // Generate title with product name and key features
    const storageOptions = product.variants
      ? Array.from(new Set(product.variants.map((v) => v.storage))).join(", ")
      : "";
    
    const title = `${product.productName}${storageOptions ? ` - ${storageOptions}` : ""} | Giá tốt tại TrangMobile`;

    // Generate comprehensive description
    const description = 
      product.description ||
      `Mua ${product.productName} chính hãng, giá tốt nhất ${finalPrice.toLocaleString("vi-VN")}đ tại TrangMobile. ` +
      `${product.discount ? `Giảm giá ${product.discount}. ` : ""}` +
      `Bảo hành chính hãng Apple, trả góp 0%, giao hàng toàn quốc. ` +
      `Địa chỉ: 15i Trần Phú, Quận 5, TP.HCM. Hotline: 0385795791. ` +
      `${product.rating ? `Đánh giá ${product.rating}/5 sao từ ${product.reviewCount} khách hàng.` : ""}`;

    // Generate keywords based on product data
    const keywords = [
      product.productName,
      product.brand || "Apple",
      product.category || "iPhone",
      "chính hãng",
      "giá tốt",
      "trả góp 0%",
      "TrangMobile",
      "Trang Mobile",
      "15i Trần Phú Quận 5",
      storageOptions,
    ]
      .filter(Boolean)
      .join(", ");

    // Generate canonical URL
    const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://trangmobile.com"}/shop/product/${params.id}`;

    // Get first image from colors or use thumbnail
    const ogImage = product.colors && product.colors.length > 0 && product.colors[0].images.length > 0
      ? product.colors[0].images[0]
      : product.thumbnail || "/default-product-image.jpg";

    // Generate Open Graph and Twitter metadata
    const metadata: Metadata = {
      title,
      description,
      keywords,
      authors: [{ name: "TrangMobile", url: "https://trangmobile.com" }],
      creator: "TrangMobile",
      publisher: "TrangMobile",
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "TrangMobile - Cửa hàng Apple chính hãng",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `${product.productName} - TrangMobile`,
          },
        ],
        locale: "vi_VN",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
        site: "@trangmobile",
        creator: "@trangmobile",
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
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
        yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      },
      other: {
        "og:price:amount": finalPrice.toString(),
        "og:price:currency": "VND",
        "product:brand": product.brand || "Apple",
        "product:availability": "in stock",
        "product:condition": "new",
        "product:price:amount": finalPrice.toString(),
        "product:price:currency": "VND",
        "product:retailer_item_id": product.id,
        "business:contact_data:street_address": "15i Trần Phú",
        "business:contact_data:locality": "Quận 5",
        "business:contact_data:region": "TP.HCM",
        "business:contact_data:postal_code": "70000",
        "business:contact_data:country_name": "Vietnam",
        "business:contact_data:email": "contact@trangmobile.com",
        "business:contact_data:phone_number": "+84385795791",
      },
    };

    return metadata;
  } catch (error) {
    console.error("Error generating product metadata:", error);
    return {
      title: "Sản phẩm | TrangMobile",
      description: "Khám phá các sản phẩm Apple chính hãng tại TrangMobile - 15i Trần Phú, Quận 5, TP.HCM.",
    };
  }
}