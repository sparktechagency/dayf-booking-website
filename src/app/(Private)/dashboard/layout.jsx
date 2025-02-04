import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import DashboardSidebar from "./_components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <ResponsiveContainer className="flex-center-between min-h-[75vh] gap-x-20">
      <DashboardSidebar />

      <main className="flex-1">{children}</main>
    </ResponsiveContainer>
  );
}
