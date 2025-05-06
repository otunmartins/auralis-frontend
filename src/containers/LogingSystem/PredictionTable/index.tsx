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
import {
  PredictionTableData,
  predictionData,
} from "@/siteData/predictionTableData";

const ITEMS_PER_PAGE = 5;

interface PredictionTableProps {
  searchQuery?: string;
  riskLevel?: string;
  moleculeType?: string;
}

export const PredictionTable: React.FC<PredictionTableProps> = ({
  searchQuery = "",
  riskLevel = "",
  moleculeType = "",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] =
    useState<PredictionTableData[]>(predictionData);
  const router = useRouter();

  // Filter data when search query or filters change
  useEffect(() => {
    let filtered = [...predictionData];

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

    // Filter by molecule type (assuming this would be a property in the future)
    if (moleculeType && moleculeType !== "all") {
      // This is a placeholder for molecule type filtering
      // In a real implementation, you would filter based on molecule type property
      // For now, let's assume every molecule with an even ID is of the selected type
      const isEvenId = (id: string) => {
        const numPart = parseInt(id.replace(/\D/g, ""));
        return numPart % 2 === 0;
      };

      filtered = filtered.filter((item) => isEvenId(item.id));
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, riskLevel, moleculeType]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (moleculeId: string) => {
    router.push(`/prediction/${moleculeId}`);
  };

  return (
    <>
      <div className="h-[509px] overflow-auto scrollbar-hide border border-solid border-[#e9e9eb] bg-[#f8f8f8]">
        <Table>
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="bg-[#f8f8f8]">
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                Molecule ID
              </TableHead>
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                Structure
              </TableHead>
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                Confidence Score
              </TableHead>
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                AI Model Used
              </TableHead>
              <TableHead className="font-text-2-semibold text-[#515d6f] whitespace-nowrap p-6 border-b border-[#e9e9eb]">
                Drug Candidate
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
              currentData.map((molecule, index) => (
                <TableRow
                  key={molecule.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-neutral-50"
                  } cursor-pointer hover:bg-neutral-100`}
                  onClick={() => handleRowClick(molecule.id)}
                >
                  <TableCell className="font-text-sm-regular text-[#535861] whitespace-nowrap px-6 py-[26] border-b border-[#e9e9eb]">
                    {molecule.id}
                  </TableCell>
                  <TableCell className="font-text-2-medium text-[#414651] whitespace-nowrap px-6 py-[26px] border-b border-[#e9e9eb]">
                    {molecule.structure}
                  </TableCell>
                  <TableCell className="font-text-2-medium text-[#414651] whitespace-nowrap px-6 py-[26px] border-b border-[#e9e9eb]">
                    {molecule.confidenceScore}
                  </TableCell>
                  <TableCell className="font-text-2-medium text-[#414651] whitespace-nowrap px-6 py-[26px] border-b border-[#e9e9eb]">
                    {molecule.aiModel}
                  </TableCell>
                  <TableCell className="px-6 py-[26px] border-b border-[#e9e9eb]">
                    <div className="flex items-center gap-3">
                      {molecule.drugCandidate.isCandidate ? (
                        <>
                          <CheckFilledIcon />

                          <span className="font-text-2-medium text-[#414651] whitespace-nowrap">
                            {molecule.drugCandidate.value}
                          </span>
                        </>
                      ) : molecule.id === "107" || molecule.id === "108" ? (
                        <span className="font-text-2-medium text-[#414651] whitespace-nowrap">
                          {molecule.drugCandidate.value}
                        </span>
                      ) : (
                        <>
                          <XFilledIcon />
                          <span className="font-text-2-medium text-[#414651] whitespace-nowrap">
                            {molecule.drugCandidate.value}
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-[26px] border-b border-[#e9e9eb]">
                    <Badge
                      className={`flex items-center gap-1 w-fit border-none  pl-1.5 pr-2 py-0.5 rounded-2xl  ${
                        molecule.riskLevel.level === "High"
                          ? "!bg-error-50 !text-error-500"
                          : molecule.riskLevel.level === "Medium"
                          ? "!bg-success-50 !text-success-500"
                          : molecule.riskLevel.level === "Low"
                          ? "!bg-warning-50 !text-warning-500"
                          : molecule.riskLevel.level === "Expert"
                          ? "!bg-informationinfo-50 !text-informationinfo-500"
                          : "!bg-neutralneutral-50 !text-neutralneutral-600"
                      }`}
                    >
                      {(molecule.riskLevel.level === "High" ||
                        molecule.riskLevel.level === "Medium" ||
                        molecule.riskLevel.level === "Low") && (
                        <div className="flex items-center gap-1">
                          <div
                            className={`relative w-1.5 h-1.5 top-px left-px rounded-[3px] ${
                              molecule.riskLevel.level === "High"
                                ? "!bg-error-500"
                                : molecule.riskLevel.level === "Medium"
                                ? "!bg-success-500"
                                : "!bg-warning-500"
                            }`}
                          />
                          <span className="font-text-2-medium whitespace-nowrap">
                            {molecule.riskLevel.level}
                          </span>
                        </div>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-[26px] border-b border-[#e9e9eb]">
                    <div className="flex items-center gap-3">
                      <ActionEyeIcon />
                      <ActionDownloadIcon />
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
