import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import DashboardSidebar from "./_components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <ResponsiveContainer className="flex-center-between min-h-[75vh] gap-x-20">
      <DashboardSidebar />

      <main className="flex-1 rounded-3xl border border-p1/30 px-8 py-6 shadow-sm">
        {children}
      </main>
    </ResponsiveContainer>
  );
}
