"use client";

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";
import { useGetContentQuery } from "@/redux/api/contentApi";

export default function AboutUsContainer() {
  const { data: aboutUsRes } = useGetContentQuery();
  console.log("About Us Res: ", aboutUsRes?.data?.aboutUs);

  const aboutUs =
    aboutUsRes?.data?.aboutUs
      ? aboutUsRes?.data?.aboutUs
      : "";

      console.log("aboutUs: ======>", aboutUs);

  return aboutUs ? <ContentWrapper content={aboutUs} /> : <EmptyContainer />;
}
