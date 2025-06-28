import HorizontalPropertyCard from "./HorizontalPropertyCard";
import VerticalPropertyCard from "./VerticalPropertyCard";

export default function PropertyCard({
  property,
  variant = "grid",
  type = "hotel",
  bookmarks,
  handleCreateBookmark,
  handleDeleteBookmark
}) {
  return variant === "grid" ? (
    <VerticalPropertyCard property={property} type={type} bookmarks={bookmarks} handleCreateBookmark={handleCreateBookmark} handleDeleteBookmark={handleDeleteBookmark} />
  ) : (
    <HorizontalPropertyCard property={property} type={type} bookmarks={bookmarks} handleCreateBookmark={handleCreateBookmark} handleDeleteBookmark={handleDeleteBookmark} />
  );
}
