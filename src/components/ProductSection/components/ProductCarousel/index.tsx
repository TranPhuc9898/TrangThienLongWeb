/** @format */

"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/swiper-custom.css";

const carouselItems = [
  {
    id: 1,
    image: "/images/Carousel_1.png",
    bg: "bg-white",
  },
  {
    id: 2,
    image: "/images/Carousel_2.png",
    bg: "bg-[#2B2B7B]",
  },
];

const ProductCarousel = () => {
  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-lg group relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full h-[500px] bg-transparent"
      >
        {carouselItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className={`w-full h-[500px] flex flex-col items-center justify-center relative ${item.bg}`}
            >
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  zIndex: 0,
                  background:
                    item.bg === "bg-white"
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(43,43,123,0.95)",
                }}
              />
              <img
                src={item.image}
                alt="carousel"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                style={{ zIndex: 1 }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Hide navigation and pagination by default, show on hover */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          opacity: 0;
          transition: opacity 0.2s;
        }
        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 1;
        }
        .swiper-pagination-bullets {
          opacity: 0;
          transition: opacity 0.2s;
        }
        .group:hover .swiper-pagination-bullets {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ProductCarousel;
