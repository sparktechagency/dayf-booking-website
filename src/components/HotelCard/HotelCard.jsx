import HorizontalHotelCard from "./HorizontalHotelCard";
import VerticalHotelCard from "./VerticalHotelCard";

export default function HotelCard({ hotel, variant = "grid" }) {
  return variant === "grid" ? (
    <VerticalHotelCard hotel={hotel} />
  ) : (
    <HorizontalHotelCard hotel={hotel} />
  );
}
