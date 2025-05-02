"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadIcon, FilterIcon } from "@/components/icons";
import PredictionSummaryPage from "./PredictionSummary";
import { PredictionResult } from "./PredictionResult";
import { useEffect, useState } from "react";
import MoleculeResult from "./MoleculeResult";
import { useRouter, useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "prediction-summary");

  // Set default tab in URL if no tab parameter exists
  useEffect(() => {
    if (!tabParam) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("tab", "prediction-summary");
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
      <h1 className="text-2xl font-semibold text-gray-800 ">Dashboard</h1>

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
                value="prediction-summary"
                className="font-medium data-[state=active]:bg-neutral-50 data-[state=active]:text-primary-950"
              >
                Prediction Summary
              </TabsTrigger>
              <TabsTrigger
                value="prediction-result"
                className="font-medium data-[state=active]:bg-neutral-50 data-[state=active]:text-primary-950"
              >
                Prediction Result
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex gap-2">
          <Button variant="simple" className="flex items-center gap-2 h-[52px]">
            <DownloadIcon />
            <span>Download</span>
          </Button>
          <Button variant="simple" className="flex items-center gap-2 h-[52px]">
            <FilterIcon />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      {activeTab === "prediction-summary" && <PredictionSummaryPage />}
      {activeTab === "prediction-result" && <PredictionResult />}
    </div>
  );
}
