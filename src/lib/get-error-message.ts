import { toast } from "@/components/toast";

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    toast.error(error.message);
    return error.message;
  }
  if (error && typeof error === "object" && "message" in error) {
    toast.error(String(error.message));
    return String(error.message);
  }
  if (typeof error === "string") {
    toast.error(error);
    return error;
  }
  return "An error occurred";
}
