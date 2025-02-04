import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";

export default function CustomTooltip({ children, title, className }) {
  return (
    <TooltipProvider delayDuration={0.3}>
      <Tooltip>
        <TooltipTrigger as="button" className={cn("", className)}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className={cn("font-dm-sans", className)}
          sideOffset={6}
        >
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
