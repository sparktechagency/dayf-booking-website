import CustomLoader from "@/components/CustomLoader/CustomLoader";
import React from "react";

export default function loading() {
  return <CustomLoader className={`h-screen w-screen`} />;
}
