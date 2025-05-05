export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  // Get the file extension
  const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";

  // Check if the file type is in the allowed types list (either by extension or MIME type)
  return (
    allowedTypes.includes(fileExtension) ||
    allowedTypes.includes(file.type) ||
    // Check for MIME type partial matches (e.g., "application/json" matches "json")
    allowedTypes.some((type) => file.type.includes(type))
  );
}

export function validateFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize * 1024 * 1024; // Convert MB to bytes
}
