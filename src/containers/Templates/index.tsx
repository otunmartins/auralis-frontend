"use client";
import { SearchInput } from "@/components/searchInput";
import { TemplateCard } from "@/components/templateCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import cardData from "@/siteData/temaplatesData";
import React, { useState, useMemo } from "react";

export const TemplatesPage = () => {
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [moleculeType, setMoleculeType] = useState("all");

  // Handler for search
  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  // Handler for filter
  const handleMoleculeTypeChange = (value: string) => {
    setMoleculeType(value);
  };

  // Filtered data
  const filteredCards = useMemo(() => {
    return cardData.filter((card) => {
      // Category filter
      let matchesType = true;
      if (moleculeType !== "all") {
        const type = moleculeType.toLowerCase();
        const text = (
          card.title +
          " " +
          card.description +
          " " +
          card.models.join(" ")
        ).toLowerCase();
        if (type === "smallMolecule") {
          matchesType =
            text.includes("small molecule") ||
            text.includes("smallmolecule") ||
            text.includes("molecule") ||
            text.includes("compound");
        } else {
          matchesType = text.includes(type);
        }
      }
      // Search filter
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !search ||
        card.title.toLowerCase().includes(search) ||
        card.description.toLowerCase().includes(search) ||
        card.models.some((model) => model.toLowerCase().includes(search));
      return matchesType && matchesSearch;
    });
  }, [searchTerm, moleculeType]);

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

        <div className="flex items-center gap-2 w-full max-w-[182px]">
          <Select onValueChange={handleMoleculeTypeChange}>
            <SelectTrigger className="min-w-[159px] w-full h-[41.6px]">
              <SelectValue placeholder="Filter by category" />
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCards.map((card, index) => (
          <TemplateCard
            key={index}
            id={card.id}
            title={card.title}
            description={card.description}
            models={card.models}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
};
