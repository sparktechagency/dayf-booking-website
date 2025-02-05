import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const UOtpInput = ({ label, labelClass, name = "otp", maxLength = 6 }) => {
  const { control } = useFormContext() ?? {};

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mx-auto w-max">
          {label && <FormLabel className={labelClass}>{label}</FormLabel>}
          <FormControl>
            <InputOTP
              pattern={REGEXP_ONLY_DIGITS}
              maxLength={maxLength}
              {...field}
            >
              <InputOTPGroup>
                {Array.from({ length: maxLength }).map((_, idx) => (
                  <InputOTPSlot key={idx} index={idx} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormDescription className="sr-only">
            Please enter the one-time password sent to your phone.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UOtpInput;
