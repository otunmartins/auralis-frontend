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
import { signUp } from "aws-amplify/auth";
import { handleSignUp } from "@/lib/cognito-actions";
import { AllRoutesEnum } from "@/lib/enums";
interface SignUpFormData {
  fullName: string;
  email: string;
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
    terms: yup.boolean().required().oneOf([true], "You must accept the terms"),
  })
  .test("passwords-match", "Passwords don't match", function (data) {
    return data.password === data.confirmPassword;
  });
const passwordRequirements = [
  "Minimum 8 characters",
  "A mix of uppercase and lowercase letters",
  "At least one digit",
  "At least one special character",
];
export default function SignUp() {
  const router = useRouter();
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
      const { CONFIRM_SIGNUP } = AllRoutesEnum;
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("name", data.fullName);
      const response = await handleSignUp(undefined, formData);
      if (response?.userId) {
        const redirectUrl = `${CONFIRM_SIGNUP}?email=${String(
          formData.get("email")
        )}`;
        router.replace(redirectUrl);
      }
    } catch (error) {
      setIsSubmitting(false);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
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
        className="flex flex-col items-start w-full gap-5"
      >
        <div className="flex flex-col items-start w-full gap-10">
          <div className="flex flex-col items-start justify-center w-full gap-1">
            <div className="flex flex-col items-start w-full gap-5">
              <div className="flex flex-col items-start w-full gap-6">
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

                  {/* Terms & Conditions */}
                  <div className="flex items-start w-full gap-2 sm:items-center">
                    <Checkbox
                      id="terms"
                      checked={watch("terms")}
                      onCheckedChange={handleTermsChange}
                      className="w-5 h-5 mt-1 rounded-md sm:mt-0 "
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
            isLoading={isSubmitting}
          >
            Sign up
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
