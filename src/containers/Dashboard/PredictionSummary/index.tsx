import MetricCard from "@/components/matricCard";
import { BarChart } from "@/components/barChart";
import { PieChart } from "@/components/pieChart";
import RiskLevelDonutChart from "@/components/pieChartTest";
import ConfidenceScoreBarChart from "@/components/confidenceScoreBarChart";

export default function PredictionSummaryPage() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Molecules Processed"
          value="12,00"
          change={25}
        />
        <MetricCard
          title="Drug Candidates Identified"
          value="100"
          change={25}
        />
        <MetricCard title="High Risk Compounds" value="100" change={25} />
        <MetricCard title="High Risk Compounds" value="100%" change={25} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-2">
          {/* <BarChart /> */}
          <ConfidenceScoreBarChart />
        </div>
        <div className="col-span-1">
          {/* <PieChart /> */}
          <RiskLevelDonutChart />
        </div>
      </div>
    </>
  );
}
