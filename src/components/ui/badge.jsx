import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-1 rounded-full text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:focus:ring-gray-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gray-900 text-gray-50 shadow hover:bg-gray-900/80 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/80",
        secondary:
          "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
        destructive:
          "border-transparent bg-red-500 text-gray-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/80",
        outline: "text-gray-950 dark:text-gray-50",

        // Custom Variants
        success: "bg-[#f6ffed] text-[#4ba824] hover:bg-[#f6ffed]",
        error: "bg-[#fff1f0] text-[#e0636d] hover:bg-[#fff1f0]",
        warn: "bg-[#fffbe6] text-[#fbbe43] hover:bg-[#fffbe6]",
        primary: "bg-light-sky-blue text-p1 hover:bg-light-sky-blue",

        // Special Categorized Variants
        hotel:
          "bg-[#e6f4ff] text-p1 hover:bg-[#e6f4ff] border-none font-semibold shadow-none",
        apartment:
          "bg-[#fff7e6] text-[#d46b08] hover:bg-[#fff7e6] border-none font-semibold shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
