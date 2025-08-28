/** @format */

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

const Footer = () => {
  return (
    <footer className="mt-10">
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
                <div className="flex items-center gap-3 justify-start md:justify-end mt-8">
                  {/* SEO-optimized badges với proper alt text */}
                  <Link
                    href="http://online.gov.vn/Home/WebDetails/131702"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Đã thông báo Bộ Công Thương"
                  >
                    <Image
                      src="https://trangthienlong.com.vn/wp-content/uploads/2025/01/bo-cong-thuong.png"
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
                      src="https://images.dmca.com/Badges/dmca_protected_sml_120c.png?ID=6f76663c-2dc1-4ae7-87ea-ebee849f73b4"
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
