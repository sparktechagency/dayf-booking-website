import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import TestimonialsCarousel from "./TestimonialsCarousel";
import userImg from "/public/images/testimonials/user-1.webp";

const testimonials = Array.from({ length: 6 }).map((_, idx) => ({
  id: idx,
  img: userImg,
  rating: 5,
  reviewTitle: "I can't imagine booking a hotel without this app now",
  reviewDesc:
    "Sofitel Algiers Hamma Garden offers luxurious accommodations overlooking the stunning Botanical Garden of Hamma. With world-class dining, a relaxing spa, and proximity to Algiers’ top landmarks, it’s the perfect blend of elegance and convenience.",
  user: "Steve Smith",
  reviewedAt: "2 days ago",
}));

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
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </ResponsiveContainer>
    </section>
  );
}
