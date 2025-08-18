"use client";

import React from "react";
import FormWrapper from "../../../../../../../components/form-components/FormWrapper";
import UTextarea from "../../../../../../../components/form-components/UTextarea";
import AnimatedArrow from "../../../../../../../components/AnimatedArrow/AnimatedArrow";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";
import { useCreateTestimonialReviewsMutation } from "@/redux/api/reviewApi";
import { ErrorModal, SuccessModal } from "@/utils/customModal";

export default function ReviewForm({ booking, setOpenReviewModal, refetchBooking }) {
  const [rating, setRating] = React.useState(0);
  const [createTestimonialReviews, { isLoading: isReviewLoading }] =
    useCreateTestimonialReviewsMutation();

  const handleReviewBooking = async (data) => {
    const reviewData = {
      ...data,
      rating,
      booking: booking?._id,
      reference: booking?.modelType === "RoomTypes" ? booking?.reference?.property : booking?.reference?._id ,
      modelType:
        booking?.modelType === "RoomTypes" ? "Property" : booking?.modelType
    };
    // console.log("Create Review data: ====> ", reviewData);

    try {
      const res = await createTestimonialReviews(reviewData).unwrap();
      console.log("Create Review response: ", res);
      if (res?.success) {
        SuccessModal(res?.message);
        setOpenReviewModal?.(false);
        refetchBooking();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      ErrorModal(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="mt-6 px-6">
      <h2 className="mb-6 text-2xl font-semibold">Please give your review</h2>

      <FormWrapper onSubmit={handleReviewBooking}>
        <div className="space-y-6">
          {/* Rating */}
          <StarRating onRatingChange={setRating} />

          {/* Review */}
          <UTextarea
            name="review"
            label="Review"
            required={true}
            placeholder="Write in detail about your experience for this booking..."
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          loading={isReviewLoading}
          disabled={isReviewLoading}
          className="group w-full rounded-full py-5"
        >
          Submit
          <AnimatedArrow />
        </Button>
      </FormWrapper>
    </div>
  );
}
