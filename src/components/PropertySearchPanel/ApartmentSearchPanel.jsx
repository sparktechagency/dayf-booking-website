"use client";

import {
  LocateFixed,
  MapPin,
  CalendarIcon,
  UsersRound,
  CirclePlus,
  CircleMinus
} from "lucide-react";
import ResponsiveContainer from "../ResponsiveContainer/ResponsiveContainer";
import BgIcon from "./BgIcon";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDays, format } from "date-fns";
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
import { XCircle } from "lucide-react";
import { RotateCcw } from "lucide-react";

// Static list of popular cities in Algeria
const POPULAR_CITIES = [
  { name: "Algiers", lat: 36.7538, lng: 3.0588 },
  { name: "Oran", lat: 35.6977, lng: -0.6308 },
  { name: "Constantine", lat: 36.365, lng: 6.6147 },
  { name: "Annaba", lat: 36.9, lng: 7.7667 },
  { name: "Blida", lat: 36.4806, lng: 2.8277 },
  { name: "New York", lat: 40.73061, lng: -73.935242 },
  { name: "London", lat: 51.5072, lng: -0.1276 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Tokyo", lat: 35.6764, lng: 139.65 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Berlin", lat: 52.52, lng: 13.405 },
  { name: "Rome", lat: 41.9028, lng: 12.4964 },
  { name: "Barcelona", lat: 41.3874, lng: 2.1686 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Dubai", lat: 25.276987, lng: 55.296249 }
];

export default function ApartmentSearchPanel({
  className,
  searchedLocation,
  searchedCheckInOutDate,
  searchedGuests
}) {
  const [nearbyCities, setNearbyCities] = useState(POPULAR_CITIES);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const currentPathname = usePathname();
  const autocompleteService = useRef(null);
  const inputRef = useRef(null);

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

  // Initialize Google Places Autocomplete Service
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, []);

  // Handle input change to fetch suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setSearchLocationName(value);
    setShowSuggestions(!!value);

    if (value && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: "dz" } // Restrict to Algeria
        },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
            // Filter popular cities based on input
            const filteredCities = POPULAR_CITIES.filter((city) =>
              city.name.toLowerCase().includes(value.toLowerCase())
            );
            setNearbyCities(filteredCities);
          }
        }
      );
    } else {
      setSuggestions([]);
      setNearbyCities(
        POPULAR_CITIES.filter((city) =>
          city.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  // Handle place selection
  const handleSelectPlace = (place) => {
    if (place.lat && place.lng) {
      // Handle selection from POPULAR_CITIES
      setLocation(place.name);
      setSearchLocationName(place.name);
      setLatitude(place.lat.toString());
      setLongitude(place.lng.toString());
      setSuggestions([]);
      setShowSuggestions(false);
    } else if (place.place_id) {
      // Handle selection from Google Places
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.getDetails({ placeId: place.place_id }, (placeResult, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const selectedLocation =
            placeResult.formatted_address || place.description;
          const lat = placeResult.geometry.location.lat();
          const lng = placeResult.geometry.location.lng();
          setLocation(selectedLocation);
          setSearchLocationName(selectedLocation);
          setLatitude(lat.toString());
          setLongitude(lng.toString());
          setSuggestions([]);
          setShowSuggestions(false);
        }
      });
    }
  };

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

  // Handle navigation
  const handleNavigate = () => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("locationName", searchLocationName);
    urlSearchParams.set("latitude", latitude);
    urlSearchParams.set("longitude", longitude);
    urlSearchParams.set("checkInOutDate", JSON.stringify(checkInOutDate));
    urlSearchParams.set("guests", JSON.stringify(guests));

    router.replace(`/property/apartments?${urlSearchParams.toString()}`);
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

    router.replace(currentPathname); // Clear all search params
  };

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
          <p className="text-gray-500">Apartments in Algeria</p>
        </div>

        {hasFilter && (
          <button type="button" onClick={handleReset} className="text-red-500">
            <RotateCcw size={22} />
            <div className="sr-only">Reset search filters</div>
          </button>
        )}
      </div>

      <Separator className="mb-5 mt-2 h-[0.5px] w-full bg-gray-300" />

      <section className="flex-center-between gap-x-4">
        <div className="w-full">
          <Label className="mb-3 block font-semibold text-gray-500">
            Destination
          </Label>
          <div className="flex-center-start relative gap-x-2 rounded-full bg-[#F6F6F6] px-3 py-1 text-black transition-all duration-300 ease-in-out focus-within:ring-1 focus-within:ring-p1">
            <BgIcon>
              <MapPin size={16} />
            </BgIcon>
            <Input
              ref={inputRef}
              type="text"
              value={location}
              onChange={handleInputChange}
              placeholder="Martyr's Memorial, Algeria"
              className="!border-none px-0 text-sm text-gray-800 shadow-none !outline-none !ring-0 !ring-offset-0 focus-visible:!ring-0"
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {/* Suggestions dropdown */}
            {showSuggestions &&
              (suggestions.length > 0 || nearbyCities.length > 0) && (
                <ul className="absolute top-full z-50 max-h-60 w-full overflow-y-auto rounded-b-md border border-t-0 border-gray-300 bg-white shadow-md">
                  {suggestions.length > 0
                    ? suggestions.map((suggestion) => (
                        <li
                          key={suggestion.place_id}
                          className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                          onMouseDown={() => handleSelectPlace(suggestion)}
                        >
                          {suggestion.description}
                        </li>
                      ))
                    : nearbyCities.map((city) => (
                        <li
                          key={city.name}
                          className="cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white"
                          onMouseDown={() => handleSelectPlace(city)}
                        >
                          {city.name}
                        </li>
                      ))}
                </ul>
              )}
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

        <button
          onClick={handleNavigate}
          className="mt-6 rounded-full bg-p1 px-6 py-2 text-lg font-semibold text-white"
        >
          Search
        </button>
      </section>

      {/* Load Google Maps Script */}
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        async
        defer
      ></script>
    </div>
  );
}
