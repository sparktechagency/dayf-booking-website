import Image from "next/image";
import imgLeft1 from "/public/images/hero/left-1.png";
import imgLeft2 from "/public/images/hero/left-2.png";
import imgRight1 from "/public/images/hero/right-1.png";
import imgRight2 from "/public/images/hero/right-2.png";

export default function HeroGallery() {
  return (
    <div className="-space-y-12">
      <div className="flex items-start justify-center gap-x-4">
        <div className="relative">
          <Image
            src={imgLeft1}
            alt="Image of a hotel in algeria"
            height={1200}
            width={1200}
            className="mx-auto block size-auto"
          />

          {/* Floating Badge */}
          <div
            style={{
              borderRadius: "0.9375rem",
              background: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(17.5px)",
            }}
            className="absolute -left-20 top-1/2 -translate-y-1/2 border border-gray-500 border-opacity-15 p-4"
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
            className="size-auto"
          />
          {/* Floating Badge */}
          <div
            style={{
              borderRadius: "0.9375rem",
              background: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(17.5px)",
            }}
            className="absolute -top-5 left-1/2 w-max -translate-x-1/2 border border-gray-500 border-opacity-15 px-5 py-2"
          >
            <h3 className="text-h4 font-semibold">
              100% <span className="text-lg font-normal">Verified</span>
            </h3>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-center gap-x-4">
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
          className="size-auto"
        />
      </div>
    </div>
  );
}
