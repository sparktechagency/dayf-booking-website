"use client";

import CustomFormError from "@/components/CustomFormError/CustomFormError";
import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { SuccessModal } from "@/utils/customModal";
import { setToSessionStorage } from "@/utils/sessionStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [formError, setFormError] = useState(null);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (data) => {
    try {
      const res = await forgotPassword(data).unwrap();

      if (res?.success) {
        SuccessModal(
          "OTP sent to email",
          "Please check your email for otp verification"
        );

        // Set forgotPassToken in session-storage
        setToSessionStorage("forgotPassToken", res.data.token);

        // Navigate to otp verification page
        router.push("/otp-verification");
      }
    } catch (error) {
      console.log(error?.data?.message);
      setFormError(error?.message || error?.data?.message || error?.error);
    }
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

        {formError && <CustomFormError formError={formError} />}

        <Button
          variant="primary"
          className="w-full rounded-full py-6 text-base"
          loading={isLoading}
          loadingText="Submitting..."
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}
