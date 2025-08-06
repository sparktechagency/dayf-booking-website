"use client";

import CustomFormError from "@/components/CustomFormError/CustomFormError";
import FormWrapper from "@/components/form-components/FormWrapper";
import UOtpInput from "@/components/form-components/UOtpInput";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import {
  useResendOtpMutation,
  useVerifyOtpMutation
} from "@/redux/api/authApi";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { setUser } from "@/redux/features/authSlice";
import { ErrorModal, SuccessModal } from "@/utils/customModal";
import {
  getFromSessionStorage,
  removeFromSessionStorage,
  setToSessionStorage
} from "@/utils/sessionStorage";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { jwtDecode } from "jwt-decode";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function OtpVerificationForm() {
  const [value, setValue] = useState("");
  const [showRequired, setShowRequired] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(180); // Timer in seconds
  const router = useRouter();
  const dispatch = useDispatch();
  const fromHref = useSearchParams().get("from-href");
  const [formError, setFormError] = useState(null);
  // const [currentUser, setCurrentUser] = useState(null);

  const [verifyOtp, { isLoading: isVerifyOtpLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResendOtpLoading }] = useResendOtpMutation();

  // const decodedUser = jwtDecode(getFromSessionStorage("dayf-signup-token"));
  // console.log("decoded: ", decodedUser);

  useEffect(() => {
    if (timer > 0) {
      const countdownInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            setIsResendDisabled(false);
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [timer]);

  // Handle Resend OTP functionality
  const handleResendOtp = async () => {
    /**
     * Since, otp verification can be done for both sign-up and forget-password,
     * we are using tokenName and token to preserve the needed information
     */
    let tokenName = getFromSessionStorage("dayf-signup-token")
      ? "dayf-signup-token"
      : getFromSessionStorage("forgotPassToken")
        ? "forgotPassToken"
        : null;
    let token = getFromSessionStorage(tokenName);

    if (!tokenName) {
      return setFormError("Error: Invalid token");
    }

    try {
      const res = await resendOtp({
        email: jwtDecode(token)?.email
      }).unwrap();
      if (res?.success) {
        SuccessModal("OTP re-send successful");
        setToSessionStorage(tokenName, res?.data?.token);

        // Disable resend button and start the timer
        setIsResendDisabled(true);

        // Set the timer for 3 minutes (180 seconds)
        setTimer(180);

        // Countdown every second
        const countdownInterval = setInterval(() => {
          setTimer((prev) => {
            if (prev === 1) {
              clearInterval(countdownInterval);
              setIsResendDisabled(false); // Re-enable the button after the timer ends
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      setFormError(error?.data?.message || error?.message);
    }
  };

  // Format the timer to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleVerifyOtp = async () => {
    if (value.length < 6) {
      setShowRequired(true);
      return;
    }

    if (getFromSessionStorage("dayf-signup-token")) {
      try {
        const res = await verifyOtp({ otp: value }).unwrap();
        if (res?.success) {
          SuccessModal(
            "OTP Verification Successful",
            "Welcome to DAYF Booking!"
          );

          // login user
          handleLoginUser(res?.data?.token);

          // remove temp sign up token
          removeFromSessionStorage("dayf-signup-token");
        }
      } catch (error) {
        ErrorModal(error?.data?.message || error?.message);
      }
    } else if (getFromSessionStorage("forgotPassToken")) {
      try {
        const res = await verifyOtp({ otp: value }).unwrap();

        if (res?.success) {
          successToast("OTP verification successful");

          // set changePassword token to session storage
          setToSessionStorage("changePasswordToken", res?.data?.token);

          // remove the forgetPassToken
          removeFromSessionStorage("forgotPassToken");

          router.push("/set-new-password");
        }
      } catch (error) {
        setFormError(error?.data?.message || error?.message);
      }
    }
  };

  // Login user
  const handleLoginUser = (token) => {
    const user = jwtDecode(token);
    if (user?.role === "hotel_admin") {
      const dashboard_login_page_url = process.env.NEXT_PUBLIC_DASHBOARD_URL;
      return window.open(
        dashboard_login_page_url,
        "_blank",
        "noopener,noreferrer"
      );
    }

    dispatch(
      setUser({
        user: jwtDecode(token),
        token: token
      })
    );

    router.refresh();

    router.push(fromHref ? fromHref : "/");
  };

  return (
    <div>
      <div className="mx-auto mb-8 w-3/4 space-y-1 text-center">
        <h4 className="text-h4 font-semibold text-p1">Verify OTP</h4>
        <p className="text-gray-700">
          We'll send a verification code to your email. Check your inbox and
          enter the code here:
        </p>
      </div>

      <FormWrapper onSubmit={handleVerifyOtp}>
        <section className="mx-auto mb-2 w-max">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup className="flex items-center gap-x-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <InputOTPSlot
                  key={idx}
                  index={idx}
                  className="size-[60px] !rounded-lg bg-[#d9d9d9] text-xl font-extrabold"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </section>
        {showRequired && (
          <CustomFormError>
            Please enter your one-time password correctly
          </CustomFormError>
        )}

        {formError && <CustomFormError>{formError}</CustomFormError>}

        <Button
          type="submit"
          variant="primary"
          className="w-full rounded-full py-6 text-base"
          loading={isVerifyOtpLoading}
          loadingText="Verifying..."
        >
          Verify
        </Button>

        <p className="mx-auto !mt-2 w-max font-medium text-[#999]">
          Didn&apos;t get the code?{" "}
          <Button
            variant="link"
            className="px-0 text-p1"
            onClick={handleResendOtp}
            disabled={isResendDisabled || isResendOtpLoading}
          >
            {isResendDisabled ? `Resend in ${formatTime(timer)}` : "Resend"}
          </Button>
        </p>
      </FormWrapper>
    </div>
  );
}
