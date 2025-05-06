import { DatasetsFileUploadSection } from "./DatasetsFileUploadSection";
import { LargeDatasetsFileUploadSection } from "./LargeDatasetsFileUploadSection";
import { ChemicalFileUploadSection } from "./ChemicalFileUploadSection";
import { Card, CardContent } from "@/components/ui/card";
export const FileUploadPage = () => {
  return (
    <div className="flex flex-col gap-[18px]">
      <h1 className="text-2xl font-semibold text-gray-800 ">Upload Files</h1>

      <Card className="bg-white rounded-[20px] border border-[#eeeeee]">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <DatasetsFileUploadSection />
            <ChemicalFileUploadSection />
            <LargeDatasetsFileUploadSection />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
