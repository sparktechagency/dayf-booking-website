import { Loader } from "lucide-react";

export default function CustomLoader({ loaderSize }) {
  return <Loader className="animate-spin" size={loaderSize || 24} />;
}
