"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UOtpInput from "@/components/form-components/UOtpInput";
import { Button } from "@/components/ui/button";

export default function OtpVerificationForm() {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="mx-auto mb-6 w-3/4 space-y-1 text-center">
        <h4 className="text-h4 font-semibold text-p1">Verify OTP</h4>
        <p className="text-gray-700">
          We'll send a verification code to your email. Check your inbox and
          enter the code here:
        </p>
      </div>

      <FormWrapper className="space-y-6" onSubmit={onSubmit}>
        <UOtpInput name="otp" />

        <Button
          variant="primary"
          className="w-full rounded-full py-6 text-base"
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}
