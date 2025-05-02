"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

const data = [
  { label: "Medium Risk", value: 280, color: "#032b5b" },
  { label: "Low Risk", value: 40, color: "#fdb515" },
  { label: "High Risk", value: 30, color: "#ea3e3e" },
];

const RiskLevelChart = () => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = 260;
    const height = 260;
    const thickness = 32;
    const radius = Math.min(width, height) / 2;

    const total = d3.sum(data, (d) => d.value);

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .html("") // Clear existing
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arc = d3
      .arc<any>()
      .innerRadius(radius - thickness)
      .outerRadius(radius);

    const pie = d3
      .pie<any>()
      .value((d) => d.value)
      .sort(null);

    const arcs = svg.selectAll("arc").data(pie(data)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 3);

    // Outer Value Labels
    arcs
      .append("text")
      .attr("transform", (d) => {
        const [x, y] = arc.centroid(d);
        const factor = 1.5;
        return `translate(${x * factor}, ${y * factor})`;
      })
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("fill", "black")
      .style("background", "black")
      .style("font-size", "12px")
      .style("font-weight", "600")
      .style("fill", "#222")
      .text((d) => d.data.value);

    // Center Total
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.2em")
      .style("font-size", "22px")
      .style("font-weight", "600")
      .style("fill", "#333")
      .text(total);

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.2em")
      .style("font-size", "13px")
      .style("fill", "#999")
      .text("Total");
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow w-[300px]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800">
          Risk Level Distribution
        </h3>
        <div className="text-xs border border-gray-300 px-2 py-0.5 rounded-full text-gray-600">
          This Week
        </div>
      </div>

      <div className="flex flex-col items-center">
        <svg ref={ref}></svg>

        <div className="mt-4 text-sm">
          {data.map((item) => {
            const percent = ((item.value / 350) * 100).toFixed(1);
            return (
              <div className="flex items-center gap-2 mb-1" key={item.label}>
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-gray-700">
                  {item.label} – ({percent}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RiskLevelChart;
