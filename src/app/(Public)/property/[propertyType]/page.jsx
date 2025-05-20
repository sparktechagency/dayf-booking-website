import { notFound } from "next/navigation";
import HotelsPage from "./_components/hotel-components/HotelsPage";
import ApartmentsPage from "./_components/apartment-components/ApartmentsPage";

export const generateMetadata = async ({ params }) => {
  let propertyType = (await params)?.propertyType;
  propertyType = propertyType[0].toUpperCase() + propertyType?.slice(1);

  return {
    title: `Find Your Dream ${propertyType}`
  };
};

export default async function DynamicProperty({ params }) {
  const propertyType = (await params)?.propertyType;

  return propertyType === "hotels" ? (
    <HotelsPage />
  ) : propertyType === "apartments" ? (
    <ApartmentsPage />
  ) : (
    notFound()
  );
}
