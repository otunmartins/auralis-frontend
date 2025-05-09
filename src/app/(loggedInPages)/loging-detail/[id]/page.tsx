import LogingDetailPage from "@/containers/LogingSystem/LogingDetail";
import { Suspense } from "react";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LogingDetail({ params }: PageProps) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LogingDetailPage id={id} />
    </Suspense>
  );
}
