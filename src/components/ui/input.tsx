"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showPasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showPasswordToggle = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const inputType = showPassword ? "text" : type;

    return (
      <div className="relative w-full">
        <input
          type={inputType}
          className={cn(
            "flex px-[12px] py-[14px] w-full rounded-md border border-[#EEEEEE] bg-transparent text-paragraph-medium shadow-sm transition-colors file:border-0 file:bg-transparent  file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ",
            type === "password" && showPasswordToggle && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute -translate-y-1/2 cursor-pointer right-3 top-1/2"
          >
            {showPassword ? (
              <EyeIcon className="h-[18px] w-[18px] text-gray-500" />
            ) : (
              <EyeOffIcon className="h-[18px] w-[18px] text-gray-500" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
