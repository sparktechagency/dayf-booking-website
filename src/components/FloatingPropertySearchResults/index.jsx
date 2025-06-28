"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

export default function FloatingPropertySearchResults({
  showResults,
  setShowResults
}) {
  const searchParams = useSearchParams();
  const checkInOutDate = JSON.parse(searchParams.get("checkInOutDate")) || "";
  const latitude = searchParams.get("latitude") || "";
  const longitude = searchParams.get("longitude") || "";
  const guests = JSON.parse(searchParams.get("guests")) || {};
  const propertyType = searchParams.get("propertyType") || "";

  // Query filters
  const query = {
    startDate: checkInOutDate.from,
    endDate: checkInOutDate.to,
    latitude,
    longitude,
    adults: guests?.adults || 0,
    children: guests?.children || 0,
    infants: guests?.infants || 0,
    searchType: propertyType === "hotel" ? "Property" : "Apartment"
  };

  // Get properties for global search
  const { data: propertiesByFitlers, isLoading: isLoadingPropertiesByFilters } =
    useGetPropertiesByFiltersQuery(query);
  return (
    <div>
      {/* Floating Results Box */}
      {showResults && (
        <div className="absolute left-4 right-4 top-full z-50 mt-2">
          <Card className="border-0 bg-white shadow-2xl">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Search Results
                </h3>
                <Button
                  variant="ghost"
                  onClick={() => setShowResults(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {propertyCards.map((property) => (
                  <Card
                    key={property.id}
                    className="overflow-hidden transition-shadow hover:shadow-lg"
                  >
                    <div className="relative">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.name}
                        className="h-48 w-full object-cover"
                      />
                      {property.verified && (
                        <Badge className="absolute right-2 top-2 bg-green-500">
                          100% Verified
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {property.name}
                        </h4>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">
                            {property.price}
                          </div>
                          <div className="text-sm text-gray-500">per night</div>
                        </div>
                      </div>

                      <div className="mb-2 flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {property.location}
                        </span>
                      </div>

                      <div className="mb-3 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span className="font-medium">{property.rating}</span>
                        <span className="text-sm text-gray-500">
                          ({property.reviews} reviews)
                        </span>
                      </div>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {property.amenities.map((amenity, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {amenity === "WiFi" && (
                              <Wifi className="mr-1 h-3 w-3" />
                            )}
                            {amenity === "Parking" && (
                              <Car className="mr-1 h-3 w-3" />
                            )}
                            {amenity === "Restaurant" && (
                              <Coffee className="mr-1 h-3 w-3" />
                            )}
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
