"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadIcon, FilterIcon } from "@/components/icons";
import { SearchInput } from "@/components/searchInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { PredictionTable } from "./PredictionTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MolecularFeatureHeatmap from "@/components/visualChart";
import RiskConfidenceScatter from "@/components/riskConfidenceScatter";
import ConfidenceScoreTrend from "@/components/confidenceScoreTrendChart";
export default function PredictionsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [riskLevel, setRiskLevel] = useState<string>("");
  const [moleculeType, setMoleculeType] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRiskLevelChange = (value: string) => {
    setRiskLevel(value === "all" ? "" : value);
  };

  const handleMoleculeTypeChange = (value: string) => {
    setMoleculeType(value === "all" ? "" : value);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setRiskLevel("");
    setMoleculeType("");
  };

  return (
    <div className="flex flex-col gap-[18px]">
      <h1 className="text-2xl font-semibold text-gray-800 ">Predictions</h1>

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center ">
        <div className="w-full">
          <SearchInput
            onSearch={handleSearch}
            placeholder="Search molecules..."
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={riskLevel} onValueChange={handleRiskLevelChange}>
            <SelectTrigger className="min-w-[124px] h-[41.6px]">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Select value={moleculeType} onValueChange={handleMoleculeTypeChange}>
            <SelectTrigger className="min-w-[159px] h-[41.6px]">
              <SelectValue placeholder="Molecule type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="protein">Protein</SelectItem>
              <SelectItem value="dna">DNA</SelectItem>
              <SelectItem value="rna">RNA</SelectItem>
              <SelectItem value="smallMolecule">Small Molecule</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card className="flex flex-col items-start bg-[#fcfcfc] rounded-3xl border border-solid border-[#eeeeee] shadow-shadows-shadow-xs overflow-hidden">
        <CardHeader className="flex overflow-hidden bg-white rounded-t-xl items-center w-full p-0 border-b border-[#eeeeee]">
          <div className="w-full p-6 ">
            <CardTitle className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#414651] text-lg leading-6">
              Predictions
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="w-full p-0">
          <PredictionTable
            searchQuery={searchQuery}
            riskLevel={riskLevel}
            moleculeType={moleculeType}
          />
        </CardContent>
      </Card>
    </div>
  );
}
