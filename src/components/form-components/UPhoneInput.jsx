import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { PhoneInput } from "../ui/PhoneInput";
// import { PhoneNumber } from "react-phone-number-input";
import { cn } from "@/lib/utils";

export default function UPhoneInput({
  // defaultValue,
  name,
  label,
  className,
  inputClassName,
  countrySelectClassName,
  placeholder,
  readOnly,
  required = false,
  labelClass,
  defaultCountry
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          <FormLabel
            className={cn("flex-center-start mb-2 gap-x-0.5", labelClass)}
          >
            {label}{" "}
            {required && (
              <span className="text-base font-bold text-red-500">*</span>
            )}
          </FormLabel>
          <FormControl className="w-full">
            <PhoneInput
              placeholder={placeholder || "Enter a phone number"}
              international
              defaultCountry={defaultCountry || "US"}
              className={className}
              inputClassName={inputClassName}
              countrySelectClassName={countrySelectClassName}
              value={field.value}
              onChange={field.onChange}
              readOnly={readOnly}
            />
          </FormControl>
          <FormMessage className="text-danger" />
        </FormItem>
      )}
    />
  );
}
