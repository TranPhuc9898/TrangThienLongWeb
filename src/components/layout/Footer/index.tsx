/** @format */

import { cn } from "@/lib/utils";
import React from "react";
import { PaymentBadge, SocialNetworks } from "./footer.types";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import LinksSection from "./LinksSection";
import Image from "next/image";
import NewsLetterSection from "./NewsLetterSection";
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

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="relative">
        <div className="absolute bottom-0 w-full h-1/2 bg-[#F0F0F0]"></div>
        <div className="px-4">
          <NewsLetterSection />
        </div>
      </div>
      <div className="pt-8 md:pt-[50px] bg-[#F0F0F0] px-4 pb-4">
        <div className="max-w-frame mx-auto">
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
                <div className="flex items-center gap-2 justify-start md:justify-end mt-8">
                  <img
                    src="/icons/bo-cong-thuong.png"
                    alt="Đã thông báo Bộ Công Thương"
                    className="h-8 w-auto"
                    loading="lazy"
                  />
                  <img
                    src="/icons/dmca-protected.png"
                    alt="DMCA Protected"
                    className="h-8 w-auto"
                    loading="lazy"
                  />
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
