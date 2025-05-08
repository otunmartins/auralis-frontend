"use client";
import { Button } from "@/components/ui/button";
import { DownloadIcon, FilterIcon } from "@/components/icons";
import MolecularFeatureHeatmap from "@/components/visualChart";
import RiskConfidenceScatter from "@/components/riskConfidenceScatter";
import ConfidenceScoreTrend from "@/components/confidenceScoreTrendChart";

export default function InsightsAndVisualizationPage() {
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex items-start justify-between gap-4 md:flex-row md:items-center ">
        <h1 className="text-2xl font-semibold text-gray-800 ">
          Insights & Visualization
        </h1>
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
      {/* charts section start */}
      <div className="flex flex-col gap-4">
        <MolecularFeatureHeatmap />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <RiskConfidenceScatter />
          <ConfidenceScoreTrend />
        </div>
      </div>
      {/* charts section end */}
    </div>
  );
}
