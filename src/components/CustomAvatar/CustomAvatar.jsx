"use client";

import { transformNameInitials } from "@/utils/transformNameInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import userAvatar from "/public/images/navbar/dummy-user.jpg";

export default function CustomAvatar({
  img,
  alt,
  name,
  className,
  bannerColor,
}) {
  return (
    <Avatar className={cn("", className)}>
      <AvatarImage
        src={img?.src || img}
        alt={alt || `Photo of ${name}`}
        className="bg-white"
      />
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
