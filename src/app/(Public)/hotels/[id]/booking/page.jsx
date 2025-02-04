import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import BookingForm from "./_components/BookingForm";
import BookedHotelDetails from "./_components/BookedHotelDetails";

export const metadata = {
  title: "Book Your Hotel",
  description:
    "Book Your Dream Stay in Algeria’s Top Destinations with DAYF Booking!",
};

export default function DynamicHotelBookingPage() {
  return (
    <ResponsiveContainer className="flex-start-between mb-20 mt-10 flex-col gap-y-10 lg:flex-row lg:gap-x-16 lg:gap-y-0">
      <BookingForm />
      <BookedHotelDetails />
    </ResponsiveContainer>
  );
}
