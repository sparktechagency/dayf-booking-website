import React from "react";
import OtpVerificationForm from "./_components/OtpVerificationForm";

export const metadata = {
  title: "OTP Verification",
  description: "Verify your identity by entering the OTP sent to your email",
};

export default function OtpVerification() {
  return <OtpVerificationForm />;
}
