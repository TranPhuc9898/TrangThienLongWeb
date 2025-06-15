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
    <div className="w-full">
      <div className="relative w-full">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          loop
          className="w-full"
        >
          {banners.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-[200px] sm:h-[300px] md:h-[300px] lg:h-[300px] xl:h-[400px]">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  className="object-cover w-full h-full"
                  priority={idx === 0}
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Overlay absolute */}
        <div className="absolute top-60 left-0 right-0 z-10 pointer-events-none">
          {/* <BannerSliderAbsolute /> */}
        </div>
      </div>
    </div>
  );
}
