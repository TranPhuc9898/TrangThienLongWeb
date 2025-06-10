/** @format */
"usse client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

const banners = [
  [
    {
      image: "https://minhtuanmobile.com/uploads/slide/quat-250602022707.png",
      alt: "Banner 1",
    },
    {
      image:
        "https://minhtuanmobile.com/uploads/slide/deal-dinh-ipad-250603043410.jpg",
      alt: "Banner 2",
    },
  ],
  [
    {
      image:
        "https://minhtuanmobile.com/uploads/slide/ngay-doi-realme-c-250603025401.png",
      alt: "Banner 3",
    },
    {
      image:
        "https://minhtuanmobile.com/uploads/slide/sale-he-ruc-ro-250602021804.png",
      alt: "Banner 4",
    },
  ],
];

export default function BannerSliderAbsolute() {
  return (
    <div className=" hidden md:flex justify-center py-4 ">
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl px-2">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          loop
          className="rounded-2xl shadow-2xl"
        >
          {banners.map((pair, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex gap-4 w-full h-[160px] md:h-[160px]">
                <div className="flex-1 relative rounded-2xl overflow-hidden">
                  <Image
                    src={pair[0].image}
                    alt={pair[0].alt}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                </div>
                <div className="flex-1 relative rounded-2xl overflow-hidden">
                  <Image
                    src={pair[1].image}
                    alt={pair[1].alt}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
