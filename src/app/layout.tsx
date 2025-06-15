/** @format */

import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import RedBanner from "../components/layout/Banner/RedBanner";
import BannerSlider from "../components/layout/Banner/BannerSlider";

export const metadata: Metadata = {
  title: "Trang Thiên Long Mobile",
  description: "Đại lý phân phối điện thoại di động chính hãng tại Việt Nam",
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
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <TopBanner />

        <Providers>
          <TopNavbar />
          <div className="hidden  lg:block">
            <RedBanner />
          </div>

          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
