"use client";

import { LocateFixed } from "lucide-react";
import BgIcon from "./BgIcon";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { UsersRound } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { CircleMinus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function HotelSearchPanel({
  className,
  existedLocation,
  existedCheckInOutDate,
  existedGuests,
  showDestinationSearchInput,
  page,
  limit,
  setHotels
}) {
  const router = useRouter();
  const [location, setLocation] = useState(existedLocation || "");
  const [checkInOutDate, setCheckInOutDate] = useState(
    existedCheckInOutDate || {
      from: "",
      to: ""
    }
  );
  const [guests, setGuests] = useState(
    existedGuests || {
      adults: 0,
      children: 0,
      infants: 0
    }
  );
  // const [types, setTypes] = useState("");
  const pathname = usePathname();
  // URL Search Params
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set("location", location);
  urlSearchParams.set("checkInOutDate", JSON.stringify(checkInOutDate));
  urlSearchParams.set("guests", JSON.stringify(guests));

  // Handle search: update URL with search parameters
  const handleSearch = () => {
    const urlSearchParams = new URLSearchParams();
    if (location) urlSearchParams.set("location", location);
    if (checkInOutDate.from && checkInOutDate.to) {
      urlSearchParams.set("checkInOutDate", JSON.stringify(checkInOutDate));
    }
    if (guests.adults || guests.children || guests.infants) {
      urlSearchParams.set("guests", JSON.stringify(guests));
    }

    // Always navigate to /property/hotels with updated query parameters
    // Use replace instead of push to avoid adding duplicate history entries
    // router.replace(`/property/hotels?${urlSearchParams.toString()}`);
  };

  const handleGuest = (e, key, order) => {
    e.preventDefault();

    switch (key) {
      case "adults":
        if (order === "plus") {
          setGuests((prev) => ({
            ...prev,
            adults: prev.adults + 1
          }));
        } else if (order === "minus") {
          setGuests((prev) => ({
            ...prev,
            adults: prev.adults - 1
          }));
        }
        break;

      case "children":
        if (order === "plus") {
          setGuests((prev) => ({
            ...prev,
            children: prev.children + 1
          }));
        } else if (order === "minus") {
          setGuests((prev) => ({
            ...prev,
            children: prev.children - 1
          }));
        }
        break;

      default:
        if (order === "plus") {
          setGuests((prev) => ({
            ...prev,
            infants: prev.infants + 1
          }));
        } else if (order === "minus") {
          setGuests((prev) => ({
            ...prev,
            infants: prev.infants - 1
          }));
        }
        break;
    }
  };

  return (
    <div
      className={cn(
        "mx-auto w-full rounded-2xl border bg-white !p-4 shadow-[0px_4px_23.2px_0px_rgba(159,159,159,0.25)] 2xl:w-[75%]",
        className
      )}
    >
      <div className="flex-center-start gap-x-2">
        <BgIcon>
          <LocateFixed size={16} />
        </BgIcon>

        <p className="text-gray-500">Hotels in Algeria</p>
      </div>

      <Separator className="mb-5 mt-2 h-[0.5px] w-full bg-gray-300" />

      <section className="flex-center-between flex-col gap-4 lg:flex-row">
        {showDestinationSearchInput && (
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
        )}

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
                  !checkInOutDate && "text-muted-foreground"
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

        <div className="col-span-2 w-full">
          <Label className="mb-3 block font-semibold text-gray-500">
            Guests
          </Label>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex-center-start w-full gap-x-2 rounded-full bg-[#F6F6F6] px-3 py-2.5 text-black transition-all duration-300 ease-in-out focus-within:ring-1 focus-within:ring-p1">
              <BgIcon>
                <UsersRound size={16} />
              </BgIcon>

              <span
                className={cn(
                  "text-sm",
                  guests.adults === 0 &&
                    guests.children === 0 &&
                    guests.infants === 0 &&
                    "text-muted"
                )}
              >
                {guests.adults} Adults / {guests.children} Children /{" "}
                {guests.infants} Infants
              </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-full max-w-[400px] space-y-4 rounded-2xl border-p1/50 p-4 lg:w-[400px]">
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

        {/* Type */}
        {/* <div className="col-span-2 w-full">
          <Label className="mb-3 block font-semibold text-gray-500">Type</Label>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center justify-start gap-x-2 rounded-full bg-[#F6F6F6] px-3 py-2.5 text-black transition-all duration-300 ease-in-out focus-within:ring-1 focus-within:ring-p1">
              <BgIcon>
                <UsersRound size={16} />
              </BgIcon>

              <span
                className={cn(
                  "text-sm",
                  types ? "text-black" : "text-muted" // Show muted text when no selection
                )}
              >
                {types === "hotel"
                  ? "Hotel"
                  : types === "apartment"
                    ? "Apartment"
                    : "Select Type"}{" "}
              </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-full max-w-[400px] space-y-4 rounded-2xl border-p1/50 p-4 lg:w-[400px]">
              <DropdownMenuItem
                className="flex cursor-pointer items-center justify-between gap-x-8 hover:!bg-transparent"
                onClick={() => setTypes("hotel")}
              >
                <div className="w-max">
                  <h5 className="text-base font-semibold">Hotel</h5>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex cursor-pointer items-center justify-between gap-x-8 hover:!bg-transparent"
                onClick={() => setTypes("apartment")}
              >
                <div className="w-max">
                  <h5 className="text-base font-semibold">Apartment</h5>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}

        <button
          className="rounded-full bg-[#007dd0] !py-2 px-5 text-lg text-white lg:mt-6"
          asChild
          onClick={handleSearch}
        >
          Search
        </button>
      </section>
    </div>
  );
}
