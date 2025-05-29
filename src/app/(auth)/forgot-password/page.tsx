"use client";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "@/components/toast";
import { handleForgotPassword } from "@/lib/cognito-actions";
interface ForgotPasswordFormData {
  email: string;
}

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    try {
      setIsSubmitting(true);

      // Convert data to FormData
      const formData = new FormData();
      formData.append("email", data.email);
      const response = await handleForgotPassword(undefined, formData);
      console.log(response);
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred during forgot password"
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
          Forgot Password
        </h1>
        <p className="w-full font-text-3-regular text-[#6c7279] text-[14px] md:text-[16px] text-center tracking-[0px] leading-[20px]">
          Please enter your email to reset the password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start w-full gap-5"
      >
        <div className="flex flex-col items-start w-full gap-10">
          <div className="flex flex-col items-start justify-center w-full gap-1">
            <div className="flex flex-col items-start w-full gap-5">
              <div className="flex flex-col items-start w-full gap-6">
                {/* Email Field */}
                <div className="flex flex-col items-start gap-1.5 w-full">
                  <div className="inline-flex items-start gap-0.5">
                    <label className="relative w-fit mt-[-1.00px] font-text-2-medium text-[#333333] text-[length:var(--text-2-medium-font-size)] tracking-[var(--text-2-medium-letter-spacing)] leading-[var(--text-2-medium-line-height)] whitespace-nowrap">
                      Email
                    </label>
                    <span className="relative w-fit mt-[-1.00px] font-text-sm-medium text-[#e62e2e] text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] whitespace-nowrap">
                      *
                    </span>
                  </div>
                  <Input
                    {...register("email")}
                    type="email"
                    className="px-3 py-3.5 bg-white rounded-xl border border-solid border-[#e3e3e3] shadow-shadows-shadow-xs w-full"
                    placeholder="Enter email address"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <span className="text-[#e62e2e] text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending reset link..." : "Send reset link"}
          </Button>
        </div>
      </form>
    </div>
  );
}
