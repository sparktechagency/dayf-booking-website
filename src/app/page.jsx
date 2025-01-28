import Hero from "@/components/HomePageSections/Hero/Hero";
import WhyChooseUs from "@/components/HomePageSections/WhyChooseUs/WhyChooseUs";

export const metadata = {
  title: "Home | DAYF Booking",
  description:
    "Welcome to DAYF Booking, home to Algeria's Top Destinations. Discover handpicked hotels and accommodations across Algeria’s most captivating destinations.",
};

export default function Home() {
  return (
    <div className="bg-light-sky-blue space-y-14">
      <Hero />
      <WhyChooseUs />
    </div>
  );
}
