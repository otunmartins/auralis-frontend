"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

const ConfidenceScoreBarChart = () => {
  const ref = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeRange, setTimeRange] = useState("This Week");

  const data = [
    { range: "30%–39%", count: 720 },
    { range: "40%–49%", count: 440 },
    { range: "50%–59%", count: 320 },
    { range: "60%–69%", count: 150 },
    { range: "70%–79%", count: 110 },
    { range: "80%–89%", count: 80 },
    { range: "90%–100%", count: 70 },
  ];

  useEffect(() => {
    function drawChart() {
      if (!ref.current || !containerRef.current) return;
      const svg = d3.select(ref.current);
      svg.selectAll("*").remove();

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const margin = { top: 24, right: 0, bottom: 24, left: 35 };
      const width = containerWidth;
      const height = containerHeight;

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.range))
        .range([0, width - margin.left - margin.right])
        .padding(0.2);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.count)!])
        .nice()
        .range([height - margin.top - margin.bottom, 0]);

      const g = svg
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X Axis
      g.append("g")
        .attr(
          "transform",
          `translate(0, ${height - margin.top - margin.bottom})`
        )
        .call(d3.axisBottom(x))
        .call((g) => g.select(".domain").remove())
        .call((g) => g.selectAll("line").remove())
        .selectAll("text")
        .style("font-size", "12px");

      // Y Axis
      g.append("g")
        .call(d3.axisLeft(y))
        .call((g) => g.select(".domain").remove())
        .call((g) => g.selectAll("line").remove())
        .selectAll("text")
        .style("font-size", "12px");

      // Bars with rounded top corners
      g.selectAll()
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.range)!)
        .attr("y", (d) => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", (d) => y(0) - y(d.count))
        .attr("fill", "#0a2e65")
        .attr("rx", 12)
        .attr("ry", 12);
    }

    drawChart();

    const resizeObserver = new ResizeObserver(drawChart);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [data]);

  return (
    <div className="flex flex-col justify-between w-full h-full p-4 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Confidence Score Distribution
          </h2>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-8 gap-2 px-2 py-1 text-sm bg-white border border-gray-200 rounded-full w-fit focus:outline-none !text-grey-dark">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white !text-grey-dark">
              <SelectItem value="This Week">This Week</SelectItem>
              <SelectItem value="Last Week">Last Week</SelectItem>
              <SelectItem value="This Month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="mt-2 mb-4 text-sm text-right text-gray-500">
          X-axis: Molecule Count | Y-axis: Confidence Range
        </p>
      </div>
      <div
        ref={containerRef}
        className="w-full h-full min-h-[200px] min-w-[200px] max-xl:max-h-[400px]"
      >
        <svg ref={ref} className="w-full h-full" />
      </div>
    </div>
  );
};

export default ConfidenceScoreBarChart;
