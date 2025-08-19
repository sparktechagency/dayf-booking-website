"use client";

import React from "react";
import { useState } from "react";
import { DynamicApartmentSectionTitle } from "./DynamicPropertyDetails";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import BgIcon from "@/components/PropertySearchPanel/BgIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/features/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UsersRound } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { CircleMinus } from "lucide-react";
import { useEffect } from "react";
import CustomFormError from "@/components/CustomFormError/CustomFormError";
import { getBackendBaseUrl } from "@/config/envConfig";

export default function DyanamicApartmentAvailabilitySection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id: apartmentId } = useParams();
  const isUserLoggedIn = useSelector(selectToken);
  const [formError, setFormError] = useState("");
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  const existedCheckInOutDate = JSON.parse(searchParams?.get("checkInOutDate"));
  const existedGuests = JSON.parse(searchParams?.get("guests"));

  const [checkInOutDate, setCheckInOutDate] = useState({
    from: "",
    to: ""
  });
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0 });

  useEffect(() => {
    if (existedCheckInOutDate) {
      setCheckInOutDate(existedCheckInOutDate);
    }
    if (existedGuests) {
      setGuests(existedGuests);
    }
  }, []);

  // Handle guest updates
  const handleGuest = (e, key, order) => {
    e.preventDefault();
    setGuests((prev) => {
      const newGuests = { ...prev };
      if (order === "plus") {
        newGuests[key] = prev[key] + 1;
      } else if (order === "minus" && prev[key] > 0) {
        newGuests[key] = prev[key] - 1;
      }
      return newGuests;
    });
  };

  // Handle reserve
  const handleReserve = async () => {
    if (!isUserLoggedIn) {
      router.push(
        `/login?from-href=${typeof window !== undefined ? window.location.href : ""}`
      );
      return;
    }

    // First check availability for the choosen dates
    // then redirect to bookning page
    try {
      // check if check in date is less than today
      if (checkInOutDate.from < new Date()) {
        return setFormError("Check in date can't be in the past.");
      }

      setIsCheckingAvailability(true);

      // Get apartments by check in/out date to check availabilty
      const res = await fetch(
        getBackendBaseUrl() +
          `/apartments?startDate=${checkInOutDate.from}&endDate=${checkInOutDate.to}&_id=${apartmentId}`,
        {
          method: "GET"
        }
      );

      const data = await res.json();

      if (data?.data?.data?.length > 0) {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set("checkInOutDate", JSON.stringify(checkInOutDate));
        urlSearchParams.set("guests", JSON.stringify(guests));

        router.push(
          `/booking?apartmentId=${apartmentId}&${urlSearchParams.toString()}`
        );
      } else {
        return setFormError("Aparment is not available during selected dates.");
      }
    } catch (error) {
      return setFormError(
        error?.message || error?.data?.message || "Something went wrong"
      );
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  return (
    <div>
      <DynamicApartmentSectionTitle>
        {!existedCheckInOutDate ? "Check Availability" : "Make Reservation"}
      </DynamicApartmentSectionTitle>

      <div className="mt-5 flex items-end gap-x-4 rounded-2xl border border-p1/50 bg-white p-4">
        <div className="w-1/4">
          <Label className="mb-3 block font-semibold text-gray-500">
            Select Check In/Out Date
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
                  checkInOutDate?.to ? (
                    <>
                      {format(checkInOutDate?.from, "LLL dd, y")} -{" "}
                      {format(checkInOutDate?.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(checkInOutDate?.from, "LLL dd, y")
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

        <div className="w-1/4">
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
          className="h-12 rounded-full px-10"
          disabled={
            !checkInOutDate.from || !checkInOutDate.to || isCheckingAvailability
          }
          onClick={handleReserve}
        >
          Reserve
        </Button>
      </div>

      {formError && <CustomFormError formError={formError} className="mt-4" />}
    </div>
  );
}
