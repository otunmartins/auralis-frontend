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
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface SignUpFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const signUpSchema = yup
  .object()
  .shape({
    fullName: yup
      .string()
      .min(2, "Name must be at least 2 characters")
      .required("Full name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .test("valid-phone", "Please enter a valid phone number", (value) => {
        if (!value) return false;
        // Basic validation for E.164 format (e.g. +923001234567)
        return /^\+\d{1,3}\d{10,14}$/.test(value);
      }),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup.string().required("Please confirm your password"),
    terms: yup.boolean().required().oneOf([true], "You must accept the terms"),
  })
  .test("passwords-match", "Passwords don't match", function (data) {
    return data.password === data.confirmPassword;
  });

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      terms: false,
    },
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      setIsSubmitting(true);

      // Remove confirmPassword from the data before sending to API
      const { confirmPassword, ...signupData } = data;

      // TODO: Replace with your actual API endpoint
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred during signup"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    setValue("phoneNumber", value || "");
    // Trigger validation for phoneNumber field
    trigger("phoneNumber");
  };

  const handleTermsChange = (checked: boolean) => {
    setValue("terms", checked);
    // Trigger validation for terms field
    trigger("terms");
  };

  return (
    <div className="flex flex-col items-center w-full gap-6 md:gap-8">
      {/* Header */}
      <div className="flex flex-col items-start w-full gap-2">
        <h1 className="w-full font-display-1-semibold text-[#333333] text-[20px] md:text-[24px] text-center leading-[30px] tracking-[0px]">
          Sign up
        </h1>
        <p className="w-full font-text-3-regular text-[#6c7279] text-[14px] md:text-[16px] text-center tracking-[0px] leading-[20px]">
          Please enter your details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-5 w-full"
      >
        <div className="flex flex-col items-start gap-10 w-full">
          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <div className="flex flex-col items-start gap-5 w-full">
              <div className="flex flex-col items-start gap-6 w-full">
                {/* Full Name Field */}
                <div className="flex flex-col items-start gap-1.5 w-full">
                  <div className="inline-flex items-start gap-0.5">
                    <label className="relative w-fit mt-[-1.00px] font-text-2-medium text-[#333333] text-[length:var(--text-2-medium-font-size)] tracking-[var(--text-2-medium-letter-spacing)] leading-[var(--text-2-medium-line-height)] whitespace-nowrap">
                      Full Name
                    </label>
                    <span className="relative w-fit mt-[-1.00px] font-text-sm-medium text-[#e62e2e] text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] whitespace-nowrap">
                      *
                    </span>
                  </div>
                  <Input
                    {...register("fullName")}
                    className="px-3 py-3.5 bg-white rounded-xl border border-solid border-[#e3e3e3] shadow-shadows-shadow-xs w-full"
                    placeholder="Enter full name"
                    disabled={isSubmitting}
                  />
                  {errors.fullName && (
                    <span className="text-[#e62e2e] text-sm">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

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

                {/* Phone Number Field */}
                <div className="flex flex-col items-start gap-1.5 w-full">
                  <div className="inline-flex items-start gap-0.5">
                    <label className="relative w-fit mt-[-1.00px] font-text-2-medium text-[#333333] text-[length:var(--text-2-medium-font-size)] tracking-[var(--text-2-medium-letter-spacing)] leading-[var(--text-2-medium-line-height)] whitespace-nowrap">
                      Phone number
                    </label>
                    <span className="relative w-fit mt-[-1.00px] font-text-sm-medium text-[#e62e2e] text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] whitespace-nowrap">
                      *
                    </span>
                  </div>
                  <div className="w-full">
                    <PhoneInput
                      defaultCountry="PK"
                      value={watch("phoneNumber")}
                      onChange={handlePhoneChange}
                      className="custom-phone-input"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <span className="text-[#e62e2e] text-sm">
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-start gap-4 w-full">
                  {/* Password Field */}
                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <div className="inline-flex items-start gap-0.5">
                      <label className="relative w-fit mt-[-1.00px] font-text-2-medium text-[#333333] text-[length:var(--text-2-medium-font-size)] tracking-[var(--text-2-medium-letter-spacing)] leading-[var(--text-2-medium-line-height)] whitespace-nowrap">
                        Password
                      </label>
                      <span className="relative w-fit mt-[-1.00px] font-text-sm-medium text-[#e62e2e] text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] whitespace-nowrap">
                        *
                      </span>
                    </div>
                    <Input
                      {...register("password")}
                      type="password"
                      showPasswordToggle
                      className="px-3 py-3.5 bg-white rounded-xl border border-solid border-[#e3e3e3] shadow-shadows-shadow-xs"
                      placeholder="Enter password"
                      disabled={isSubmitting}
                    />
                    {errors.password && (
                      <span className="text-[#e62e2e] text-sm">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <div className="inline-flex items-start gap-0.5">
                      <label className="relative w-fit mt-[-1.00px] font-text-2-medium text-[#333333] text-[length:var(--text-2-medium-font-size)] tracking-[var(--text-2-medium-letter-spacing)] leading-[var(--text-2-medium-line-height)] whitespace-nowrap">
                        Confirm Password
                      </label>
                      <span className="relative w-fit mt-[-1.00px] font-text-sm-medium text-[#e62e2e] text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] whitespace-nowrap">
                        *
                      </span>
                    </div>
                    <Input
                      {...register("confirmPassword")}
                      type="password"
                      showPasswordToggle
                      className="px-3 py-3.5 bg-white rounded-xl border border-solid border-[#e3e3e3] shadow-shadows-shadow-xs"
                      placeholder="Confirm password"
                      disabled={isSubmitting}
                    />
                    {errors.confirmPassword && (
                      <span className="text-[#e62e2e] text-sm">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex items-start sm:items-center gap-2 w-full">
                    <Checkbox
                      id="terms"
                      checked={watch("terms")}
                      onCheckedChange={handleTermsChange}
                      className="w-5 h-5 rounded-md mt-1 sm:mt-0 "
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="terms"
                      className="text-[#414651] leading-6 text-base"
                    >
                      I agree to the{" "}
                      <span className="font-text-3-medium text-[#005be6] leading-[var(--text-3-medium-line-height)] tracking-[var(--text-3-medium-letter-spacing)] text-[length:var(--text-3-medium-font-size)]">
                        Terms &amp; Conditions
                      </span>
                    </label>
                  </div>
                  {errors.terms && (
                    <span className="text-[#e62e2e] text-sm">
                      {errors.terms.message}
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
            {isSubmitting ? "Creating account..." : "Sign up"}
          </Button>
        </div>

        {/* Sign In Link */}
        <div className="flex items-baseline justify-center gap-[5.34px] w-full">
          <p className="relative w-fit mt-[-1.33px] font-text-2-regular text-neutralneutral-900 text-[length:var(--text-2-regular-font-size)] tracking-[var(--text-2-regular-letter-spacing)] leading-[var(--text-2-regular-line-height)] whitespace-nowrap">
            Already have an account?
          </p>
          <a
            href="/login"
            className="relative w-fit mt-[-1.33px] font-text-2-regular text-primary-800 text-[length:var(--text-2-regular-font-size)] tracking-[var(--text-2-regular-letter-spacing)] leading-[var(--text-2-regular-line-height)] whitespace-nowrap hover:underline"
          >
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
}
