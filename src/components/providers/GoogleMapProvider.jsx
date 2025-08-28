"use client";

import { getGoogleMapAPIKey } from "@/config/envConfig";
import { useLoadScript } from "@react-google-maps/api";
import CustomLoader from "../CustomLoader/CustomLoader";

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
    return <CustomLoader className={`w-screen h-screen`} />;
  }

  return <>{children}</>;
}
