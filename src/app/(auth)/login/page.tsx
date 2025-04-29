"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    rememberMe: yup.boolean().default(false),
  })
  .required();

type LoginFormType = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      setIsSubmitting(true);

      // TODO: Replace with your actual API endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      toast.success("Logged in successfully!");
      router.push("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred during login"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-6 md:gap-8">
      {/* Header */}
      <div className="flex flex-col items-start w-full gap-2">
        <h1 className="w-full font-display-1-semibold text-[#333333] text-[20px] md:text-[24px] text-center leading-[30px] tracking-[0px]">
          Sign in
        </h1>
        <p className="w-full font-text-3-regular text-[#6c7279] text-[14px] md:text-[16px] text-center tracking-[0px] leading-[20px]">
          Please enter your details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start w-full gap-5"
      >
        <div className="flex flex-col items-start w-full gap-5">
          <div className="flex flex-col items-start w-full gap-8 md:gap-10">
            {/* Email Field */}
            <div className="flex flex-col items-start w-full gap-4 md:gap-6">
              <div className="flex flex-col items-start gap-1.5 w-full">
                <div className="flex items-start gap-0.5">
                  <label className="font-text-2-medium text-[#333333] text-[14px] tracking-[0px] leading-[20px]">
                    Email
                  </label>
                  <span className="font-text-sm-medium text-[#e62e2e] text-[14px] tracking-[0px] leading-[20px]">
                    *
                  </span>
                </div>
                <Input
                  {...register("email")}
                  className=""
                  placeholder="Enter email address"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <span className="text-[#e62e2e] text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col items-start gap-1.5 w-full">
                <div className="flex items-start gap-0.5">
                  <label className="font-text-2-medium text-[#333333] text-[14px] tracking-[0px] leading-[20px]">
                    Password
                  </label>
                  <span className="font-text-sm-medium text-[#e62e2e] text-[14px] tracking-[0px] leading-[20px]">
                    *
                  </span>
                </div>
                <Input
                  {...register("password")}
                  type="password"
                  showPasswordToggle
                  className="px-3 py-3.5 bg-white rounded-xl border border-[#e3e3e3] shadow-shadows-shadow-xs text-neutralneutral-600 font-text-3-regular"
                  placeholder="Enter password"
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <span className="text-[#e62e2e] text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Remember me and Forgot Password */}
              <div className="flex flex-col items-start justify-between w-full gap-4 sm:flex-row sm:items-center sm:gap-0">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberMe"
                    {...register("rememberMe")}
                    className="w-5 h-5 rounded-md border-[#e3e3e3]"
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="font-text-3-regular text-[#333333] text-[14px] md:text-[16px] tracking-[0px] leading-[20px]"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm font-normal leading-5 text-left underline text-primary-800 sm:text-right"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Sign in Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="flex items-baseline justify-center gap-[5.34px] w-full mt-5">
            <span className="font-text-2-regular text-neutralneutral-900 text-[14px] leading-[20px] tracking-[0px]">
              Don&apos;t have an account?
            </span>
            <a
              href="/signup"
              className="font-text-2-regular text-primary-800 text-[14px] leading-[20px] tracking-[0px] hover:underline"
            >
              Sign Up
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
