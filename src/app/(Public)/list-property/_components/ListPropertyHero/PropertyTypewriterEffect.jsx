"use client";

import { Typewriter } from "react-simple-typewriter";

const PropertyTypewriterEffect = () => {
  return (
    <Typewriter
      words={["Property", "Hotel", "Apartment"]}
      loop
      typeSpeed={120}
    />
  );
};

export default PropertyTypewriterEffect;
