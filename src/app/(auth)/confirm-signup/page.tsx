import Loader from "@/components/loader";
import ConfirmSignUpPage from "@/containers/ConfirmSignup";
import { Suspense } from "react";

export default function ConfirmSignUp() {
  return (
    <Suspense fallback={<Loader fixed={true} />}>
      <ConfirmSignUpPage />
    </Suspense>
  );
}
