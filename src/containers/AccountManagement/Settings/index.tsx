import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import {
  accountSettingData,
  userData,
} from "../../../siteData/accountSettingData";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import "react-phone-number-input/style.css";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define validation schema using Yup
const passwordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

// Define form data type
type PasswordFormData = yup.InferType<typeof passwordSchema>;

export const SettingsPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
  });

  // Form submission handler
  const onSubmit = async (data: PasswordFormData) => {
    try {
      // Here you would make an API call to update the password
      console.log("Password update data:", data);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and show success message
      reset();
      setIsSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <>
      <Card className="bg-white rounded-[20px] border border-[#eeeeee]">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-grey-dark font-strong text-heading-xxsmall">
                Password
              </h3>
              <p className="text-grey-mediumDark font-regular text-label-small">
                Please enter your current password to change your password.
              </p>
            </div>

            {isSuccess && (
              <div className="p-3 text-green-700 rounded-lg bg-green-50">
                Password updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
              <div className="flex flex-col gap-6">
                {/* Current Password */}
                <div className="flex flex-col items-start gap-1.5 w-full">
                  <div className="flex items-start gap-0.5">
                    <label className="font-text-2-medium text-[#333333] text-[14px] tracking-[0px] leading-[20px]">
                      Current Password
                    </label>
                    <span className="font-text-sm-medium text-[#e62e2e] text-[14px] tracking-[0px] leading-[20px]">
                      *
                    </span>
                  </div>
                  <Input
                    {...register("currentPassword")}
                    type="password"
                    showPasswordToggle
                    className="px-3 py-3.5 bg-white rounded-xl border border-[#e3e3e3] shadow-shadows-shadow-xs text-neutralneutral-600 font-text-3-regular"
                    placeholder="Enter current password"
                    disabled={isSubmitting}
                  />
                  {errors.currentPassword && (
                    <span className="text-[#e62e2e] text-sm">
                      {errors.currentPassword.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-4 md:flex-row">
                  {/* New Password */}
                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <div className="flex items-start gap-0.5">
                      <label className="font-text-2-medium text-[#333333] text-[14px] tracking-[0px] leading-[20px]">
                        New Password
                      </label>
                      <span className="font-text-sm-medium text-[#e62e2e] text-[14px] tracking-[0px] leading-[20px]">
                        *
                      </span>
                    </div>
                    <Input
                      {...register("newPassword")}
                      type="password"
                      showPasswordToggle
                      className="px-3 py-3.5 bg-white rounded-xl border border-[#e3e3e3] shadow-shadows-shadow-xs text-neutralneutral-600 font-text-3-regular"
                      placeholder="Enter new password"
                      disabled={isSubmitting}
                    />
                    {errors.newPassword && (
                      <span className="text-[#e62e2e] text-sm">
                        {errors.newPassword.message}
                      </span>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <div className="flex items-start gap-0.5">
                      <label className="font-text-2-medium text-[#333333] text-[14px] tracking-[0px] leading-[20px]">
                        Confirm Password
                      </label>
                      <span className="font-text-sm-medium text-[#e62e2e] text-[14px] tracking-[0px] leading-[20px]">
                        *
                      </span>
                    </div>
                    <Input
                      {...register("confirmPassword")}
                      type="password"
                      showPasswordToggle
                      className="px-3 py-3.5 bg-white rounded-xl border border-[#e3e3e3] shadow-shadows-shadow-xs text-neutralneutral-600 font-text-3-regular"
                      placeholder="Confirm new password"
                      disabled={isSubmitting}
                    />
                    {errors.confirmPassword && (
                      <span className="text-[#e62e2e] text-sm">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <Button
                    type="button"
                    onClick={() => reset()}
                    variant="primary-outline"
                    className=""
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className=""
                  >
                    {isSubmitting ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
