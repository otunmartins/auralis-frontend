"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomPagination from "@/components/customPagination";
import { ActionEyeIcon } from "@/components/icons";

const flagColor = {
  green: "bg-green-500",
  yellow: "bg-yellow-400",
  red: "bg-red-500",
};
type RiskFactor = {
  factor: string;
  value: string;
  threshold: string;
  flag: "green" | "yellow" | "red";
};

interface LogingDetailTableProps {
  riskFactors: RiskFactor[];
}

export const LogingDetailTable: React.FC<LogingDetailTableProps> = ({
  riskFactors,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(riskFactors.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = riskFactors.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="h-[350px] overflow-auto scrollbar-hide border border-solid border-[#e9e9eb] bg-white">
        <Table>
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="bg-[#f8f8f8]">
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                Factor
              </TableHead>
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                Value
              </TableHead>
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                Threshold
              </TableHead>
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                Flag
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-gray-500"
                >
                  No risk factors found.
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((riskFactor, index) => (
                <TableRow
                  key={riskFactor.factor}
                  className={`$${
                    index % 2 === 0 ? "bg-white" : "bg-neutral-50"
                  } cursor-pointer hover:bg-neutral-100`}
                >
                  <TableCell className="font-text-sm-regular text-[#535861] whitespace-nowrap px-6 py-[26] border-b border-[#e9e9eb]">
                    {riskFactor.factor}
                  </TableCell>
                  <TableCell className="font-text-2-medium text-[#414651] whitespace-nowrap px-6 py-[26px] border-b border-[#e9e9eb]">
                    {riskFactor.value}
                  </TableCell>
                  <TableCell className="font-text-2-medium text-[#414651] whitespace-nowrap px-6 py-[26px] border-b border-[#e9e9eb]">
                    {riskFactor.threshold}
                  </TableCell>
                  <TableCell className="px-6 py-[26px] border-b border-[#e9e9eb]">
                    <div className="flex items-center gap-1">
                      <div
                        className={`relative w-[14px] h-[14px] top-px left-px rounded-full ${
                          riskFactor.flag === "red"
                            ? "!bg-error-500"
                            : riskFactor.flag === "yellow"
                            ? "!bg-warning-500"
                            : "!bg-success-500"
                        }`}
                      />
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
