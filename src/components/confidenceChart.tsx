// components/ConfidenceScoreChart.jsx
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { DownloadIcon, RotateIcon, ShareIcon } from "./icons";

const ConfidenceScoreChart = () => {
  const options = {
    chart: {
      type: "area",
      backgroundColor: "transparent",
      style: {
        padding: 4,
      },
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [
        "ML-1",
        "ML-2",
        "ML-3",
        "ML-4",
        "ML-5",
        "ML-6",
        "ML-7",
        "ML-8",
        "ML-9",
        "ML-10",
        "ML-11",
        "ML-12",
        "ML-13",
        "ML-14",
        "ML-15",
      ],
      title: {
        text: null,
      },
      gridLineColor: "#e5e7eb",
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        format: "{value}%",
      },
      max: 100,
      gridLineColor: "#e5e7eb",
    },
    tooltip: {
      pointFormat: "<b>{point.y}%</b>",
    },
    plotOptions: {
      area: {
        fillOpacity: 0.3,
        marker: {
          enabled: false,
        },
        lineColor: "#3579F6",
        lineWidth: 2,
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, "rgba(53, 121, 246, 0.4)"],
            [1, "rgba(53, 121, 246, 0)"],
          ],
        },
      },
    },
    series: [
      {
        name: "Confidence Score",
        data: [30, 40, 55, 60, 65, 70, 75, 80, 85, 80, 70, 60, 50, 40, 30],
        color: "#3579F6",
      },
    ],
    legend: {
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
      symbolRadius: 6,
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between w-full p-6">
        <CardTitle className="  font-strong text-heading-xxsmall text-[#333333] ">
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
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ConfidenceScoreChart;
