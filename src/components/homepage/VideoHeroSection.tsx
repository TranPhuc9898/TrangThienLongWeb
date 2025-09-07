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
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center h-full px-4 text-center">
        {/* Enhanced Orbiting Product Cards - Main Focus */}
        <div className="flex-1 flex items-center justify-center">
          <EnhancedOrbitingCards />
        </div>

        {/* CTA Button - Bottom Position */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pb-6"
        >
          <Link
            href="/shop"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10">Khám Phá Ngay</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
    </div>
  );
};


export default VideoHeroSection;