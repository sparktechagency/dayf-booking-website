"use client";

import { cn } from "@/lib/utils";

export default function ResponsiveContainer({
  children,
  className,
  id,
  style
}) {
  return (
    <section
      className={cn(
        `mx-auto w-full max-w-[1640px] px-5 md:px-10 lg:w-[90%] lg:px-0 2xl:w-[80%] 3xl:w-[75%]`,
        className
      )}
      id={id}
      style={style}
    >
      {children}
    </section>
  );
}
