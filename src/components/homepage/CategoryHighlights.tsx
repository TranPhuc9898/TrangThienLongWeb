"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "iPhone",
    description: "Điện thoại thông minh hàng đầu",
    image: "/images/iphone14.png",
    href: "/iphone",
    color: "from-blue-500 to-cyan-500",
    stats: "50+ sản phẩm",
  },
  {
    id: 2,
    title: "iPad",
    description: "Máy tính bảng đa năng",
    image: "/images/pic1.png",
    href: "/ipad",
    color: "from-purple-500 to-pink-500",
    stats: "30+ sản phẩm",
  },
  {
    id: 3,
    title: "MacBook",
    description: "Laptop hiệu năng cao",
    image: "/images/pic10.png",
    href: "/macbook",
    color: "from-gray-600 to-gray-800",
    stats: "25+ sản phẩm",
  },
  {
    id: 4,
    title: "Apple Watch",
    description: "Đồng hồ thông minh",
    image: "/images/pic4.png",
    href: "/apple-watch",
    color: "from-red-500 to-orange-500",
    stats: "20+ sản phẩm",
  },
  {
    id: 5,
    title: "AirPods",
    description: "Tai nghe không dây",
    image: "/images/pic7.png",
    href: "/airpods",
    color: "from-green-500 to-emerald-500",
    stats: "15+ sản phẩm",
  },
];

const CategoryHighlights = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Danh Mục
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Sản Phẩm
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá toàn bộ hệ sinh thái Apple với những sản phẩm chính hãng,
            chất lượng cao
          </p>
        </motion.div>

        {/* Main Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* iPhone - Featured Large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href="/iphone" className="group block">
              <div className="relative h-80 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="absolute inset-0 bg-black/10" />

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium mb-4"
                    >
                      Sản phẩm HOT nhất
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-4xl md:text-5xl font-bold text-white mb-3"
                    >
                      iPhone
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-white/90 text-lg mb-6"
                    >
                      iPhone 15 Pro Max với công nghệ Titanium và camera 48MP
                      Pro
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="inline-flex items-center text-white group-hover:translate-x-2 transition-transform duration-300"
                    >
                      <span className="font-semibold mr-2">Khám phá ngay</span>
                      <span className="group-hover:scale-110 transition-transform">
                        →
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* iPhone Image */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 group-hover:scale-110 transition-transform duration-500"
                >
                  <Image
                    src="/images/iphone14.png"
                    alt="iPhone"
                    width={200}
                    height={300}
                    className="drop-shadow-2xl"
                  />
                </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* iPad */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link href="/ipad" className="group block">
              <div className="relative h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">iPad</h3>
                    <p className="text-white/90 mb-4">
                      Máy tính bảng đa năng cho mọi nhu cầu
                    </p>
                    <span className="text-white/80 text-sm">30+ sản phẩm</span>
                  </div>

                  <div className="text-white group-hover:translate-x-2 transition-transform duration-300">
                    <span className="font-semibold">Xem thêm →</span>
                  </div>
                </div>

                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src="/images/pic1.png"
                    alt="iPad"
                    width={120}
                    height={160}
                    className="drop-shadow-2xl"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Secondary Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.slice(2).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              viewport={{ once: true }}
            >
              <Link href={category.href} className="group block">
                <div
                  className={`relative h-48 bg-gradient-to-br ${category.color} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500`}
                >
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {category.title}
                      </h3>
                      <p className="text-white/90 text-sm mb-2">
                        {category.description}
                      </p>
                      <span className="text-white/80 text-xs">
                        {category.stats}
                      </span>
                    </div>

                    <div className="text-white group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-sm font-semibold">Xem →</span>
                    </div>
                  </div>

                  <div className="absolute right-2 bottom-2 group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={80}
                      height={100}
                      className="drop-shadow-xl"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
