import Loader from "@/components/loader";
import ResetPasswordPage from "@/containers/ResetPassword";
import { Suspense } from "react";

export default function ResetPassword() {
  return (
    <Suspense fallback={<Loader fixed={true} />}>
      <ResetPasswordPage />
    </Suspense>
  );
}
