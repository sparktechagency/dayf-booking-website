import HotelSearchPanel from "@/components/HotelSearchPanel/HotelSearchPanel";
import HotelFilter from "./_components/HotelFilters";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";

export const metadata = {
  title: "Find Hotels in Algeria : Book Your Dream Hotel Now!",
  description:
    "Discover the finest hotels and accommodations in Algeria with DAYF Booking. Explore handpicked stays in top destinations, from vibrant cities to serene coastal retreats and breathtaking desert escapes. Book your perfect getaway today!",
};

export default function Hotels() {
  return (
    <div className="my-10">
      <HotelSearchPanel />

      <ResponsiveContainer className="flex-center-between mt-16">
        <div className="border-red w-1/4">
          <HotelFilter />
        </div>

        <div className="flex-grow border">
          <h1 className="text-h3 font-semibold">Hotels</h1>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
