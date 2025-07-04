/** @format */

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopBanner = () => {
  return (
    <div className="bg-black text-white text-center py-2 px-2 sm:px-4 xl:px-0">
      <div className="relative max-w-frame mx-auto">
        <p className="text-xs sm:text-sm">
          {/* Sign up and get 20% off to your first order.{" "} */}
          <Link href="#" className="underline font-medium">
            ĐẶT TÊN SAU
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TopBanner;
