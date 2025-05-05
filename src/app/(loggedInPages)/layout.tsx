import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5] p-[18px] max-sm:p-2">
      <Sidebar />
      <main className="flex-1 px-6 overflow-x-hidden max-sm:px-2 max-sm:pr-0">
        <div className="flex flex-col gap-4">
          <Header />
          {children}
        </div>
      </main>
    </div>
  );
}
