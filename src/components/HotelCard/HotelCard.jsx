import HorizontalHotelCard from "./HorizontalHotelCard";
import VerticalHotelCard from "./VerticalHotelCard";

export default function HotelCard({ hotel, variant = "grid", type = "hotel" }) {
  return variant === "grid" ? (
    <VerticalHotelCard hotel={hotel} type={type} />
  ) : (
    <HorizontalHotelCard hotel={hotel} type={type} />
  );
}
