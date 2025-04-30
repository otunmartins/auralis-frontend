import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#F5F5F5] p-[18px]">
      <Sidebar />
      <main className="flex-1 px-6 overflow-auto">
        <div className="flex flex-col gap-4">
          <Header />
          {children}
        </div>
      </main>
    </div>
  );
}
