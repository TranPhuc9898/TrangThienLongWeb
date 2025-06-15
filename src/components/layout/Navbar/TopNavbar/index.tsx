/** @format */
"use client";
// /** @format */

// import { cn } from "@/lib/utils";
// import { integralCF } from "@/styles/fonts";
// import Link from "next/link";
// import React from "react";
// import { NavMenu } from "../navbar.types";
// import { MenuList } from "./MenuList";
// import {
//   NavigationMenu,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import { MenuItem } from "./MenuItem";
// import Image from "next/image";
// import InputGroup from "@/components/ui/input-group";
// import ResTopNavbar from "./ResTopNavbar";
// import CartBtn from "./CartBtn";

// const data: NavMenu = [
//   {
//     id: 1,
//     label: "Shop",
//     type: "MenuList",
//     children: [
//       {
//         id: 11,
//         label: "Men's clothes",
//         url: "/shop#men-clothes",
//         description: "In attractive and spectacular colors and designs",
//       },
//       {
//         id: 12,
//         label: "Women's clothes",
//         url: "/shop#women-clothes",
//         description: "Ladies, your style and tastes are important to us",
//       },
//       {
//         id: 13,
//         label: "Kids clothes",
//         url: "/shop#kids-clothes",
//         description: "For all ages, with happy and beautiful colors",
//       },
//       {
//         id: 14,
//         label: "Bags and Shoes",
//         url: "/shop#bag-shoes",
//         description: "Suitable for men, women and all tastes and styles",
//       },
//     ],
//   },
//   {
//     id: 2,
//     type: "MenuItem",
//     label: "On Sale",
//     url: "/shop#on-sale",
//     children: [],
//   },
//   {
//     id: 3,
//     type: "MenuItem",
//     label: "New Arrivals",
//     url: "/shop#new-arrivals",
//     children: [],
//   },
//   {
//     id: 4,
//     type: "MenuItem",
//     label: "Brands",
//     url: "/shop#brands",
//     children: [],
//   },
// ];

// const TopNavbar = () => {
//   return (
//     <nav className="sticky top-0 bg-white z-20">
//       <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
//         <div className="flex items-center">
//           <div className="block md:hidden mr-4">
//             <ResTopNavbar data={data} />
//           </div>
//           <Link
//             href="/"
//             className={cn([integralCF.className, "mb-2 whitespace-nowrap"])}
//             style={{
//               marginRight: "clamp(0.5rem, 4vw, 2.5rem)",
//               marginTop: "clamp(0.3rem, 1vw, 2.5rem)",
//             }}
//           >
//             <Image
//               src="/images/ttl.png"
//               alt="Trang Thiên Long Mobile"
//               width={200}
//               height={50}
//               priority
//               className="h-auto w-auto max-h-[50px] max-w-[200px]"
//             />
//           </Link>
//         </div>
//         <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
//           <NavigationMenuList>
//             {/* {data.map((item) => (
//               <React.Fragment key={item.id}>
//                 {item.type === "MenuItem" && (
//                   <MenuItem label={item.label} url={item.url} />
//                 )}
//                 {item.type === "MenuList" && (
//                   <MenuList data={item.children} label={item.label} />
//                 )}
//               </React.Fragment>
//             ))} */}
//           </NavigationMenuList>
//         </NavigationMenu>
//         <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
//           <InputGroup.Text>
//             <Image
//               priority
//               src="/icons/search.svg"
//               height={20}
//               width={20}
//               alt="search"
//               className="min-w-5 min-h-5"
//             />
//           </InputGroup.Text>
//           <InputGroup.Input
//             type="search"
//             name="search"
//             placeholder="Bạn cẩn tìm gì ?"
//             className="bg-transparent placeholder:text-black/40"
//           />
//         </InputGroup>
//         <div className="flex items-center">
//           <Link href="/search" className="block md:hidden mr-[14px] p-1">
//             <Image
//               priority
//               src="/icons/search-black.svg"
//               height={100}
//               width={100}
//               alt="search"
//               className="max-w-[22px] max-h-[22px]"
//             />
//           </Link>
//           <CartBtn />
//           {/* <Link href="/#signin" className="p-1">
//             <Image
//               priority
//               src="/icons/user.svg"
//               height={100}
//               width={100}
//               alt="user"
//               className="max-w-[22px] max-h-[22px]"
//             />
//           </Link> */}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default TopNavbar;
/** @format */

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { useState } from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";

