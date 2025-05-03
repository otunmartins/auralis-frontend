import { ArrowUpIcon } from "@/components/icons";
import { Card, CardContent } from "./ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
}
export default function MetricCard({ title, value, change }: MetricCardProps) {
  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <h3 className=" text-[#333333] text-paragraph-medium font-regular">
          {title}
        </h3>
        <div className="flex flex-col gap-[18px]">
          <p className="font-semibold text-gray-800 text-heading-small">
            {value}
          </p>
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex items-center gap-1 p-1 px-2 w-fit bg-primary-50 rounded-3xl text-primary-950">
              <span className={`text-label-xsmall font-strong `}>
                +{change}
              </span>
              <ArrowUpIcon />
            </div>
            <span className="text-sm text-gray-500">Than last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
