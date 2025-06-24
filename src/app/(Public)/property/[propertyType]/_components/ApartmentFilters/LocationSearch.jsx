"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";

const POPULAR_CITIES = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093 }
];

export default function LocationSearch() {
  const [locationName, setLocationName] = useState("");
  const [nearbyCities, setNearbyCities] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const currentPathname = usePathname();

  const autocompleteService = useRef(null);
  const placesService = useRef(null);
  const inputRef = useRef(null);

  // Separate search params for lat, lng and locationName
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
    "",
    (val) => val,
    (val) => val
  );

  // Initialize Google Places services
  useEffect(() => {
    if (!window.google?.maps?.places) {
      console.warn("Google Maps API not loaded");
      setNearbyCities(POPULAR_CITIES); // fallback
      return;
    }
    autocompleteService.current =
      new window.google.maps.places.AutocompleteService();
    placesService.current = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
  }, []);

  // Get user location or fallback to popular cities
  useEffect(() => {
    if (!navigator.geolocation) {
      setNearbyCities(POPULAR_CITIES);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        if (!placesService.current) {
          setNearbyCities(POPULAR_CITIES);
          return;
        }

        placesService.current.nearbySearch(
          {
            location: new window.google.maps.LatLng(userLat, userLng),
            radius: 100000, // 100km radius
            type: "locality"
          },
          (results, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              results
            ) {
              const cities = results.slice(0, 5).map((result) => ({
                name: result.name,
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng()
              }));
              setNearbyCities(cities.length ? cities : POPULAR_CITIES);
            } else {
              setNearbyCities(POPULAR_CITIES);
            }
          }
        );
      },
      () => setNearbyCities(POPULAR_CITIES),
      { timeout: 10000 }
    );
  }, []);

  // Sync input value with search params on mount or update
  useEffect(() => {
    if (searchLocationName) {
      setLocationName(searchLocationName);
    } else if (latitude && longitude) {
      setLocationName(
        `Lat: ${parseFloat(latitude).toFixed(2)}, Lng: ${parseFloat(longitude).toFixed(2)}`
      );
    } else {
      setLocationName("");
    }
  }, [searchLocationName, latitude, longitude]);

  // Handle input change: update input + locationName param + fetch suggestions
  const handleInputChange = (e) => {
    const val = e.target.value;
    setLocationName(val);
    setSearchLocationName(val);

    if (!val) {
      setLatitude("");
      setLongitude("");
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (!autocompleteService.current) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      { input: val, types: ["(cities)"] },
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(predictions);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }
    );
  };

  // When a suggestion or nearby city is selected
  const handleSelectPlace = (place) => {
    if (place.lat && place.lng && place.name) {
      // Popular city object with lat/lng directly
      updateLocation(place.name, place.lat, place.lng);
      return;
    }

    if (!placesService.current) {
      // No places service, fallback to description text only
      const name = place.structured_formatting?.main_text || place.description;
      setLocationName(name);
      setSearchLocationName(name);
      setLatitude("");
      setLongitude("");
      setShowSuggestions(false);
      return;
    }

    console.log({ placesService });
    placesService.current.getDetails(
      { placeId: place.place_id, fields: ["geometry", "formatted_address"] },
      (result, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          result.geometry
        ) {
          console.log({ result });
          const lat = result.geometry.location.lat();
          const lng = result.geometry.location.lng();

          console.log({ lat, lng });

          // Use formatted_address or main_text as name fallback
          const name =
            result.formatted_address ||
            place.structured_formatting?.main_text ||
            place.description;
          updateLocation(name, lat, lng);
        } else {
          const name =
            place.structured_formatting?.main_text || place.description;
          setLocationName(name);
          setSearchLocationName(name);
          setLatitude("");
          setLongitude("");
          setShowSuggestions(false);
        }
      }
    );
  };

  // Update states & search params for location
  const updateLocation = (name, lat, lng) => {
    setLocationName(name);
    setSearchLocationName(name);

    console.log({ lng, lat });
    // setLatitude(lat.toString());
    // setLongitude(lng.toString());
    const searchParams = new URLSearchParams();
    searchParams.set("latitude", lat.toString());
    searchParams.set("longitude", lng.toString());
    router.push(currentPathname + "?" + `lat=${lat?.toString()}`);

    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Checkbox handler for nearby cities
  const handleCheckboxChange = (city, checked) => {
    if (checked) {
      updateLocation(city.name, city.lat, city.lng);
    } else {
      setLocationName("");
      setSearchLocationName("");
      setLatitude("");
      setLongitude("");
    }
  };

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        type="text"
        value={locationName}
        onChange={handleInputChange}
        placeholder="Search by location"
        className="h-12 w-full rounded-xl"
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />

      {/* Suggestions dropdown */}
      {showSuggestions &&
        (suggestions.length > 0 || nearbyCities.length > 0) && (
          <ul className="absolute z-50 max-h-60 w-full overflow-y-auto rounded-b-md border border-t-0 border-gray-300 bg-white shadow-md">
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

      {/* Nearby/popular cities checkboxes */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {nearbyCities.map((city) => (
          <div key={city.name} className="flex items-center gap-2">
            <Checkbox
              id={`city-${city.name}`}
              checked={
                latitude === city.lat.toString() &&
                longitude === city.lng.toString() &&
                locationName === city.name
              }
              onCheckedChange={(checked) => handleCheckboxChange(city, checked)}
            />
            <Label
              htmlFor={`city-${city.name}`}
              className="cursor-pointer select-none"
            >
              {city.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
