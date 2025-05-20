"use client";

import { cn } from "@/lib/utils";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useMemo, useCallback, useEffect } from "react";

const POI_CATEGORIES = [
  {
    key: "transit",
    label: "Transit Stations",
    icon: "🚍",
    type: "transit_station"
  },
  { key: "restaurant", label: "Restaurants", icon: "🍽️", type: "restaurant" },
  { key: "hospital", label: "Hospitals", icon: "🏥", type: "hospital" },
  {
    key: "institutions",
    label: "Institutions",
    icon: "🎓",
    type: "university"
  },
  { key: "atm", label: "ATMs", icon: "🏧", type: "atm" },
  { key: "pharmacy", label: "Pharmacies", icon: "💊", type: "pharmacy" },
  {
    key: "supermarket",
    label: "Supermarkets",
    icon: "🛒",
    type: "supermarket"
  },
  { key: "park", label: "Parks", icon: "🌳", type: "park" }
];

export default function SurroundingContainer({ center }) {
  const [map, setMap] = useState(null);
  const [activePOIs, setActivePOIs] = useState({});
  const [nearbyMarkers, setNearbyMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const togglePOI = (categoryKey) => {
    setActivePOIs((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const fetchNearbyPlaces = useCallback(() => {
    if (!map || !center) return;

    const service = new google.maps.places.PlacesService(map);
    const location = new google.maps.LatLng(center.lat, center.lng);

    setNearbyMarkers([]); // Clear old markers

    POI_CATEGORIES.forEach(({ key, type }) => {
      if (!activePOIs[key]) return;

      const request = {
        location,
        radius: 5000,
        type
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setNearbyMarkers((prev) => {
            const existingIds = new Set(prev.map((m) => m.place_id));
            const newResults = results.filter(
              (place) => !existingIds.has(place.place_id)
            );
            return [...prev, ...newResults];
          });
        } else if (
          status !== google.maps.places.PlacesServiceStatus.ZERO_RESULTS
        ) {
          console.error(`Nearby search failed for type ${type}:`, status);
        }
      });
    });
  }, [map, center, activePOIs]);

  useEffect(() => {
    if (map && center) {
      fetchNearbyPlaces();
    }
  }, [map, center, activePOIs]);

  console.log({ selectedPlace });

  return (
    <div>
      <GoogleMap
        mapContainerClassName={cn(
          "w-full h-[400px] border-slate-200 border rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
        )}
        center={center}
        zoom={15}
        onLoad={(map) => setMap(map)}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: true,
          fullscreenControl: true
        }}
      >
        {/* Main property marker */}
        <Marker position={center} />

        {/* Nearby POI markers */}
        {nearbyMarkers.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }}
            title={place.name}
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            onClick={() => setSelectedPlace(place)}
          />
        ))}

        {/* InfoWindow for selected place */}
        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng()
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div className="min-w-[220px]">
              {selectedPlace.photos[0].getUrl({ maxWidth: 300 }) && (
                <img
                  src={selectedPlace.photos[0].getUrl({ maxWidth: 300 })}
                  alt={selectedPlace.name}
                  className="mb-2 max-h-[150px] w-full rounded-md object-cover"
                />
              )}
              <a
                href={`https://www.google.com/maps/place/?q=place_id:${selectedPlace.place_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-blue-600 hover:underline"
              >
                {selectedPlace.name}
              </a>
              {selectedPlace.vicinity && (
                <p className="text-sm text-gray-600">
                  {selectedPlace.vicinity}
                </p>
              )}
              {selectedPlace.rating && (
                <p className="text-sm text-yellow-600">
                  ⭐ Rating: {selectedPlace.rating} (
                  {selectedPlace.user_ratings_total} reviews)
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      <div className="mt-4 flex flex-wrap gap-3">
        {POI_CATEGORIES.map(({ key, label, icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => togglePOI(key)}
            className={cn(
              "flex items-center gap-2 rounded-xl border border-p1 px-3 py-2 text-sm font-medium shadow",
              activePOIs[key]
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-50"
            )}
          >
            <span>{icon}</span>
            {activePOIs[key] ? `Hide` : `Show`} {label}
          </button>
        ))}
      </div>
    </div>
  );
}
