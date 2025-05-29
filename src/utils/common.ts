import { useSearchParams } from "next/navigation";

const getEmailFromQueryParams = (paramKey: string): string | null => {
  const searchParams = useSearchParams();

  if (!searchParams) return null;

  const value = searchParams.get(paramKey);

  if (!value) return null;

  // Decode the value and replace the spaces with '+' if present
  const decodedValue = decodeURIComponent(value);

  // Replace spaces (' ') with the '+' sign
  return decodedValue.replace(/\s/g, "+");
};

const convertToFormattedCase = (value: string): string => {
  // Handle empty/null cases
  if (!value) return "";

  // First detect the case type
  const isSnakeCase = value.includes("_");
  const isKebabCase = value.includes("-");
  const isCamelCase =
    /[A-Z]/.test(value) && !value.includes("_") && !value.includes("-");
  const isCapitalizedKebab =
    isKebabCase &&
    value.split("-").some((word) => word[0]?.toUpperCase() === word[0]);

  // Split into words based on detected case
  let words: string[];
  if (isSnakeCase) {
    words = value.split("_");
  } else if (isKebabCase || isCapitalizedKebab) {
    words = value.split("-");
  } else if (isCamelCase) {
    words = value
      .replace(/([A-Z])/g, " $1")
      .trim()
      .split(" ");
  } else {
    words = [value]; // Single word
  }

  // Clean and capitalize each word
  words = words
    .filter((word) => word) // Remove empty strings
    .map((word) => {
      word = word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

  // Join with spaces for final formatted string
  return words.join(" ");
};

enum DB_STATUS {
  PENDING = "pending",
  PARTIALLY_RESOLVED = "partially_resolved",
  RESOLVED = "resolved",
}

export { getEmailFromQueryParams, convertToFormattedCase, DB_STATUS };
