"use client";

import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import CustomFormError from "@/components/CustomFormError/CustomFormError";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import UPhoneInput from "@/components/form-components/UPhoneInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useSignUpMutation } from "@/redux/api/authApi";
import { SuccessModal } from "@/utils/customModal";
import { setToSessionStorage } from "@/utils/sessionStorage";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PROPERTY_TYPE = [
  {
    label: "Hotel",
    value: "hotel"
  },
  {
    label: "Apartment",
    value: "apartment"
  }
];

export default function PropertyRegistrationForm() {
  // const [selectedPropertyType, setSelectedPropertyType] = useState("Hotel");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [formError, setFormError] = useState(null);

  // Sign Up Handler
  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation();

  const onSubmit = async (data) => {
    const {contact, ...formData} = data;
    try {
      const res = await signUp({...formData, phoneNumber: data?.contact, role: "hotel_admin"}).unwrap();
      SuccessModal("Sign up successful", "Please verify your email.");
      console.log("res- sign up: ", res); 

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

  return (
    <div className="w-full rounded-2xl border bg-white p-7 text-black shadow-xl">
      <h3 className="mb-6 text-2xl font-semibold">
        Create Property Owner Account
      </h3>
      <FormWrapper onSubmit={onSubmit} className="space-y-6">
        <UInput
          name="name"
          label="Full Name"
          placeholder="Enter your name"
          required
        />
        <UInput
          name="email"
          label="Email/Business Email"
          placeholder="Enter your email (recommended: Business Email)."
          required
        />
        <UPhoneInput name="contact" label="Contact Number" />
        <UInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          required
        />
        <UInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          required
        />

        {/* <div>
          <Label className="flex-center-start gap-x-3">
            Property Type
            <CustomTooltip
              title={
                <span>
                  If you can't find your property type, don't worry. <br />{" "}
                  Select the one that matches your requirement the most. We use
                  it to display the most relevant results.
                </span>
              }
            >
              <Icon
                icon="pajamas:question"
                width="16"
                height="16"
                color="var(--color-p1)"
              />
            </CustomTooltip>
          </Label>

          <div className="flex-center mt-4 gap-x-2">
            {PROPERTY_TYPE.map((type) => (
              <button
                key={type.value}
                type="button"
                className={cn(
                  "rounded-full border-2 border-p1 px-6 py-2 text-sm",
                  type.value === selectedPropertyType && "bg-p1 text-white"
                )}
                onClick={() => setSelectedPropertyType(type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div> */}

        {/* <Separator className="my-4" /> */}

        {formError && <CustomFormError formError={formError} />}

        <div className="grid place-items-center">
          <Button
            variant="primary"
            className="group relative w-3/4 rounded-full py-6 text-base"
          >
            Register Now <AnimatedArrow />
          </Button>
        </div>
      </FormWrapper>

      <p className="mt-2 text-center text-muted">
        Already Registered?
        <Link
          href="/login"
          className="ml-1 font-semibold text-p1 hover:underline"
        >
          Continue to login
        </Link>
      </p>
    </div>
  );
}
