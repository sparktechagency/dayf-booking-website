import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MapPinned } from "lucide-react";

export default function LocationSearch() {
  return (
    <div className="relative rounded-lg border border-gray-300 transition-all duration-300 ease-in-out focus-within:border-p1">
      <MapPinned
        className={cn("absolute left-3 top-1/2 -translate-y-1/2 text-muted")}
        size={18}
      />

      <Input
        className={cn(
          "w-full rounded-lg border-none px-10 py-6 shadow-none outline-none !ring-0 !ring-offset-0",
        )}
        placeholder="Where do you want to stay?"
      />
    </div>
  );
}
