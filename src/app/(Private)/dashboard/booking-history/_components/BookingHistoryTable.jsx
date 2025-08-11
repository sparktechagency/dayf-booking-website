import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EmptyContainer from "../../../../../components/EmptyContainer/EmptyContainer";
import ModalWrapper from "@/components/ModalWrapper.js/ModalWrapper";
import ReviewForm from "../details/[id]/_components/ReviewForm";

const TABLE_HEADERS = [
  "Name",
  "Type",
  "Booking Date",
  "Booking Id",
  "Payment Status",
  "Booking Status",
  "Action"
];

export default function BookingHistoryTable({
  bookings,
  handleRepay,
  checkoutLoading,
  completeBookingLoading,
  handleCompleteBooking,
  handleCancelBooking,
  cancelBookingLoading,
  activeTab,
  refetch
}) {
  const [reviewModalOpen, setReviewModalOpen] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const [currentId, setCurrentId] = useState('');

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-p1 hover:bg-p1">
            {TABLE_HEADERS.map((header) => (
              <TableHead
                key={header}
                className="text-primary-black whitespace-nowrap !px-5 text-base font-semibold text-white [&:first-child]:rounded-tl-md [&:last-child]:rounded-tr-md"
                style={{ padding: "14px" }}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* ======== For displaying loader ======== */}
          {/* <TableLoaderWithEmpty isLoading={isLoading} data={pendingQuotes} /> */}

          {/* =========== Booking ============ */}
          {bookings && bookings?.length > 0 ? (
            bookings?.map((booking, index) => (
              <TableRow
                key={index}
                className="border-primary-black/15 border-b mixin/table-cell:w-max mixin/table-cell:whitespace-nowrap mixin/table-cell:px-5 mixin/table-cell:py-4 mixin/table-cell:font-medium"
              >
                <TableCell className="mixin/table-cell">
                  {booking?.modelType === "Apartment"
                    ? booking?.reference?.name
                    : booking?.reference?.category}
                </TableCell>

                <TableCell className="mixin/table-cell">
                  {booking.modelType}
                </TableCell>

                <TableCell className="mixin/table-cell">
                  {booking.bookingDate ||
                    `${format(booking?.startDate, "dd-MM-yyyy")}/${format(booking?.endDate, "dd-MM-yyyy")}`}
                </TableCell>

                <TableCell className="mixin/table-cell">{booking.id}</TableCell>

                <TableCell
                  className={cn(
                    "mixin/table-cell capitalize",
                    booking.paymentStatus === "pending"
                      ? "text-red-500"
                      : "text-green-500"
                  )}
                >
                  {booking.paymentStatus}
                </TableCell>
                <TableCell
                  className={cn(
                    "mixin/table-cell capitalize",
                    booking.status === "confirmed"
                      ? "text-green-500"
                      : booking?.status === "completed"
                        ? "text-blue-500"
                        : "text-red-500"
                  )}
                >
                  {booking.status}
                </TableCell>

                <TableCell className="mixin/table-cell space-x-2 text-right">
                  {booking?.status === "pending" ? (
                    <>
                      <Button
                        onClick={() => {handleRepay(booking?._id); setCurrentId(booking?._id);}}
                        variant="solid"
                        size="sm"
                        disabled={currentId === booking?._id && checkoutLoading}
                        loading={currentId === booking?._id && checkoutLoading}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        Repay
                      </Button>
                    </>
                  ) : booking?.status === "confirmed" ? (
                    <>
                      <Link
                        href={`/dashboard/booking-history/details/${booking?._id}`}
                      >
                        <Button size="sm" variant="primary">
                          View Details
                        </Button>
                      </Link>

                      {/* Complete */}
                      <Button
                        onClick={() => {handleCompleteBooking(booking?._id); setCurrentId(booking?._id);}}
                        variant="solid"
                        size="sm"
                        disabled={currentId === booking?._id && completeBookingLoading}
                        loading={currentId === booking?._id && completeBookingLoading}
                        className="bg-green-600 text-white hover:bg-green-700"
                        >
                        Complete
                      </Button>

                      <Button
                        onClick={() => {handleCancelBooking(booking?._id); setCurrentId(booking?._id);}}
                        variant="destructive"
                        disabled={currentId === booking?._id && cancelBookingLoading}
                        loading={currentId === booking?._id && cancelBookingLoading}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`/dashboard/booking-history/details/${booking?._id}`}
                      >
                        <Button size="sm" variant="primary">
                          View Details
                        </Button>
                      </Link>
                      {/* Review */}
                      <Button
                        onClick={() => {
                          setReviewModalOpen(true);
                          setSelectedBooking(booking);
                        }}
                        variant="solid"
                        size="sm"
                        disabled={booking?.isReviewed}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        Review
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                <EmptyContainer
                  message={`No ${activeTab} bookings found`}
                  className="mb-2 mt-0"
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Display Modals */}
      <ModalWrapper
        title="Write a Review"
        open={reviewModalOpen}
        setOpen={setReviewModalOpen}
      >
        <div className="p-4">
          {/* Review Form goes here */}
          <ReviewForm
            booking={selectedBooking}
            setOpenReviewModal={setReviewModalOpen}
            refetchBooking={refetch}
          />
        </div>
      </ModalWrapper>
    </div>
  );
}
