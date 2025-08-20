/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, ChevronDown, Menu, X } from "lucide-react";

interface DropdownItem {
  label: string;
  href: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  hasDropdown: boolean;
  dropdownItems?: DropdownItem[];
}

const navigationData: NavItem[] = [
  {
    label: "iPhone",
    href: "/iphone",
    hasDropdown: true,
    dropdownItems: [
      { label: "iPhone 15 Pro Max", href: "/iphone/15-pro-max", isNew: true },
      { label: "iPhone 15 Pro", href: "/iphone/15-pro", isNew: true },
      { label: "iPhone 15 Plus", href: "/iphone/15-plus", isNew: true },
      { label: "iPhone 15", href: "/iphone/15", isNew: true },
      {
        label: "iPhone 14 Pro Max",
        href: "/iphone/14-pro-max",
        isPopular: true,
      },
      { label: "iPhone 14 Pro", href: "/iphone/14-pro", isPopular: true },
      { label: "iPhone 14", href: "/iphone/14" },
      { label: "iPhone 13", href: "/iphone/13" },
      { label: "Tất cả iPhone", href: "/iphone" },
    ],
  },
  {
    label: "iPad",
    href: "/ipad",
    hasDropdown: true,
    dropdownItems: [
      { label: "iPad Pro M2", href: "/ipad/pro-m2", isNew: true },
      { label: "iPad Air", href: "/ipad/air", isPopular: true },
      { label: "iPad", href: "/ipad/ipad" },
      { label: "iPad Mini", href: "/ipad/mini" },
      { label: "Tất cả iPad", href: "/ipad" },
    ],
  },
  {
    label: "Mac",
    href: "/macbook",
    hasDropdown: true,
    dropdownItems: [
      { label: "MacBook Air M2", href: "/mac/air-m2", isNew: true },
      { label: "MacBook Pro M2", href: "/mac/pro-m2", isNew: true },
      { label: 'iMac 24"', href: "/mac/imac-24", isPopular: true },
      { label: "Mac Studio", href: "/mac/studio" },
      { label: "Tất cả Mac", href: "/macbook" },
    ],
  },
  {
    label: "Watch",
    href: "/apple-watch",
    hasDropdown: true,
    dropdownItems: [
      { label: "Apple Watch Series 9", href: "/watch/series-9", isNew: true },
      { label: "Apple Watch Ultra 2", href: "/watch/ultra-2", isNew: true },
      { label: "Apple Watch SE", href: "/watch/se", isPopular: true },
      { label: "Tất cả Watch", href: "/apple-watch" },
    ],
  },
  {
    label: "AirPods",
    href: "/airpods",
    hasDropdown: true,
    dropdownItems: [
      { label: "AirPods Pro (2nd gen)", href: "/airpods/pro-2", isNew: true },
      { label: "AirPods (3rd gen)", href: "/airpods/3rd", isPopular: true },
      { label: "AirPods Max", href: "/airpods/max" },
      { label: "Tất cả AirPods", href: "/airpods" },
    ],
  },
  {
    label: "Phụ kiện",
    href: "/phu-kien",
    hasDropdown: true,
    dropdownItems: [
      { label: "Ốp lưng iPhone", href: "/phu-kien/op-lung" },
      { label: "Sạc và Cable", href: "/phu-kien/sac-cable" },
      { label: "Dây đeo Watch", href: "/phu-kien/day-watch" },
      { label: "Tất cả phụ kiện", href: "/phu-kien" },
    ],
  },
];

const ShopDunkStyleNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // ✅ SIMPLEST: Just toggle - NO useEffect, NO outside click
  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/ttl.png"
                alt="Trang Thiên Long Mobile"
                width={140}
                height={45}
                className="h-8 lg:h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationData.map((item) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.label)}
                    className="text-gray-900 hover:text-blue-600 font-medium text-sm transition-colors duration-200 py-2 flex items-center gap-1"
                  >
                    {item.label}
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-900 hover:text-blue-600 font-medium text-sm transition-colors duration-200 py-2"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 mt-1 z-50">
                    {item.dropdownItems?.map((dropdownItem, index) => (
                      <Link
                        key={index}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                        onClick={() => setActiveDropdown(null)} // Close when click item
                      >
                        <div className="flex items-center justify-between">
                          <span>{dropdownItem.label}</span>
                          {dropdownItem.isNew && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                              Mới
                            </span>
                          )}
                          {dropdownItem.isPopular && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                              Hot
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`block w-full pl-10 pr-4 py-2.5 border rounded-full text-sm transition-all duration-200 focus:outline-none ${
                  isSearchFocused
                    ? "border-blue-500 bg-blue-50/50 shadow-md"
                    : "border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400"
                }`}
                placeholder="Tìm kiếm iPhone, iPad, MacBook..."
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0H17M9 19v.01M20 19v.01"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                0
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShopDunkStyleNavbar;
