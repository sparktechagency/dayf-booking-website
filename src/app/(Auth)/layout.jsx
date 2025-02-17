import Image from "next/image";
import logo from "/public/images/auth/large-logo.svg";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";

export default async function AuthLayout({ children }) {
  return (
    <div className="flex-center min-h-[75vh] bg-[linear-gradient(180deg,#F6F9FF_0%,#FFF5F9_100%)] py-16">
      <ResponsiveContainer className="flex-start-between flex-col gap-x-20 lg:w-[80%] lg:flex-row 2xl:w-[70%] 3xl:w-[60%]">
        <div className="mb-5 flex w-full justify-center lg:mb-0 lg:block lg:w-1/2">
          <Image
            src={logo}
            alt="Logo of DAYF Booking"
            height={120}
            width={120}
            className="h-[50px] w-auto lg:h-[70px]"
            priority
          />

          <h3
            className="mb-2 mt-5 hidden font-quicksand text-h3 font-bold leading-snug lg:block"
            style={{
              background: "linear-gradient(180deg, #09F 0%, #0068AD 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Book Your Dream Stay in Algeria’s Top Destinations
          </h3>
          <p className="hidden text-[#626262] lg:block">
            Discover handpicked hotels and accommodations across Algeria’s most
            captivating destinations. Whether you’re planning a city escape, a
            coastal retreat, or a desert adventure, we’ve got you covered.
          </p>
        </div>

        <div className="rounded-2xl border bg-white px-8 py-6 lg:w-1/2">
          {children}
        </div>
      </ResponsiveContainer>
    </div>
  );
}
