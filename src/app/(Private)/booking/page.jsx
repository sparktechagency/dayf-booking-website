import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import DynamicBookedPropertyDetails from "./_components/DynamicBookedPropertyDetails";

export default function BookingPage() {
  return (
    <ResponsiveContainer className="mb-32 mt-10">
      <DynamicBookedPropertyDetails />
    </ResponsiveContainer>
  );
}
