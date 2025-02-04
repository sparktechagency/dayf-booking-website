import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import AboutUsContainer from "./_components/AboutUsContainer";
export const metadata = {
  title: "About Us",
  description: "About Us page",
};

export default function page() {
  return (
    <ResponsiveContainer className="my-10 min-h-screen lg:mx-auto lg:w-3/4">
      <AboutUsContainer />
    </ResponsiveContainer>
  );
}
