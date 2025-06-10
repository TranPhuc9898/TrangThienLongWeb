/** @format */

import React from "react";
import Link from "next/link";

const menu = [
  { label: "iPhone", href: "/shop#iphone", icon: "/icons/iphone.svg" },
  { label: "iPad", href: "/shop#ipad", icon: "/icons/ipad.svg" },
  { label: "Watch", href: "/shop#watch", icon: "/icons/watch.svg" },
  { label: "AirPods", href: "/shop#airpods", icon: "/icons/airpods.svg" },
  { label: "Mac", href: "/shop#mac", icon: "/icons/mac.svg" },
  { label: "Laptop", href: "/shop#laptop", icon: "/icons/laptop.svg" },
  { label: "Điện thoại", href: "/shop#dienthoai", icon: "/icons/phone.svg" },
  { label: "Phụ kiện", href: "/shop#phukien", icon: "/icons/accessory.svg" },
  { label: "Hàng cũ", href: "/shop#hangcu", icon: "/icons/old.svg" },
  { label: "Thu cũ", href: "/shop#thucu", icon: "/icons/exchange.svg" },
  { label: "Tin tức", href: "/news", icon: "/icons/news.svg" },
];

const RedBanner = () => (
  <div className="w-full bg-[#E60012]">
    <div className="max-w-frame mx-auto flex overflow-x-auto px-2 md:px-4">
      {menu.map((item, idx) => (
        <React.Fragment key={item.label}>
          <Link
            href={item.href}
            className="flex items-center text-white px-3 py-2 text-sm md:text-base whitespace-nowrap hover:underline"
          >
            <img src={item.icon} alt={item.label} className="w-4 h-4 mr-1" />
            {item.label}
          </Link>
          {idx < menu.length - 1 && (
            <span className="text-white/60 select-none">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default RedBanner;
