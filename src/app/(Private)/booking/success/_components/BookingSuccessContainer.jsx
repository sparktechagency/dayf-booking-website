"use client";

import CustomLoader from "@/components/CustomLoader/CustomLoader";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSingleBookingQuery } from "@/redux/api/bookingApi";
import { selectCurrency } from "@/redux/features/currencySlice";
import { convertCurrency } from "@/utils/convertCurrency";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function BookingSuccessContainer() {
  const router = useRouter();
  const bookingId = useSearchParams()?.get("bookingId");
  const currency = useSelector(selectCurrency);
  const [price, setPrice] = useState(null);

  // Get booking details
  const { data: booking, isLoading: bookingLoading } = useGetSingleBookingQuery(
    bookingId,
    {
      skip: !bookingId
    }
  );

  // console.log({ booking });
  // Format Price
  useEffect(() => {
    if (booking?.totalPrice) {
      convertCurrency(booking.totalPrice, currency).then(setPrice);
    }
  }, [booking?.totalPrice, currency]);

  if (bookingLoading) {
    return <CustomLoader className={"h-screen w-screen"} />;
  }

  return (
    <ResponsiveContainer className="mt-10 flex items-center justify-center p-4">
      <div className="w-full space-y-8">
        {/* Success Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-green-600">Success!</span> Your Stay is
            Reserved
          </h1>
          <p className="mx-auto max-w-md text-gray-600">
            Your reservation has been successfully confirmed. We've sent the
            details to your email address for your convenience.
          </p>
        </div>

        {/* Reservation Details Card */}
        <Card className="bg-white shadow-sm">
          <CardContent className="space-y-6 p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Who's checking in?
            </h2>

            <div className="grid grid-cols-2 gap-8 text-base md:grid-cols-6">
              <div className="space-y-1">
                <p className="font-medium text-gray-500">Name/Phone</p>
                <p className="font-semibold text-gray-900">
                  {booking?.additionalInfo?.name}
                  <br />
                  {booking?.additionalInfo?.phoneNumber}
                </p>
              </div>

              {booking?.reference && (
                <div className="space-y-1">
                  {booking?.modelType === "Apartment" ? (
                    <>
                      <p className="font-medium text-gray-500">
                        Apartment Name
                      </p>
                      <p className="font-semibold text-gray-900">
                        {booking?.reference?.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-gray-500">Hotel Name</p>
                      <p className="font-semibold text-gray-900">
                        {booking?.reference?.category}
                      </p>
                    </>
                  )}
                </div>
              )}

              <div className="space-y-1">
                <p className="font-medium text-gray-500">Check-In</p>
                <p className="font-semibold text-gray-900">
                  {booking?.startDate &&
                    format(booking?.startDate, "MMM dd, yyyy")}
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-medium text-gray-500">Check-Out</p>
                <p className="font-semibold text-gray-900">
                  {booking?.endDate && format(booking?.endDate, "MMM dd, yyyy")}
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-medium text-gray-500">Total</p>
                <p className="font-semibold text-gray-900">
                  {price !== null ? `${price} ${currency}` : `0 ${currency}`}{" "}
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-medium text-gray-500">Status</p>
                <p className="font-semibold capitalize text-green-600">
                  {booking?.status == "confirmed" ||
                  booking?.status == "completed"
                    ? "Confirmed"
                    : booking?.status}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Return to Home Button */}
        <div className="flex items-center justify-between gap-x-10">
          <Button
            variant="link"
            className="flex items-center gap-2 bg-transparent px-6 py-2"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </Button>

          <Button
            variant="link"
            className="flex items-center gap-2 bg-transparent px-6 py-2"
            onClick={() => router.push("/dashboard/booking-history")}
          >
            Booking History
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
