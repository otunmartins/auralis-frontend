import Loader from "@/components/loader";
import LoginPage from "@/containers/Login";
import { Suspense } from "react";

export default function Login() {
  return (
    <Suspense fallback={<Loader fixed={true} />}>
      <LoginPage />
    </Suspense>
  );
}
