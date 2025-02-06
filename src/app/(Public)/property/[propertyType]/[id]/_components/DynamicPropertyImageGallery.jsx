"use client";

import { useState } from "react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./DynamicProperty.css";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import ImagePreviewer from "@/components/ui/image-previewer";
import ImageGalleryModal from "./ImageGalleryModal";

export default function DynamicPropertyImageGallery({ property, images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imagePreviewIndex, setImagePreviewIndex] = useState(-1); // img index -1 to hide lightbox
  const [showImageGalleryModal, setShowImageGalleryModal] = useState(false);

  return (
    <section className="flex-stretch-start dynamic-hotel-image-gallery mt-8 gap-x-[5px]">
      {/* Thumb Carousel */}
      <div className="h-[65vh] w-3/4">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={5}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          autoplay={{
            delay: 4500,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          speed={1000}
          className={"largeSwiper"}
        >
          {images?.slice(0, images?.length - 3)?.map((img) => (
            <SwiperSlide
              key={img.id}
              className={"swiperSlide group relative cursor-pointer"}
            >
              <Image
                src={img?.url}
                alt={`Photo of Hotel_Name`}
                height={1600}
                width={1600}
                placeholder="blur"
                className="object-cover object-center transition-all duration-500 ease-in-out group-hover:brightness-75"
              />

              {/* Full Screen Preview Overlay */}
              <FullScreenPreviewButton
                setImagePreviewIndex={() => setImagePreviewIndex(img.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={5}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={"thumbSwiper"}
          speed={1000}
        >
          {images?.slice(0, 8)?.map((img) => (
            <SwiperSlide key={img.id} className={"swiperSlide"}>
              <Image
                src={img?.url}
                alt={`Photo of Hotel_Name`}
                height={400}
                width={400}
                placeholder="blur"
                className="object-cover object-center"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Side - Static Images */}
      <div className="h-[65vh] w-1/4 space-y-[5px]">
        {images?.slice(8)?.map((img, idx) => (
          <div key={img.id} className="group relative h-[32.8%]">
            <Image
              src={img?.url}
              alt={`Photo of Hotel_Name`}
              height={500}
              width={700}
              placeholder="blur"
              className={cn(
                "h-full object-cover object-center transition-all duration-300 ease-in-out",
                idx === images?.slice(8).length - 1
                  ? "brightness-50"
                  : "group-hover:brightness-75",
              )}
            />

            {idx !== images?.slice(8).length - 1 && (
              <FullScreenPreviewButton
                className="px-5 py-3"
                iconSize={20}
                setImagePreviewIndex={() => setImagePreviewIndex(img.id)}
              />
            )}

            {idx === images?.slice(8).length - 1 && (
              <button
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-b-2 border-b-white font-extrabold text-white"
                onClick={() => setShowImageGalleryModal(true)}
              >
                View All {images.length} Images
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Image Previewer */}
      <ImagePreviewer
        images={images}
        previewImgIndex={imagePreviewIndex}
        setPreviewImgIndex={setImagePreviewIndex}
      />

      {/* All Image Modal */}
      <ImageGalleryModal
        open={showImageGalleryModal}
        setOpen={setShowImageGalleryModal}
        hotel={property}
      />
    </section>
  );
}

export const FullScreenPreviewButton = ({
  className,
  iconSize = 26,
  setImagePreviewIndex,
}) => {
  return (
    <button
      className={cn(
        "flex-center-start invisible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-x-2 bg-white/70 px-10 py-5 opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100",
        className,
      )}
      onClick={setImagePreviewIndex}
    >
      <Icon icon="flowbite:expand-outline" height={iconSize} width={iconSize} />
      <span>Full Preview</span>
    </button>
  );
};
