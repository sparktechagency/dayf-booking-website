import Hero from "@/components/HomePageSections/Hero/Hero";
import TopPicks from "@/components/HomePageSections/TopPicks/TopPicks";
import WhyChooseUs from "@/components/HomePageSections/WhyChooseUs/WhyChooseUs";
import WondersAroundYou from "@/components/HomePageSections/WondersAroundYou/WondersAroundYou";

export const metadata = {
  title: "Home | DAYF Booking",
  description:
    "Welcome to DAYF Booking, home to Algeria's Top Destinations. Discover handpicked hotels and accommodations across Algeria’s most captivating destinations.",
};

export default function Home() {
  return (
    <div className="space-y-14 bg-light-sky-blue">
      <Hero />
      <WhyChooseUs />
      <TopPicks />
      <WondersAroundYou />
    </div>
  );
}
