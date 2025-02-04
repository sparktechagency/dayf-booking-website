import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import BookingInfoTable from "./_components/BookingInfoTable";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Booking Success",
  description: "Booking Success page",
};
export default function BookingSuccessPage() {
  return (
    <ResponsiveContainer className="flex min-h-[60vh] flex-col items-center justify-center">
      <h2 className="text-center font-quicksand text-h3 font-semibold">
        Success! Your Stay is Reserved
      </h2>

      <p className="mb-8 mt-2 text-balance text-center text-h6 text-gray-600">
        Your reservation has been successfully confirmed. We’ve sent the details
        to your email address for your convenience.
      </p>

      <BookingInfoTable />

      <Link
        href="/"
        className="flex-center mt-10 gap-x-3 text-gray-600 hover:text-p1"
      >
        <ArrowLeft size={18} />
        Return to Home
      </Link>
    </ResponsiveContainer>
  );
}
