"use client";

import CustomFormError from "@/components/CustomFormError/CustomFormError";
import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import UPhoneInput from "@/components/form-components/UPhoneInput";
import { Button } from "@/components/ui/button";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useCheckoutMutation } from "@/redux/api/paymentApi";
import { useGetProfileQuery } from "@/redux/api/userApi";
import { selectUser } from "@/redux/features/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useSelector } from "react-redux";
import { z } from "zod";

const bookingSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .refine(isValidPhoneNumber, "Invalid phone number!")
});

export default function BookingForm({
  apartment,
  hotelRoom,
  roomQuanity,
  checkInOutDate
}) {
  const [createBooking, { isLoading: createBookingLoading }] =
    useCreateBookingMutation();
  const [checkout, { isLoading: checkoutLoading }] = useCheckoutMutation();
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const userId = useSelector(selectUser)?.userId;

  // ============== Get User Profile Info ====================
  const { data: userProfile } = useGetProfileQuery(null, { skip: !userId });

  const handleSubmit = async (data) => {
    let payload;
    if (apartment?._id) {
      payload = {
        additionalInfo: {
          name: data?.name,
          phoneNumber: data?.phoneNumber
        },
        modelType: "Apartment",
        reference: apartment?._id,
        startDate: checkInOutDate?.from,
        endDate: checkInOutDate?.to
      };
    } else if (hotelRoom?._id) {
      payload = {
        additionalInfo: {
          name: data?.name,
          phoneNumber: data?.phoneNumber
        },
        modelType: "RoomTypes",
        reference: hotelRoom?._id,
        totalRooms: roomQuanity,
        startDate: checkInOutDate?.from,
        endDate: checkInOutDate?.to
      };
    }

    try {
      const response = await createBooking(payload).unwrap();

      if (response?.success) {
        const bookingId = response?.data?._id;

        // proceed to checkout/payment
        const checkoutPayload = {
          bookings: bookingId,
          redirectType: "website"
        };

        const checkoutResponse = await checkout(checkoutPayload).unwrap();

        if (checkoutResponse?.success) {
          router.push(checkoutResponse?.data);
        }
      }
    } catch (error) {
      console.log("error from error block   ", error);
      setFormError(
        error?.message || error?.data?.message || "Something went wrong!"
      );
      if (error?.status === 401 || error?.status === 403) {
        setFormError("Please login to book this apartment");
        // router.push("/login");
        console.log("Res", error);
      }
    }
  };

  return (
    <div className="space-y-6 lg:w-1/2">
      <h1 className="font-quicksand text-h3 font-semibold">
        Almost there! Confirm your booking
      </h1>

      <section>
        <h3 className="mb-5 text-h5 font-medium text-gray-700">
          Who&apos;s checking in?
        </h3>

        <FormWrapper
          onSubmit={handleSubmit}
          resolver={zodResolver(bookingSchema)}
          className="space-y-6"
          defaultValues={{
            name: userProfile?.name || "",
            phoneNumber: userProfile?.phoneNumber || ""
          }}
        >
          <UInput
            name="name"
            label="Name"
            placeholder="Enter your full name"
            // className="rounded-full border-none bg-[#F6F6F6] px-5 py-6 text-black shadow-none transition-all duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-p1"
            required={true}
          />
          <UPhoneInput
            name="phoneNumber"
            label="Mobile Number"
            placeholder="Enter valid phone number"
            required={true}
          />

          <Button
            type="submit"
            variant="primary"
            className="!mt-6 w-full rounded-full py-6 text-base"
            size="lg"
            loading={createBookingLoading || checkoutLoading}
          >
            Proceed to payment
          </Button>
        </FormWrapper>

        {formError && (
          <CustomFormError formError={formError} extraClass="mt-4" />
        )}
      </section>
    </div>
  );
}
