import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import EyeIconInverse from "../EyeIconInverse/EyeIconInverse";
import { cn } from "@/lib/utils";

const UInput = ({
  loading,
  type,
  label,
  placeholder,
  name,
  defaultValue,
  required = false,
  accept,
  showPassword,
  setShowPassword,
  className,
  disabled,
  info,
  value,
  readOnly,
  labelClass,
  ...props
}) => {
  const { control } = useFormContext() ?? {};

  return (
    <FormField
      control={control}
      // defaultValue={defaultValue}
      value={value}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel
            className={cn("flex-center-start mb-2 gap-x-2", labelClass)}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>

          <FormControl>
            {type === "password" ? (
              <div className="relative">
                <Input
                  className={cn(
                    "w-full border border-gray-400 px-4 py-6",
                    className,
                  )}
                  name={name}
                  type={showPassword ? "text" : "password"}
                  placeholder={placeholder}
                  disabled={disabled || loading}
                  accept={accept}
                  onChange={field.onChange}
                  {...field}
                />
                <EyeIconInverse
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>
            ) : (
              <Input
                className={cn(
                  "w-full border border-gray-400 px-4 py-6 disabled:border-gray-300 disabled:text-muted disabled:opacity-100",
                  className,
                )}
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled || loading}
                accept={accept}
                onChange={field.onChange}
                maxLength={props.max}
                defaultValue={value}
                readOnly={readOnly}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage
            className="text-danger"
            style={{ marginTop: 4, paddingInline: 4 }}
          />
        </FormItem>
      )}
    />
  );
};

export default UInput;
