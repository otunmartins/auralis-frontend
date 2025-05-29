"use client";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import React, { startTransition, useActionState, useState } from "react";
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
import { getEmailFromQueryParams } from "@/utils/common";
import {
  handleConfirmSignUp,
  handleSendEmailVerificationCode,
} from "@/lib/cognito-actions";
interface ForgotPasswordFormData {
  email: string;
}

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ConfirmSignUpPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const email = getEmailFromQueryParams("email");
  const [response, dispatch, loading] = useActionState(
    handleSendEmailVerificationCode,
    {
      message: "",
      errorMessage: "",
    }
  );
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

  const handleResendEmail = async () => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("email", email || "");
      startTransition(() => {
        dispatch(formData);
      });
    } catch (error) {
      console.error("Resend email error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-6 md:gap-8">
      {/* Header */}
      <div className="flex flex-col items-start w-full gap-2">
        <h1 className="w-full font-display-1-semibold text-[#333333] text-[20px] md:text-[24px] text-center leading-[30px] tracking-[0px]">
          Confirm your email address
        </h1>
        <p className="w-full font-text-3-regular text-[#6c7279] text-[14px] md:text-[16px] text-center tracking-[0px] leading-[20px]">
          We sent a verification email to {email}. Confirm your email address to
          finish creating your account.
        </p>
      </div>

      <div className="flex flex-col items-center w-full gap-6 md:gap-8">
        <p className="font-text-3-regular text-[#6c7279] text-[14px] md:text-[16px] text-center tracking-[0px] leading-[20px]">
          Did not receive the email?
          <span
            onClick={() => handleResendEmail()}
            className="ml-1 cursor-pointer text-primary-950"
          >
            Resend email
          </span>
        </p>
      </div>
    </div>
  );
}
