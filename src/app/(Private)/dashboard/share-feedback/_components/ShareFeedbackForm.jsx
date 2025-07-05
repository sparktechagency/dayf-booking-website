"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UTextarea from "@/components/form-components/UTextarea";
import { Button } from "@/components/ui/button";
import CustomRating from "@/components/ui/CustomRating";
import { useCreateTestimonialReviewsMutation } from "@/redux/api/reviewApi";
import { ErrorModal, SuccessModal } from "@/utils/customModal";
import React from "react";
import { useState } from "react";

export default function ShareFeedbackForm() {
  const [selectedRating, setSelectedRating] = useState(0);

  const [createTestimonialReviews, { isLoading, error }] =
    useCreateTestimonialReviewsMutation();

  const onSubmit = async ({feedback}) => {
    console.log('feedback: ', feedback);
    if(!selectedRating) {
      return ErrorModal("Please select feedback rating");
    }

    try {
      const res = await createTestimonialReviews({review: feedback, rating: selectedRating});
      console.log("Create testimonial review response: ", res);
      if (res.success) {
        SuccessModal("Your feedback shared successfully");
      }
    } catch (error) {
      console.error("Error while creating testimonial reviews: ", error);
    }
  };

  return (
    <div>
      <h4 className="mb-4 text-h4 font-semibold">Share Your Feedback</h4>

      <FormWrapper onSubmit={onSubmit}>
        <CustomRating onRatingChange={setSelectedRating} />

        <UTextarea
          name="feedback"
          label="Feedback"
          placeholder="Share your feedback about us to help improve our services..."
          className="min-h-[150px]"
        />

        <Button variant="primary" className="w-full rounded-full py-6">
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}
