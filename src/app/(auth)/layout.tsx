import React from "react";
// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-white rounded-3xl overflow-hidden max-w-[1920px] mx-auto">
      {/* Image section - hidden on mobile, shown on md and up */}
      <div className="hidden p-6 bg-white md:flex md:flex-1">
        <Card className="w-full h-full overflow-hidden">
          <CardContent className="h-full p-0">
            <img
              className="object-cover w-full h-full"
              alt="Sign in background"
              src="/image-1.png"
            />
          </CardContent>
        </Card>
      </div>

      {/* Form section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-8 md:py-[100px] bg-white">
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
