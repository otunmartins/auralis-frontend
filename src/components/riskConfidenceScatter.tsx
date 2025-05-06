"use client";

import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CardHeader } from "./ui/card";
import { DownloadIcon, RotateIcon, ShareIcon } from "./icons";

const RiskConfidenceScatter = () => {
  const ref = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const molecularData = [
    { x: "ML-1", y: "Rotatable Bonds", value: 2, confidence: 65, risk: "Low" },
    { x: "ML-2", y: "Rotatable Bonds", value: 1, confidence: 72, risk: "Low" },
    { x: "ML-3", y: "Rotatable Bonds", value: 7, confidence: 89, risk: "High" },
    { x: "ML-4", y: "Rotatable Bonds", value: 4, confidence: 78, risk: "Low" },
    { x: "ML-5", y: "Rotatable Bonds", value: 8, confidence: 91, risk: "High" },
    { x: "ML-6", y: "Rotatable Bonds", value: 6, confidence: 84, risk: "High" },
    { x: "ML-7", y: "Rotatable Bonds", value: 3, confidence: 67, risk: "Low" },
    { x: "ML-8", y: "Rotatable Bonds", value: 8, confidence: 92, risk: "High" },
    { x: "ML-9", y: "Rotatable Bonds", value: 9, confidence: 94, risk: "High" },
    { x: "ML-10", y: "Rotatable Bonds", value: 4, confidence: 75, risk: "Low" },

    {
      x: "ML-1",
      y: "Molecular Weight 1",
      value: 1,
      confidence: 62,
      risk: "Low",
    },
    {
      x: "ML-2",
      y: "Molecular Weight 1",
      value: 3,
      confidence: 70,
      risk: "Low",
    },
    {
      x: "ML-3",
      y: "Molecular Weight 1",
      value: 1,
      confidence: 61,
      risk: "Low",
    },
    {
      x: "ML-4",
      y: "Molecular Weight 1",
      value: 6,
      confidence: 81,
      risk: "High",
    },
    {
      x: "ML-5",
      y: "Molecular Weight 1",
      value: 1,
      confidence: 63,
      risk: "Low",
    },
    {
      x: "ML-6",
      y: "Molecular Weight 1",
      value: 5,
      confidence: 79,
      risk: "Medium",
    },
    {
      x: "ML-7",
      y: "Molecular Weight 1",
      value: 2,
      confidence: 68,
      risk: "Low",
    },
    {
      x: "ML-8",
      y: "Molecular Weight 1",
      value: 8,
      confidence: 90,
      risk: "High",
    },
    {
      x: "ML-9",
      y: "Molecular Weight 1",
      value: 9,
      confidence: 93,
      risk: "High",
    },
    {
      x: "ML-10",
      y: "Molecular Weight 1",
      value: 7,
      confidence: 87,
      risk: "High",
    },

    {
      x: "ML-1",
      y: "Molecular Weight 2",
      value: 7,
      confidence: 83,
      risk: "High",
    },
    {
      x: "ML-2",
      y: "Molecular Weight 2",
      value: 3,
      confidence: 71,
      risk: "Low",
    },
    {
      x: "ML-3",
      y: "Molecular Weight 2",
      value: 2,
      confidence: 64,
      risk: "Low",
    },
    {
      x: "ML-4",
      y: "Molecular Weight 2",
      value: 3,
      confidence: 69,
      risk: "Low",
    },
    {
      x: "ML-5",
      y: "Molecular Weight 2",
      value: 4,
      confidence: 74,
      risk: "Low",
    },
    {
      x: "ML-6",
      y: "Molecular Weight 2",
      value: 4,
      confidence: 76,
      risk: "Low",
    },
    {
      x: "ML-7",
      y: "Molecular Weight 2",
      value: 1,
      confidence: 60,
      risk: "Low",
    },
    {
      x: "ML-8",
      y: "Molecular Weight 2",
      value: 5,
      confidence: 80,
      risk: "Medium",
    },
    {
      x: "ML-9",
      y: "Molecular Weight 2",
      value: 1,
      confidence: 62,
      risk: "Low",
    },
    {
      x: "ML-10",
      y: "Molecular Weight 2",
      value: 4,
      confidence: 73,
      risk: "Low",
    },

    { x: "ML-1", y: "Aromatic Rings", value: 7, confidence: 85, risk: "High" },
    { x: "ML-2", y: "Aromatic Rings", value: 2, confidence: 66, risk: "Low" },
    { x: "ML-3", y: "Aromatic Rings", value: 7, confidence: 86, risk: "High" },
    {
      x: "ML-4",
      y: "Aromatic Rings",
      value: 5,
      confidence: 77,
      risk: "Medium",
    },
    { x: "ML-5", y: "Aromatic Rings", value: 2, confidence: 65, risk: "Low" },
    { x: "ML-6", y: "Aromatic Rings", value: 6, confidence: 82, risk: "High" },
    { x: "ML-7", y: "Aromatic Rings", value: 1, confidence: 61, risk: "Low" },
    { x: "ML-8", y: "Aromatic Rings", value: 8, confidence: 89, risk: "High" },
    { x: "ML-9", y: "Aromatic Rings", value: 7, confidence: 84, risk: "High" },
    {
      x: "ML-10",
      y: "Aromatic Rings",
      value: 5,
      confidence: 78,
      risk: "Medium",
    },

    { x: "ML-1", y: "H-Bond Donors", value: 5, confidence: 79, risk: "Medium" },
    { x: "ML-2", y: "H-Bond Donors", value: 1, confidence: 62, risk: "Low" },
    { x: "ML-3", y: "H-Bond Donors", value: 8, confidence: 91, risk: "High" },
    { x: "ML-4", y: "H-Bond Donors", value: 6, confidence: 83, risk: "High" },
    { x: "ML-5", y: "H-Bond Donors", value: 2, confidence: 67, risk: "Low" },
    { x: "ML-6", y: "H-Bond Donors", value: 1, confidence: 63, risk: "Low" },
    { x: "ML-7", y: "H-Bond Donors", value: 4, confidence: 75, risk: "Low" },
    { x: "ML-8", y: "H-Bond Donors", value: 4, confidence: 74, risk: "Low" },
    { x: "ML-9", y: "H-Bond Donors", value: 4, confidence: 76, risk: "Low" },
    { x: "ML-10", y: "H-Bond Donors", value: 3, confidence: 70, risk: "Low" },

    { x: "ML-1", y: "Log-p", value: 1, confidence: 64, risk: "Low" },
    { x: "ML-2", y: "Log-p", value: 1, confidence: 63, risk: "Low" },
    { x: "ML-3", y: "Log-p", value: 1, confidence: 62, risk: "Low" },
    { x: "ML-4", y: "Log-p", value: 6, confidence: 84, risk: "High" },
    { x: "ML-5", y: "Log-p", value: 4, confidence: 73, risk: "Low" },
    { x: "ML-6", y: "Log-p", value: 9, confidence: 95, risk: "High" },
    { x: "ML-7", y: "Log-p", value: 6, confidence: 83, risk: "High" },
    { x: "ML-8", y: "Log-p", value: 5, confidence: 78, risk: "Medium" },
    { x: "ML-9", y: "Log-p", value: 8, confidence: 90, risk: "High" },
    { x: "ML-10", y: "Log-p", value: 4, confidence: 72, risk: "Low" },
  ];

  // Create processed data for the scatter plot
  const processedData = molecularData.map((d) => ({
    model: d.x,
    confidence: d.confidence,
    risk: d.risk.toLowerCase(),
    feature: d.y,
    value: d.value,
  }));

  const models = [...new Set(processedData.map((d) => d.model))];
  const riskColor: Record<string, string> = {
    low: "#FFCC00", // Yellow color from the heatmap
    medium: "#08D720", // Green color from the heatmap
    high: "#F94144", // Red color from the heatmap
  };

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    // Get container width
    const containerWidth = containerRef.current?.clientWidth || 800;

    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    const width = containerWidth - margin.left - margin.right;
    const height = 400;

    const x = d3.scalePoint().domain(models).range([0, width]).padding(0.5);
    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.top - margin.bottom, 0]);

    const g = svg
      .attr("width", containerWidth)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add background
    g.append("rect")
      .attr("width", width)
      .attr("height", height - margin.top - margin.bottom)
      .attr("fill", "#FFF")
      .attr("stroke", "none");

    // Add grid lines
    // Vertical grid lines
    g.selectAll("vlines")
      .data(models)
      .enter()
      .append("line")
      .attr("x1", (d) => x(d)!)
      .attr("y1", 0)
      .attr("x2", (d) => x(d)!)
      .attr("y2", height - margin.top - margin.bottom)
      .attr("stroke", "#f0f0f0")
      .attr("stroke-width", 1);

    // Horizontal grid lines
    const yTicks = y.ticks(10);
    g.selectAll("hlines")
      .data(yTicks)
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("y1", (d) => y(d))
      .attr("x2", width)
      .attr("y2", (d) => y(d))
      .attr("stroke", "#f0f0f0")
      .attr("stroke-width", 1);

    // Create tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "#333")
      .style("color", "white")
      .style("padding", "10px")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("font-size", "14px")
      .style("z-index", "1000")
      .style("box-shadow", "0 0 10px rgba(0,0,0,0.25)");

    // Y Axis
    g.append("g")
      .call(
        d3
          .axisLeft(y)
          .ticks(10)
          .tickFormat((d) => `${d}%`)
      )
      .selectAll("text")
      .style("font-size", "12px");

    // X Axis
    g.append("g")
      .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "12px");

    // Dots
    g.selectAll()
      .data(processedData)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.model)!)
      .attr("cy", (d) => y(d.confidence))
      .attr("r", 6)
      .style("fill", (d) => riskColor[d.risk])
      .style("opacity", 0.9)
      .on("mouseover", function (event, d) {
        tooltip.style("visibility", "visible").html(`
            <div style="font-weight: bold; margin-bottom: 5px;">
              <div>Molecule: <span style="color: white;">${d.model}</span></div>
              <div>Feature: <span style="color: white;">${
                d.feature
              }</span></div>
              <div>Value: <span style="color: white;">${d.value}</span></div>
              <div>Confidence Score: <span style="color: white;">${
                d.confidence
              }%</span></div>
              <div>Risk Level: <span style="color: ${
                riskColor[d.risk]
              };">${d.risk.charAt(0).toUpperCase() + d.risk.slice(1)}</span></div>
            </div>
          `);

        // Position the tooltip near the mouse but not directly under it
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
      });

    // Clean up the tooltip when component unmounts
    return () => {
      d3.select("body").selectAll(".tooltip").remove();
    };
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between w-full p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Risk Level vs Confidence Score
        </h2>

        <div className="inline-flex items-start justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-1.5 w-8 h-8 bg-globalwhite rounded-md border-[0.5px] border-solid border-[#eeeeee] shadow-[0px_0px_10px_#0000000d]"
          >
            <DownloadIcon />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="p-1.5 w-8 h-8 bg-globalwhite rounded-md border-[0.5px] border-solid border-[#eeeeee] shadow-[0px_0px_10px_#0000000d]"
          >
            <RotateIcon />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="p-1.5 w-8 h-8 bg-globalwhite rounded-md border-[0.5px] border-solid border-[#eeeeee] shadow-[0px_0px_10px_#0000000d]"
          >
            <ShareIcon />
          </Button>
        </div>
      </CardHeader>
      <div className="w-full" ref={containerRef}>
        <div className="w-full overflow-auto">
          <svg ref={ref} style={{ width: "100%", height: "400px" }}></svg>
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-4 p-6 pt-0 text-sm">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "#FFCC00" }}
          />{" "}
          Low Risk
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "#08D720" }}
          />{" "}
          Medium Risk
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "#F94144" }}
          />{" "}
          High Risk
        </div>
      </div>
    </div>
  );
};

export default RiskConfidenceScatter;
