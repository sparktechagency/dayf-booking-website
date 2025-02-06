"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FullScreenPreviewButton } from "./DynamicPropertyImageGallery";
import { useState } from "react";
import ImagePreviewer from "@/components/ui/image-previewer";

export default function ImageGalleryModal({ open, setOpen, hotel }) {
  const [previewImgIndex, setPreviewImgIndex] = useState(-1);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        className="border-2 border-blue-500"
      >
        <DialogTrigger></DialogTrigger>
        <DialogContent className="max-w-[90%] xl:max-w-[85%]">
          <DialogHeader>
            <DialogTitle className="font-quicksand text-3xl font-semibold">
              Photos of {hotel.name}
            </DialogTitle>

            <Separator orientation="horizontal" className="" />

            <DialogDescription className="sr-only">
              All images of {hotel.name}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4">
            {hotel.images.map((image) => (
              <div key={image.id} className="group relative">
                <Image
                  src={image.url}
                  alt={image.alt || `Photo of ${hotel.name}`}
                  width={500}
                  height={500}
                  placeholder="blur"
                  className="aspect-square h-[300px] w-full object-cover transition-all duration-500 ease-in-out group-hover:brightness-75"
                />

                <FullScreenPreviewButton
                  className="px-5 py-3"
                  iconSize={20}
                  setImagePreviewIndex={() => setPreviewImgIndex(image.id)}
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <ImagePreviewer
        images={hotel.images}
        previewImgIndex={previewImgIndex}
        setPreviewImgIndex={setPreviewImgIndex}
        onClose={() => setOpen(true)}
      />
    </>
  );
}
