import HotelSearchPanel from "@/components/PropertySearchPanel/HotelSearchPanel";
import React from "react";
import { DynamicApartmentSectionTitle } from "./DynamicPropertyDetails";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tv, Wifi, Wind, Bath, Square, Users } from "lucide-react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const AVAILABILITY_TABLE_HEADERS = [
  "Room type",
  "Number of guests",
  "Price Per Night",
  "Your choices",
  "Select rooms",
  "",
];

export default function DynamicPropertyAvailabilitySection({ rooms }) {
  return (
    <div>
      <DynamicApartmentSectionTitle>Availability</DynamicApartmentSectionTitle>
      <HotelSearchPanel className="mx-0 mt-4 shadow-none" />

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
            {rooms.map((room, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-4">
                  <div className="space-y-3">
                    <h5
                      role="button"
                      className="font-medium text-blue-500 hover:underline"
                    >
                      {room.title}
                    </h5>

                    <div className="space-y-1.5">
                      {room.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Icon icon={feature.icon} height="18" width="18" />
                          {feature.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </td>

                {/* Guests */}
                <td className="flex-center-start flex-wrap gap-2 p-4">
                  {Array.from({ length: room.guests }).map((_, idx) => (
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
                  <div className="font-medium">${room.price_per_night}</div>
                </td>

                {/* Your choices */}
                <td className="space-y-1 p-4">
                  {room.choices.map((choice, index) => (
                    <div key={index} className="flex-center-start gap-2">
                      <div className="size-2 rounded-full bg-green-500" />
                      <span>{choice}</span>
                    </div>
                  ))}

                  <div className="flex-center-start gap-2 text-red-500">
                    <div className="size-2 rounded-full bg-red-500" />
                    <span>Only {room.stock} rooms left!</span>
                  </div>
                </td>

                {/* Select Rooms */}
                <td className="p-4">
                  <Select>
                    <SelectTrigger className="w-20 shadow-none">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>

                    <SelectContent>
                      {[0, 1, 2, 3, 4].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>

                <td className="p-4">
                  <Button className="bg-blue-500 hover:bg-blue-600" asChild>
                    <Link href={`/property/hotels/1/booking`}>Reserve</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
