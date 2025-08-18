"use client";

import CustomFormError from "@/components/CustomFormError/CustomFormError";
import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import UPhoneInput from "@/components/form-components/UPhoneInput";
import { Button } from "@/components/ui/button";
import { useGoogleLoginMutation, useSignUpMutation } from "@/redux/api/authApi";
import { ErrorModal, SuccessModal } from "@/utils/customModal";
import { setToSessionStorage } from "@/utils/sessionStorage";
import { authValidationSchema } from "@/zod/authSchema.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "@/lib/firebase.auth";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import { jwtDecode } from "jwt-decode";

export default function SignUpForm() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();

  const [googleLogin, { isLoading: isGoogleLoading }] =
    useGoogleLoginMutation();

  const fromHref = useSearchParams().get("from-href");

  // Sign Up Handler
  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation();

  const onSubmit = async (data) => {
    try {
      const res = await signUp(data).unwrap();
      SuccessModal("Sign up successful", "Please verify your email.");

      // Store temp sign up token for otp verification
      setToSessionStorage("dayf-signup-token", res?.data?.otpToken?.token);

      router.push("/otp-verification");
    } catch (error) {
      console.log({ error });
      setFormError(
        error?.data?.message || error?.message || "Something went wrong"
      );
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log("Google sign in result ----------> ", result);
      const user = result?.user;

      const res = await googleLogin({
        token: user?.accessToken,
        role: "user"
      }).unwrap();
      console.log("resutl ----------------------------> ", res);
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
      console.error("Error during sign-in:", error);
      ErrorModal("Something went wrong! Please try again");
    }
  };

  return (
    <div>
      <div className="mx-auto mb-6 w-3/4 space-y-1 text-center">
        <h4 className="text-h4 font-semibold text-p1">Create Account</h4>
        <p className="text-gray-700">
          Please enter valid information to be a member
        </p>
      </div>

      <FormWrapper
        className="space-y-6"
        onSubmit={onSubmit}
        resolver={zodResolver(authValidationSchema.signUpSchema)}
      >
        <UInput
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        <UInput
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          required
        />

        <UPhoneInput name="phoneNumber" label="Phone Number" required />

        <UInput
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          showPassword={showNewPassword}
          setShowPassword={setShowNewPassword}
          required
        />

        <UInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
          required
        />

        {formError && <CustomFormError formError={formError} />}

        <Button
          typ="submit"
          variant="primary"
          className="w-full rounded-full py-6 text-base"
          loading={isSigningUp || isGoogleLoading}
          loadingText="Signing up..."
        >
          Sign Up
        </Button>

        <Button
          variant="secondary"
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center gap-3 rounded-full py-6 text-base"
          loading={isSigningUp || isGoogleLoading}
          loadingText="Signing In"
        >
          <FcGoogle className="!h-6 !w-6" />
          <span className="font-medium">Continue with Google</span>
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
