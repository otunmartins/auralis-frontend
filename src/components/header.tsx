"use client";

import { useState } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/themeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchInput } from "./searchInput";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full ">
      <div className="w-full rounded-[18px] bg-white flex items-center justify-between py-4 px-[18px] mx-auto">
        <div className="w-full max-w-[381px] max-md:hidden mr-2">
          <SearchInput />
        </div>

        <div className="flex items-center justify-end w-full gap-4 max-md:justify-between">
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <div className="relative">
              <Button variant="ghost" className="text-foreground">
                <Bell className="w-5 h-5" />
                <span className="absolute w-2 h-2 bg-red-500 rounded-full top-2 right-2"></span>
              </Button>
            </div>
          </div>

          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm max-md:hidden">
                  <span className="font-medium">Asha Roya</span>
                  <span className="text-xs text-muted-foreground">
                    asha@gmail.com
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 ">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
