"use client";

import CustomFormError from "@/components/CustomFormError/CustomFormError";
import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { ErrorModal, SuccessModal } from "@/utils/customModal";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [formError, setFormError] = useState("");

  const onSubmit = async (data, { reset }) => {
    // console.log(data);
    setFormError(""); // Reset the error

    if (!data?.currentPassword) {
      setFormError("Please provide the current password");
      return;
    } else if (!data?.newPassword) {
      setFormError("Please provide the new password");
      return;
    } else if (!data?.confirmPassword) {
      setFormError("Please provide the confirm password");
      return;
    }

    try {
      const res = await changePassword({
        ...data,
        oldPassword: data.currentPassword
      }).unwrap();
      // console.log("Change password response: ", res);
      if (res?.success) {
        SuccessModal("Password changed successfully");
        reset();
        // console.log("reseted");
      }
    } catch (error) {
      console.error("Error while changing password: ", error);
      ErrorModal(error?.message || error?.data?.message);
    }
  };

  return (
    <div>
      <h4 className="mb-4 text-h4 font-semibold">Change Password</h4>

      <FormWrapper
        onSubmit={onSubmit}
        defaultValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        }}
      >
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
          loading={isLoading}
          disabled={isLoading}
          variant="primary"
          className="w-full rounded-full py-6"
        >
          Submit
        </Button>
        {/* Display Error Message */}
        {formError && <CustomFormError formError={formError} />}
      </FormWrapper>
    </div>
  );
}
