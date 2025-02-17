import { ArrowRight } from "lucide-react";

export default function AnimatedArrow({ arrowSize, variant = "horizontal" }) {
  return variant === "horizontal" ? (
    <div className="relative overflow-hidden">
      <ArrowRight
        className="transition-all duration-500 ease-in-out-circ group-hover:translate-x-5"
        size={arrowSize || 18}
      />

      <ArrowRight
        className="absolute top-0 -translate-x-5 transition-all duration-500 ease-in-out-circ group-hover:translate-x-0"
        size={arrowSize || 18}
      />
    </div>
  ) : (
    <div className="relative h-fit w-fit overflow-hidden">
      <ArrowRight
        className="-rotate-45 transition-transform duration-500 ease-in-out-circ group-hover:-translate-y-5 group-hover:translate-x-5"
        size={arrowSize || 18}
      />
      <ArrowRight
        className="absolute top-0 -translate-x-5 translate-y-5 -rotate-45 transition-all duration-500 ease-in-out-circ group-hover:translate-x-0 group-hover:translate-y-0"
        size={arrowSize || 18}
      />
    </div>
  );
}
