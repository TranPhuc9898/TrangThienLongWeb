/** @format */

import React from "react";
import Link from "next/link";

const branches = [
  { address: "15I Trần Phú, phường Chợ Quán, TP. HCM (Chi Nhánh Chính)", time: "08:00AM - 10:00PM" },
  { address: "87b Lê Văn Duyệt, TP.Thủ Đức, TP.HCM", time: "09:30AM - 08:30PM" },
  { address: "02 Hồ Văn Leo, TP.Biên Hòa, Đồng Nai", time: "08:00AM - 08:00PM" },
];

const policies = [
  { label: "Giới Thiệu Về Chúng Tôi", url: "/gioi-thieu" },
  { label: "Chính Sách Bảo Mật", url: "/chinh-sach-bao-mat" },
  { label: "Chính Sách Đổi Trả", url: "/chinh-sach-doi-tra" },
  { label: "Chính Sách Bảo Hành", url: "/chinh-sach-bao-hanh" },
  { label: "Chính Sách Vận Chuyển", url: "/chinh-sach-van-chuyen" },
];

const guides = [
  { label: "Hướng Dẫn Mua Hàng", url: "/huong-dan-mua-hang" },
  { label: "Hướng Dẫn Thanh Toán", url: "/huong-dan-thanh-toan" },
  { label: "Hướng Dẫn Mua Hàng Trả Góp", url: "/huong-dan-mua-hang-tra-gop" },
  { label: "Điều Khoản Sử Dụng", url: "/dieu-khoan-su-dung" },
  { label: "Liên Hệ", url: "/lien-he" },
];

const FooterLinksSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Cột 1: Chi nhánh */}
    <div>
      <div className="font-bold text-[17px] uppercase mb-2 tracking-wide text-[#0A0A0A]">
        HỆ THỐNG TRANG THIÊN LONG MOBILE
      </div>
      <div className="w-9 h-[2px] bg-[#e3e3e3] mb-3" />
      <ul>
        {branches.map((item, idx) => (
          <li key={idx} className={idx !== 0 ? "mt-10" : ""}>
            <div className="flex items-center text-[#0A0A0A] text-[15px] font-medium">
              <span className="mr-2">🏠</span>
              {item.address}
            </div>
            <div className="flex items-center text-[#0A0A0A] text-[15px] mt-1">
              <span className="mr-2">⏰</span>
              {item.time}
            </div>
          </li>
        ))}
        <li className="mt-10">
          <div className="flex items-center text-[#0A0A0A] text-[15px] font-medium">
            <span className="mr-2">📞</span>
            <span className="font-bold text-[#D0260D]">+84385795791</span>
            <span className="ml-2 text-black">(Trang - Cô Chủ Nhỏ)</span>
          </div>
        </li>
        <li className="mt-2">
          <div className="flex items-center text-[#0A0A0A] text-[15px] font-medium">
            <span className="mr-2">🚚</span>
            Giao Hàng Nhanh Nội Thành 24/24
          </div>
        </li>
      </ul>
    </div>
    {/* Cột 2: Chính sách */}
    <div>
      <div className="font-bold text-[17px] uppercase mb-2 tracking-wide text-[#0A0A0A]">
        CHÍNH SÁCH
      </div>
      <div className="w-9 h-[2px] bg-[#e3e3e3] mb-3" />
      <ul>
        {policies.map((item, idx) => (
          <li key={idx} className={idx !== 0 ? "mt-2" : ""}>
            <Link
              href={item.url}
              className="text-[#D0260D] hover:underline text-[15px] font-medium"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    {/* Cột 3: Hướng dẫn */}
    <div>
      <div className="font-bold text-[17px] uppercase mb-2 tracking-wide text-[#0A0A0A]">
        HƯỚNG DẪN
      </div>
      <div className="w-9 h-[2px] bg-[#e3e3e3] mb-3" />
      <ul>
        {guides.map((item, idx) => (
          <li key={idx} className={idx !== 0 ? "mt-2" : ""}>
            <Link
              href={item.url}
              className="text-[#D0260D] hover:underline text-[15px] font-medium"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default FooterLinksSection;
