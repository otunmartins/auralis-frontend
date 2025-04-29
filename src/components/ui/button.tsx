import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 rounded-lg font-sans transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary variants
        primary:
          "bg-primary-950 !text-white hover:bg-primary-900 focus-visible:ring-primary-900",
        "primary-outline":
          "border-2 border-primary-950 text-primary-900 bg-white hover:bg-primary-50 focus-visible:ring-primary-900",

        // Secondary variants
        secondary:
          "bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-600",
        "secondary-outline":
          "border-2 border-secondary-600 text-secondary-600 bg-white hover:bg-secondary-50 focus-visible:ring-secondary-600",

        // Ghost variants
        ghost:
          "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-neutral-600",
        disabled: "bg-neutral-100  cursor-not-allowed",
      },
      size: {
        sm: "h-9 px-4 text-label-small [&>svg]:size-4",
        md: "h-10 px-5 text-label-medium [&>svg]:size-5",
        lg: "h-11 px-6 text-label-large [&>svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, startIcon, endIcon, children, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
