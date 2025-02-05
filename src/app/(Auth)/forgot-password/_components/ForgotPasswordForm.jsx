"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordForm() {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="mx-auto mb-6 w-3/4 space-y-1 text-center">
        <h4 className="text-h4 font-semibold text-p1">Password Forgotten?</h4>
        <p className="text-gray-700">
          Enter your registered email to request an OTP for account password
          reset.
        </p>
      </div>

      <FormWrapper className="space-y-6" onSubmit={onSubmit}>
        <UInput
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          required={true}
        />

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
