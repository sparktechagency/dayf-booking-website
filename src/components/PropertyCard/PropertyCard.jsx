import HorizontalPropertyCard from "./HorizontalPropertyCard";
import VerticalPropertyCard from "./VerticalPropertyCard";

export default function PropertyCard({
  property,
  variant = "grid",
  type = "hotel"
}) {
  console.log("proper ===========>", property, type);
  return variant === "grid" ? (
    <VerticalPropertyCard property={property} type={type} />
  ) : (
    <HorizontalPropertyCard property={property} type={type} />
  );
}
