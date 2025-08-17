"use client";

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import EmptyContainer from "../../../../../components/EmptyContainer/EmptyContainer";
import { useGetContentQuery } from "@/redux/api/contentApi";
import CustomLoader from "@/components/CustomLoader/CustomLoader";

export default function AboutUsContainer() {
  const { data: aboutUsRes, isLoading } = useGetContentQuery();
  // console.log("About Us Res: ", aboutUsRes?.data?.aboutUs);

  const aboutUs = aboutUsRes?.data?.aboutUs ? aboutUsRes?.data?.aboutUs : "";

  // console.log("aboutUs: ======>", aboutUs);

  if (isLoading) {
    return <CustomLoader className={"h-screen w-auto"} />;
  }

  return aboutUs ? <ContentWrapper content={aboutUs} /> : <EmptyContainer />;
}
