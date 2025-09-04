/** @format */

"use client";

import { Product } from "@/types/product.types";
import Image from "next/image";
import React, { useState } from "react";
import { getAbsoluteImageUrl } from "@/lib/imageUtils";

interface PhotoSectionProps {
  data: Product;
  selectedVariant?: {
    id: string;
    image: string;
    color: string;
    storage: string;
  };
}

const PhotoSection = ({ data, selectedVariant }: PhotoSectionProps) => {
  // Primary image priority: variant image > thumbnail > default
  const primaryImage = selectedVariant?.image || data.thumbnail || "/images/iphone14.png";
  
  const [selected, setSelected] = useState<string>(primaryImage);

  // Get all available images for gallery
  const getAllImages = (): string[] => {
    const images: string[] = [];
    
    // Add primary image first
    if (primaryImage) {
      images.push(primaryImage);
    }
    
    // Add gallery images (avoid duplicates)
    if (data.gallery && data.gallery.length > 0) {
      data.gallery.forEach(img => {
        if (!images.includes(img)) {
          images.push(img);
        }
      });
    }
    
    // Add variant images from colors if available
    if (data.colors && data.colors.length > 0) {
      data.colors.forEach(colorData => {
        if (Array.isArray(colorData.images)) {
          (colorData.images as string[]).forEach(img => {
            if (!images.includes(img)) {
              images.push(img);
            }
          });
        }
      });
    }
    
    return images.filter(Boolean).slice(0, 8); // Limit to 8 images for performance
  };

  const galleryImages = getAllImages();
  const productName = data.productName || data.title || "Apple Product";

  return (
    <>
      {/* Hidden images for SEO/crawlers - These will be indexed by Google */}
      <div className="sr-only">
        {galleryImages.map((image, index) => (
          <img
            key={`seo-${index}`}
            src={getAbsoluteImageUrl(image)}
            alt={`${productName} - Image ${index + 1}`}
            width={800}
            height={800}
            style={{ display: 'none' }}
          />
        ))}
      </div>

      {/* Visible gallery UI */}
      <div className="flex flex-col-reverse lg:flex-row lg:space-x-3.5">
        {galleryImages.length > 1 && (
          <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3.5 w-full lg:w-fit items-center lg:justify-start justify-center">
            {galleryImages.map((photo, index) => (
              <button
                key={index}
                type="button"
                className={`bg-[#F0EEED] rounded-[13px] xl:rounded-[20px] w-full max-w-[111px] xl:max-w-[152px] max-h-[106px] xl:max-h-[167px] xl:min-h-[167px] aspect-square overflow-hidden border-2 transition-all duration-300 ${
                  selected === photo 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => setSelected(photo)}
                aria-label={`View ${productName} image ${index + 1}`}
              >
                <Image
                  src={getAbsoluteImageUrl(photo)}
                  width={152}
                  height={167}
                  className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
                  alt={`${productName} - Thumbnail ${index + 1}`}
                  priority={index < 4} // Prioritize first 4 thumbnails
                  sizes="(max-width: 768px) 111px, 152px"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main product image */}
        <div className="flex items-center justify-center bg-[#F0EEED] rounded-[13px] sm:rounded-[20px] w-full sm:w-96 md:w-full mx-auto h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px] overflow-hidden mb-3 lg:mb-0">
          <Image
            src={getAbsoluteImageUrl(selected)}
            width={800}
            height={800}
            className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
            alt={`${productName}${selectedVariant ? ` - ${selectedVariant.storage} ${selectedVariant.color}` : ''}`}
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 444px"
            // Remove unoptimized to allow Next.js optimization for better SEO
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      </div>

      {/* Schema.org structured data for images */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": `${productName} - Product Images`,
            "description": `High-quality images of ${productName} available at Trang Thiên Long Mobile`,
            "image": galleryImages.map((img, index) => ({
              "@type": "ImageObject",
              "url": getAbsoluteImageUrl(img),
              "name": `${productName} - Image ${index + 1}`,
              "caption": `${productName} chính hãng tại Trang Thiên Long Mobile`,
              "width": 800,
              "height": 800,
              "encodingFormat": img.includes('.webp') ? 'image/webp' : 
                               img.includes('.png') ? 'image/png' : 'image/jpeg'
            })),
            "associatedMedia": galleryImages.map(img => ({
              "@type": "ImageObject",
              "contentUrl": getAbsoluteImageUrl(img),
              "thumbnailUrl": getAbsoluteImageUrl(img),
              "width": 800,
              "height": 800
            }))
          })
        }}
      />
    </>
  );
};

export default PhotoSection;