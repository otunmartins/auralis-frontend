"use client";

import React from "react";
// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getImageSrc = () => {
    if (pathname.includes("/forgot-password")) {
      return "/image-2.png";
    } else if (pathname.includes("/reset-password")) {
      return "/image-2.png";
    } else {
      return "/image-1.png";
    }
  };

  return (
    <div className="max-w-full min-h-screen mx-auto overflow-hidden bg-white rounded-3xl">
      {/* Image section - hidden on mobile, shown on md and up */}
      <div className="fixed top-0 left-0 hidden w-1/2 h-full p-6 bg-white md:flex md:flex-1">
        <Card className="w-full h-full overflow-hidden">
          <CardContent className="h-full p-0">
            <img
              className="object-cover w-full h-full"
              alt="Auth background"
              src={getImageSrc()}
            />
          </CardContent>
        </Card>
      </div>

      {/* Form section */}
      <div className="flex flex-col items-center justify-center flex-1 w-1/2 min-h-screen px-4 py-8 ml-auto bg-white sm:px-8 md:px-12 lg:px-20">
        <div className="flex flex-col items-center w-full max-w-full gap-10 md:gap-20">
          {/* Logo */}
          <div className="relative w-[80px] md:w-[100px] h-[80px] md:h-[100px]">
            <img
              className="absolute w-[66px] md:w-[83px] h-[75px] md:h-[94px] top-[3px] left-2"
              alt="Logo"
              src="/group.png"
            />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
