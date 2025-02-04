import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import ContactForm from "./_components/ContactForm";
import { Clock } from "lucide-react";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact us at DAYF for any kind of queries and issues you are facing. We are open to help you.",
};

export default function page() {
  return (
    <ResponsiveContainer className="flex-center min-h-screen">
      <div className="mx-auto rounded-2xl border p-4 shadow-sm lg:w-1/2">
        <h1 className="text-center text-h3 font-extrabold text-black lg:text-h2 2xl:text-h1">
          Get In Touch
        </h1>

        <div className="flex-center mb-10 mt-3 gap-x-4 text-gray-700">
          <div className="flex-center-start gap-x-3 text-left">
            <Clock size={18} />
            <p className="text-sm lg:text-base">We are available 24/7</p>
          </div>

          <div className="h-1 w-1 rounded-full bg-black" />

          <div className="flex-center-start gap-x-3 text-left">
            <Mail size={18} />
            <p className="text-sm lg:text-base">help@dayfbooking.com</p>
          </div>

          <div className="h-1 w-1 rounded-full bg-black" />

          <div className="flex-center-start gap-x-3 text-left">
            <Phone size={18} />
            <p className="text-sm lg:text-base">+1 (470) 286-4400</p>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </ResponsiveContainer>
  );
}
