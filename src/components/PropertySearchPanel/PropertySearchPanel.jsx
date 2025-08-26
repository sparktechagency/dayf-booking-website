"use client";

import {
  LocateFixed,
  MapPin,
  CalendarIcon,
  UsersRound,
  CirclePlus,
  CircleMinus
} from "lucide-react";
import BgIcon from "./BgIcon";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { useRouter, usePathname } from "next/navigation";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { useState, useEffect, useRef } from "react";
import { RotateCcw } from "lucide-react";
import { Building } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { getGoogleMapAPIKey } from "@/config/envConfig";
import { useLoadScript } from "@react-google-maps/api";

export default function PropertySearchPanel({
  className,
  searchedLocation,
  searchedCheckInOutDate,
  searchedGuests,
  page = "home", // home | property-details
  onSearch,
  setShowSearchResults
}) {
  const router = useRouter();
  const currentPathname = usePathname();
  const autocompleteService = useRef(null);
  const inputRef = useRef(null);

  // Load google map places library
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: getGoogleMapAPIKey(),
    libraries: ["places"]
  });

  // Separate search params for lat, lng, and locationName
  const [latitude, setLatitude] = useSearchParamsState(
    "latitude",
    "",
    (val) => val,
    (val) => val
  );
  const [longitude, setLongitude] = useSearchParamsState(
    "longitude",
    "",
    (val) => val,
    (val) => val
  );
  const [searchLocationName, setSearchLocationName] = useSearchParamsState(
    "locationName",
    searchedLocation || "",
    (val) => val,
    (val) => val
  );

  const [location, setLocation] = useState(searchedLocation || "");
  const [checkInOutDate, setCheckInOutDate] = useState(
    searchedCheckInOutDate || { from: "", to: "" }
  );
  const [guests, setGuests] = useState(
    searchedGuests || { adults: 0, children: 0, infants: 0 }
  );
  // const [propertyType, setPropertyType] = useState("hotel");
  const [propertyType, setPropertyType] = useState("apartment");

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, []);

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

  // Handle navigation
  const handleNavigate = () => {
    const urlSearchParams = new URLSearchParams();
    if (page !== "property-details") {
      urlSearchParams.set("locationName", searchLocationName);
      urlSearchParams.set("latitude", latitude);
      urlSearchParams.set("longitude", longitude);
      urlSearchParams.set("propertyType", JSON.stringify(propertyType));
    }

    urlSearchParams.set("checkInOutDate", JSON.stringify(checkInOutDate));
    urlSearchParams.set("guests", JSON.stringify(guests));

    if (page !== "property-details" && page !== "home") {
      router.replace(
        `/property/${propertyType === "hotel" ? "hotels" : "apartments"}?${urlSearchParams.toString()}`
      );
    } else if (page === "home") {
      // Add the search params to the current path
      router.replace(currentPathname + `?${urlSearchParams.toString()}`, {
        scroll: false
      });

      onSearch?.();
    } else {
      router.replace(currentPathname + `?${urlSearchParams.toString()}`, {
        scroll: false
      });
    }
  };

  // Check if any filter is active
  const hasFilter =
    location.trim() !== "" ||
    (checkInOutDate?.from && checkInOutDate?.to) ||
    guests.adults > 0 ||
    guests.children > 0 ||
    guests.infants > 0;

  // Reset search filters
  const handleReset = () => {
    setLocation("");
    setCheckInOutDate({ from: "", to: "" });
    setGuests({ adults: 0, children: 0, infants: 0 });
    // setPropertyType("hotel");
    setPropertyType("apartment");
    setShowSearchResults(false);

    router.replace(currentPathname, {
      scroll: false
    }); // Clear all search params
  };

  if (!isLoaded) return null;

  return (
    <div
      className={cn(
        "mx-auto w-full rounded-2xl border bg-white !p-4 shadow-[0px_4px_23.2px_0px_rgba(159,159,159,0.25)] 2xl:w-[75%]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-center-start gap-x-2">
          <BgIcon>
            <LocateFixed size={16} />
          </BgIcon>
          {page === "property-details" ? (
            <p className="text-gray-500">Check availability</p>
          ) : (
            <p className="text-gray-500">
              {currentPathname?.includes("apartments")
                ? "Apartments"
                : "Hotels"}{" "}
              in Algeria
            </p>
          )}
        </div>

        {hasFilter && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-end gap-x-2"
          >
            <RotateCcw size={22} className="text-red-600" />
            <div>Reset filters</div>
          </button>
        )}
      </div>

      <Separator className="mb-5 mt-2 h-[0.5px] w-full bg-gray-300" />

      <section className="grid grid-cols-1 md:grid-cols-2 xl:flex-start-between md:gap-x-4 gap-y-4 xl:gap-y-0">
        {page !== "property-details" && (
          <div className="w-full">
            <Label className="mb-3 block font-semibold text-gray-500">
              Destination
            </Label>

            {typeof window !== "undefined" && (
              <StandaloneSearchBox
                onLoad={(ref) => {
                  inputRef.current = ref;
                }}
                onPlacesChanged={() => {
                  const [place] = inputRef.current.getPlaces();
                  if (place) {
                    const formatted = place.formatted_address || place.name;
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();

                    setLocation(formatted);
                    setSearchLocationName(formatted);
                    setLatitude(lat);
                    setLongitude(lng);
                  }
                }}
              >
                <>
                  <div className="flex-center-start relative gap-x-2 rounded-full bg-[#F6F6F6] px-3 py-1 text-black transition-all duration-300 ease-in-out focus-within:ring-1 focus-within:ring-p1">
                    <BgIcon>
                      <MapPin size={16} />
                    </BgIcon>

                    <Input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Search by Location"
                      className="!border-none px-0 text-sm text-gray-800 shadow-none !outline-none !ring-0 !ring-offset-0 focus-visible:!ring-0"
                    />
                  </div>
                </>
              </StandaloneSearchBox>
            )}
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
                disabled={(date) => {
                  date < new Date();
                }}
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

        {/* {page !== "property-details" && (
          <div className="w-full xl:w-[20%]">
            <Label className="mb-3 block font-semibold text-gray-500">
              Type
            </Label>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-full items-center justify-between gap-x-8 rounded-full bg-[#F6F6F6] px-3 py-2.5 text-black transition-all duration-300 ease-in-out focus-within:ring-1 focus-within:ring-p1">
                <div className="flex items-center justify-start gap-x-2">
                  <BgIcon>
                    <Building size={16} />
                  </BgIcon>

                  <span
                    className={cn(
                      "text-sm capitalize",
                      propertyType ? "text-black" : "text-muted" // Show muted text when no selection
                    )}
                  >
                    {propertyType || "Choose"}
                  </span>
                </div>

                <ChevronDown className="size-[16px] text-gray-400 lg:size-[16px]" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-full max-w-[400px] space-y-4 rounded-2xl border-p1/50 p-4 lg:w-[200px]">
                <DropdownMenuItem
                  className="flex cursor-pointer items-center justify-between gap-x-8 hover:!bg-transparent"
                  onClick={() => setPropertyType("hotel")}
                >
                  <div className="w-max">
                    <h5 className="text-base font-semibold">Hotel</h5>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex cursor-pointer items-center justify-between gap-x-8 hover:!bg-transparent"
                  onClick={() => setPropertyType("apartment")}
                >
                  <div className="w-max">
                    <h5 className="text-base font-semibold">Apartment</h5>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )} */}

        <button
          onClick={handleNavigate}
          className="md:col-span-2 w-full lg:w-max mt-6 whitespace-nowrap rounded-full bg-p1 px-6 py-2 text-base font-semibold text-white disabled:opacity-50"
         type="button"
          disabled={!checkInOutDate?.from || !checkInOutDate?.to}
        >
          {page === "property-details" ? "Search rooms" : "Search"}
        </button>
      </section>

      {/* Load Google Maps Script */}
      {/* <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        async
        defer
      ></script> */}
    </div>
  );
}
