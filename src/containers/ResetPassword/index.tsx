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
import { useRouter, useSearchParams } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import { handleResetPasswordConfirmation } from "@/lib/cognito-actions";
interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
const passwordRequirements = [
  "Minimum 8 characters",
  "A mix of uppercase and lowercase letters",
  "At least one digit",
  "At least one special character",
];
export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    try {
      setIsSubmitting(true);

      if (!email || !code) {
        toast.error("Missing required parameters");
        return;
      }

      const formData = new FormData();
      formData.append("email", email);
      formData.append("code", code);
      formData.append("password", data.password);

      const response = await handleResetPasswordConfirmation(
        undefined,
        formData
      );

      if (response?.redirectLink) {
        router.push(response.redirectLink);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred during reset password"
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
          Set New Password
        </h1>
        <p className="w-full font-text-3-regular text-[#6c7279] text-[14px] md:text-[16px] text-center tracking-[0px] leading-[20px]">
          Your new password must be different from the old password
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
                <div className="flex flex-col items-start w-full gap-4">
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

                  {errors.password && (
                    <Card className="bg-[#eff6f9] border-none p-3 rounded-lg w-full">
                      <CardContent className="p-0 space-y-2">
                        <h3 className="font-semibold text-[16px] text-[#333333] leading-[24px] mt-[-1.00px]">
                          Password must:
                        </h3>

                        <ul className="flex flex-col items-start gap-1">
                          {passwordRequirements.map((requirement, index) => (
                            <li
                              key={index}
                              className="text-[12px] text-[#6c7279] leading-[18px] font-normal list-disc list-inside"
                            >
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
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
            {isSubmitting ? "Resetting password..." : "Reset password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
