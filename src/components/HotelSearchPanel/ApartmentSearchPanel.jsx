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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { UsersRound } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { CircleMinus } from "lucide-react";
import Link from "next/link";

export default function ApartmentSearchPanel({ className }) {
  const [location, setLocation] = useState("");
  const [checkInOutDate, setCheckInOutDate] = useState({
    from: "",
    to: "",
  });
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  const handleGuest = (e, key, order) => {
    e.preventDefault();

    switch (key) {
      case "adults":
        if (order === "plus") {
          setGuests((prev) => ({
            ...prev,
            adults: prev.adults + 1,
          }));
        } else if (order === "minus") {
          setGuests((prev) => ({
            ...prev,
            adults: prev.adults - 1,
          }));
        }
        break;

      case "children":
        if (order === "plus") {
          setGuests((prev) => ({
            ...prev,
            children: prev.children + 1,
          }));
        } else if (order === "minus") {
          setGuests((prev) => ({
            ...prev,
            children: prev.children - 1,
          }));
        }
        break;

      default:
        if (order === "plus") {
          setGuests((prev) => ({
            ...prev,
            infants: prev.infants + 1,
          }));
        } else if (order === "minus") {
          setGuests((prev) => ({
            ...prev,
            infants: prev.infants - 1,
          }));
        }
        break;
    }
  };

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

        <p className="text-gray-500">Apartments in Algeria</p>
      </div>

      <Separator className="mb-5 mt-2 h-[0.5px] w-full bg-gray-300" />

      <section className="flex-center-between gap-x-4">
        <div className="w-full">
          <Label className="mb-3 block font-semibold text-gray-500">
            Destination
          </Label>

          <div className="flex-center-start gap-x-2 rounded-full bg-[#F6F6F6] px-3 py-1 text-black transition-all duration-300 ease-in-out focus-within:ring-1 focus-within:ring-p1">
            <BgIcon>
              <MapPin size={16} />
            </BgIcon>

            <Input
              placeholder="Martyr's Memorial, Algeria"
              className="!border-none px-0 text-sm text-gray-800 shadow-none !outline-none !ring-0 !ring-offset-0 focus-visible:!ring-0"
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
                  <span className="text-muted">Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="center">
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

          <DropdownMenu>
            <DropdownMenuTrigger className="flex-center-start w-full gap-x-2 rounded-full bg-[#F6F6F6] px-3 py-2.5 text-black transition-all duration-300 ease-in-out focus-within:ring-1 focus-within:ring-p1">
              <BgIcon>
                <UsersRound size={16} />
              </BgIcon>

              <span
                className={cn("text-sm", guests.adults === 0 && "text-muted")}
              >
                {guests.adults} Adults / {guests.children} Children /{" "}
                {guests.infants} Infants
              </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[400px] max-w-[400px] space-y-4 rounded-2xl border-p1/50 p-4">
              <DropdownMenuItem
                className="flex-stretch-between gap-x-8 hover:!bg-transparent"
                onClick={(e) => e.preventDefault()}
              >
                <div className="w-max">
                  <h5 className="text-base font-semibold">Adults</h5>
                  <p className="text-sm text-gray-600">(Above the age of 10)</p>
                </div>

                <div className="flex-center max-w-[110px] flex-1 rounded-lg border border-p1/65">
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={guests.adults === 0}
                    onClick={(e) => handleGuest(e, "adults", "minus")}
                  >
                    <CircleMinus size={18} />
                  </Button>

                  <span className="flex-1 text-center">{guests.adults}</span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleGuest(e, "adults", "plus")}
                  >
                    <CirclePlus size={18} />
                  </Button>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex-stretch-between gap-x-8 hover:!bg-transparent"
                onClick={(e) => e.preventDefault()}
              >
                <div className="w-max">
                  <h5 className="text-base font-semibold">Children</h5>
                  <p className="text-sm text-gray-600">(Age between 2-10)</p>
                </div>

                <div className="flex-center max-w-[110px] flex-1 rounded-lg border border-p1/65">
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={guests.children === 0}
                    onClick={(e) => handleGuest(e, "children", "minus")}
                  >
                    <CircleMinus size={18} />
                  </Button>

                  <span className="flex-1 text-center">{guests.children}</span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleGuest(e, "children", "plus")}
                  >
                    <CirclePlus size={18} />
                  </Button>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex-stretch-between gap-x-8 hover:!bg-transparent"
                onClick={(e) => e.preventDefault()}
              >
                <div className="w-max">
                  <h5 className="text-base font-semibold">Infants</h5>
                  <p className="text-sm text-gray-600">(Age between 0-2)</p>
                </div>

                <div className="flex-center max-w-[110px] flex-1 rounded-lg border border-p1/65">
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={guests.infants === 0}
                    onClick={(e) => handleGuest(e, "infants", "minus")}
                  >
                    <CircleMinus size={18} />
                  </Button>

                  <span className="flex-1 text-center">{guests.infants}</span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleGuest(e, "infants", "plus")}
                  >
                    <CirclePlus size={18} />
                  </Button>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="mt-6 rounded-full !py-4"
          asChild
        >
          <Link href="/property/apartments">Search</Link>
        </Button>
      </section>
    </div>
  );
}
