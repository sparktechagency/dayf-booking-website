"use client";

import CustomAvatar from "@/components/CustomAvatar/CustomAvatar";
import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import UPhoneInput from "@/components/form-components/UPhoneInput";
import USelect from "@/components/form-components/USelect";
import ModalWrapper from "@/components/ModalWrapper.js/ModalWrapper";
import { Button } from "@/components/ui/button";
import {
  useGetProfileQuery,
  useUpdateProfileMutation
} from "@/redux/api/userApi";
import { ErrorModal, SuccessModal } from "@/utils/customModal";
import { Icon } from "@iconify/react";
import { ImageUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfileContainer() {
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch
  } = useGetProfileQuery();

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h3 className="text-h4 font-semibold text-p1">Profile</h3>

        <Button
          variant="ghostLightSkyBlue"
          size="lg"
          className="space-x-1"
          onClick={() => setShowUpdateProfileModal(true)}
        >
          <Icon icon="material-symbols:edit-rounded" height={24} width={24} />
          Edit Profile
        </Button>
      </div>

      <div className="mt-5 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h6 className="mb-1 text-base font-medium text-[#3EB2FF]">Name</h6>
          <p>{profile?.name}</p>
        </div>

        <div>
          <h6 className="mb-1 text-base font-medium text-[#3EB2FF]">
            Email Address
          </h6>
          <p>{profile?.email}</p>
        </div>

        <div>
          <h6 className="mb-1 text-base font-medium text-[#3EB2FF]">Gender</h6>
          <p>{profile?.gender || "Not Specified"}</p>
        </div>

        <div>
          <h6 className="mb-1 text-base font-medium text-[#3EB2FF]">Contact</h6>
          <p>{profile?.phoneNumber || "Not Specified"}</p>
        </div>

        <div>
          <h6 className="mb-1 text-base font-medium text-[#3EB2FF]">
            Nationality
          </h6>
          <p>{profile?.nationality || "Not Specified"}</p>
        </div>
      </div>

      {/* Profile Container */}
      <UpdateProfileModal
        open={showUpdateProfileModal}
        setOpen={setShowUpdateProfileModal}
        currentData={profile}
        refetch={refetch}
      />
    </div>
  );
}

const UpdateProfileModal = ({ open, setOpen, currentData, refetch }) => {
  const [updateProfile, { isLoading, isError, error }] =
    useUpdateProfileMutation();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(currentData?.profile || "");
  console.log("uploaded profile image: ", uploadedImage);

  useEffect(() => {
    if (uploadedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.onerror = (error) => {
        console.error("Error reading file: ", error);
      };
      reader.readAsDataURL(uploadedImage);
    }
  }, [uploadedImage]);
  console.log("imageUrl -------> ", imageUrl);

  const onSubmit = async (data) => {
    console.log(data);

    const payload = {
      _id: data?._id,
      email: data?.email,
      ...data,
      phoneNumber: data.contact
    };

    const formData = new FormData();
    formData.append("profile", uploadedImage);
    formData.append("data", JSON.stringify(payload));

    try {
      const res = await updateProfile(formData).unwrap();
      console.log("res: ", res);
      refetch();
      SuccessModal("Profile updated successfully");
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error while updating profile: ", error);
      ErrorModal(error);
    }
  };

  useEffect(() => {
    if (currentData) {
      setImageUrl(currentData?.profile || "");
    }
  }, [currentData]);

  return (
    <ModalWrapper open={open} setOpen={setOpen} title="Update Profile">
      {/* Profile Picture */}
      <div className="">
        <label htmlFor="profile">Change Profile Picture</label>
        <div className="relative mx-auto w-fit">
          <CustomAvatar
            img={imageUrl}
            name={currentData?.name}
            className="size-20 h-24 w-24 text-2xl"
          />
          <label
            htmlFor="profile"
            className="absolute bottom-1.5 right-1.5 cursor-pointer"
          >
            <input
              id="profile"
              type="file"
              max={1}
              onChange={(e) => setUploadedImage(e?.target?.files?.[0])}
              className="hidden"
            />
            <span>
              <ImageUp />
            </span>
          </label>
        </div>
      </div>

      <FormWrapper
        onSubmit={onSubmit}
        defaultValues={{
          name: currentData?.name,
          gender: currentData?.gender,
          contact: currentData?.phoneNumber,
          nationality: currentData?.nationality
        }}
      >
        <UInput name="name" label="Name" placeholder="Enter your full name" />

        <USelect
          name="gender"
          label="Gender"
          selectTrigger="Select your gender"
          selectItems={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" }
          ]}
        />

        <UPhoneInput
          name="contact"
          label="Mobile Number"
          placeholder="Enter valid phone number"
        />

        <USelect
          name="nationality"
          label="Nationality"
          selectTrigger="Select your nationality"
          selectItems={[
            { label: "USA", value: "usa" },
            { label: "Algerian", value: "algerian" },
            { label: "French", value: "french" }
          ]}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          loading={isLoading}
          className="w-full rounded-full py-6 text-base"
          size="lg"
        >
          Update
        </Button>
      </FormWrapper>
    </ModalWrapper>
  );
};
