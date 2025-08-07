import HorizontalPropertyCard from "./HorizontalPropertyCard";
import VerticalPropertyCard from "./VerticalPropertyCard";

export default function PropertyCard({
  property,
  fullProperty,
  variant = "grid",
  type = "hotels",
  bookmarks,
  handleCreateBookmark,
  handleDeleteBookmark
}) {
  return variant === "grid" ? (
    <VerticalPropertyCard
      property={property}
      fullProperty={fullProperty}
      bookmarks={bookmarks}
      handleCreateBookmark={handleCreateBookmark}
      handleDeleteBookmark={handleDeleteBookmark}
      type={type}
    />
  ) : (
    <HorizontalPropertyCard
      property={property}
      fullProperty={fullProperty}
      type={type}
      bookmarks={bookmarks}
      handleCreateBookmark={handleCreateBookmark}
      handleDeleteBookmark={handleDeleteBookmark}
    />
  );
}
