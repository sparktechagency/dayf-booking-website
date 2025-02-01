"use client";

import { LocateFixed } from "lucide-react";
import ResponsiveContainer from "../ResponsiveContainer/ResponsiveContainer";
import BgIcon from "./BgIcon";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { UserRound } from "lucide-react";

export default function HotelSearchPanel({ className }) {
  const [location, setLocation] = useState("");
  const [checkInOutDate, setCheckInOutDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [guests, setGuests] = useState();

  return (
    <div
      className={cn(
        "mx-auto w-full rounded-2xl border bg-white !p-4 shadow-[0px_4px_23.2px_0px_rgba(159,159,159,0.25)] 2xl:w-[75%]",
        className,
      )}
      // style={{ boxShadow: "0px 4px 23.2px 0px rgba(159, 159, 159, 0.25)" }}
    >
      <div className="flex-center-start gap-x-2">
        <BgIcon>
          <LocateFixed size={16} />
        </BgIcon>

        <p className="text-gray-500">Hotels in Algeria</p>
      </div>

      <Separator className="mb-5 mt-2 h-[0.5px] w-full bg-gray-300" />

      <section className="flex-center-between gap-x-4">
        <div className="w-full">
          <Label className="mb-3 block font-semibold text-gray-500">
            Destination
          </Label>

          <div className="flex-center-start gap-x-3 rounded-full bg-[#F6F6F6] px-3 py-1 text-black transition-all duration-300 ease-in-out focus-within:ring-1 focus-within:ring-p1">
            <BgIcon>
              <MapPin size={16} />
            </BgIcon>

            <Input
              placeholder="Martyr's Memorial, Algeria"
              className="border-none px-0 shadow-none outline-none focus-visible:ring-0"
              defaultValue={location}
              onBlur={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full">
          <Label className="mb-3 block font-semibold text-gray-500">
            Check In/Out
          </Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "inline-flex w-full justify-start rounded-full border-none bg-[#F6F6F6] !px-3 !py-6 text-left font-normal shadow-none",
                  !checkInOutDate && "text-muted-foreground",
                )}
              >
                <BgIcon>
                  <CalendarIcon size={16} />
                </BgIcon>

                {checkInOutDate?.from ? (
                  checkInOutDate.to ? (
                    <>
                      {format(checkInOutDate.from, "LLL dd, y")} -{" "}
                      {format(checkInOutDate.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(checkInOutDate.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={checkInOutDate?.from}
                selected={checkInOutDate}
                onSelect={setCheckInOutDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-full">
          <Label className="mb-3 block font-semibold text-gray-500">
            Guests
          </Label>

          <div className="flex-center-start gap-x-3 rounded-full bg-[#F6F6F6] px-3 py-1 text-black transition-all duration-300 ease-in-out focus-within:ring-1 focus-within:ring-p1">
            <BgIcon>
              <UserRound size={16} />
            </BgIcon>

            <Input
              placeholder="Number of guests"
              className="border-none px-0 shadow-none outline-none focus-visible:ring-0"
              type="number"
              defaultValue={guests}
              onBlur={(e) => setGuests(e.target.value)}
            />
          </div>
        </div>

        <Button variant="primary" size="lg" className="mt-6 rounded-full !py-4">
          Search
        </Button>
      </section>
    </div>
  );
}
