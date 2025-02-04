"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h4 className="mb-4 text-h4 font-semibold">Change Password</h4>

      <FormWrapper onSubmit={onSubmit}>
        <UInput
          type="password"
          name="currentPassword"
          label="Current Password"
          placeholder="*********"
          showPassword={showCurrentPass}
          setShowPassword={setShowCurrentPass}
        />
        <UInput
          type="password"
          name="newPassword"
          label="New Password"
          placeholder="*********"
          showPassword={showNewPass}
          setShowPassword={setShowNewPass}
        />
        <UInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="*********"
          showPassword={showConfirmPass}
          setShowPassword={setShowConfirmPass}
        />

        <Button variant="primary" className="w-full rounded-full py-6">
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}
