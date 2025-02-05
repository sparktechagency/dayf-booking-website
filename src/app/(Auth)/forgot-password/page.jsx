import React from "react";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password",
  description:
    "Password Forgotten? No worries, DAYF Booking has you covered. Enter your registered email to request an OTP for account password reset.",
};

export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
