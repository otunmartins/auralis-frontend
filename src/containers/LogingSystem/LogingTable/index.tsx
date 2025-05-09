"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import CustomPagination from "../../../components/customPagination";
import { CheckFilledIcon } from "@/components/icons";
import { XFilledIcon } from "@/components/icons";
import { ActionEyeIcon, ActionDownloadIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import { LogingTableData, logingTableData } from "@/siteData/loggingTableData";
import type { DateRange } from "react-day-picker";
const ITEMS_PER_PAGE = 5;

interface LogingTableProps {
  searchQuery?: string;
  riskLevel?: string;
  systemLogType?: string;
  dateRange?: DateRange;
}

export const LogingTable: React.FC<LogingTableProps> = ({
  searchQuery = "",
  riskLevel = "",
  systemLogType = "",
  dateRange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] =
    useState<LogingTableData[]>(logingTableData);
  const router = useRouter();

  // Filter data when search query or filters change
  useEffect(() => {
    let filtered = [...logingTableData];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.id.toLowerCase().includes(query) ||
          item.aiModel.toLowerCase().includes(query) ||
          item.uploadedBy.toLowerCase().includes(query) ||
          item.datasetName.toLowerCase().includes(query)
      );
    }

    // Filter by risk level
    if (riskLevel && riskLevel !== "all") {
      filtered = filtered.filter(
        (item) => item.riskLevel.level.toLowerCase() === riskLevel.toLowerCase()
      );
    }

    // Filter by system log type
    if (systemLogType && systemLogType !== "all") {
      filtered = filtered.filter((item) => item.eventType === systemLogType);
    }

    // Filter by date range
    if (dateRange?.from && dateRange?.to) {
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);
      filtered = filtered.filter((item) => {
        const logDate = new Date(item.timestamp);
        return logDate >= fromDate && logDate <= toDate;
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, riskLevel, systemLogType, dateRange]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (systemLogId: string) => {
    router.push(`/loging-detail/${systemLogId}`);
  };

  return (
    <>
      <div className="h-[509px] overflow-auto scrollbar-hide border border-solid border-[#e9e9eb] bg-[#f8f8f8]">
        <Table>
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="bg-[#f8f8f8]">
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                Timestamp
              </TableHead>
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                Event Type
              </TableHead>
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                Description
              </TableHead>
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                Risk Level
              </TableHead>
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-8 text-center text-gray-500"
                >
                  No results found. Try adjusting your search or filters.
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((systemLog, index) => (
                <TableRow
                  key={systemLog.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-neutral-50"
                  } cursor-pointer hover:bg-neutral-100`}
                  onClick={() => handleRowClick(systemLog.id)}
                >
                  <TableCell className="font-text-sm-regular text-[#535861] whitespace-nowrap px-6 py-[26] border-b border-[#e9e9eb]">
                    {systemLog.timestamp}
                  </TableCell>
                  <TableCell className="font-text-2-medium text-[#414651] whitespace-nowrap px-6 py-[26px] border-b border-[#e9e9eb]">
                    {systemLog.eventType}
                  </TableCell>
                  <TableCell className="font-text-2-medium text-[#414651] whitespace-nowrap px-6 py-[26px] border-b border-[#e9e9eb]">
                    {systemLog.description}
                  </TableCell>

                  <TableCell className="px-6 py-[26px] border-b border-[#e9e9eb]">
                    <Badge
                      className={`flex items-center gap-1 w-fit border-none  pl-1.5 pr-2 py-0.5 rounded-2xl  ${
                        systemLog.riskLevel.level === "High"
                          ? "!bg-error-50 !text-error-500"
                          : systemLog.riskLevel.level === "Medium"
                          ? "!bg-success-50 !text-success-500"
                          : systemLog.riskLevel.level === "Low"
                          ? "!bg-warning-50 !text-warning-500"
                          : systemLog.riskLevel.level === "Expert"
                          ? "!bg-informationinfo-50 !text-informationinfo-500"
                          : "!bg-neutralneutral-50 !text-neutralneutral-600"
                      }`}
                    >
                      {(systemLog.riskLevel.level === "High" ||
                        systemLog.riskLevel.level === "Medium" ||
                        systemLog.riskLevel.level === "Low") && (
                        <div className="flex items-center gap-1">
                          <div
                            className={`relative w-1.5 h-1.5 top-px left-px rounded-[3px] ${
                              systemLog.riskLevel.level === "High"
                                ? "!bg-error-500"
                                : systemLog.riskLevel.level === "Medium"
                                ? "!bg-success-500"
                                : "!bg-warning-500"
                            }`}
                          />
                          <span className="font-text-2-medium whitespace-nowrap">
                            {systemLog.riskLevel.level}
                          </span>
                        </div>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-[26px] border-b border-[#e9e9eb]">
                    <div className="flex items-center gap-3">
                      <ActionEyeIcon />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <CustomPagination
          totalPages={totalPages}
          initialPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
