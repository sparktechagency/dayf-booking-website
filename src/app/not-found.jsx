import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function NotFound() {
  const pathname = (await headers()).get("x-pathname");

  return (
    <div className="relative min-h-[75vh] place-content-center text-center">
      <h1 className="font-quicksand text-[6rem] font-bold leading-none text-p1">
        404
      </h1>

      <h3 className="mt-0 text-h2 font-semibold text-p1">Page Not Found</h3>

      <p className="mb-8 mt-3 text-gray-500">
        Could not find requested resource {JSON.stringify(pathname)}
      </p>

      <Button
        variant="primary"
        className="group mx-auto w-max rounded-full"
        size="lg"
        asChild
      >
        <Link href="/">
          Go Home <AnimatedArrow />
        </Link>
      </Button>

      {/* Star Floating Icons */}
      <Icon
        icon="iconoir:spark-solid"
        width="36"
        height="36"
        className="absolute left-40 top-28 animate-spin text-p1 duration-1000 ease-in-out repeat-1"
      />

      <Icon
        icon="iconoir:spark-solid"
        width="36"
        height="36"
        className="absolute bottom-28 right-40 animate-spin text-p1 duration-1000 ease-in-out repeat-1"
      />
    </div>
  );
}
