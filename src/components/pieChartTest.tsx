"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function RiskLevelDonutChart({
  data,
  isFilter = true,
}: {
  data: { label: string; value: number; color: string }[];
  isFilter?: boolean;
}) {
  const [timeRange, setTimeRange] = useState("This Week");
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = data.reduce((acc, item) => acc + item.value, 0);

  useEffect(() => {
    function drawChart() {
      if (!svgRef.current || !containerRef.current) return;
      d3.select(svgRef.current).selectAll("*").remove();

      const containerWidth = containerRef.current.clientWidth;
      const size = Math.max(180, Math.min(containerWidth, 400)); // Responsive size, min 180, max 400
      const width = size;
      const height = size;
      const radius = Math.min(width, height) / 2 - size * 0.09;

      const arc = d3
        .arc<any>()
        .innerRadius(radius - size * 0.15)
        .outerRadius(radius - 2)
        .cornerRadius(size * 0.028);

      const pie = d3
        .pie<any>()
        .value((d) => d.value)
        .sort(null)
        .padAngle(0.03);

      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      // Draw donut segments
      const arcs = svg
        .selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => d.data.color)
        .attr("stroke", "#fff")
        .style("stroke-width", size * 0.012 + "px");

      // Draw value circles ON TOP of the donut bar
      arcs.each(function (d, i) {
        // Find the angle in the middle of the arc
        const angle = (d.startAngle + d.endAngle) / 2 - Math.PI / 2;
        // Calculate inner and outer radius of the donut bar
        const inner = radius - size * 0.185;
        const outer = radius - 2;
        // Place the circle so it's half in, half out (intersecting the bar)
        const circleRadius = (inner + outer) / 2 + (outer - inner) * 0.5;
        const cx = Math.cos(angle) * circleRadius;
        const cy = Math.sin(angle) * circleRadius;

        d3.select(this)
          .append("circle")
          .attr("cx", cx)
          .attr("cy", cy)
          .attr("r", size * 0.072)
          .attr("fill", "#fff")
          .attr("stroke", "#eee")
          .attr("stroke-width", size * 0.007)
          .style("filter", "drop-shadow(0 2px 4px #0001)");

        d3.select(this)
          .append("text")
          .attr("x", cx)
          .attr("y", cy + size * 0.021)
          .attr("text-anchor", "middle")
          .style("fill", d.data.color === "#0a2e65" ? "#4caf50" : d.data.color)
          .style("font-weight", "bold")
          .style("font-size", size * 0.05 + "px")
          .text(d.data.value);
      });

      // Center total
      svg
        .append("circle")
        .attr("r", radius - size * 0.21)
        .attr("fill", "#fff")
        .attr("stroke", "#f3f4f6")
        .attr("stroke-width", size * 0.007);

      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", -size * 0.03)
        .style("font-size", size * 0.09 + "px")
        .style("font-weight", "bold")
        .style("fill", "#0a2e65")
        .text(total);

      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", size * 0.09)
        .style("font-size", size * 0.045 + "px")
        .style("fill", "#0a2e65")
        .text("Total");
    }

    drawChart();

    const resizeObserver = new ResizeObserver(drawChart);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-between w-full h-full p-4 bg-white rounded-lg shadow-lg"
    >
      {/* Header */}
      <div className="flex flex-col gap-1 mb-4">
        <h2
          className={`text-lg font-semibold text-gray-800 ${
            !isFilter ? "text-center" : "text-left"
          }`}
        >
          Risk Level Distribution
        </h2>
        {isFilter && (
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
        )}
      </div>

      {/* Chart */}
      <div className="flex items-center justify-center w-full h-full min-h-[180px] min-w-[300px]">
        <svg ref={svgRef} className="block w-full h-full" />
      </div>

      {/* Legend */}
      <div className="flex flex-col items-center self-stretch justify-center w-full gap-2">
        <div className="flex flex-col items-start gap-2">
          {data.map((risk, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="relative max-xl:w-[30px] max-lg:w-[12px] max-md:w-[47px] w-[47px] h-2 rounded-2xl"
                style={{ backgroundColor: risk.color }}
              />
              <div className="font-regular text-grey-700 text-paragraph-small whitespace-nowrap">
                {risk.label} - ({((risk.value / total) * 100).toFixed(1)}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
