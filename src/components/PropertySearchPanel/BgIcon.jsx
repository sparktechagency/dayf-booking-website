"use client";

import { cn } from "@/lib/utils";
import React from "react";

export default function BgIcon({ children, className, as = "", ...props }) {
  return (
    <div
      className={cn(
        "flex-center aspect-square size-7 rounded-full bg-p1 text-white",
        className,
      )}
      role={as}
      {...props}
    >
      {children}
    </div>
  );
}
