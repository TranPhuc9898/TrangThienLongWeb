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
    "iPhone 15 Pro Max 256GB Giá Tốt Nhất | Trang Thiên Long Mobile Chính Hãng",
  description:
    "Cửa hàng iPhone chính hãng uy tín số 1 Việt Nam. iPhone 15, iPad, MacBook, Apple Watch bảo hành 12 tháng, trả góp 0%, giao hàng 2h tại TP.HCM. Giá tốt nhất thị trường.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/ttl.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/images/ttl.png", sizes: "180x180", type: "image/png" },
    ],
  },
  keywords: "iPhone giá rẻ, iPad chính hãng, Apple Watch Vietnam, AirPods Pro, MacBook Air M2, điện thoại cũ like new, Trang Thiên Long Mobile, iPhone 15 Pro Max 256GB, mua iPhone trả góp 0%, cửa hàng iPhone uy tín TP.HCM",
  openGraph: {
    title: "iPhone 15 Pro Max 256GB Giá Tốt Nhất | Trang Thiên Long Mobile",
    description:
      "Cửa hàng iPhone chính hãng uy tín số 1 Việt Nam. Bảo hành 12 tháng, trả góp 0%, giao hàng 2h tại TP.HCM",
    url: "https://trangmobile.com",
    siteName: "Trang Thiên Long Mobile",
    images: [
      {
        url: "https://trangmobile.com/images/ttl-og.jpg",
        width: 1200,
        height: 630,
        alt: "TrangMobile.com - Cửa hàng iPhone chính hãng TP.HCM",
        type: "image/jpeg",
      },
    ],
    type: "website",
    locale: "vi_VN",
    countryName: "Vietnam",
  },
  twitter: {
    card: "summary_large_image",
    title: "iPhone 15 Pro Max 256GB Giá Tốt Nhất | Trang Thiên Long Mobile",
    description: "Cửa hàng iPhone chính hãng uy tín số 1 Việt Nam. Bảo hành 12 tháng, trả góp 0%",
    images: [{
      url: "https://trangmobile.com/images/ttl-og.jpg",
      alt: "TrangMobile.com - iPhone chính hãng",
    }],
    site: "@trangthienlong",
    creator: "@trangthienlong",
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
    languages: {
      "vi-VN": "https://trangmobile.com",
    },
  },
  authors: [
    {
      name: "TrangMobile.com",
      url: "https://trangmobile.com",
    },
  ],
  creator: "TrangMobile.com",
  publisher: "TrangMobile.com",
  formatDetection: {
    telephone: true,
    date: false,
    address: true,
    email: true,
  },
  verification: {
    google: "oiyqMkeepUIMruDLqqFG9qd3jcmvkJs5OXu70Q3YN5c",
  },
  category: "e-commerce",
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
