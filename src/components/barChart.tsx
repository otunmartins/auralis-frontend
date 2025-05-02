"use client";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";

export function BarChart() {
  // Dummy JSON data
  const chartData = [
    { range: "30% - 39%", count: 700 },
    { range: "40% - 49%", count: 500 },
    { range: "50% - 59%", count: 400 },
    { range: "60% - 69%", count: 200 },
    { range: "70% - 79%", count: 100 },
    { range: "80% - 89%", count: 50 },
    { range: "90% - 100%", count: 25 },
  ];

  const [timeRange, setTimeRange] = useState("This Week");

  const options = {
    chart: {
      type: "column",
      backgroundColor: null,
    },
    title: {
      text: "Confidence Score Distribution",
      align: "left",
      style: { fontSize: "16px", fontWeight: "bold", color: "#333" },
    },
    xAxis: {
      categories: chartData.map((item) => item.range),
      title: {
        text: "Confidence Range",
        style: { fontSize: "12px", color: "#888" },
      },
    },
    yAxis: {
      title: {
        text: "Molecule Count",
        style: { fontSize: "12px", color: "#888" },
      },
    },
    tooltip: {
      pointFormat: "{point.y} molecules",
    },
    series: [
      {
        name: "Molecule Count",
        data: chartData.map((item) => item.count),
        color: "#06283D",
      },
    ],
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Confidence Score Distribution
        </h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-2 py-1 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none"
        >
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      {/* Chart */}
      <HighchartsReact highcharts={Highcharts} options={options} />

      {/* X and Y axis labels */}
      <div className="flex justify-between mt-4 text-sm text-gray-500">
        <span>X-axis: Molecule Count</span>
        <span>Y-axis: Confidence Range</span>
      </div>
    </div>
  );
}
