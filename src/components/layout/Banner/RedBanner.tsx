/** @format */

import React from "react";
import Link from "next/link";

const menu = [
  { label: "iPhone", href: "/san-pham-iphone", icon: "/icons/iphone.svg" },
  { label: "iPad", href: "/san-pham-ipad", icon: "/icons/ipad.svg" },
  { label: "Watch", href: "/shop#watch", icon: "/icons/watch.svg" },
  { label: "AirPods", href: "/shop#airpods", icon: "/icons/airpods.svg" },
  { label: "Mac", href: "/shop#mac", icon: "/icons/mac.svg" },
  { label: "Tin tức", href: "/news", icon: "/icons/news.svg" },
];

const RedBanner = () => (
  <div className="w-full bg-[#E60012]">
    <div
      className="max-w-[1600px] mx-auto flex justify-center overflow-x-auto px-2 md:px-6"
      style={{ minHeight: 54 }}
    >
      {menu.map((item, idx) => (
        <React.Fragment key={item.label}>
          <Link
            href={item.href}
            className="flex items-center text-white px-4 py-3 text-base md:text-lg whitespace-nowrap hover:underline"
          >
            <img src={item.icon} alt={item.label} className="w-6 h-6 mr-2" />
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default RedBanner;
