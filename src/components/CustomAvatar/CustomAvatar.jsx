"use client";

import { transformNameInitials } from "@/utils/transformNameInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import userAvatar from "/public/images/navbar/dummy-user.jpg";

export default function CustomAvatar({ img, name, className, bannerColor }) {
  return (
    <Avatar className={cn("", className)}>
      <AvatarImage src={img?.src || img} className="bg-white" />
      <AvatarFallback
        className={cn("font-bold")}
        style={{
          backgroundColor: bannerColor,
          color: bannerColor ? "white" : "var(--color-p1)",
        }}
      >
        {transformNameInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
