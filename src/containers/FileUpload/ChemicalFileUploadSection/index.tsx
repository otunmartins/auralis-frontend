"use client";
import { CheckIcon, HelpCircleIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileUpload } from "@/components/fileUpload";
import { formatFileSize } from "@/lib/fileValidate";
import { UploadFile } from "@/components/fileUpload";

// Extended allowed types with variations
const ALLOWED_TYPES = [
  // Chemical file formats
  "fasta",
  "sdf",
  "pdb",
  "chemical/fasta",
  "chemical/sdf",
  "chemical/pdb",
  "text/fasta",
  "text/sdf",
  "text/pdb",
  "application/fasta",
  "application/sdf",
  "application/pdb",
];
const MAX_SIZE = 25; // MB

export const ChemicalFileUploadSection = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [uploadInProgress, setUploadInProgress] = useState(false);

  const simulateUpload = useCallback(async (fileId: string) => {
    const steps = 10;
    const interval = 500;

    for (let i = 0; i <= steps; i++) {
      await new Promise((resolve) => setTimeout(resolve, interval));

      setFiles((prev) =>
        prev.map((file) =>
          file.id === fileId
            ? { ...file, progress: Math.round((i / steps) * 100) }
            : file
        )
      );
    }

    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, status: "completed" } : file
      )
    );

    setUploadInProgress(false);
  }, []);

  const handleFileUpload = useCallback(
    (file: File) => {
      // Check if file with same name already exists and remove it first
      setFiles((prev) => prev.filter((f) => f.file.name !== file.name));

      const newFile: UploadFile = {
        id: Math.random().toString(36).substring(7),
        file,
        progress: 0,
        status: "uploading",
      };

      setFiles((prev) => [...prev, newFile]);
      setUploadInProgress(true);
      simulateUpload(newFile.id);
    },
    [simulateUpload]
  );

  const handleDelete = useCallback((fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  }, []);

  return (
    <Card className="flex flex-col w-full items-end gap-4 sm:gap-6 p-4 border border-solid bg-white border-[#eeeeee] rounded-xl">
      <CardContent className="flex flex-col items-start gap-[18px] w-full p-0">
        <div className="flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-4">
            <div className="text-grey-dark text-label-large font-strong">
              Datasets Upload
            </div>
          </div>

          <div className="inline-flex items-center justify-center gap-2.5 p-1 bg-neutralneutral-50 rounded-[300px]">
            <HelpCircleIcon className="w-4 h-4" />
          </div>
        </div>

        <div className="flex flex-col items-start w-full gap-3">
          <FileUpload
            allowedTypes={ALLOWED_TYPES}
            maxSize={MAX_SIZE}
            onFileUpload={handleFileUpload}
            uploadInProgress={uploadInProgress}
          />

          <div className="flex flex-col items-start justify-center w-full">
            <div className="w-full font-text-2-regular font-[number:var(--text-2-regular-font-weight)] text-[#6c7279] text-sm sm:text-[length:var(--text-2-regular-font-size)] tracking-[var(--text-2-regular-letter-spacing)] leading-[var(--text-2-regular-line-height)] [font-style:var(--text-2-regular-font-style)]">
              Supported formats: FASTA, SDF, PDB
            </div>
            <div className="font-text-2-regular font-[number:var(--text-2-regular-font-weight)] text-[#6c7279] text-sm sm:text-[length:var(--text-2-regular-font-size)] text-center tracking-[var(--text-2-regular-letter-spacing)] leading-[var(--text-2-regular-line-height)] [font-style:var(--text-2-regular-font-style)]">
              Maximum size: {MAX_SIZE}MB
            </div>
          </div>
        </div>
      </CardContent>

      <div className="flex flex-col items-start w-full gap-3">
        {files.map((file) => (
          <Card
            key={file.id}
            className="flex items-start gap-1 px-3 py-4 w-full border border-solid border-[#e9e9eb] rounded-xl"
          >
            <div className="flex items-start flex-1 gap-3">
              <div className="relative w-10 h-10">
                <div className="relative w-[38px] h-10 left-px">
                  <img
                    className="absolute w-8 h-10 top-0 left-1.5"
                    alt=""
                    src="/page.svg"
                  />
                  <div className="inline-flex items-start gap-2 px-[3px] py-0.5 absolute top-[18px] left-0 rounded-sm bg-[#069454]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-[10px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                      {file.file.name.split(".").pop()?.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start flex-1 gap-1">
                <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col items-start w-full">
                    <div className="w-full mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-[#414651] text-sm tracking-[0] leading-5">
                      {file.file.name}
                    </div>
                    <div className="w-full [font-family:'Inter',Helvetica] font-normal text-[#535861] text-sm tracking-[0] leading-5">
                      {formatFileSize(file.file.size)}
                    </div>
                  </div>
                  {file.status === "completed" && (
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="inline-flex items-center justify-center p-2 overflow-hidden rounded-md hover:bg-gray-100"
                    >
                      <Trash2Icon className="w-4 h-4 text-grey-lighter" />
                    </button>
                  )}
                </div>

                <div className="flex items-center w-full gap-3">
                  <div className="relative flex-1 h-2 bg-[#e9e9eb] rounded-full">
                    <Progress
                      value={file.progress}
                      className="h-2 rounded-full "
                    />
                  </div>
                  <div className="[font-family:'Inter',Helvetica] font-medium text-[#414651] text-sm tracking-[0] leading-5 whitespace-nowrap">
                    {file.progress}%
                  </div>
                </div>
              </div>
            </div>

            {/* {file.status === "completed" && (
              <button
                onClick={() => handleDelete(file.id)}
                className="inline-flex items-center justify-center p-2 overflow-hidden rounded-md hover:bg-gray-100"
              >
                <Trash2Icon className="w-4 h-4" />
              </button>
            )} */}
          </Card>
        ))}
      </div>
    </Card>
  );
};
