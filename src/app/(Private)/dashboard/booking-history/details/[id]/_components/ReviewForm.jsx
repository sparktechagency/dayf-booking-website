import React from "react";
import FormWrapper from "../../../../../../../components/form-components/FormWrapper";
import UTextarea from "../../../../../../../components/form-components/UTextarea";
import AnimatedArrow from "../../../../../../../components/AnimatedArrow/AnimatedArrow";
import StarRating from './StarRating';
import { Button } from "@/components/ui/button";

export default function ReviewForm({setRating, handleCreateBooking, isLoading}) {
  return (
    <div className="mt-6 px-6">
      <h2 className="mb-6 text-2xl font-semibold">Please give your review</h2>

      <FormWrapper onSubmit={handleCreateBooking}>
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
          loading={isLoading}
          disabled={isLoading}
          className="group w-full rounded-full py-5"
        >
          Submit
          <AnimatedArrow />
        </Button>
      </FormWrapper>
    </div>
  );
}
