import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { ContentByAnima } from "./Table";

export const PredictionResult = () => {
  return (
    <Card className="flex flex-col items-start bg-[#fcfcfc] rounded-3xl border border-solid border-[#eeeeee] shadow-shadows-shadow-xs overflow-hidden">
      <CardHeader className="flex overflow-hidden bg-white rounded-t-xl items-center w-full p-0 border-b border-[#eeeeee]">
        <div className="w-full p-6 ">
          <CardTitle className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#414651] text-lg leading-6">
            Prediction Result
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="w-full p-0">
        <ContentByAnima />
      </CardContent>
    </Card>
  );
};
