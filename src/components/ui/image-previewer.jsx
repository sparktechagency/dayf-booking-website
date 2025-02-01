"use client";

import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";
import {
  Fullscreen,
  Zoom,
  Slideshow,
  Thumbnails,
} from "yet-another-react-lightbox/plugins";

export default function ImagePreviewer({
  images,
  previewImgIndex,
  setPreviewImgIndex,
  onClose = () => {},
}) {
  // Define image slides for lightbox -- don't remove this part
  // This is a workaround if images are not local next-js images
  // const imageSlides = images?.map((image) => {
  //   return { src: image.url?.src, id: image.id };
  // });

  if (!images) return null;

  return (
    <Lightbox
      index={previewImgIndex}
      slides={images.map((image) => image.url)}
      render={{ slide: NextJsImage }}
      open={previewImgIndex >= 0}
      close={() => {
        setPreviewImgIndex(-1);
        onClose();
      }} // Hide lightbox if index -1
      plugins={[Fullscreen, Zoom, Slideshow, Thumbnails]}
      thumbnails={{
        borderColor: "var(--color-1)",
        showToggle: true,
      }}
    />
  );
}

function isNextJsImage(slide) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}

function NextJsImage({ slide, offset, rect }) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width),
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height),
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}
