"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ResetPasswordForm() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="mx-auto mb-6 w-3/4 space-y-1 text-center">
        <h4 className="text-h4 font-semibold text-p1">Reset Password</h4>
        <p className="text-gray-700">
          Enter new password and confirm it to reset account password
        </p>
      </div>

      <FormWrapper className="space-y-6" onSubmit={onSubmit}>
        <UInput
          type="password"
          name="newPassword"
          label="New Password"
          required={true}
          placeholder="Enter new password"
          showPassword={showNewPassword}
          setShowPassword={setShowNewPassword}
        />

        <UInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          required={true}
          placeholder="Confirm new password"
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
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
