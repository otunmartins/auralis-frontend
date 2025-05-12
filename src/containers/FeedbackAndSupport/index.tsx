"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FeedbackAndSupportForm } from "./From";
import FAQSection from "./Faqs";

export default function FeedbackAndSupportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab = tabParam || "feedbacks-support";

  // Set default tab in URL if no tab parameter exists
  useEffect(() => {
    if (!tabParam) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("tab", "feedbacks-support");
      window.history.replaceState({}, "", newUrl);
    }
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", value);
    window.history.pushState({}, "", newUrl);
  };

  return (
    <div className="flex flex-col gap-[18px]">
      <h1 className="text-2xl font-semibold text-gray-800 ">My Account</h1>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center ">
        <div className="">
          <Tabs
            value={activeTab}
            className="w-full md:w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="bg-white border border-[#E3E3E3] rounded-lg !p-2">
              <TabsTrigger
                value="feedbacks-support"
                className="font-medium data-[state=active]:bg-neutral-50 data-[state=active]:text-primary-950"
              >
                Feedbacks & Support
              </TabsTrigger>
              <TabsTrigger
                value="faqs"
                className="font-medium data-[state=active]:bg-neutral-50 data-[state=active]:text-primary-950"
              >
                FAQs
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      {activeTab === "feedbacks-support" && <FeedbackAndSupportForm />}
      {activeTab === "faqs" && <FAQSection />}
    </div>
  );
}
