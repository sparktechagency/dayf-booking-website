import Image from "next/image";
import imgLeft1 from "/public/images/hero/left-1.png";
import imgLeft2 from "/public/images/hero/left-2.png";
import imgRight1 from "/public/images/hero/right-1.png";
import imgRight2 from "/public/images/hero/right-2.png";

export default function HeroGallery() {
  return (
    <div className="space-y-8 md:-space-y-12">
      <div className="flex flex-col md:flex-row items-start justify-center md:gap-x-4 gap-y-12 md:gap-y-0">
        <div className="relative overflow-hidden md:overflow-visible rounded-[32px] md:rounded-none">
          <Image
            src={imgLeft1}
            alt="Image of a hotel in algeria"
            height={1200}
            width={1200}
            className="mx-auto block size-auto w-[320px] md:w-auto"
          />

          {/* Floating Badge */}
          <div
            style={{
              borderRadius: "0.9375rem",
              background: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(17.5px)"
            }}
            className="absolute w-full md:w-fit left-0 md:-left-20 top-[50px] md:top-1/2 -translate-y-1/2 border border-gray-500 border-opacity-15 p-4 px-6 md:px-4"
          >
            <h3 className="text-h4 font-semibold">25k</h3>
            <p className="text-lg">Satisfied Customers</p>
          </div>
        </div>

        <div className="relative">
          <Image
            src={imgRight1}
            alt="Image of a hotel in algeria"
            height={1200}
            width={1200}
            className="size-auto w-[320px] md:w-auto"
          />
          {/* Floating Badge */}
          <div
            style={{
              borderRadius: "0.9375rem",
              background: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(17.5px)"
            }}
            className="absolute -top-5 left-1/2 w-max -translate-x-1/2 border border-gray-500 border-opacity-15 px-5 py-2"
          >
            <h3 className="text-h4 font-semibold">
              100% <span className="text-lg font-normal">Verified</span>
            </h3>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-end justify-center md:gap-x-4 gap-y-8 md:gap-y-0">
        <Image
          src={imgLeft2}
          alt="Image of a hotel in algeria"
          height={1200}
          width={1200}
          className="size-auto w-full"
        />

        <Image
          src={imgRight2}
          alt="Image of a hotel in algeria"
          height={1200}
          width={1200}
          className="size-auto w-full"
        />
      </div>
    </div>
  );
}
