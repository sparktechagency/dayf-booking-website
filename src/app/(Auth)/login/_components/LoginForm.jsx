"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import { Button } from "@/components/ui/button";
import { SuccessModal } from "@/utils/customModal";
import { setToSessionStorage } from "@/utils/sessionStorage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = (data) => {
    console.log(data);
    router.push("/");

    SuccessModal("Login Successful");
    setToSessionStorage("dayf-user", JSON.stringify(true));
  };

  return (
    <div>
      <div className="mx-auto mb-6 w-3/4 space-y-1 text-center">
        <h4 className="text-h4 font-semibold text-p1">Login to Account</h4>
        <p className="text-gray-700">
          Please enter your email and password to login
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

        <UInput
          type="password"
          name="password"
          label={
            <div className="flex-center-between w-full">
              <span>
                Password <span className="text-red-500">*</span>
              </span>
              <Link
                href="/forgot-password"
                className="text-gray-600 hover:text-black"
              >
                Forgot Password?
              </Link>
            </div>
          }
          placeholder="Enter your password"
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <Button
          variant="primary"
          className="w-full rounded-full py-6 text-base"
        >
          Sign In
        </Button>
      </FormWrapper>

      <p className="mt-3 text-center text-sm font-normal text-gray-700">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-semibold hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
