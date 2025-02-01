"use client";

import Image from "next/image";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import img1 from "/public/images/wonders-around-you/wonders 1.webp";
import img2 from "/public/images/wonders-around-you/wonders 2.webp";
import img3 from "/public/images/wonders-around-you/wonders 3.webp";
import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const images = [
  {
    id: 1,
    img: img1,
    title: "Constantine",
    desc: "Charming Annaba is where Amazigh theologian St Augustine – a figure crucial to and “Father” of the Catholic Church – taught and wrote works that remain cornerstones of modern Christian theology. Augustine was bishop of Roman Hippo Regius, now a flower-filled ruin in the town suburbs. On a hill above is the Basilica de Saint Augustine, built by the French in the late 19th century and overlooking the Basilica of Peace, where Augustine taught and beneath which he was buried. It is still tended by Annaba’s Augustinian community and a site of Catholic pilgrimage.",
  },
  {
    id: 2,
    img: img2,
    title: "Timgad",
    desc: "Since the 4th century BCE, Constantine has occupied a rocky pinnacle above the river Rhumel, encircled by 200m(656ft)-deep ravines. It’s a pleasure to admire the ingenuity behind this improbably located city – and to snap pictures from the Sidi M’Cid Bridge and the Monument aux Morts, a WWI memorial that offers a bird’s-eye view. Once you hit the streets, you can visit the finely decorated Ottoman Palace of Ahmed Bey, the National Museum and the beautifully contemporary Emir Abdelkader Mosque, one of the largest on the continent.",
  },
  {
    id: 3,
    img: img3,
    title: "The Arch of Trajan",
    desc: "The Arch of Trajan (Italian: Arco di Traiano) is an ancient Roman triumphal arch in Benevento, southern Italy. It was erected in honour of the Emperor Trajan across the Via Appia, at the point where it enters the city. The arch was built between 114 and 117. In Lombard times, it was incorporated into the southern sector of the city walls and became known as Porta Aurea ('Golden Gate'). The church of Sant'Ilario, now housing the Videomuseum of the Arch, was built nearby. The arch was studied by Sebastiano Serlio in Renaissance times and drawn by Giovanni Battista Piranesi in the 18th century.",
  },
];

// Motion Variants
const fadeUpParentVariants = {
  initial: {
    opacity: 0,
    filter: "blur(5px)",
    y: 50,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0.1,
      staggerChildren: 0.3,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    filter: "blur(5px)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0.1,
      staggerChildren: 0.3,
    },
  },
};

const fadeUpChildVariants = {
  initial: {
    opacity: 0,
    filter: "blur(5px)",
    y: 50,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      type: "spring",
      stiffness: 210,
      damping: 40,
      mass: 1,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    filter: "blur(5px)",
  },
};

export default function WondersCarousel() {
  const sliderRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;

    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (!sliderRef) {
      return;
    }
  }, [sliderRef]);

  return (
    <div>
      <Swiper
        ref={sliderRef}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        spaceBetween={120}
        initialSlide={1}
        speed={900}
        parallax={true}
        loop={false}
        coverflowEffect={{
          rotate: 0,
          stretch: 1,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onActiveIndexChange={(e) => {
          if (e.isBeginning) {
            setIsBeginning(true);
            setIsEnd(false);
          } else if (e.isEnd) {
            setIsBeginning(false);
            setIsEnd(true);
          } else if (!e.isBeginning) {
            setIsBeginning(false);
            setIsEnd(false);
          } else if (!e.isEnd) {
            setIsBeginning(false);
            setIsEnd(false);
          }

          setActiveIndex(e.activeIndex);
        }}
        className="relative"
      >
        {images?.map((imgObj, idx) => (
          <SwiperSlide key={imgObj.id} className="overflow-hidden">
            <Image
              src={imgObj.img}
              alt={`Photo of ${imgObj.title}`}
              height={1200}
              width={1200}
              className={cn(
                "-z-10 h-[450px] w-full object-cover object-center",
              )}
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 to-transparent" />

            <AnimatePresence key="wonders-slider-text" mode="wait">
              {activeIndex === idx && (
                <motion.div
                  variants={fadeUpParentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={cn(
                    "absolute inset-0 top-5 w-full px-5 text-white",
                  )}
                >
                  <motion.h5
                    variants={fadeUpChildVariants}
                    className="text-h5 font-semibold"
                  >
                    {imgObj.title}
                  </motion.h5>

                  <motion.p variants={fadeUpChildVariants} className="mt-3">
                    {imgObj.desc}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </SwiperSlide>
        ))}

        <div className="flex-center-between absolute top-1/2 z-[9999] w-full -translate-y-1/2 space-x-2 px-10">
          <Button
            onClick={handlePrev}
            disabled={isBeginning}
            className="z-[9999] aspect-square size-20 rounded-full border-2 border-p1 bg-p1/10 text-xl text-p1 shadow-none hover:bg-p1 hover:text-white"
          >
            <ChevronLeft className="!size-10 stroke-2" />
          </Button>

          <Button
            onClick={handleNext}
            disabled={isEnd}
            className="z-[9999] aspect-square size-20 rounded-full border-2 border-p1 bg-p1/10 text-xl text-p1 shadow-none hover:bg-p1 hover:text-white"
          >
            <ChevronRight className="!size-10 stroke-2" />
          </Button>
        </div>
      </Swiper>
    </div>
  );
}
