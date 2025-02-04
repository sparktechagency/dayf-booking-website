import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import PrivacyPolicyContainer from "./_components/PrivacyPolicyContainer";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy page",
};

export default function AboutUsPage() {
  return (
    <ResponsiveContainer className="my-10 min-h-screen lg:mx-auto lg:w-3/4">
      <PrivacyPolicyContainer />
    </ResponsiveContainer>
  );
}
