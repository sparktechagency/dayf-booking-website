import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function HorizontalPropertyCardSkeleton() {
  return (
    <Card className="w-full max-w-4xl overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative md:w-1/2">
            <Skeleton className="h-64 w-full md:h-80" />
            {/* Hotel Badge */}
            <div className="absolute left-4 top-4">
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
            {/* Bookmark Icon */}
            <div className="absolute right-4 top-4">
              <Skeleton className="h-6 w-6 rounded" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-between p-6 md:w-1/2">
            <div className="space-y-4">
              {/* Title */}
              <Skeleton className="h-7 w-3/4" />

              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-4" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <div className="mt-6 flex items-end justify-between">
              {/* See Details Button */}
              <Skeleton className="h-10 w-24 rounded-full" />

              {/* Address */}
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
