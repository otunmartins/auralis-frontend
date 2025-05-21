"use client";

import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { DownloadIcon, RotateIcon, ShareIcon } from "./icons";

const ConfidenceAreaChart = () => {
  const ref = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const data = [
    { model: "ML-1", confidence: 35 },
    { model: "ML-2", confidence: 50 },
    { model: "ML-3", confidence: 62 },
    { model: "ML-4", confidence: 60 },
    { model: "ML-5", confidence: 65 },
    { model: "ML-6", confidence: 70 },
    { model: "ML-7", confidence: 80 },
    { model: "ML-8", confidence: 85 },
    { model: "ML-9", confidence: 88 },
    { model: "ML-10", confidence: 82 },
    { model: "ML-11", confidence: 74 },
    { model: "ML-12", confidence: 65 },
    { model: "ML-13", confidence: 54 },
    { model: "ML-14", confidence: 45 },
    { model: "ML-15", confidence: 38 },
  ];

  useEffect(() => {
    function drawChart() {
      if (!ref.current || !containerRef.current) return;
      const svg = d3.select(ref.current);
      svg.selectAll("*").remove();

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const width = containerWidth;
      const height = containerHeight;
      const isMobile = width < 600; // Check if mobile view
      const margin = {
        top: 30,
        right: isMobile ? 0 : 30,
        bottom: 50,
        left: isMobile ? 40 : 50,
      };

      const x = d3
        .scalePoint()
        .domain(data.map((d) => d.model))
        .range([0, width - margin.left - margin.right])
        .padding(0.5);

      const y = d3
        .scaleLinear()
        .domain([0, 100])
        .range([height - margin.top - margin.bottom, 0]);

      // Draw background grid
      const g = svg
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Horizontal grid lines
      const yTicks = y.ticks(10);
      g.selectAll(".grid-y")
        .data(yTicks)
        .enter()
        .append("line")
        .attr("class", "grid-y")
        .attr("x1", 0)
        .attr("x2", width - margin.left - margin.right)
        .attr("y1", (d) => y(d))
        .attr("y2", (d) => y(d))
        .attr("stroke", "#e5e7eb")
        .attr("stroke-width", 1)
        .attr("opacity", 1);

      // Vertical grid lines
      g.selectAll(".grid-x")
        .data(data.map((d) => d.model))
        .enter()
        .append("line")
        .attr("class", "grid-x")
        .attr("y1", 0)
        .attr("y2", height - margin.top - margin.bottom)
        .attr("x1", (d) => x(d)!)
        .attr("x2", (d) => x(d)!)
        .attr("stroke", "#e5e7eb")
        .attr("stroke-width", 1)
        .attr("opacity", 1);

      // Area fill
      const area = d3
        .area<any>()
        .x((d) => x(d.model)!)
        .y0(y(0))
        .y1((d) => y(d.confidence))
        .curve(d3.curveMonotoneX);

      // Gradient fill definition
      svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "0%")
        .attr("y2", "100%")
        .selectAll("stop")
        .data([
          { offset: "0%", color: "#2196f3", opacity: 0.4 },
          { offset: "100%", color: "#2196f3", opacity: 0 },
        ])
        .enter()
        .append("stop")
        .attr("offset", (d) => d.offset)
        .attr("stop-color", (d) => d.color)
        .attr("stop-opacity", (d) => d.opacity);

      g.append("path")
        .datum(data)
        .attr("fill", "url(#gradient)")
        .attr("d", area);

      // Line stroke
      const line = d3
        .line<any>()
        .x((d) => x(d.model)!)
        .y((d) => y(d.confidence))
        .curve(d3.curveMonotoneX);

      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#2196f3")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Y axis
      g.append("g")
        .call(
          d3
            .axisLeft(y)
            .ticks(10)
            .tickFormat((d) => `${d}%`)
        )
        .call((g) => g.select(".domain").remove())
        .call((g) => g.selectAll("line").remove())
        .selectAll("text")
        .style("font-size", isMobile ? "10px" : "12px");

      // X axis
      g.append("g")
        .attr(
          "transform",
          `translate(0, ${height - margin.top - margin.bottom})`
        )
        .call(d3.axisBottom(x))
        .call((g) => g.select(".domain").remove())
        .selectAll("text")
        .style("font-size", "12px")
        .text(function (d) {
          const value = d as string;
          if (isMobile) {
            return "";
          }
          return value;
        });

      // Add range indicators below the chart
      if (isMobile) {
        const rangeGroups = [];
        for (let i = 0; i < data.length; i += 5) {
          const start = i + 1;
          const end = Math.min(i + 5, data.length);
          rangeGroups.push({ start, end });
        }

        const rangeIndicator = svg
          .append("g")
          .attr("transform", `translate(${margin.left}, ${height - 40})`);

        rangeGroups.forEach((range, i) => {
          const startX = x(data[i * 5].model)!;
          const endX = x(
            data[Math.min((i + 1) * 5 - 1, data.length - 1)].model
          )!;
          const width = endX - startX;
          const centerX = startX + width / 2;

          // Add the range bar
          rangeIndicator
            .append("rect")
            .attr("x", startX)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", 1)
            .attr("fill", "black");

          // Add centered range label
          rangeIndicator
            .append("text")
            .attr("x", centerX)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "10px")
            .attr("fill", "black")
            .text(`ML: ${range.start}-${range.end}`);
        });
      }
    }

    drawChart();

    const resizeObserver = new ResizeObserver(drawChart);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg max-md:p-4 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between w-full p-0">
        <CardTitle className="font-strong text-heading-xxsmall text-[#333333]">
          Confidence Score Trend
        </CardTitle>

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
      <div
        ref={containerRef}
        className="w-full h-full min-h-[340px] max-h-[340px] min-w-[200px]"
      >
        <svg ref={ref} className="w-full h-full" />
      </div>
      <div className="flex flex-wrap items-center justify-center w-full gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2 text-label-xsmall">
          <div className="w-[9px] h-[9px] bg-yellow-400 rounded-full" /> Low
          Risk
        </div>
        <div className="flex items-center gap-2 text-label-xsmall">
          <div className="w-[9px] h-[9px] bg-green-500 rounded-full" /> Medium
          Risk
        </div>
        <div className="flex items-center gap-2 text-label-xsmall">
          <div className="w-[9px] h-[9px] bg-red-500 rounded-full" /> High Risk
        </div>
      </div>
    </div>
  );
};

export default ConfidenceAreaChart;
