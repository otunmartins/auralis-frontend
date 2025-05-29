import React from "react";

import { Toaster as Sonner, toast as sonnerToast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-center"
      expand={false}
      richColors
      closeButton
      duration={2000}
      toastOptions={{
        classNames: {
          toast:
            "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-lg",
          description: "text-gray-500 dark:text-gray-400",
          actionButton: "bg-blue-500 text-white",
          cancelButton:
            "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
        },
      }}
      {...props}
    />
  );
};

// Default styles for all toasts
const defaultStyles = {
  border: "none",
  borderRadius: "8px",
  padding: "16px",
  fontSize: "16px",
  fontWeight: "500",
};

// Predefined styles for each variant
const variantStyles = {
  success: {
    ...defaultStyles,
    background: "white",
    color: "#10b981",
    border: "2px solid #10b981",
  },
  error: {
    ...defaultStyles,
    background: "white",
    color: "#ef4444",
    border: "2px solid #ef4444",
  },
  warning: {
    ...defaultStyles,
    background: "white",
    color: "#f59e0b",
    border: "2px solid #f59e0b",
  },
  info: {
    ...defaultStyles,
    background: "white",
    color: "#3b82f6",
    border: "2px solid #3b82f6",
  },
};

// Create a custom toast object with our predefined styles
const toast = {
  success: (message: string, options: any = {}) => {
    return sonnerToast.success(message, {
      style: {
        ...variantStyles.success,
        ...(options.style || {}),
      },
      ...options,
    });
  },
  error: (message: string, options: any = {}) => {
    return sonnerToast.error(message, {
      style: {
        ...variantStyles.error,
        ...(options.style || {}),
      },
      ...options,
    });
  },
  warning: (message: string, options: any = {}) => {
    return sonnerToast.warning(message, {
      style: {
        ...variantStyles.warning,
        ...(options.style || {}),
      },
      ...options,
    });
  },
  info: (message: string, options: any = {}) => {
    return sonnerToast.info(message, {
      style: {
        ...variantStyles.info,
        ...(options.style || {}),
      },
      ...options,
    });
  },
  // Default toast with custom styling
  custom: (message: string, options: any = {}) => {
    return sonnerToast(message, {
      style: {
        ...defaultStyles,
        ...(options.style || {}),
      },
      ...options,
    });
  },
};

export { toast, Toaster };
