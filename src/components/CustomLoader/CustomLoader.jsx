import { Loader } from "lucide-react";

export default function CustomLoader({ loaderSize, className }) {
  return (
    <div className={`flex h-full w-full items-center justify-center ${className}`}>
      <Loader className="animate-spin" size={loaderSize || 24} />
    </div>
  );
}
