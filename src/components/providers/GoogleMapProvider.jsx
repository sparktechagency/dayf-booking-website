"use client";

import { getGoogleMapAPIKey } from "@/config/envConfig";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

export default function GoogleMapProvider({ children }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: getGoogleMapAPIKey(),
    libraries
  });

  if (!isLoaded && loadError) {
    return <div>Error loading Google Maps...</div>;
  }

  if (!isLoaded) {
    return "Loading...";
  }

  return <>{children}</>;
}
