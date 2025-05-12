import FeedbackAndSupportPage from "@/containers/FeedbackAndSupport";
import { Suspense } from "react";
export default function SupportPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedbackAndSupportPage />
    </Suspense>
  );
}
