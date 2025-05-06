import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import {
  accountSettingData,
  userData,
} from "../../../siteData/accountSettingData";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../../components/ui/button";
import { PencilIcon, Check, X } from "lucide-react";
import { Separator } from "../../../components/ui/separator";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../../../components/ui/input";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";

// Define the validation schema using Yup
const profileSchema = yup.object({
  // Personal Information
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),

  // Professional Information
  role: yup.string().required("Role is required"),
  organization: yup.string().required("Organization is required"),
  organizationAddress: yup
    .string()
    .required("Organization address is required"),
  zipCode: yup.string().required("Zip code is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),

  // Additional Information
  aboutMe: yup.string().optional(),
});

// Define the form data type
type ProfileFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  role: string;
  organization: string;
  organizationAddress: string;
  zipCode: string;
  city: string;
  country: string;
  aboutMe?: string;
};

export const MyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Helper function to format phone number to E.164 format
  const formatToE164 = (phoneNumber: string): string => {
    // If it's already in E.164 format (just digits and + at start), return it
    if (/^\+[0-9]+$/.test(phoneNumber)) {
      return phoneNumber;
    }

    // Remove all non-digit characters except the + at the beginning
    return phoneNumber.replace(/[^0-9+]/g, "");
  };

  // Find the phone number from the data
  const phoneNumberFromData =
    accountSettingData.personalInfo.find(
      (item) => item.label === "Phone Number"
    )?.value || "";

  // Format the phone number to E.164 format
  const formattedPhoneNumber = formatToE164(phoneNumberFromData);

  // Initialize form with existing data
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema) as any,
    defaultValues: {
      fullName:
        accountSettingData.personalInfo.find(
          (item) => item.label === "Full Name"
        )?.value || "",
      email:
        accountSettingData.personalInfo.find((item) => item.label === "Email")
          ?.value || "",
      phoneNumber: formattedPhoneNumber,
      gender:
        accountSettingData.personalInfo.find((item) => item.label === "Gender")
          ?.value || "",
      dateOfBirth:
        accountSettingData.personalInfo.find(
          (item) => item.label === "Date of Birth"
        )?.value || "",

      role:
        accountSettingData.professionalInfo.find(
          (item) => item.label === "Role"
        )?.value || "",
      organization:
        accountSettingData.professionalInfo.find(
          (item) => item.label === "Organization"
        )?.value || "",
      organizationAddress:
        accountSettingData.professionalInfo.find(
          (item) => item.label === "Organization Address"
        )?.value || "",
      zipCode:
        accountSettingData.professionalInfo.find(
          (item) => item.label === "Zip Code"
        )?.value || "",
      city:
        accountSettingData.professionalInfo.find(
          (item) => item.label === "City"
        )?.value || "",
      country:
        accountSettingData.professionalInfo.find(
          (item) => item.label === "Country"
        )?.value || "",

      aboutMe: accountSettingData.aboutMeData.content || "",
    },
  });

  const onSubmit = handleSubmit((data: ProfileFormData) => {
    console.log("Updated profile data:", data);
    // Here you would typically send the data to your backend API
    // For now, we'll just toggle out of edit mode
    setIsEditing(false);
  });

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  // Helper function to get the field name
  const getFieldName = (label: string): keyof ProfileFormData => {
    const mapping: Record<string, keyof ProfileFormData> = {
      "Full Name": "fullName",
      Email: "email",
      "Phone Number": "phoneNumber",
      Gender: "gender",
      "Date of Birth": "dateOfBirth",
      Role: "role",
      Organization: "organization",
      "Organization Address": "organizationAddress",
      "Zip Code": "zipCode",
      City: "city",
      Country: "country",
    };

    return mapping[label] || "fullName"; // Default to fullName if not found
  };

  return (
    <>
      <Card className="bg-white rounded-[20px] border border-[#eeeeee]">
        <CardContent className="p-6">
          <form onSubmit={onSubmit}>
            <div className="flex flex-col items-start w-full gap-8">
              {/* user data section */}
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center flex-1 gap-4">
                  <Avatar className="w-20 h-20 rounded-full border-solid border-[#00000014]">
                    <AvatarImage
                      src={userData.avatarUrl}
                      alt={userData.name}
                      className="object-cover rounded-full"
                    />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-start">
                    <h3 className="text-grey-dark font-strong text-label-large">
                      {userData.name}
                    </h3>
                    <p className="text-grey-mediumDark font-regular text-label-medium">
                      {userData.email}
                    </p>
                  </div>
                </div>

                {isEditing ? (
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-[37px]"
                    >
                      <Check className="w-5 h-5" />
                      <span>Save</span>
                    </Button>
                    <Button
                      type="button"
                      variant="primary-outline"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-[37px]"
                      onClick={handleCancel}
                    >
                      <X className="w-5 h-5" />
                      <span>Cancel</span>
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="primary-outline"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-[37px] border border-solid border-[#002b5b] bg-transparent"
                    onClick={() => setIsEditing(true)}
                  >
                    <PencilIcon className="w-6 h-6" />
                    <span className="font-['Plus_Jakarta_Sans',Helvetica] font-medium text-[#6c7279] text-base">
                      Edit Profile
                    </span>
                  </Button>
                )}
              </div>
              <Separator className="w-full" />

              {/* personal info section */}
              <section className="flex flex-col w-full gap-6">
                <h2 className="text-grey-dark font-strong text-heading-xxsmall">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                  {accountSettingData.personalInfo.map((item, index) => (
                    <Card
                      key={index}
                      className="bg-white border-none rounded-xl"
                    >
                      <CardContent className="p-3">
                        <div className="flex flex-col gap-2">
                          <p className="font-medium text-grey-mediumDark text-label-medium">
                            {item.label}
                          </p>
                          {isEditing ? (
                            <div>
                              {item.label === "Phone Number" ? (
                                <div className="custom-phone-input-container">
                                  <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={({ field }) => (
                                      <PhoneInput
                                        international
                                        defaultCountry="PK"
                                        flags={flags}
                                        value={field.value}
                                        onChange={(value) =>
                                          field.onChange(value || "")
                                        }
                                        className={`custom-phone-input ${
                                          errors.phoneNumber ? "error" : ""
                                        }`}
                                      />
                                    )}
                                  />
                                  {errors.phoneNumber && (
                                    <p className="mt-1 text-xs text-red-500">
                                      {errors.phoneNumber.message}
                                    </p>
                                  )}
                                </div>
                              ) : item.label === "Gender" ? (
                                <select
                                  defaultValue={item.value}
                                  {...register(getFieldName(item.label))}
                                  className={`flex px-[12px] py-[14px] w-full rounded-md border ${
                                    errors[getFieldName(item.label)]
                                      ? "border-red-500"
                                      : "border-[#EEEEEE]"
                                  } bg-transparent text-paragraph-medium shadow-sm transition-colors`}
                                >
                                  <option value="">Select gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                </select>
                              ) : item.label === "Date of Birth" ? (
                                <Input
                                  type="date"
                                  defaultValue={item.value}
                                  {...register("dateOfBirth")}
                                  className={
                                    errors.dateOfBirth ? "border-red-500" : ""
                                  }
                                />
                              ) : (
                                <Input
                                  defaultValue={item.value}
                                  {...register(getFieldName(item.label))}
                                  className={
                                    errors[getFieldName(item.label)]
                                      ? "border-red-500"
                                      : ""
                                  }
                                />
                              )}
                              {item.label !== "Phone Number" &&
                                errors[getFieldName(item.label)] && (
                                  <p className="mt-1 text-xs text-red-500">
                                    {errors[getFieldName(item.label)]?.message}
                                  </p>
                                )}
                            </div>
                          ) : (
                            <p className="font-strong text-grey-dark text-label-medium">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
              <Separator className="w-full" />

              {/* professional info section */}
              <section className="flex flex-col w-full gap-6">
                <h2 className="text-grey-dark font-strong text-heading-xxsmall">
                  Professional Information
                </h2>
                <div className="flex flex-col w-full gap-3">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {accountSettingData.professionalInfo.map((item, index) => (
                      <Card
                        key={index}
                        className="bg-white border-none rounded-xl"
                      >
                        <CardContent className="p-3">
                          <div className="flex flex-col gap-2">
                            <div className="font-medium text-grey-mediumDark text-label-medium">
                              {item.label}
                            </div>
                            {isEditing ? (
                              <div>
                                <Input
                                  defaultValue={item.value}
                                  {...register(getFieldName(item.label))}
                                  className={
                                    errors[getFieldName(item.label)]
                                      ? "border-red-500"
                                      : ""
                                  }
                                />
                                {errors[getFieldName(item.label)] && (
                                  <p className="mt-1 text-xs text-red-500">
                                    {errors[getFieldName(item.label)]?.message}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="font-strong text-grey-dark text-label-medium">
                                {item.value}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
              <Separator className="w-full" />

              {/* additional info section */}
              <section className="flex flex-col w-full gap-6">
                <h2 className="text-grey-dark font-strong text-heading-xxsmall">
                  Additional Information
                </h2>

                <div className="flex flex-col w-full gap-3">
                  <Card className="border-0 border-none rounded-xl">
                    <CardContent className="p-3">
                      <div className="flex flex-col gap-2">
                        <h3 className="font-medium text-grey-mediumDark text-label-medium">
                          {accountSettingData.aboutMeData.title}
                        </h3>
                        {isEditing ? (
                          <textarea
                            defaultValue={
                              accountSettingData.aboutMeData.content
                            }
                            {...register("aboutMe")}
                            rows={4}
                            className={`flex px-[12px] py-[14px] w-full rounded-md border ${
                              errors.aboutMe
                                ? "border-red-500"
                                : "border-[#EEEEEE]"
                            } bg-transparent text-paragraph-medium shadow-sm transition-colors min-h-[100px]`}
                          />
                        ) : (
                          <p className="font-regular text-grey-dark text-label-medium">
                            {accountSettingData.aboutMeData.content}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Add custom CSS for phone input */}
      <style jsx global>{`
        .custom-phone-input-container .PhoneInputInput {
          flex: 1;
          min-width: 0;
          border: none;
          outline: none;
          padding: 14px 12px;
          border-radius: 0.375rem;
          background-color: transparent;
        }

        .custom-phone-input {
          display: flex;
          align-items: center;
          padding: 0;
          width: 100%;
          border: 1px solid #eeeeee;
          border-radius: 0.375rem;
          background-color: transparent;
          font-size: 1rem;
          line-height: 1.5;
          transition: border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
        }

        .custom-phone-input.error {
          border-color: #ef4444;
        }

        .custom-phone-input .PhoneInputCountry {
          margin-left: 12px;
        }
      `}</style>
    </>
  );
};
