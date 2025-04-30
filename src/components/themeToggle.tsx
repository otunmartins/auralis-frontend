"use client";

import { Moon, Sun } from "lucide-react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  return (
    <div className="flex items-center">
      <SwitchPrimitives.Root
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          theme === "dark" ? "bg-gray-500" : "bg-[#F6F6F6]"
        )}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none flex items-center justify-center h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
            theme === "dark" ? "translate-x-5" : "translate-x-0"
          )}
        >
          {theme === "dark" ? (
            <Moon className="w-3 h-3 text-primary" />
          ) : (
            <Sun className="w-3 h-3 text-[#6D727A]" />
          )}
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
    </div>
  );
}
