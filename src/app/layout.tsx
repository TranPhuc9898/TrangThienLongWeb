/** @format */

import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { inter } from "@/styles/fonts";
import CleanShopDunkNavbar from "@/components/layout/Navbar/CleanShopDunkNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import {
  OrganizationSchema,
  LocalBusinessSchema,
} from "@/components/seo/SEOComponents";
import { AdminEditProvider } from "@/contexts/AdminEditContext";
import ToastProvider from "@/components/ui/toast";
import { FlyToCartProvider } from "@/components/ui/FlyToCart";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  title:
    "Trang Thiên Long Mobile - iPhone, iPad, MacBook Chính Hãng Giá Tốt Nhất",
  description:
    "⭐ Cửa hàng Apple uy tín hàng đầu Việt Nam ⭐ iPhone 15, iPad, MacBook, Apple Watch chính hãng ⭐ Giá tốt nhất ⭐ Bảo hành 12 tháng ⭐ Trả góp 0%",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/ttl.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/images/ttl.png",
  },
  keywords: [
    "iphone giá rẻ",
    "ipad chính hãng",
    "apple watch vietnam",
    "airpods pro",
    "macbook air m2",
    "điện thoại cũ like new",
    "trang thiên long mobile",
  ],
  openGraph: {
    title: "Trang Thiên Long Mobile - Chuyên Apple Products",
    description:
      "Điện thoại iPhone, iPad, Apple Watch chính hãng với giá cạnh tranh nhất thị trường",
    url: "https://trangmobile.com",
    siteName: "Trang Thiên Long Mobile",
    images: [
      {
        url: "/images/ttl.png",
        width: 1200,
        height: 630,
        alt: "Trang Thiên Long Mobile - Apple Store",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trang Thiên Long Mobile",
    description: "Apple Products chính hãng giá tốt",
    images: ["/images/ttl.png"],
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
    canonical: "https://trangmobile.com",
  },
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
      <head>
        <link rel="icon" href="/images/ttl.png" type="image/png" />
        <link rel="shortcut icon" href="/images/ttl.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/ttl.png" />
        
        {/* Google Analytics */}
        <GoogleAnalytics measurementId="G-YK6M5RXB08" />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="oiyqMkeepUIMruDLqqFG9qd3jcmvkJs5OXu70Q3YN5c" />
      </head>
      <body className={inter.className}>
        <OrganizationSchema />
        <LocalBusinessSchema />
        <HolyLoader color="#007AFF" />

        <AdminEditProvider>
          <Providers>
            <FlyToCartProvider>
              <ToastProvider>
                <CleanShopDunkNavbar />
                <main className="pt-14">{children}</main>
                <Footer />
              </ToastProvider>
            </FlyToCartProvider>
          </Providers>
        </AdminEditProvider>
      </body>
    </html>
  );
}
