import DynamicPropertyContainer from "./_components/DynamicPropertyContainer";

export default async function DynamicProperty({ params }) {
  const propertyType = (await params)?.propertyType;

  if (!propertyType) return null;

  return <DynamicPropertyContainer propertyType={propertyType} />;
}
