"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  PredictionTableData,
  predictionData,
} from "@/siteData/predictionTableData";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BackChevronIcon } from "@/components/icons";

interface MoleculeDetailProps {
  moleculeId: string;
}

const MoleculeDetail = ({ moleculeId }: MoleculeDetailProps) => {
  const router = useRouter();

  // Find the molecule data by ID
  const moleculeData = moleculeId
    ? predictionData.find((molecule) => molecule.id === moleculeId)
    : null;

  if (!moleculeData) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <h2 className="mb-4 text-xl font-semibold">Molecule Not Found</h2>
        <p className="mb-6 text-gray-500">
          The molecule with ID {moleculeId || "unknown"} was not found in the
          database.
        </p>
        <button
          className="px-4 py-2 text-white rounded bg-primary-600 hover:bg-primary-700"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <BackChevronIcon />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Logging Detail</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Left column */}

        <Card className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          <CardContent className="p-0">
            <div className="p-4 bg-white text-paragraph-medium">
              <div className="text-gray-500 ">Timestamp</div>
              <div className="mt-2 text-lg font-semibold">
                {moleculeData.loggingDetails?.timestamp ||
                  moleculeData.processedOn}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          <CardContent className="p-0">
            <div className="p-4 bg-white text-paragraph-medium">
              <div className="text-gray-500 ">User</div>
              <div className="mt-2 text-lg font-semibold">
                {moleculeData.loggingDetails?.user || moleculeData.uploadedBy}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          <CardContent className="p-0">
            <div className="p-4 bg-white text-paragraph-medium">
              <div className="text-gray-500 ">Confidence Score</div>
              <div className="mt-2 text-lg font-semibold">
                {moleculeData.loggingDetails?.confidenceScore ||
                  moleculeData.confidenceScore}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          <CardContent className="p-0">
            <div className="p-4 bg-white text-paragraph-medium">
              <div className="text-gray-500 ">Risk Level</div>
              <div className="mt-2 text-lg font-semibold">
                <div className="flex items-center mt-1">
                  <span
                    className={`inline-block w-2 h-2 mr-2 ${
                      moleculeData.loggingDetails?.hasError
                        ? "bg-red-500"
                        : moleculeData.riskLevel.level === "High"
                        ? "bg-red-500"
                        : moleculeData.riskLevel.level === "Medium"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    } rounded-full`}
                  ></span>
                  <span className="text-gray-800">
                    {moleculeData.loggingDetails?.riskLevel ||
                      moleculeData.riskLevel.level}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metadata section */}
      <Card className="overflow-hidden bg-white border border-gray-200 rounded-lg">
        <CardContent className="p-4">
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-medium text-gray-800">
              Description:
            </h3>
            <p className="text-gray-700">
              {moleculeData.loggingDetails?.description ||
                `Molecule ${moleculeData.id} processed with ${moleculeData.aiModel} model. 
              Confidence score: ${moleculeData.confidenceScore}. 
              Risk level: ${moleculeData.riskLevel.level}.`}
            </p>
          </div>
          <h3 className="mb-4 text-lg font-medium text-gray-800">Metadata:</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="mb-1 text-sm text-gray-500">IP Address</h4>
              <p className="text-gray-800">
                {moleculeData.loggingDetails?.metadata?.ipAddress ||
                  "192.168.1.100"}
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="mb-1 text-sm text-gray-500">File Involved</h4>
              <p className="text-gray-800">
                {moleculeData.loggingDetails?.metadata?.fileInvolved ||
                  `${moleculeData.id.toLowerCase()}.json`}
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="mb-1 text-sm text-gray-500">System Version</h4>
              <p className="text-gray-800">
                {moleculeData.loggingDetails?.metadata?.systemVersion ||
                  "v2.1.7"}
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="mb-1 text-sm text-gray-500">Session ID</h4>
              <p className="text-gray-800">
                {moleculeData.loggingDetails?.metadata?.sessionId ||
                  "ABCD-1234-EFGH"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
          Download Logs
        </button>
        <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Rerun Analysis
        </button>
      </div>
    </div>
  );
};

export default MoleculeDetail;
