"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import UPhoneInput from "@/components/form-components/UPhoneInput";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const paymentMethods = ["Debit/Credit Card", "Online Payment"];

export default function BookingForm() {
  const [activePaymentMethod, setActivePaymentMethod] =
    useState("Debit/Credit Card"); // card or onlinePayment

  return (
    <div className="space-y-6 lg:w-1/2">
      <h1 className="font-quicksand text-h3 font-semibold">
        Almost there! Confirm your booking
      </h1>

      <section>
        <h3 className="mb-3 text-h5 font-medium text-gray-700">
          Who&apos;s checking in?
        </h3>
        <FormWrapper className="space-y-4">
          <UInput
            name="name"
            label="Name"
            placeholder="Enter your full name"
            // className="rounded-full border-none bg-[#F6F6F6] px-5 py-6 text-black shadow-none transition-all duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-p1"
          />
          <UPhoneInput
            name="phoneNumber"
            label="Mobile Number"
            placeholder="Enter valid phone number"
          />
        </FormWrapper>
      </section>

      <section>
        <h3 className="mb-3 text-h5 font-medium text-gray-700">
          Payment Method
        </h3>

        <div className="flex-center-start mb-4 gap-x-2">
          {paymentMethods.map((method) => (
            <button
              key={method}
              className={cn(
                "rounded-full px-3 py-2 font-medium text-gray-500 transition-all duration-300 ease-in-out",
                activePaymentMethod === method && "bg-light-sky-blue text-p1",
              )}
              onClick={() => setActivePaymentMethod(method)}
            >
              {method}
            </button>
          ))}
        </div>

        {activePaymentMethod === "Debit/Credit Card" ? (
          <FormWrapper className="space-y-4">
            <UInput name="name" label="Name" placeholder="Name on card" />
            <UInput
              name="cardNumber"
              label="Card Number"
              placeholder="0000 0000 0000 0000"
            />
          </FormWrapper>
        ) : (
          <p className="text-gray-700">
            (Online payment gateways will be integrated...)
          </p>
        )}
      </section>

      <Button
        variant="primary"
        className="w-full rounded-full py-6 text-base"
        size="lg"
        asChild
      >
        <Link href={`/property/1/booking/success`}>Confirm Now</Link>
      </Button>
    </div>
  );
}
