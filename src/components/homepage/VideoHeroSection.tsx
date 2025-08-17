/** @format */

"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import EnhancedOrbitingCards from "./EnhancedOrbitingCards";

const VideoHeroSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
      <section className="relative w-full aspect-[21/9] sm:aspect-[2/1] lg:aspect-[5/2] bg-gradient-to-br from-gray-900 via-blue-900 to-black overflow-hidden rounded-2xl">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/mp4/large_2x.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/iphone14.png"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Apple
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-white/90 mt-2">
              Thế Giới
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl"
          >
            iPhone, iPad, MacBook, Apple Watch & AirPods chính hãng
            <br />
            <span className="text-blue-300 font-semibold">Giá tốt nhất thị trường</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/shop"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[200px]"
            >
              <span className="relative z-10">Khám Phá Ngay</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="/iphone"
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 min-w-[200px]"
            >
              iPhone Mới Nhất
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced Orbiting Product Cards */}
        <EnhancedOrbitingCards />
      </div>
    </section>
    </div>
  );
};


export default VideoHeroSection;