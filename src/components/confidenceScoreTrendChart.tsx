"use client";

import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CardHeader } from "./ui/card";
import { DownloadIcon, RotateIcon, ShareIcon } from "./icons";

const ConfidenceScoreTrend = () => {
  const ref = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Changed to lower mock data to match the trend line in the image
  const data = [
    { model: "ML-1", confidence: 20 },
    { model: "ML-2", confidence: 27 },
    { model: "ML-3", confidence: 21 },
    { model: "ML-4", confidence: 25 },
    { model: "ML-5", confidence: 35 },
    { model: "ML-6", confidence: 50 },
    { model: "ML-7", confidence: 40 },
    { model: "ML-8", confidence: 30 },
    { model: "ML-9", confidence: 25 },
    { model: "ML-10", confidence: 22 },
  ];

  const models = data.map((d) => d.model);

  const riskColor: Record<string, string> = {
    Low: "#FFCC00", // Yellow
    Medium: "#08D720", // Green
    High: "#F94144", // Red
  };

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    // Create ResizeObserver to track container size changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;

        // Clear previous visualization
        svg.selectAll("*").remove();

        const margin = { top: 30, right: 30, bottom: 50, left: 50 };
        const width = containerWidth - margin.left - margin.right;
        const height = 400;
        const axisFontSize = Math.min(13, containerWidth * 0.015);
        const x = d3.scalePoint().domain(models).range([0, width]).padding(0.5);
        const y = d3
          .scaleLinear()
          .domain([0, 100])
          .range([height - margin.top - margin.bottom, 0]);

        const line = d3
          .line<any>()
          .x((d) => x(d.model)!)
          .y((d) => y(d.confidence))
          .curve(d3.curveBasis);

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

        // Y Axis
        g.append("g")
          .call(
            d3
              .axisLeft(y)
              .ticks(10)
              .tickFormat((d) => `${d}%`)
          )
          .selectAll("text")
          .style("font-size", `${axisFontSize}px`);

        // X Axis
        g.append("g")
          .attr(
            "transform",
            `translate(0, ${height - margin.top - margin.bottom})`
          )
          .call(d3.axisBottom(x))
          .selectAll("text")
          .style("font-size", `${axisFontSize}px`);

        // Line Path
        g.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "#F94144")
          .attr("stroke-width", 3)
          .attr("d", line);

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

        // Create an invisible overlay to handle hover on the line
        g.append("rect")
          .attr("width", width)
          .attr("height", height - margin.top - margin.bottom)
          .style("fill", "none")
          .style("pointer-events", "all")
          .on("mousemove", function (event) {
            const [mouseX] = d3.pointer(event);

            // Find closest point on x-axis
            const domain = x.domain();
            const range = x.range();
            const step = range[1] / domain.length;
            const index = Math.min(
              domain.length - 1,
              Math.max(0, Math.floor(mouseX / step))
            );

            const d = data[index];

            if (d) {
              tooltip.style("visibility", "visible").html(`
                  <div style="font-weight: bold; margin-bottom: 5px;">
                    <div>Molecule: <span style="color: white;">${d.model}</span></div>
                    <div>Confidence: <span style="color: white;">${d.confidence}%</span></div>
                  </div>
                `);

              tooltip
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px");
            }
          })
          .on("mouseout", function () {
            tooltip.style("visibility", "hidden");
          });
      }
    });

    // Start observing the container
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Clean up
    return () => {
      resizeObserver.disconnect();
      d3.select("body").selectAll(".tooltip").remove();
    };
  }, []);

  return (
    <div className="w-full bg-white shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between w-full p-6">
        <h2 className="mb-4 text-xl font-semibold">Confidence Score Trend</h2>

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
        <div className="w-full">
          <svg ref={ref} style={{ width: "100%", height: "400px" }}></svg>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center w-full gap-4 p-6 pt-0 text-sm">
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

export default ConfidenceScoreTrend;
