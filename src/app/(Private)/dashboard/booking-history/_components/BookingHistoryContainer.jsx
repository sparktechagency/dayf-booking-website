"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import UpcomingBookingTable from "./UpcomingBookingTable";
import PastBookingTable from "./PastBookingTable";

const bookings = [
  {
    id: "#12345XYZ",
    hotelName: "Grand Plaza Hotel, Algiers",
    bookingDate: "January 15-17, 2024",
  },
  {
    id: "#12345XYZ",
    hotelName: "Grand Plaza Hotel, Algiers",
    bookingDate: "January 15-17, 2024",
  },
  {
    id: "#12345XYZ",
    hotelName: "Grand Plaza Hotel, Algiers",
    bookingDate: "January 15-17, 2024",
  },
];

export default function BookingHistoryContainer() {
  const [activeTab, setActiveTab] = useState("upcoming"); //  ("past" | "upcoming");

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          My Booking History
        </h1>

        <div className="flex-center-start gap-x-3 lg:w-1/2">
          <div className="inline-flex items-center rounded-full border bg-background p-1">
            <Button
              size="sm"
              variant={activeTab === "upcoming" ? "primary" : "ghost"}
              className="rounded-full"
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </Button>

            <Button
              size="sm"
              variant={activeTab === "past" ? "primary" : "ghost"}
              className="rounded-full"
              onClick={() => setActiveTab("past")}
            >
              Past
            </Button>
          </div>

          <div className="relative h-11 w-full">
            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Search" className="h-full w-full pl-10" />
          </div>
        </div>
      </div>

      {/* Booking History Table */}
      {activeTab === "upcoming" ? (
        <UpcomingBookingTable bookings={bookings} />
      ) : (
        <PastBookingTable bookings={bookings} />
      )}
    </div>
  );
}
