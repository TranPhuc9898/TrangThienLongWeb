/** @format */
"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { PaymentBadge, SocialNetworks } from "./footer.types";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import LinksSection from "./LinksSection";
import Image from "next/image";

import LayoutSpacing from "./LayoutSpacing";
import FooterLinksSection from "./FooterLinksSection";

const socialsData: SocialNetworks[] = [
  {
    id: 1,
    icon: <FaTwitter />,
    url: "https://twitter.com",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    url: "https://facebook.com",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://instagram.com",
  },
  {
    id: 4,
    icon: <FaGithub />,
    url: "https://github.com/mohammadoftadeh",
  },
];

const paymentBadgesData: PaymentBadge[] = [
  {
    id: 1,
    srcUrl: "/icons/Visa.svg",
  },
  {
    id: 2,
    srcUrl: "/icons/mastercard.svg",
  },
  {
    id: 3,
    srcUrl: "/icons/paypal.svg",
  },
  {
    id: 4,
    srcUrl: "/icons/applePay.svg",
  },
  {
    id: 5,
    srcUrl: "/icons/googlePay.svg",
  },
];

// Component Zalo Contact Card
const ZaloContactCard = () => (
  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 mb-8 text-white">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden">
          <img
            src="/images/trang-thien-long-avatar.jpg"
            alt="Trang Thiên Long Góp"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='%234285f4'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
            }}
          />
        </div>
        <div>
          <h3 className="font-bold text-lg">Trang Thiên Long Góp</h3>
          <p className="text-blue-100">+84385795791</p>
        </div>
      </div>
      <div className="bg-white p-3 rounded-lg">
        <img
          src="/images/zalo-qr-code.png"
          alt="QR Code Zalo"
          className="w-20 h-20 object-contain"
          onError={(e) => {
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='%23000'%3E%3Cpath d='M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h2v2H7V7zm4 0h2v2h-2V7zm4 0h2v2h-2V7zM7 11h2v2H7v-2zm8 0h2v2h-2v-2zM7 15h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z'/%3E%3C/svg%3E";
          }}
        />
      </div>
    </div>
    <div className="flex gap-3 mt-4">
      <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
        Kết Bạn
      </button>
      <button className="bg-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors">
        Nhận Tin
      </button>
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="pt-8 md:pt-[50px] bg-[#F0F0F0] px-4 pb-4">
        <div className="max-w-frame mx-auto">
          <ZaloContactCard />
          <FooterLinksSection />
          <hr className="h-[1px] border-t-black/10 my-6" />
          <div className="pt-2 md:pt-5px] bg-[#F0F0F0] px-4 pb-4">
            <div className="max-w-frame mx-auto">
              {/* --- Phần cuối Footer --- */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs text-[#0A0A0A] ">
                <div>
                  <div>
                    Copyright 2001 - 2025 ©{" "}
                    <span className="font-bold">Trang Thiên Long Mobile</span>
                  </div>
                  <div className="mt-4 md:mt-8">
                    <span className="font-semibold">
                      CÔNG TY TNHH MTV TRANG THIÊN LONG
                    </span>{" "}
                    MST: 0314198343. (Đăng ký lần đầu: Ngày 12 tháng 01 năm
                    2017, Đăng ký thay đổi ngày 07/07/2020)
                  </div>
                  <div>
                    Địa chỉ: 24 Hùng Vương, Phường 1, Quận 10, TP. Hồ Chí Minh.
                    Điện thoại: 0939.02.1234. Chịu trách nhiệm nội dung: Trần
                    Thị Nhã Trang.
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-start md:justify-end mt-8">
                  {/* SEO-optimized badges với proper alt text */}
                  <Link
                    href="http://online.gov.vn/Home/WebDetails/131702"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Đã thông báo Bộ Công Thương"
                  >
                    <Image
                      src="/images/bo-cong-thuong.png"
                      alt="Đã thông báo Bộ Công Thương - Website đã được đăng ký với Bộ Công Thương Việt Nam"
                      width={150}
                      height={57}
                      className="h-10 w-auto object-contain"
                      loading="lazy"
                      title="Website được Bộ Công Thương chứng nhận"
                    />
                  </Link>
                  <Link
                    href="https://www.dmca.com/Protection/Status.aspx?ID=6f76663c-2dc1-4ae7-87ea-ebee849f73b4"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label="DMCA.com Protection Status"
                  >
                    <Image
                      src="/images/dmca-protected.png"
                      alt="DMCA.com Protection Status - Website được bảo vệ bản quyền bởi DMCA"
                      width={121}
                      height={24}
                      className="h-8 w-auto object-contain"
                      loading="lazy"
                      title="DMCA Protected - Nội dung được bảo vệ bản quyền"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
