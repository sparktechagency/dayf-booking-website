import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import TermsConditionContainer from "./_components/TermsConditionContainer";

export const metadata = {
  title: "Terms and Conditions",
  description: "Read terms and conditions of DAYF Booking",
};

export default function TermsConditionPage() {
  return (
    <ResponsiveContainer className="my-10 min-h-screen lg:mx-auto lg:w-3/4">
      <TermsConditionContainer />
    </ResponsiveContainer>
  );
}
