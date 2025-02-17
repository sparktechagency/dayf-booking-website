import Hero from "@/components/HomePageSections/Hero/Hero";
import Testimonials from "@/components/HomePageSections/Testimonials/Testimonials";
import TopPicks from "@/components/HomePageSections/TopPicks/TopPicks";
import WhyChooseUs from "@/components/HomePageSections/WhyChooseUs/WhyChooseUs";
import WondersAroundYou from "@/components/HomePageSections/WondersAroundYou/WondersAroundYou";

export const metadata = {
  title: "Home - Find Your Dream Place at DAYF Booking",
  description:
    "Welcome to DAYF Booking, home to Algeria's Top Destinations. Discover handpicked hotels and accommodations across Algeria’s most captivating destinations.",
};

export default function Home() {
  return (
    <div className="space-y-14 bg-light-sky-blue pb-20">
      <Hero />
      {/* <WhyChooseUs /> */}
      {/* <TopPicks /> */}
      {/* <WondersAroundYou /> */}
      {/* <Testimonials /> */}
    </div>
  );
}
