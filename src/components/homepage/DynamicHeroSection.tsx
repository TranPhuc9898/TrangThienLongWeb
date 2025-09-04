"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import EditButton from "@/components/admin/EditButton";
import { useAdminEdit } from "@/contexts/AdminEditContext";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  link?: string;
  order: number;
  active: boolean;
}

const DynamicHeroSection = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdminLoggedIn } = useAdminEdit();

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const response = await fetch("/api/banners");
      if (response.ok) {
        const data = await response.json();

        // If database has banners, use them
        if (data && data.length > 0) {
          setBanners(data);
          console.log("📸 Loaded banners from database:", data.length);
        } else {
          // If database is empty, use fallback banners
          console.log("📸 Database empty, using fallback banners");
          setBanners([
            {
              id: "fallback-1",
              title: "Back to School Banner",
              imageUrl: "/images/banner/backtoschool-02.webp",
              order: 1,
              active: true,
            },
            {
              id: "fallback-2",
              title: "Trả góp toàn quốc Banner",
              imageUrl: "/images/banner/Trả góp toàn quốc-02.webp",
              order: 2,
              active: true,
            },
          ]);
        }
      } else {
        console.log("❌ API error, using fallback banners");
        // Fallback to original banners if API fails
        setBanners([
          {
            id: "fallback-1",
            title: "Back to School Banner",
            imageUrl: "/images/banner/backtoschool-02.webp",
            order: 1,
            active: true,
          },
          {
            id: "fallback-2",
            title: "Trả góp toàn quốc Banner",
            imageUrl: "/images/banner/Trả góp toàn quốc-02.webp",
            order: 2,
            active: true,
          },
        ]);
      }
    } catch (error) {
      console.error("Error loading banners:", error);
      // Fallback banners
      setBanners([
        {
          id: "fallback-1",
          title: "Back to School Banner",
          imageUrl: "/images/banner/backtoschool-02.webp",
          order: 1,
          active: true,
        },
        {
          id: "fallback-2",
          title: "Trả góp toàn quốc Banner",
          imageUrl: "/images/banner/Trả góp toàn quốc-02.webp",
          order: 2,
          active: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBanners = () => {
    // Open banner management in new tab
    window.open("/admin-admin/dashboard?tab=banners", "_blank");
  };

  if (loading) {
    return (
      <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[460px] bg-white animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500">Loading banners...</div>
        </div>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[460px] bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No banners available</p>
          {isAdminLoggedIn && (
            <button
              onClick={handleEditBanners}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Banners
            </button>
          )}
        </div>
        <EditButton
          componentName="Banner Carousel"
          onEdit={handleEditBanners}
          className="z-20"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Edit Button for Admin */}
      <EditButton
        componentName="Banner Carousel"
        onEdit={handleEditBanners}
        className="z-20"
      />

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        loop={banners.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full overflow-hidden"
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="relative w-full h-[260px] sm:h-[360px] lg:h-[460px] bg-white"
              data-banner-slide={banner.id}
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '16/9'
              }}
            >
              {banner.link ? (
                <a href={banner.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    width={1920}
                    height={1080}
                    priority={banner.order <= 1}
                    className="object-contain object-center select-none pointer-events-none w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    onError={(e) => {
                      console.error(
                        "🖼️ Banner image failed to load:",
                        banner.imageUrl
                      );
                      const target = e.target as HTMLImageElement;
                      const container = target.closest("[data-banner-slide]");
                      if (container) {
                        (container as HTMLElement).style.display = "none";
                      }
                    }}
                  />
                </a>
              ) : (
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  width={1920}
                  height={1080}
                  priority={banner.order <= 1}
                  className="object-contain object-center select-none pointer-events-none w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  onError={(e) => {
                    console.error(
                      "🖼️ Banner image failed to load:",
                      banner.imageUrl
                    );
                    const target = e.target as HTMLImageElement;
                    const container = target.closest("[data-banner-slide]");
                    if (container) {
                      (container as HTMLElement).style.display = "none";
                    }
                  }}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
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
    </div>
  );
};

export default DynamicHeroSection;
