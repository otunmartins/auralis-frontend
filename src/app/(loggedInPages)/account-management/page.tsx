import AccountManagementPage from "@/containers/AccountManagement";
import { Suspense } from "react";
export default function AccountManagement() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountManagementPage />
    </Suspense>
  );
}
