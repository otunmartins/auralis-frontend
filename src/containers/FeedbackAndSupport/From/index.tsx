import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../components/ui/select";
import { PaperclipIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

const categoryOptions = [
  { value: "general", label: "General" },
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  { value: "other", label: "Other" },
];

const feedbackSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  category: yup.string().required("Category is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

type FeedbackFormData = yup.InferType<typeof feedbackSchema>;

export const FeedbackAndSupportForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FeedbackFormData>({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      fullName: "",
      email: "",
      category: categoryOptions[0].value,
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSuccess(false);
    // Log attachments for demonstration
    console.log("Form Data:", data);
    console.log("Attachments:", attachments);
    await new Promise((res) => setTimeout(res, 800));
    setIsSuccess(true);
    reset();
    setAttachments([]); // Clear attachments after submit
  };

  return (
    <>
      <Card className="w-full bg-white p-4 md:p-6 border border-[#eeeeee] rounded-xl">
        <CardContent className="flex flex-col gap-5 p-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[18px] w-full"
          >
            {/* Full Name and Email row */}
            <div className="flex flex-col md:flex-row gap-[18px] w-full">
              <div className="flex flex-col gap-1.5 flex-1">
                <label
                  htmlFor="fullName"
                  className="text-paragraph-small text-grey-darker"
                >
                  Full Name
                </label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  className="h-11 px-3 py-[15px] bg-white rounded-xl border border-[#eeeeee] shadow-shadows-shadow-xs font-text-3-regular text-neutralneutral-600"
                />
                {errors.fullName && (
                  <span className="mt-1 text-xs text-red-500">
                    {errors.fullName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label
                  htmlFor="email"
                  className="text-paragraph-small text-grey-darker"
                >
                  Email
                </label>
                <Input
                  id="email"
                  {...register("email")}
                  className="h-11 px-3 py-[15px] bg-white rounded-xl border border-[#eeeeee] shadow-shadows-shadow-xs font-text-3-regular text-neutralneutral-600"
                />
                {errors.email && (
                  <span className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            {/* Category and Subject row */}
            <div className="flex flex-col md:flex-row gap-[18px] w-full">
              <div className="flex flex-col gap-1.5 flex-1">
                <label
                  htmlFor="category"
                  className="text-paragraph-small text-grey-darker"
                >
                  Category
                </label>
                <Select
                  value={watch("category")}
                  onValueChange={(val) => setValue("category", val)}
                >
                  <SelectTrigger
                    id="category"
                    className="h-11 px-3 !text-grey-darker py-[15px] bg-white rounded-xl border border-[#eeeeee] shadow-shadows-shadow-xs font-text-3-regular text-neutralneutral-600"
                  >
                    <SelectValue
                      placeholder="Select category"
                      className="!text-grey-darker"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white !text-grey-darker">
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <span className="mt-1 text-xs text-red-500">
                    {errors.category.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label
                  htmlFor="subject"
                  className="text-paragraph-small text-grey-darker"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  {...register("subject")}
                  className="h-11 px-3 py-[15px] bg-white rounded-xl border border-[#eeeeee] shadow-shadows-shadow-xs font-text-3-regular text-neutralneutral-600"
                />
                {errors.subject && (
                  <span className="mt-1 text-xs text-red-500">
                    {errors.subject.message}
                  </span>
                )}
              </div>
            </div>
            {/* Message textarea */}
            <div className="flex flex-col h-[175px] gap-1.5 w-full">
              <label
                htmlFor="message"
                className="text-paragraph-small text-grey-darker"
              >
                Message
              </label>
              <textarea
                id="message"
                {...register("message")}
                placeholder="write here..."
                className="flex-1 pt-3 px-3 bg-white rounded-lg border border-[#eeeeee] shadow-shadows-shadow-xs font-text-2-regular text-neutralneutral-500 resize-none relative"
              />
              {errors.message && (
                <span className="mt-1 text-xs text-red-500">
                  {errors.message.message}
                </span>
              )}
            </div>
            {/* Attachments section */}
            <div className="flex items-center w-full gap-2">
              <label
                htmlFor="attachments"
                className="flex items-center gap-2 cursor-pointer"
              >
                <PaperclipIcon className="w-[18px] h-[18px]" />
                <span className="text-label-medium text-grey-darker">
                  Attachments
                </span>
                <input
                  id="attachments"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      setAttachments(Array.from(e.target.files));
                    }
                  }}
                />
              </label>
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-1 ml-2">
                  {attachments.map((file, idx) => (
                    <span
                      key={idx}
                      className="flex items-center px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
                    >
                      {file.name}
                      <button
                        type="button"
                        className="ml-1 text-gray-400 hover:text-red-500"
                        onClick={() => {
                          setAttachments((prev) =>
                            prev.filter((_, i) => i !== idx)
                          );
                        }}
                        aria-label={`Remove ${file.name}`}
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* Submit button */}
            <div className="flex justify-end w-full">
              <Button
                type="submit"
                className="w-full md:w-auto px-4 py-[13px] bg-primary-950 rounded-lg border border-solid border-[#005be6] font-text-3-medium text-globalwhite"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </div>
            {isSuccess && (
              <div className="mt-2 text-center text-green-600">
                Feedback submitted successfully!
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </>
  );
};
