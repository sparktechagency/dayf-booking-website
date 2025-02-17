import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import usdIcon from "/public/images/navbar/dollar-circle.svg";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NavDropdown({
  values,
  selectedValue,
  setSelectedValue,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        size="lg"
        className="flex-center-between h-9 w-full gap-x-2 rounded-3xl border border-[#A5D3F1] px-2 lg:h-10 lg:rounded-full"
      >
        <Image
          src={selectedValue.icon}
          alt={selectedValue.label}
          height={250}
          width={250}
          className="aspect-square size-[20px] rounded-full object-cover lg:size-[25px]"
          priority={true}
        />

        <ChevronDown className="size-[16px] text-p1 lg:size-[22px]" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-32 space-y-1 rounded-xl" align="start">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator /> */}

        {values?.map((value) => (
          <DropdownMenuItem
            key={value.id}
            onClick={() => setSelectedValue(value)}
            className={cn(
              "cursor-pointer rounded-lg hover:!bg-light-sky-blue",
              value.id === selectedValue.id
                ? "bg-light-sky-blue text-p1"
                : "bg-transparent",
            )}
          >
            <Image
              src={value.icon}
              alt={value.label}
              height={20}
              width={20}
              className="aspect-square rounded-full object-cover"
              priority={true}
            />

            <span>{value.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
