import { cn } from "@/lib/utils";
import React from "react";

export default function BgIcon({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-full flex-center aspect-square size-7 bg-p1 text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
