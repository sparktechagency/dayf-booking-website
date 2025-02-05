"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <div className="mx-auto mb-6 w-3/4 space-y-1 text-center">
        <h4 className="text-h4 font-semibold text-p1">Create Account</h4>
        <p className="text-gray-700">
          Please enter valid information to be a member
        </p>
      </div>

      <FormWrapper className="space-y-6">
        <UInput
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
        />

        <UInput
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          required={true}
        />

        <UInput
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <UInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
        />

        <Button
          variant="primary"
          className="w-full rounded-full py-6 text-base"
        >
          Sign Up
        </Button>
      </FormWrapper>

      <p className="mt-3 text-center text-sm font-normal text-gray-700">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
