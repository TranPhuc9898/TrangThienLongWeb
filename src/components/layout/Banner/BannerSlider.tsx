/** @format */

"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import BannerSliderAbsolute from "./BannerSliderAbsolute";

const banners = [
  {
    image:
      "https://minhtuanmobile.com/uploads/slide/sale-he-ruc-ro-250602021804.png",
    alt: "Sale Hè Rực Rỡ",
  },
  {
    image:
      "https://minhtuanmobile.com/uploads/slide/loa-alpha-works-250528035448.png",
    alt: "Loa Alpha Works",
  },
  {
    image:
      "https://minhtuanmobile.com/uploads/slide/lifestyle-250411102306.png",
    alt: "Lifestyle",
  },
];

export default function BannerSlider() {
  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-full max-w-[1440px] px-2 relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          loop
          className="rounded-2xl shadow-2xl"
        >
          {banners.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-[260px] md:h-[340px] rounded-2xl overflow-hidden">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  className="object-cover rounded-2xl"
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 1440px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Overlay absolute */}
        <div className="absolute top-60 left-0 right-0 z-10 pointer-events-none">
          <BannerSliderAbsolute />
        </div>
      </div>
    </div>
  );
}
