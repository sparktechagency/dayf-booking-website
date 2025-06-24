"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { SuccessModal } from "@/utils/customModal";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ChangePasswordForm() {
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data, { reset }) => {
    console.log(data);

    try {
      const res = await changePassword({
        ...data,
        oldPassword: data.currentPassword
      }).unwrap();
      console.log("Change password response: ", res);
      SuccessModal("Password changed successfully");
      reset();
      
    } catch (error) {
      console.error("Error while changing password: ", error);
    }
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

        <Button
          isLoading={isLoading}
          variant="primary"
          className="w-full rounded-full py-6"
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}
