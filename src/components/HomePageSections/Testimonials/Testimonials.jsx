import ResponsiveContainer from "../../../components/ResponsiveContainer/ResponsiveContainer";
import TestimonialsCarousel from "./TestimonialsCarousel";

export default function Testimonials() {
  return (
    <section className="rounded-[2.8rem] bg-white pb-16 pt-12">
      <ResponsiveContainer>
        <div className="mx-auto mb-16 text-center xl:w-3/4">
          <h1 className="heading">Hear From Our Satisfied Customers</h1>
          <p className="description mt-3">
            Discover what others are saying about their stay with us! Read
            honest reviews and ratings from past guests to help you make the
            best decision for your next trip.
          </p>
        </div>

        <div className="mx-auto xl:w-[60%]">
          <TestimonialsCarousel />
        </div>
      </ResponsiveContainer>
    </section>
  );
}