const data: NavMenu = [
  {
    id: 1,
    label: "Shop",
    type: "MenuList",
    children: [
      {
        id: 11,
        label: "Men's clothes",
        url: "/shop#men-clothes",
        description: "In attractive and spectacular colors and designs",
      },
      {
        id: 12,
        label: "Women's clothes",
        url: "/shop#women-clothes",
        description: "Ladies, your style and tastes are important to us",
      },
      {
        id: 13,
        label: "Kids clothes",
        url: "/shop#kids-clothes",
        description: "For all ages, with happy and beautiful colors",
      },
      {
        id: 14,
        label: "Bags and Shoes",
        url: "/shop#bag-shoes",
        description: "Suitable for men, women and all tastes and styles",
      },
    ],
  },
  {
    id: 2,
    type: "MenuItem",
    label: "On Sale",
    url: "/shop#on-sale",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "New Arrivals",
    url: "/shop#new-arrivals",
    children: [],
  },
  {
    id: 4,
    type: "MenuItem",
    label: "Brands",
    url: "/shop#brands",
    children: [],
  },
];

const TopNavbar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-20">
      <div className="grid grid-cols-3 max-w-frame mx-auto items-center py-3 md:py-6 px-4 xl:px-0">
        {/* Cột 1: Logo (trái) */}
        <div className="flex items-center space-x-3">
          <div className="block md:hidden mr-3">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([integralCF.className, "whitespace-nowrap"])}
          >
            <Image
              src="/images/ttl.png"
              alt="Trang Thiên Long Mobile"
              width={120}
              height={40}
              priority
              className="h-auto w-auto max-h-[25px] md:max-h-[40px] max-w-[80px] md:max-w-[120px]"
            />
          </Link>
        </div>

        {/* Cột 2: Search Bar (giữa) */}
        <div className="flex justify-center">
          <InputGroup className="hidden md:flex bg-[#F5F5F5] border border-gray-200 rounded-lg w-full max-w-[430px]">
            <InputGroup.Text>
              <Image
                priority
                src="/icons/search.svg"
                height={20}
                width={20}
                alt="search"
                className="min-w-5 min-h-5"
              />
            </InputGroup.Text>
            <InputGroup.Input
              type="search"
              name="search"
              placeholder="Bạn cần tìm gì ?"
              className="bg-transparent placeholder:text-gray-500 border-0 focus:ring-0"
            />
          </InputGroup>
        </div>

        {/* Cột 3: Icon (phải) */}
        <div className="flex justify-end items-center space-x-5">
          {/* Nút search mobile */}
          <button
            type="button"
            className="block md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setShowMobileSearch(true)}
            aria-label="Tìm kiếm"
          >
            <Image
              priority
              src="/icons/search-black.svg"
              height={28}
              width={28}
              alt="search"
              className="w-[28px] h-[28px]"
            />
          </button>
          <CartBtn />
        </div>

        {/* Overlay Search cho mobile */}
        {showMobileSearch && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center animate-fade-in">
            <div className="bg-white w-full p-4 flex items-center shadow-lg">
              <input
                autoFocus
                type="search"
                placeholder="Bạn cần tìm gì?"
                className="flex-1 px-4 py-2 rounded-lg border outline-none"
              />
              <button
                onClick={() => setShowMobileSearch(false)}
                className="ml-2 p-2"
                aria-label="Đóng tìm kiếm"
              >
                <Image
                  src="/icons/close.svg"
                  width={24}
                  height={24}
                  alt="Đóng"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default TopNavbar;
