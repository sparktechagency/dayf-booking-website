"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import BookingHistoryTable from "./BookingHistoryTable";

const TABS = ["upcoming", "pending", "past"];

export default function BookingHistoryContainer() {
  const [activeTab, setActiveTab] = useState("upcoming"); //  ("past" | "upcoming" | "pending");
  const [searchTerm, setSearchTerm] = useState("");

  // Queries
  const query = {};

  if (searchTerm) {
    query.searchTerm = searchTerm;
  }

  const { data: bookingsRes, isLoading } = useGetAllBookingsQuery(query);
  const bookings = bookingsRes?.data?.data || [];

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          My Booking History
        </h1>

        <div className="flex-center-end gap-x-3 lg:w-1/2">
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
          bookings={
            activeTab === "upcoming"
              ? bookings?.filter(
                  (booking) =>
                    booking?.paymentStatus === "paid" &&
                    new Date(booking?.endDate) >= new Date()
                )
              : activeTab === "past"
                ? bookings?.filter(
                    (booking) =>
                      booking?.paymentStatus === "paid" &&
                      new Date(booking?.endDate) <= new Date()
                  )
                : activeTab === "pending"
                  ? bookings?.filter(
                      (booking) => booking?.paymentStatus === "pending"
                    )
                  : []
          }
        />
      )}
    </div>
  );
}
