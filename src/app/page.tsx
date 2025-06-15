/** @format */

import "@/styles/swiper-custom.css";
import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";
import FloatingToolbar from "../components/FloatingToolbar";
import ProductSection from "../components/ProductSection";
import BannerSlider from "../components/layout/Banner/BannerSlider";

export const newArrivalsData: Product[] = [
  {
    id: 1,
    title: "",
    srcUrl: "/",
    gallery: ["/", "", ""],
    price: 120,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 2,
    title: "",
    srcUrl: "/",
    gallery: [""],
    price: 260,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 3.5,
  },
  {
    id: 3,
    title: "",
    srcUrl: "",
    gallery: [""],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 4,
    title: "",
    srcUrl: "",
    gallery: ["", "", ""],
    price: 160,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
  },
];

export const topSellingData: Product[] = [
  {
    id: 5,
    title: "",
    srcUrl: "",
    gallery: ["", "", ""],
    price: 232,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 5.0,
  },
  {
    id: 6,
    title: "",
    srcUrl: "",
    gallery: ["", "", ""],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.0,
  },
  {
    id: 7,
    title: "",
    srcUrl: "",
    gallery: [""],
    price: 80,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.0,
  },
  {
    id: 8,
    title: "",
    srcUrl: "",
    gallery: [""],
    price: 210,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
];

export const relatedProductData: Product[] = [
  {
    id: 12,
    title: "",
    srcUrl: "",
    gallery: ["", "", ""],
    price: 242,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 4.0,
  },
  {
    id: 13,
    title: "",
    srcUrl: "",
    gallery: ["", "", ""],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.5,
  },
  {
    id: 14,
    title: "",
    srcUrl: "",
    gallery: [""],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 15,
    title: "",
    srcUrl: "",
    gallery: [""],
    price: 150,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 5.0,
  },
];

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "",
    content: '"”',
    rating: 5,
    date: "",
  },
  {
    id: 2,
    user: "",
    content: `"”`,
    rating: 5,
    date: "",
  },
  {
    id: 3,
    user: "",
    content: `""`,
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "",
    content: `""`,
    rating: 5,
    date: "August 17, 2023",
  },
  {
    id: 5,
    user: "",
    content: `""`,
    rating: 5,
    date: "August 18, 2023",
  },
  {
    id: 6,
    user: "",
    content: `""`,
    rating: 5,
    date: "August 19, 2023",
  },
];

export default function Home() {
  return (
    <>
      <FloatingToolbar />
      <BannerSlider />

      <Header />

      {/* Product Sections */}
      <ProductSection
        id="iphone-section"
        title="iPhone"
        backgroundImage="/images/home-bg-2.png"
      />
      {/* <Brands /> */}
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW IPHONE"
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
