import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import DashboardSidebar from "./_components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <ResponsiveContainer className="flex flex-col md:flex-row items-center justify-between min-h-[75vh] md:gap-x-10 lg:gap-x-20 gap-y-8 md:gap-y-0 py-8 md:py-0">
      <DashboardSidebar />

      <main className="flex-1 rounded-3xl border border-p1/30 px-8 py-6 shadow-sm w-full">
        {children}
      </main>
    </ResponsiveContainer>
  );
}
