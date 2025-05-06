import React, { useCallback, useState, useRef } from "react";
import { validateFileSize, validateFileType } from "../lib/fileValidate";
import { UploadIcon } from "./icons";
// import { FileUploadProps } from "../types/file";
export interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

export interface FileUploadProps {
  allowedTypes: string[];
  maxSize: number;
  onFileUpload: (file: File) => void;
  uploadInProgress: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  allowedTypes,
  maxSize,
  onFileUpload,
  uploadInProgress,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter just the display types (remove MIME types and duplicates)
  const displayTypes = allowedTypes
    .filter((type) => !type.includes("/") && !type.includes("application"))
    .map((type) => type.toUpperCase())
    .filter((value, index, self) => self.indexOf(value) === index);

  // Format accept attribute for input
  const acceptAttribute = allowedTypes
    .map((type) => (type.includes("/") ? type : `.${type}`))
    .join(",");

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileValidation(files[0]);
    }
  }, []);

  const handleFileValidation = useCallback(
    (file: File) => {
      if (!validateFileType(file, allowedTypes)) {
        alert(`Invalid file type. Allowed types: ${displayTypes.join(", ")}`);
        return;
      }

      if (!validateFileSize(file, maxSize)) {
        alert(`File size exceeds ${maxSize}MB limit`);
        return;
      }

      onFileUpload(file);

      // Reset the file input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [allowedTypes, maxSize, onFileUpload, displayTypes]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileValidation(e.target.files[0]);
      }
    },
    [handleFileValidation]
  );

  return (
    <div
      className={`flex cursor-pointer flex-col h-[186px] items-center justify-center gap-2 px-4 sm:px-10 py-[21px] w-full rounded-xl border border-dashed ${
        dragActive ? "border-primary-600 bg-primary-50" : "border-primary-800"
      } ${uploadInProgress ? "opacity-50 pointer-events-none" : ""}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept={acceptAttribute}
        id="file-upload"
      />

      <div className="inline-flex flex-col h-[109px] items-center justify-between">
        <div className="inline-flex flex-col items-start gap-[13.68px]">
          <UploadIcon className=" w-[68px] h-[68px] top-[17px] left-[17px]" />
        </div>

        <div className="px-2 text-center">
          <span className="text-[#777b8b] leading-[var(--text-2-regular-line-height)] font-text-2-regular font-[number:var(--text-2-regular-font-weight)] tracking-[var(--text-2-regular-letter-spacing)] text-[length:var(--text-2-regular-font-size)]">
            Drag and drop or file here or{" "}
          </span>
          <label
            htmlFor="file-upload"
            className="font-medium text-[#005be6] leading-5 cursor-pointer hover:underline"
          >
            browse
          </label>
        </div>
      </div>
    </div>
  );
};
