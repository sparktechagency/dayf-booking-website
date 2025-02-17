import PropertyRegistrationForm from "./_components/ListPropertyHero/PropertyRegistrationForm";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import PropertyTypewriterEffect from "./_components/ListPropertyHero/PropertyTypewriterEffect";
import ListPropertyHero from "./_components/ListPropertyHero/ListPropertyHero";
import ListPropertyPotentials from "./_components/ListPropertyPotentials";
import ListPropertyTestimonials from "./_components/ListPropertyTestimonials";
import ListPropertyFaq from "./_components/ListPropertyFaq";

export const metadata = {
  title: "List Your Property",
  description:
    "Want to show your properties on DAYF Booking. Create a property owner account and list your properties.",
};

export default function CreatePropertyAccount() {
  return (
    <div className="space-y-12 bg-light-sky-blue">
      <ListPropertyHero />
      <ListPropertyPotentials />
      <ListPropertyTestimonials />
      <ListPropertyFaq />
    </div>
  );
}
