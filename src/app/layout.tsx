/** @format */

import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import CleanShopDunkNavbar from "@/components/layout/Navbar/CleanShopDunkNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/seo/SEOComponents";

export const metadata: Metadata = {
  title: "Trang Thiên Long Mobile - Điện Thoại iPhone, iPad Chính Hãng Giá Rẻ",
  description: "Mua iPhone, iPad, Apple Watch, AirPods, MacBook chính hãng giá tốt nhất. Bảo hành 12 tháng, trả góp 0%, giao hàng toàn quốc. Showroom tại TP.HCM.",
  keywords: [
    "iphone giá rẻ",
    "ipad chính hãng", 
    "apple watch vietnam",
    "airpods pro",
    "macbook air m2",
    "điện thoại cũ like new",
    "trang thiên long mobile"
  ],
  openGraph: {
    title: "Trang Thiên Long Mobile - Chuyên Apple Products",
    description: "Điện thoại iPhone, iPad, Apple Watch chính hãng với giá cạnh tranh nhất thị trường",
    url: "https://thientranglong.vn",
    siteName: "Trang Thiên Long Mobile",
    images: [
      {
        url: "/images/ttl.png",
        width: 1200,
        height: 630,
        alt: "Trang Thiên Long Mobile - Apple Store",
      }
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trang Thiên Long Mobile",
    description: "Apple Products chính hãng giá tốt",
    images: ["/images/ttl.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large", 
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: "https://thientranglong.vn"
  }
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={satoshi.className}>
        <OrganizationSchema />
        <LocalBusinessSchema />
        <HolyLoader color="#007AFF" />

        <Providers>
          <CleanShopDunkNavbar />

          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
