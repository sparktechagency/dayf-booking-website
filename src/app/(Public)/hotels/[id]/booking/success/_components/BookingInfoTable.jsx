import { Badge } from "@/components/ui/badge";

// dummy data
const bookingInfo = [
  { label: "Booked By", value: "Uzzal Bhowmik" },
  { label: "Hotel Name", value: "El Aurassi Hotel" },
  { label: "Check-In", value: "Dec 31, 2024" },
  { label: "Check-Out", value: "Jan 5, 2025" },
  { label: "Total", value: "$741" },
  { label: "Status", value: <Badge variant="success">Confirmed</Badge> },
];

export default function BookingInfoTable() {
  return (
    <div className="mx-auto w-3/4 rounded-xl border border-gray-300 px-8 py-6 shadow">
      <h4 className="mb-6 text-h4 font-medium">Who&apos;s checking in?</h4>

      <div className="flex-center-between flex-wrap gap-y-5">
        {bookingInfo.map((info, idx) => (
          <div key={idx} className="flex-stretch-start gap-x-5">
            {idx !== 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="44"
                fill="none"
                viewBox="0 0 7 44"
              >
                <path
                  fill="#A0A0A0"
                  d="M3.5.833a2.667 2.667 0 1 0 0 5.334 2.667 2.667 0 0 0 0-5.334M3 43.5a.5.5 0 0 0 1 0zm0-40v40h1v-40z"
                ></path>
              </svg>
            )}

            <div>
              <span className="text-gray-600">{info.label}</span>
              <div className="mt-1 text-h6 text-black">{info.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
