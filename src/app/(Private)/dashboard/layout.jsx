import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import DashboardSidebar from "./_components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <ResponsiveContainer className="flex flex-col lg:flex-row items-center justify-between min-h-[75vh] lg:gap-x-10 xl:gap-x-20 gap-y-8 lg:gap-y-0 py-8 lg:py-0">
      <DashboardSidebar />

      <main className="flex-1 rounded-3xl border border-p1/30 px-4 md:px-8 py-6 shadow-sm w-full">
        {children}
      </main>
    </ResponsiveContainer>
  );
}
