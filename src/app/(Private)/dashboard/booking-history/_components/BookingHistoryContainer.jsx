"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  useCompleteBookingMutation,
  useGetAllBookingsQuery
} from "@/redux/api/bookingApi";
import BookingHistoryTable from "./BookingHistoryTable";
import { useCheckoutMutation } from "@/redux/api/paymentApi";
import { useRouter } from "next/navigation";
import { ErrorModal, SuccessModal } from "@/utils/customModal";
import { toast } from "react-toastify";

const TABS = ["upcoming", "pending", "past"];

export default function BookingHistoryContainer() {
  const [activeTab, setActiveTab] = useState("upcoming"); //  ("past" | "upcoming" | "pending");
  const [searchTerm, setSearchTerm] = useState("");

  const [checkout, { isLoading: checkoutLoading }] = useCheckoutMutation();
  const [
    completeBooking,
    {
      isError: isCompleteBookingError,
      error: completeBookingError,
      isLoading: completeBookingLoading
    }
  ] = useCompleteBookingMutation();
  const router = useRouter();

  // Queries
  const query = {};

  if (searchTerm) {
    query.searchTerm = searchTerm;
  }
  let status = "confirmed";
  switch (activeTab) {
    case "upcoming":
      status = "confirmed";
      break;
    case "pending":
      status = "pending";
      break;
    case "past":
      status = "completed";
      break;
    default:
      status = "confirmed";
  }
  if (status) {
    query.status = status;
  }

  const {
    data: bookingsRes,
    isLoading,
    refetch
  } = useGetAllBookingsQuery(query);
  const bookings = bookingsRes?.data?.data || [];

  const handleRepay = async (bookingId) => {
    console.log("Repay booking with ID:", bookingId);
    if (!bookingId) {
      console.error("Booking ID is required for repayment.");
      return;
    }

    // proceed to checkout/payment
    const checkoutPayload = {
      bookings: bookingId,
      redirectType: "website"
    };

    const checkoutResponse = await checkout(checkoutPayload).unwrap();

    if (checkoutResponse?.success) {
      router.push(checkoutResponse?.data);
    }
  };

  const handleCompleteBooking = async (bookingId) => {
    console.log("Complete booking with ID:", bookingId);

    if (!bookingId) {
      console.error("Booking ID is required to complete the booking.");
      return;
    }
    try {
      const response = await completeBooking(bookingId).unwrap();
      if (response?.success) {
        console.log("Booking Complete response", response);
        toast.success("Booking completed successfully!");
        refetch();
        router.refresh();
      }
    } catch (error) {
      console.error("Error completing booking:", error);
      // Handle error appropriately, e.g., show a notification
      <ErrorModal text={error?.data?.message} />;
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 md:p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          My Booking History
        </h1>

        <div className="md:flex-center-end flex-col space-y-3 md:flex-row md:gap-x-3 md:space-y-0 lg:w-1/2">
          <div className="inline-flex items-center rounded-full border bg-background p-1">
            {TABS.map((tab) => (
              <Button
                key={tab}
                size="sm"
                variant={activeTab === tab ? "primary" : "ghost"}
                className="rounded-full capitalize"
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>

          <div className="relative h-11 w-full">
            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search Booking ID"
              className="h-full w-full pl-10"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Booking History Table */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <BookingHistoryTable
          bookings={bookings}
          handleRepay={handleRepay}
          checkoutLoading={checkoutLoading}
          completeBookingLoading={completeBookingLoading}
          handleCompleteBooking={handleCompleteBooking}
          activeTab={activeTab}
          refetch={refetch}
        />
      )}
    </div>
  );
}
