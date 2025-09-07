/** @format */
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const HeroSection = () => {
  return (
    <div className="w-full overflow-hidden relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full overflow-hidden"
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-[36vw] max-h-[420px] min-h-[200px]">
            <Image
              src="/images/banner/backtoschool-02.png"
              alt="Back to School Banner"
              fill
              priority
              className="object-cover object-center select-none pointer-events-none"
              sizes="100vw"
            />
          </div>
        </SwiperSlide>
        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-[36vw] max-h-[420px] min-h-[200px]">
            <Image
              src="/images/banner/Trả góp toàn quốc-02.png"
              alt="Trả góp toàn quốc Banner"
              fill
              loading="lazy"
              className="object-cover object-center select-none pointer-events-none"
              sizes="100vw"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      {/* Swiper pagination bullets style */}
      <style jsx global>{`
        .swiper-pagination-bullets {
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .swiper:hover .swiper-pagination-bullets {
          opacity: 1;
        }
      `}</style>
      {/* Đảm bảo toàn trang không bị tràn ngang */}
      <style jsx global>{`
        html,
        body,
        #__next {
          overflow-x: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          max-width: 100vw !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
