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
    icon: "/icons/iphone_black.svg"
  },
  {
    id: "ipad",
    title: "iPad",
    description: "iPad Pro M2 & iPad Air với Apple Pencil",
    image: "/images/pic1.png", 
    href: "/ipad",
    gradient: "from-purple-500 to-pink-600",
    icon: "/icons/ipad.svg"
  },
  {
    id: "watch",
    title: "Apple Watch",
    description: "Series 9 & Ultra 2 với tính năng mới",
    image: "/images/pic4.png",
    href: "/apple-watch",
    gradient: "from-green-500 to-teal-600",
    icon: "/icons/watch.svg"
  },
  {
    id: "airpods",
    title: "AirPods",
    description: "AirPods Pro 2 với Spatial Audio",
    image: "/images/pic7.png",
    href: "/airpods",
    gradient: "from-orange-500 to-red-600",
    icon: "/icons/airpods.svg"
  },
  {
    id: "mac",
    title: "Mac",
    description: "MacBook Air M2 & MacBook Pro hiệu năng cao",
    image: "/images/pic10.png",
    href: "/macbook",
    gradient: "from-gray-600 to-gray-900",
    icon: "/icons/mac.svg"
  }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured iPhone Card - Larger */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2"
          >
            <Link href="/iphone" className="group block">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-8 h-80 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl">
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <Image
                      src="/icons/iphone_black.svg"
                      alt="iPhone"
                      width={32}
                      height={32}
                      className="mr-3 filter invert"
                    />
                    <h3 className="text-3xl font-bold text-white">iPhone</h3>
                  </div>
                  <p className="text-white/90 text-lg mb-6 max-w-md">
                    iPhone 15 Pro Max với Titanium Design, camera 48MP và chip A17 Pro
                  </p>
                  <div className="inline-flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Khám phá iPhone</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <div className="absolute right-4 top-4">
                  <Image
                    src="/images/iphone14.png"
                    alt="iPhone"
                    width={200}
                    height={200}
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          </motion.div>

          {/* Other Category Cards */}
          {categories.slice(1).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 2) }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={category.href} className="block">
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${category.gradient} p-6 h-80 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl`}>
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-3">
                        <Image
                          src={category.icon}
                          alt={category.title}
                          width={24}
                          height={24}
                          className="mr-2 filter invert"
                        />
                        <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="inline-flex items-center text-white font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                        <span>Xem thêm</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      
                      <div className="w-20 h-20">
                        <Image
                          src={category.image}
                          alt={category.title}
                          width={80}
                          height={80}
                          className="object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
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
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesGrid;