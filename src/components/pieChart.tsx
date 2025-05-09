"use client";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";

// Add custom types to extend Highcharts types
declare module "highcharts" {
  interface ChartOptions {
    custom?: {
      label?: Highcharts.SVGElement;
    };
  }
}

export function PieChart() {
  // Chart data matching the design
  const chartData = [
    { name: "Medium Risk", value: 280, percentage: 51.2, color: "#06283D" },
    { name: "High Risk", value: 30, percentage: 15.8, color: "#E63946" },
    { name: "Low Risk", value: 40, percentage: 33, color: "#F6A721" },
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const [timeRange, setTimeRange] = useState("This Week");

  const options2 = {
    chart: {
      type: "pie",
      height: 245,
      width: 244,
    },
    title: {
      text: "",
    },
    plotOptions: {
      pie: {
        innerSize: "50%",
        dataLabels: {
          enabled: false,
        },
        showInLegend: false,
      },
    },
    series: [
      {
        name: "Risk Level",
        data: chartData.map((item) => ({
          name: item.name,
          y: item.value,
          color: item.color,
        })),
      },
    ],
    credits: {
      enabled: false,
    },
  };
  const options = {
    chart: {
      type: "pie",
      custom: {},
      //   events: {
      //     // render() {
      //     //   const chart = this as unknown as Highcharts.Chart,
      //     //     series = chart.series[0];
      //     //   let customLabel = chart.options.chart?.custom?.label;
      //     //   if (!customLabel) {
      //     //     if (!chart.options.chart!.custom) {
      //     //       chart.options.chart!.custom = {};
      //     //     }
      //     //     customLabel = chart.options.chart!.custom.label = chart.renderer
      //     //       .label(
      //     //         <div className="flex min-w-[113px] max-w-[113px] min-h-[113px] max-h-[113px] flex-col items-center justify-center bg-white rounded-full shadow-lg">
      //     //           <div className="text-2xl font-bold text-gray-800">
      //     //             {total}
      //     //           </div>
      //     //           <div className="text-sm text-gray-500">Total</div>
      //     //         </div>
      //     //       )
      //     //       .css({
      //     //         color: "#000",
      //     //         textAnchor: "middle",
      //     //       })
      //     //       .add();
      //     //   }
      //     //   const x = series.center[0] + chart.plotLeft,
      //     //     y =
      //     //       series.center[1] +
      //     //       chart.plotTop -
      //     //       (customLabel.attr("height") as number) / 2;
      //     //   customLabel.attr({
      //     //     x,
      //     //     y,
      //     //   });
      //     //   // Set font size based on chart diameter
      //     //   customLabel.css({
      //     //     fontSize: `${series.center[2] / 12}px`,
      //     //   });
      //     // },
      //   },
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    tooltip: {},
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        borderRadius: 8,
        dataLabels: [
          {
            enabled: true,
            distance: 5,
            format: "{point.percentage:.0f}%",
            style: {
              fontSize: "0.9em",
              color: "red",
              backgroundColor: "black",
              padding: 10,
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
              borderRadius: 100,
              borderColor: "red",
              borderWidth: 2,
              borderStyle: "solid",
            },
          },
        ],
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Risk Levels",
        // colorByPoint: true,
        innerSize: "75%",
        data: chartData.map((item) => ({
          name: item.name,
          y: item.value,
          color: item.color,
          percentage: item.percentage,
        })),
      },
    ],
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Risk Level Distribution
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

      {/* Legend */}
      {/* <div className="mt-6 space-y-2">
        {chartData.map(
          (item: { name: string; percentage: number; color: string }) => (
            <div key={item.name} className="flex items-center text-sm">
              <div
                className="w-6 h-1 mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="mr-2 text-gray-600">
                {item.name} - ({item.percentage}%)
              </span>
            </div>
          )
        )}
      </div> */}
      <div className="flex flex-col items-center self-stretch justify-center w-full gap-2">
        <div className="flex flex-col items-start gap-2">
          {chartData.map((risk, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="relative w-[47px] h-2 rounded-2xl"
                style={{ backgroundColor: risk.color }}
              />
              <div className="font-text-3-regular text-grey-700 text-[length:var(--text-3-regular-font-size)] tracking-[var(--text-3-regular-letter-spacing)] leading-[var(--text-3-regular-line-height)] whitespace-nowrap">
                {risk.name} - ({risk.percentage}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
