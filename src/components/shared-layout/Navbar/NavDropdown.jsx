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
        className="rounded-full flex-center-between h-10 w-full gap-x-2 border border-[#A5D3F1] px-2"
      >
        <Image
          src={selectedValue.icon}
          alt={selectedValue.label}
          height={25}
          width={25}
          className="rounded-full aspect-square object-cover"
          priority={true}
        />

        <ChevronDown size={22} className="text-p1" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-xl w-32 space-y-1" align="start">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator /> */}

        {values?.map((value) => (
          <DropdownMenuItem
            key={value.id}
            onClick={() => setSelectedValue(value)}
            className={cn(
              "hover:!bg-light-sky-blue cursor-pointer rounded-lg",
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
              className="rounded-full aspect-square object-cover"
              priority={true}
            />

            <span>{value.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
