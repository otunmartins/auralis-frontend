"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { MoleculeData, initialData } from "@/siteData/moleculeData";
import { CheckFilledIcon, XFilledIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import ConfidenceScoreChart from "@/components/confidenceChart";
interface MoleculeDetailProps {
  moleculeId?: string;
}

const MoleculeResult = ({ moleculeId }: MoleculeDetailProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = moleculeId || searchParams.get("id");

  // Find the molecule data by ID
  const moleculeData = id
    ? initialData.find((molecule) => molecule.id === id)
    : null;

  if (!moleculeData) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <h2 className="mb-4 text-xl font-semibold">Molecule Not Found</h2>
        <p className="mb-6 text-gray-500">
          The molecule with ID {id || "unknown"} was not found in the database.
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
      <h2 className="text-xl font-semibold">Molecule Result</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Molecule ID */}
        <Card className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          <CardContent className="p-0">
            <div className="p-4 bg-white text-paragraph-medium">
              <div className="text-gray-500 ">Molecule ID</div>
              <div className="mt-2 text-lg font-semibold">
                {moleculeData.id}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confidence Score */}
        <Card className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          <CardContent className="p-0">
            <div className="p-4 bg-white text-paragraph-medium">
              <div className="text-gray-500 ">Confidence Score</div>
              <div className="mt-2 text-lg font-semibold">
                {moleculeData.confidenceScore}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Level */}
        <Card className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          <CardContent className="p-0">
            <div className="p-4 bg-white text-paragraph-medium">
              <div className="text-gray-500 ">Risk Level</div>
              <div className="flex items-center gap-2 mt-2 text-lg font-semibold">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    moleculeData.riskLevel.level === "High"
                      ? "bg-error-500"
                      : moleculeData.riskLevel.level === "Medium"
                      ? "bg-success-500"
                      : "bg-warning-500"
                  }`}
                />
                {moleculeData.riskLevel.level}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidate */}
        <Card className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          <CardContent className="p-0">
            <div className="p-4 bg-white text-paragraph-medium">
              <div className="text-gray-500 ">Candidate</div>
              <div className="flex items-center gap-2 mt-2 text-lg font-semibold">
                {moleculeData.drugCandidate.isCandidate ? (
                  <>
                    <CheckFilledIcon />
                    <span>Yes</span>
                  </>
                ) : (
                  <>
                    <XFilledIcon />
                    <span>{moleculeData.drugCandidate.value}</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Model Used */}
        <Card className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          <CardContent className="p-0">
            <div className="p-4 bg-white text-paragraph-medium">
              <div className="text-gray-500 ">AI Model Used</div>
              <div className="mt-2 text-lg font-semibold">
                {moleculeData.aiModel}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Processed On */}
        <Card className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          <CardContent className="p-0">
            <div className="p-4 bg-white text-paragraph-medium">
              <div className="text-gray-500 ">Processed On</div>
              <div className="mt-2 text-lg font-semibold">
                {moleculeData.processedOn}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded By */}
        <Card className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          <CardContent className="p-0">
            <div className="p-4 bg-white text-paragraph-medium">
              <div className="text-gray-500 ">Uploaded By</div>
              <div className="mt-2 text-lg font-semibold">
                {moleculeData.uploadedBy}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dataset Name */}
        <Card className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          <CardContent className="p-0">
            <div className="p-4 bg-white text-paragraph-medium">
              <div className="text-gray-500 ">Dataset Name</div>
              <div className="mt-2 text-lg font-semibold">
                {moleculeData.datasetName}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional molecule information sections */}
      <div className="w-full mt-2">
        <ConfidenceScoreChart />
      </div>
    </div>
  );
};

export default MoleculeResult;
