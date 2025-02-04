import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

export default function USelect({
  name,
  label,
  selectTrigger,
  selectItems,
  defaultValue,
  onChange,
  disabled = false,
  className,
}) {
  const { control } = useFormContext() ?? {};

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                if (onChange) onChange(value); // Call onChange if provided
              }}
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger
                  className={cn(
                    "!mt-1 h-12 rounded-full border-none bg-[#f6f6f6] shadow-none",
                    className,
                  )}
                >
                  <SelectValue placeholder={selectTrigger} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white text-lg font-medium">
                {selectItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="text-danger" />
        </FormItem>
      )}
    />
  );
}
