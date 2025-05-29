"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadIcon, FilterIcon } from "@/components/icons";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { MyProfilePage } from "./MyProfile";
import { SettingsPage } from "./Settings";
export default function AccountManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "my-profile");

  // Set default tab in URL if no tab parameter exists
  useEffect(() => {
    if (!tabParam) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("tab", "my-profile");
      window.history.replaceState({}, "", newUrl);
    }
  }, [tabParam]);

  // Keep component state in sync with URL
  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam, activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // Update URL query parameter
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
            defaultValue="prediction-summary"
            className="w-full md:w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="bg-white border border-[#E3E3E3] rounded-lg !p-2">
              <TabsTrigger
                value="my-profile"
                className="font-medium data-[state=active]:bg-neutral-50 data-[state=active]:text-primary-950 max-md:text-label-small max-md:px-2"
              >
                My Profile
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="font-medium data-[state=active]:bg-neutral-50 data-[state=active]:text-primary-950 max-md:text-label-small max-md:px-2"
              >
                Settings
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {activeTab === "my-profile" && <MyProfilePage />}
      {activeTab === "settings" && <SettingsPage />}
    </div>
  );
}
