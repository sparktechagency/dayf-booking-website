import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import PropertyRegistrationForm from "./PropertyRegistrationForm";
import PropertyTypewriterEffect from "./PropertyTypewriterEffect";

const ListPropertyHero = () => {
  return (
    <div className="rounded-b-[35px] bg-white py-10">
      <ResponsiveContainer className="flex-center-between gap-10">
        <div className="xl:w-[52%]">
          <h1 className="heading-gradient heading w-[75%] font-quicksand">
            List Your
            <br /> <PropertyTypewriterEffect /> <br /> on DAYF Booking
          </h1>
          <p className="description mt-3">
            Discover handpicked hotels and accommodations across Algeria’s most
            captivating destinations. Whether you’re planning a city escape, a
            coastal retreat, or a desert adventure, we’ve got you covered.
          </p>
        </div>

        <div className="xl:flex-1">
          <PropertyRegistrationForm />
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default ListPropertyHero;
