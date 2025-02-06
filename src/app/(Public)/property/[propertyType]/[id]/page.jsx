import DynamicPropertyContainer from "./_components/DynamicPropertyContainer";

export default async function DynamicProperty({ params }) {
  const propertyType = (await params)?.propertyType;

  return <DynamicPropertyContainer propertyType={propertyType} />;
}
