"use client";

import { useRouter } from "next/navigation";
import { LogingTableData, logingTableData } from "@/siteData/loggingTableData";
import RiskLevelDonutChart from "@/components/pieChartTest";
import { Badge } from "@/components/ui/badge";
import { BackChevronIcon } from "@/components/icons";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import CustomPagination from "@/components/customPagination";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LogingDetailTable } from "./LogingDetailTable";

const flagColor = {
  green: "bg-green-500",
  yellow: "bg-yellow-400",
  red: "bg-red-500",
};

interface LogingDetailPageProps {
  id: string;
}

export default function LogingDetailPage({ id }: LogingDetailPageProps) {
  const router = useRouter();
  const logEntry = logingTableData.find((log) => log.id === id);
  const [currentPage, setCurrentPage] = React.useState(1);
  const ITEMS_PER_PAGE = 4;
  const riskFactors = logEntry?.riskFactors || [];
  const totalPages = Math.ceil(riskFactors.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = riskFactors.slice(startIndex, endIndex);

  // Transform risk factors into donut chart data
  const donutData = riskFactors.map((factor) => ({
    label: factor.factor,
    value: parseFloat(factor.value),
    color:
      factor.flag === "red"
        ? "#E62E2E"
        : factor.flag === "yellow"
        ? "#FFA725"
        : "#002B5B",
  }));

  if (!logEntry) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Log entry not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <BackChevronIcon />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Logging Detail</h1>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4 mb-2 md:grid-cols-4">
        <div className="flex flex-col gap-1 p-4 bg-white border rounded-lg">
          <span className="text-xs text-gray-500">Molecule Type</span>
          <span className="font-semibold text-gray-800">
            {logEntry.moleculeType || logEntry.structure}
          </span>
        </div>
        <div className="flex flex-col gap-1 p-4 bg-white border rounded-lg">
          <span className="text-xs text-gray-500">Confidence Score</span>
          <span className="font-semibold text-gray-800">
            {logEntry.confidenceScore}
          </span>
        </div>
        <div className="flex flex-col gap-1 p-4 bg-white border rounded-lg">
          <span className="text-xs text-gray-500">Risk Level</span>
          <span className="flex items-center gap-2 font-semibold">
            <span
              className={`w-2 h-2 rounded-full ${
                logEntry.riskLevel.level === "High"
                  ? "bg-red-500"
                  : logEntry.riskLevel.level === "Medium"
                  ? "bg-green-500"
                  : "bg-yellow-400"
              }`}
            ></span>
            {logEntry.riskLevel.level}
          </span>
        </div>
        <div className="flex flex-col gap-1 p-4 bg-white border rounded-lg">
          <span className="text-xs text-gray-500">Date Predicted</span>
          <span className="font-semibold text-gray-800">
            {logEntry.datePredicted || "-"}
          </span>
        </div>
      </div>

      {/* Main Content: Table + Chart */}
      <div className="flex w-full gap-6 max-lg:flex-col">
        {/* Risk Factor Table */}
        <Card className="w-full flex flex-col items-start bg-[#fcfcfc] rounded-3xl border border-solid border-[#eeeeee] shadow-shadows-shadow-xs overflow-hidden">
          <CardHeader className="flex overflow-hidden bg-white rounded-t-xl items-center w-full p-0 border-b border-[#eeeeee]">
            <div className="w-full p-6 ">
              <CardTitle className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#414651] text-lg leading-6">
                System Logs & Activity Tracker
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="w-full p-0">
            <LogingDetailTable riskFactors={logEntry.riskFactors || []} />
          </CardContent>
        </Card>
        <div>
          <RiskLevelDonutChart data={donutData} isFilter={false} />
        </div>
      </div>
    </div>
  );
}
