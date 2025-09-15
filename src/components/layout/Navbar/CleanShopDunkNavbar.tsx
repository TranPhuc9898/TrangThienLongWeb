/** @format */

"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, ShoppingCart, ChevronDown, Menu, X } from "lucide-react";
import CartBtn from "./TopNavbar/CartBtn";
import SearchBar from "../../SearchBar";

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
      {
        label: "iPhone 17 Pro Max",
        href: "/iphone/iphone-17-pro-max",
        isNew: true,
      },
      {
        label: "iPhone 17 Pro",
        href: "/iphone/iphone-17-pro",
        isNew: true,
      },
      {
        label: "iPhone 17 Air",
        href: "/iphone/iphone-17-air",
        isNew: true,
      },
      {
        label: "iPhone 17",
        href: "/iphone/iphone-17",
        isNew: true,
      },
      {
        label: "iPhone 16 Pro Max",
        href: "/iphone/iphone-16-pro-max",
        isNew: true,
      },
      {
        label: "iPhone 16 Pro",
        href: "/iphone/iphone-16-pro",
        isNew: true,
      },
      {
        label: "iPhone 16 Plus",
        href: "/iphone/iphone-16-plus",
        isNew: true
      },
      {
        label: "iPhone 16",
        href: "/iphone/iphone-16",
        isNew: true
      },
      {
        label: "iPhone 15 Pro Max",
        href: "/iphone/iphone-15-pro-max",
        isHot: true,
      },
      {
        label: "iPhone 15 Pro",
        href: "/iphone/iphone-15-pro",
        isHot: true,
      },
      {
        label: "iPhone 15 Plus",
        href: "/iphone/iphone-15-plus"
      },
      {
        label: "iPhone 15",
        href: "/iphone/iphone-15"
      },
      {
        label: "iPhone 14 Pro Max",
        href: "/iphone/iphone-14-pro-max"
      },
      {
        label: "iPhone 14 Pro",
        href: "/iphone/iphone-14-pro"
      },
      {
        label: "iPhone 14 Plus",
        href: "/iphone/iphone-14-plus"
      },
      {
        label: "iPhone 14",
        href: "/iphone/iphone-14"
      },
      {
        label: "iPhone 13 Pro Max",
        href: "/iphone/iphone-13-pro-max"
      },
      {
        label: "iPhone 13 Pro",
        href: "/iphone/iphone-13-pro"
      },
      {
        label: "iPhone 13 mini",
        href: "/iphone/iphone-13-mini"
      },
      {
        label: "iPhone 13",
        href: "/iphone/iphone-13"
      },
      {
        label: "Tất cả iPhone",
        href: "/iphone"
      },
    ],
  },
  {
    label: "iPad",
    href: "/ipad",
    dropdownItems: [
      { label: "iPad Pro M4", href: "/ipad/ipad-pro-m4", isNew: true },
      { label: "iPad Pro M2", href: "/ipad/ipad-pro-m2" },
      { label: "iPad Air", href: "/ipad/ipad-air", isHot: true },
      { label: "iPad Gen 10", href: "/ipad/ipad-gen-10" },
      { label: "iPad Mini", href: "/ipad/ipad-mini" },
      { label: "Tất cả iPad", href: "/ipad" },
    ],
  },
  {
    label: "Mac",
    href: "/macbook",
    dropdownItems: [
      {
        label: "MacBook Pro M3",
        href: "/mac/macbook-pro-m3",
        isNew: true,
      },
      {
        label: "MacBook Air M3",
        href: "/mac/macbook-air-m3",
        isNew: true,
      },
      { label: "MacBook Air M2", href: "/mac/macbook-air-m2" },
      { label: 'iMac 24" M3', href: "/mac/imac-24-m3", isHot: true },
      { label: "Tất cả Mac", href: "/macbook" },
    ],
  },
  {
    label: "Watch",
    href: "/apple-watch",
    dropdownItems: [
      {
        label: "Apple Watch Series 10",
        href: "/watch/apple-watch-series-10",
        isNew: true,
      },
      {
        label: "Apple Watch Series 9",
        href: "/watch/apple-watch-series-9",
      },
      {
        label: "Apple Watch Ultra 2",
        href: "/watch/apple-watch-ultra-2",
        isHot: true,
      },
      { label: "Apple Watch SE", href: "/watch/apple-watch-se" },
      { label: "Tất cả Watch", href: "/apple-watch" },
    ],
  },
  {
    label: "AirPods",
    href: "/airpods",
    dropdownItems: [
      {
        label: "AirPods Pro 2",
        href: "/airpods/airpods-pro-2",
        isNew: true,
      },
      { label: "AirPods 4", href: "/airpods/airpods-4", isNew: true },
      { label: "AirPods 3", href: "/airpods/airpods-3" },
      {
        label: "AirPods Max",
        href: "/airpods/airpods-max",
        isHot: true,
      },
      { label: "Tất cả AirPods", href: "/airpods" },
    ],
  },
  {
    label: "Phụ kiện",
    href: "/phu-kien",
    dropdownItems: [
      { label: "Ốp lưng iPhone", href: "/phu-kien/op-lung" },
      { label: "Sạc & Cable", href: "/phu-kien/sac-cable" },
      { label: "Dây Apple Watch", href: "/phu-kien/day-watch" },
      { label: "Tất cả phụ kiện", href: "/phu-kien" },
    ],
  },
];


const CleanShopDunkNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showProductList, setShowProductList] = useState(false);
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

  // Handle category click to show all products
  const handleCategoryClick = useCallback((e: React.MouseEvent, categoryLabel: string) => {
    e.preventDefault(); // Prevent navigation
    setSelectedCategory(categoryLabel);
    setShowProductList(true);
    setActiveDropdown(null); // Close dropdown
  }, []);

  // Close product list
  const closeProductList = useCallback(() => {
    setShowProductList(false);
    setSelectedCategory(null);
  }, []);

  // Get current category data
  const currentCategoryData = selectedCategory
    ? navigationData.find(item => item.label === selectedCategory)
    : null;

  return (
    <>
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
                    onClick={(e) => handleCategoryClick(e, item.label)}
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
                            className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          >
                            <span>{dropdownItem.label}</span>
                            <div className="flex gap-1">
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
                            </div>
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
              <SearchBar
                className="w-full"
                placeholder="Tìm iPhone, iPad, MacBook..."
                showSuggestions={true}
              />
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search */}
              <button
                className="md:hidden p-1.5 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileSearchOpen(true)}
              >
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
                <SearchBar
                  className="w-full"
                  placeholder="Tìm iPhone, iPad, MacBook..."
                  showSuggestions={true}
                />
              </div>
            </motion.div>
          )}

          {/* Mobile Search Modal */}
          {isMobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
              onClick={() => setIsMobileSearchOpen(false)}
            >
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="bg-white p-4 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Tìm kiếm sản phẩm</h3>
                  <button
                    onClick={() => setIsMobileSearchOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <SearchBar
                  className="w-full"
                  placeholder="Tìm iPhone, iPad, MacBook..."
                  showSuggestions={true}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Product List Modal */}
      {showProductList && currentCategoryData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeProductList}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Tất cả {currentCategoryData.label}
                </h2>
                <p className="text-gray-600 mt-1">
                  {currentCategoryData.dropdownItems?.length || 0} sản phẩm
                </p>
              </div>
              <button
                onClick={closeProductList}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Product Grid */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCategoryData.dropdownItems?.map((product, index) => (
                  <Link
                    key={index}
                    href={product.href}
                    className="group border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                    onClick={closeProductList}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {product.label}
                      </h3>
                      <div className="flex gap-1">
                        {product.isNew && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            MỚI
                          </span>
                        )}
                        {product.isHot && (
                          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            HOT
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                      Xem chi tiết →
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <Link
                href={currentCategoryData.href}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                onClick={closeProductList}
              >
                Xem tất cả {currentCategoryData.label} →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default CleanShopDunkNavbar;