"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UTextarea from "@/components/form-components/UTextarea";
import { Button } from "@/components/ui/button";

export default function ShareFeedbackForm() {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h4 className="mb-4 text-h4 font-semibold">Share Your Feedback</h4>

      <FormWrapper onSubmit={onSubmit}>
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
