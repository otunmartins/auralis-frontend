import DashboardPage from "@/containers/Dashboard";
import { Suspense } from "react";
export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
