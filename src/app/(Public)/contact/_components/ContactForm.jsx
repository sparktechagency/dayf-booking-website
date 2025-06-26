"use client";

import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import UTextarea from "@/components/form-components/UTextarea";
import { Button } from "@/components/ui/button";
import { useCreateContentMutation } from "@/redux/api/contentApi";
import { ErrorModal, SuccessModal } from "@/utils/customModal";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const router = useRouter();
  const [createContent, { isError, isLoading, error }] =
    useCreateContentMutation();

  const handleCreateContentSupport = async (data) => {
    const contentData = {
      name: data.firstName + " " + data.lastName,
      email: data.email,
      subject: data.subject,
      description: data.description
    };
    try {
      const res = await createContent(contentData).unwrap();
      console.log("Content Support response: ", res);
      if (res?.success) {
        SuccessModal(res?.message);
        router.push("/");
      }
    } catch (error) {
      console.log(error)
      ErrorModal(error?.message || "Something went wrong!");
    }
  };

  return (
    <FormWrapper onSubmit={handleCreateContentSupport}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-2 lg:gap-y-0">
          {/* first name */}
          <UInput
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            required={true}
          />

          {/* last name */}
          <UInput
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
          />
        </div>

        {/* email */}
        <UInput
          type="email"
          name="email"
          label="Email"
          required={true}
          placeholder="Enter your email"
        />

        {/* Subject */}
        <UInput
          name="subject"
          label="Subject"
          required={true}
          placeholder="What is the subject?"
        />

        {/* Description */}
        <UTextarea
          name="description"
          label="Description"
          required={true}
          placeholder="Write in detail about your queries..."
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
  );
}
