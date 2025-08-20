/** @format */

"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, ShoppingCart, ChevronDown, Menu, X } from "lucide-react";
import CartBtn from "./TopNavbar/CartBtn";

interface DropdownItem {
  label: string;
  href: string;
  isNew?: boolean;
  isHot?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  dropdownItems?: DropdownItem[];
}

const navigationData: NavItem[] = [
  {
    label: "iPhone",
    href: "/iphone",
    dropdownItems: [
      { label: "iPhone 17 Pro Max", href: "/iphone/iphone-17-pro-max-series", isNew: true },
      { label: "iPhone 17 Pro", href: "/iphone/iphone-17-pro-series", isNew: true },
      { label: "iPhone 16 Pro Max", href: "/iphone/iphone-16-pro-max-series", isNew: true },
      { label: "iPhone 16 Pro", href: "/iphone/iphone-16-pro-series", isNew: true },
      { label: "iPhone 16", href: "/iphone/iphone-16-series", isNew: true },
      { label: "iPhone 15 Pro Max", href: "/iphone/iphone-15-pro-max-series", isHot: true },
      { label: "iPhone 15 Pro", href: "/iphone/iphone-15-pro-series", isHot: true },
      { label: "iPhone 15", href: "/iphone/iphone-15-series" },
      { label: "iPhone 14 Pro Max", href: "/iphone/iphone-14-pro-max-series" },
      { label: "iPhone 14", href: "/iphone/iphone-14-series" },
      { label: "iPhone 13", href: "/iphone/iphone-13-series" },
      { label: "Tất cả iPhone", href: "/iphone" },
    ],
  },
  {
    label: "iPad",
    href: "/ipad",
    dropdownItems: [
      { label: "iPad Pro M4", href: "/ipad/ipad-pro-m4-series", isNew: true },
      { label: "iPad Pro M2", href: "/ipad/ipad-pro-m2-series" },
      { label: "iPad Air", href: "/ipad/ipad-air-series", isHot: true },
      { label: "iPad Gen 10", href: "/ipad/ipad-gen-10-series" },
      { label: "iPad Mini", href: "/ipad/ipad-mini-series" },
      { label: "Tất cả iPad", href: "/ipad" },
    ],
  },
  {
    label: "Mac",
    href: "/macbook",
    dropdownItems: [
      { label: "MacBook Pro M3", href: "/mac/macbook-pro-m3-series", isNew: true },
      { label: "MacBook Air M3", href: "/mac/macbook-air-m3-series", isNew: true },
      { label: "MacBook Air M2", href: "/mac/macbook-air-m2-series" },
      { label: 'iMac 24" M3', href: "/mac/imac-24-m3-series", isHot: true },
      { label: "Tất cả Mac", href: "/macbook" },
    ],
  },
  {
    label: "Watch",
    href: "/apple-watch",
    dropdownItems: [
      { label: "Apple Watch Series 10", href: "/watch/apple-watch-series-10-series", isNew: true },
      { label: "Apple Watch Series 9", href: "/watch/apple-watch-series-9-series" },
      { label: "Apple Watch Ultra 2", href: "/watch/apple-watch-ultra-2-series", isHot: true },
      { label: "Apple Watch SE", href: "/watch/apple-watch-se-series" },
      { label: "Tất cả Watch", href: "/apple-watch" },
    ],
  },
  {
    label: "AirPods",
    href: "/airpods",
    dropdownItems: [
      { label: "AirPods Pro 2", href: "/airpods/airpods-pro-2-series", isNew: true },
      { label: "AirPods 4", href: "/airpods/airpods-4-series", isNew: true },
      { label: "AirPods 3", href: "/airpods/airpods-3-series" },
      { label: "AirPods Max", href: "/airpods/airpods-max-series", isHot: true },
      { label: "Tất cả AirPods", href: "/airpods" },
    ],
  },
  {
    label: "Phụ kiện",
    href: "/phu-kien",
    dropdownItems: [
      { label: "Ốp lưng iPhone", href: "/phu-kien/op-lung-series" },
      { label: "Sạc & Cable", href: "/phu-kien/sac-cable-series" },
      { label: "Dây Apple Watch", href: "/phu-kien/day-watch-series" },
      { label: "Tất cả phụ kiện", href: "/phu-kien" },
    ],
  },
];

const CleanShopDunkNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback((label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="/images/ttl.png"
                alt="Trang Thiên Long"
                width={100}
                height={30}
                className="h-7 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationData.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="flex items-center text-gray-900 hover:text-blue-600 font-medium text-sm py-2 transition-colors"
                >
                  {item.label}
                  {item.dropdownItems && (
                    <ChevronDown className="ml-1 h-3 w-3 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown */}
                {item.dropdownItems && activeDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 pt-1"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                      className="w-56 bg-white border border-gray-100 rounded-lg shadow-lg py-1"
                    >
                      {item.dropdownItems.map((dropdownItem, index) => (
                        <Link
                          key={index}
                          href={dropdownItem.href}
                          className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                          <span>{dropdownItem.label}</span>
                          {dropdownItem.isNew && (
                            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-medium">
                              MỚI
                            </span>
                          )}
                          {dropdownItem.isHot && (
                            <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-medium">
                              HOT
                            </span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-6 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm iPhone, iPad, MacBook..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <button className="md:hidden p-1.5 text-gray-600 hover:text-gray-900">
              <Search className="h-5 w-5" />
            </button>

            {/* Account removed */}

            {/* Cart */}
            <CartBtn className="p-1.5" />

            {/* Mobile Menu */}
            <button
              className="lg:hidden p-1.5 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 py-4"
          >
            <div className="space-y-3">
              {navigationData.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Search */}
            <div className="mt-4 px-3">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default CleanShopDunkNavbar;
