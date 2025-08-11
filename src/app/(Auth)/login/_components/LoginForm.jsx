"use client";

import CustomFormError from "../../../../components/CustomFormError/CustomFormError";
import FormWrapper from "../../../../components/form-components/FormWrapper";
import UInput from "../../../../components/form-components/UInput";
import { Button } from "../../../../components/ui/button";
import { useSignInMutation } from "../../../../redux/api/authApi";
import { setUser } from "../../../../redux/features/authSlice";
import { SuccessModal } from "../../../../utils/customModal";
import { authValidationSchema } from "../../../../zod/authSchema.validation";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();
  // const userId = useSelector(selectUser)?.userId;

  /**
   * Check if from-href exist
   * [from-href]: Indicates previous page before login and
   *              it is used to redirect user to specific page after login
   */
  const fromHref = useSearchParams().get("from-href");

  // Login api handler
  const [signIn, { isLoading }] = useSignInMutation();

  const onLoginSubmit = async (data) => {
    setFormError(null);
    try {
      const res = await signIn(data).unwrap();

      if (res?.success) {
        SuccessModal("Login Successful!");

        // Set user info into store
        dispatch(
          setUser({
            user: jwtDecode(res?.data?.accessToken),

            token: res?.data?.accessToken
          })
        );

        // Redirect based on user role
        const userRole = jwtDecode(res?.data?.accessToken)?.role;

        router.push(fromHref || (userRole ? `/dashboard/profile` : "/"));
        router.refresh();
        setFormError(null);
      }
    } catch (error) {
      setFormError(error?.message || error?.data?.message || error?.error);
    }
  };

  return (
    <div>
      <div className="mx-auto mb-6 w-3/4 space-y-1 text-center">
        <h4 className="text-h4 font-semibold text-p1">Login to Account</h4>
        <p className="text-gray-700">
          Please enter your email and password to login
        </p>
      </div>

      <FormWrapper
        className="space-y-6"
        onSubmit={onLoginSubmit}
        resolver={zodResolver(authValidationSchema.loginSchema)}
      >
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

        {formError && (
          <CustomFormError formError={formError} extraClass="mt-4" />
        )}

        <Button
          variant="primary"
          className="w-full rounded-full py-6 text-base"
          loading={isLoading}
          loadingText="Signing In"
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
