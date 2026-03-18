/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

type ImageGalleryProps = React.ComponentProps<"div"> & {
  images: string[];
};

export default function ImageGallery({
  images,
  className,
  ...props
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div
      className={cn("w-full flex flex-col items-center gap-0.5", className)}
      data-slot="image-gallery"
      {...props}
    >
      <img
        alt=""
        src={images[activeIndex]}
        data-slot="image-gallery-preview"
        className="w-full object-cover rounded-md"
      />
      <div
        data-slot="image-gallery-thumbnails"
        className="mt-2 gap-1.5 overflow-x-auto grid grid-cols-5"
      >
        {images.map((url, index) => (
          <img
            alt=""
            key={index}
            src={url}
            data-slot="image-gallery-thumbnail"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "size-12.5 shrink-0 cursor-pointer rounded-sm object-cover border-2 transition-colors",
              index === activeIndex
                ? "border-primary"
                : "border-transparent hover:border-muted-foreground/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}
