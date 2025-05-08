"use client";

import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CardHeader } from "./ui/card";
import { DownloadIcon, RotateIcon, ShareIcon } from "./icons";

const MolecularFeatureHeatmap = () => {
  const ref = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const data = [
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

  const xLabels = [...new Set(data.map((d) => d.x))];
  const yLabels = [...new Set(data.map((d) => d.y))];

  const colorScale = (val: number) => {
    if (val >= 6) return "#F94144"; // High
    if (val >= 5) return "#08D720"; // Medium
    if (val >= 4) return "#FFCC00"; // Low
    return "#F5F5F5"; // Medium
  };

  const drawChart = () => {
    if (!ref.current || !containerRef.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const containerWidth = containerRef.current.clientWidth;
    const isSmallScreen = window.innerWidth <= 768;
    const containerHeight = isSmallScreen
      ? 300
      : Math.min(500, window.innerHeight * 0.7);

    const margin = {
      top: 20,
      right: 30,
      bottom: 50,
      left: Math.min(150, containerWidth * 0.2),
    };

    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const x = d3.scaleBand().domain(xLabels).range([0, width]).padding(0.05);

    const y = d3.scaleBand().domain(yLabels).range([0, height]).padding(0.05);

    const svgElement = svg
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create tooltip
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

    // Draw cells
    svgElement
      .selectAll()
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.x)!)
      .attr("y", (d) => y(d.y)!)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", (d) => colorScale(d.value))
      .style("stroke", "#fff")
      .on("mouseover", function (event, d) {
        tooltip.style("visibility", "visible").html(`
          <div style="font-weight: bold; margin-bottom: 5px;">
            <div>Molecule: <span style="color: white;">${d.x}</span></div>
            <div>Feature: <span style="color: white;">${d.y}</span></div>
            <div>Value: <span style="color: white;">${d.value}</span></div>
            <div>Confidence Score: <span style="color: white;">${
              d.confidence
            }%</span></div>
            <div>Risk Level: <span style="color: ${
              d.risk === "High"
                ? "#F94144"
                : d.risk === "Medium"
                ? "#08D720"
                : "#FFCC00"
            };">${d.risk}</span></div>
          </div>
        `);
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

    // Add cell values
    const fontSize = Math.min(12, Math.min(x.bandwidth(), y.bandwidth()) / 2);
    svgElement
      .selectAll()
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.x)! + x.bandwidth() / 2)
      .attr("y", (d) => y(d.y)! + y.bandwidth() / 2)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("fill", "#000")
      .style("font-size", `${fontSize}px`)
      .text((d) => d.value);

    // Add axes
    const axisFontSize = Math.min(13, containerWidth * 0.015);

    // Y-axis
    svgElement
      .append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .selectAll("text")
      .style("font-size", `${axisFontSize}px`);

    // X-axis
    svgElement
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .style("text-anchor", "middle")
      .style("font-size", `${axisFontSize}px`);
  };

  useEffect(() => {
    drawChart();

    const resizeObserver = new ResizeObserver(() => {
      drawChart();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      d3.select("body").selectAll(".tooltip").remove();
    };
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between w-full p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Molecular Feature Intensity
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
          <svg
            ref={ref}
            style={{ width: "100%", height: "auto", minHeight: "300px" }}
          ></svg>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center w-full gap-4 p-6 pt-0 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400" /> Low Risk
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500" /> Medium Risk
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500" /> High Risk
        </div>
      </div>
    </div>
  );
};

export default MolecularFeatureHeatmap;
