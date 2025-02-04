/**
 * TODO: Add dynamic metadata w/ generateMetadata w/ proper og images
 * Reference Video: https://www.youtube.com/watch?v=QHi4XZ8K72A
 *
 * TODO: Add dynamic data w/ generateStaticParams
 */

export const metadata = {
  title: "Sheraton Club des Pins Resort",
};

import DynamicHotelContainer from "./_components/DynamicHotelContainer";

export default function DynamicHotel() {
  return <DynamicHotelContainer />;
}
