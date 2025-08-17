/** @format */

"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface CategoryCard {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  gradient: string;
  icon: string;
}

const categories: CategoryCard[] = [
  {
    id: "iphone",
    title: "iPhone",
    description: "iPhone 15 Series với Titanium Design",
    image: "/images/iphone14.png",
    href: "/iphone",
    gradient: "from-blue-500 to-purple-600",
    icon: "/icons/iphone_black.svg",
  },
  {
    id: "ipad",
    title: "iPad",
    description: "iPad Pro M2 & iPad Air với Apple Pencil",
    image: "/images/iphone14.png",
    href: "/ipad",
    gradient: "from-purple-500 to-pink-600",
    icon: "/icons/ipad.svg",
  },
  {
    id: "watch",
    title: "Apple Watch",
    description: "Series 9 & Ultra 2 với tính năng mới",
    image: "/images/iphone14.png",
    href: "/apple-watch",
    gradient: "from-green-500 to-teal-600",
    icon: "/icons/watch.svg",
  },
  {
    id: "airpods",
    title: "AirPods",
    description: "AirPods Pro 2 với Spatial Audio",
    image: "/images/iphone14.png",
    href: "/airpods",
    gradient: "from-orange-500 to-red-600",
    icon: "/icons/airpods.svg",
  },
  {
    id: "mac",
    title: "Mac",
    description: "MacBook Air M2 & MacBook Pro hiệu năng cao",
    image: "/images/iphone14.png",
    href: "/macbook",
    gradient: "from-gray-600 to-gray-900",
    icon: "/icons/mac.svg",
  },
];

const CategoriesGrid = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-bold">
            Danh Mục Sản Phẩm
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá toàn bộ hệ sinh thái Apple với giá cả cạnh tranh nhất
          </p>
        </motion.div>

        {/* Stats Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "10K+", label: "Khách hàng hài lòng" },
            { number: "99%", label: "Sản phẩm like new" },
            { number: "12", label: "Tháng bảo hành" },
            { number: "0%", label: "Lãi suất trả góp" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
};

export default CategoriesGrid;
