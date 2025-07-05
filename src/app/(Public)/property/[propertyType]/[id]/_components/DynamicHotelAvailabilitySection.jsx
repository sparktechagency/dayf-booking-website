"use client";

import { useState } from "react";
import { DynamicApartmentSectionTitle } from "./DynamicPropertyDetails";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Check } from "lucide-react";
import PropertySearchPanel from "@/components/PropertySearchPanel/PropertySearchPanel";
import { useGetRoomCategoriesByPropertyIdQuery } from "@/redux/api/propertyApi";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";
import CustomFormError from "@/components/CustomFormError/CustomFormError";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const AVAILABILITY_TABLE_HEADERS = [
  "Room type",
  "Number of guests",
  "Price Per Night",
  "Your choices",
  "Select rooms",
  ""
];

export default function DynamicHotelAvailabilitySection({ propertyId }) {
  const searchParams = useSearchParams();
  const checkInOutDate = JSON.parse(searchParams.get("checkInOutDate")) || "";
  const guests = JSON.parse(searchParams.get("guests")) || "";
  const hotelRoomId = searchParams.get("hotelRoomId");
  const [formError, setFormError] = useState("");
  const router = useRouter();

  // State to track selected room quantities for each room
  const [selectedQuantities, setSelectedQuantities] = useState({});

  // Get room categories by property id
  const { data: roomCategories, isFetching: roomCategoriesLoading } =
    useGetRoomCategoriesByPropertyIdQuery(
      {
        propertyId,
        args: {
          startDate: checkInOutDate?.from,
          endDate: checkInOutDate?.to,
          adults: guests?.adults,
          children: guests?.children,
          infants: guests?.infants
        }
      },
      {
        skip: !propertyId
      }
    );

  console.log({ roomCategories });

  // Handle room quantity selection
  const handleQuantityChange = (roomId, value) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [roomId]: value
    }));
  };

  // Function to create URL with updated searchParams
  const createBookingUrl = (roomId) => {
    const quantity = selectedQuantities[roomId] || "1";
    const params = new URLSearchParams(searchParams.toString());
    params.set("hotelRoomId", roomId);
    params.set("quantity", quantity);

    if (roomId && checkInOutDate === "") {
      setFormError("Please select check-in and check-out dates");
      return;
    } else {
      setFormError("");
    }

    params.set("checkInOutDate", JSON.stringify(checkInOutDate));
    params.set("guests", JSON.stringify(guests));
    router.push(`/booking?${params.toString()}`);
  };

  useEffect(() => {
    if (hotelRoomId && checkInOutDate === "") {
      setFormError("Please select check-in and check-out dates");
    } else {
      setFormError("");
    }
  }, [checkInOutDate, hotelRoomId]);

  console.log({ selectedQuantities });

  return (
    <div>
      <DynamicApartmentSectionTitle>Availability</DynamicApartmentSectionTitle>

      <div className="mt-4">
        <PropertySearchPanel
          className={cn(
            "mx-0 mb-2 shadow-none",
            formError ? "border-2 border-red-600" : ""
          )}
          page="property-details"
          searchedCheckInOutDate={checkInOutDate}
          searchedGuests={guests}
        />
        {formError && <CustomFormError formError={formError} />}
      </div>

      <div className="mt-5 w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              {AVAILABILITY_TABLE_HEADERS.map((header) => (
                <th key={header} className="p-4 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {roomCategoriesLoading ? (
              <tr>
                <td colSpan={6}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <RoomCategoryTableRowSkeleton key={index} />
                  ))}
                </td>
              </tr>
            ) : roomCategories && roomCategories?.length > 0 ? (
              roomCategories?.map((room, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="max-w-48 p-4">
                    <div className="space-y-3">
                      <h5
                        role="button"
                        className="font-medium text-blue-500 hover:underline"
                      >
                        {room?.category}
                      </h5>

                      <div className="space-y-1.5">
                        {room?.bedDetails?.split(", ")?.map((bed, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <Icon
                              icon={"lsicon:bed-outline"}
                              height="18"
                              width="18"
                            />
                            {bed}
                          </div>
                        ))}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Icon
                            icon={"pepicons-pop:expand"}
                            height="18"
                            width="18"
                          />
                          {room?.roomSpace} sq. ft
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        {room?.facilities?.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <Image
                              src={feature?.icon}
                              alt={feature?.title}
                              width={16}
                              height={16}
                            />
                            {feature?.title}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {room?.otherFacilities?.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 text-sm text-gray-600"
                          >
                            <Check size={18} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Guests */}
                  <td className="flex-center-start flex-wrap gap-2 p-4">
                    {Array.from({
                      length: Object.values(room?.guests).reduce(
                        (acc, curr) => acc + curr,
                        0
                      )
                    }).map((_, idx) => (
                      <Icon
                        key={idx}
                        icon="lsicon:user-filled"
                        height="22"
                        width="22"
                      />
                    ))}
                  </td>

                  {/* Price per night */}
                  <td className="p-4">
                    <div className="font-medium">${room?.pricePerNight}</div>
                  </td>

                  {/* Your choices */}
                  <td className="space-y-1 p-4">
                    {room?.customerChoices
                      ?.split(", ")
                      ?.map((choice, index) => (
                        <div key={index} className="flex-center-start gap-2">
                          <div className="size-2 rounded-full bg-green-500" />
                          <span>{choice}</span>
                        </div>
                      ))}
                  </td>

                  {/* Select Rooms */}
                  <td className="p-4">
                    <Select
                      defaultValue={"1"}
                      onValueChange={(value) =>
                        handleQuantityChange(room._id, value)
                      }
                    >
                      <SelectTrigger className="w-20 shadow-none">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        {Array.from({ length: room?.totalRooms })?.map(
                          (_, idx) => (
                            <SelectItem
                              key={idx + 1}
                              value={(idx + 1)?.toString()}
                            >
                              {idx + 1}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </td>

                  <td className="p-4">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() => createBookingUrl(room._id)}
                    >
                      Reserve
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <EmptyContainer message="No rooms available for the selected filters" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const RoomCategoryTableRowSkeleton = () => {
  return (
    <div className="grid grid-cols-6 items-center border-b border-gray-200 p-4">
      {/* Room Type & Details */}
      <div className="space-y-2">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
        <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
        <div className="flex gap-2">
          <div className="h-3 w-8 animate-pulse rounded bg-gray-200"></div>
          <div className="h-3 w-8 animate-pulse rounded bg-gray-200"></div>
          <div className="h-3 w-8 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>

      {/* Number of Guests */}
      <div className="flex gap-1">
        <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200"></div>
      </div>

      {/* Price */}
      <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>

      {/* Your Choices */}
      <div className="space-y-1">
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200"></div>
        <div className="h-3 w-20 animate-pulse rounded bg-red-200"></div>
      </div>

      {/* Select Rooms */}
      <div className="h-8 w-16 animate-pulse rounded bg-gray-200"></div>

      {/* Reserve Button */}
      <div className="h-8 w-20 animate-pulse rounded bg-blue-200"></div>
    </div>
  );
};
