/** @format */

"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ToolbarItem {
  id: string;
  label: string;
  icon: string;
  sectionId: string;
}

const toolbarItems: ToolbarItem[] = [
  {
    id: "iphone",
    label: "iPhone",
    icon: "/icons/iphone_black.svg",
    sectionId: "iphone-section",
  },
  {
    id: "ipad",
    label: "iPad",
    icon: "/icons/ipad.svg",
    sectionId: "ipad-section",
  },
  {
    id: "watch",
    label: "Watch",
    icon: "/icons/watch.svg",
    sectionId: "watch-section",
  },
  {
    id: "airpods",
    label: "AirPods",
    icon: "/icons/airpods.svg",
    sectionId: "airpods-section",
  },
];

const FloatingToolbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -120; // Điều chỉnh offset này cho phù hợp với UI của bạn
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
        {toolbarItems.map((item) => (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button
              onClick={() => scrollToSection(item.sectionId)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 mb-2 last:mb-0 hover:bg-blue-50 hover:scale-110 active:scale-95 ${
                hoveredItem === item.id ? "bg-blue-50 scale-110" : ""
              }`}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>

            {/* Tooltip khi hover */}
            {hoveredItem === item.id && (
              <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap animate-fade-in">
                {item.label}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-black"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingToolbar;
