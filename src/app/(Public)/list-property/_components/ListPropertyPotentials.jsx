import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import { Icon } from "@iconify/react";

// Static Data
const POTENTIALS = [
  {
    id: 1,
    title: "Turn Your Space into Income Instantly",
    description:
      "Have an extra room, apartment, or vacation home? Start earning by hosting travelers from around the world—on your terms.",
  },
  {
    id: 2,
    title: "Get Maximum Exposure for Your Property",
    description:
      "Your listing is showcased to thousands of travelers actively searching for a stay in your area, helping you get more bookings.",
  },
  {
    id: 3,
    title: "You're in Charge – Total Control Over Your Listing",
    description:
      "Set your own pricing, availability, and guest policies. Whether you want to rent full-time or occasionally, the choice is yours.",
  },
  {
    id: 4,
    title: "Fast & Secure Payments – No More Hassles",
    description:
      "Get paid directly to your account with secure transactions and guaranteed payouts—no delays, no stress.",
  },
  {
    id: 5,
    title: "Flexibility to Host However You Want",
    description:
      "Rent daily, weekly, or monthly—whatever works for you. Adjust your availability and pricing at any time.",
  },
  {
    id: 6,
    title: "A Simple Dashboard to Manage Everything",
    description:
      "Track bookings, update your calendar, and communicate with guests seamlessly, all in one place.",
  },
  {
    id: 7,
    title: "24/7 Host Support – We've Got Your Back",
    description:
      "Whether you need help with a booking or have a question, our dedicated support team is available anytime.",
  },
  {
    id: 8,
    title: "Professional Marketing to Attract More Bookings",
    description:
      "We promote your property through advanced marketing strategies, helping you stand out and get more bookings.",
  },
];

const ListPropertyPotentials = () => {
  return (
    <div className="bg-white py-20">
      <ResponsiveContainer>
        <div className="flex-center-between mb-12">
          <h1 className="heading xl:w-1/2">
            Unlock the Full Potential of Your Property
          </h1>

          <p className="description mt-3 xl:w-1/3">
            Turn your space into a profitable stay with Dayf Booking. List for
            free, set your own rules, and host on your terms. Enjoy secure
            payments, verified guests, and easy management—all in one place.
            Start earning today!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12">
          {POTENTIALS.map((potential) => (
            <div key={potential.id} className="flex-start-start gap-x-3">
              <div className="size-[45px]">
                <Icon
                  icon="lets-icons:check-fill"
                  width={45}
                  height={45}
                  className="text-green-600"
                />
              </div>
              <div>
                <h6 className="text-xl font-medium">{potential.title}</h6>
                <p className="mt-0.5 text-muted">{potential.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default ListPropertyPotentials;
