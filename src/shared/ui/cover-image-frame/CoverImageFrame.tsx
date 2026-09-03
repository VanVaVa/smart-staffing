import Image from "next/image";

import { IMAGE_QUALITY } from "@/shared/config/image-quality";

import styles from "./CoverImageFrame.module.css";

type CoverImageFrameProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

export function CoverImageFrame({
  src,
  alt,
  sizes,
  priority,
  className,
  imageClassName,
}: CoverImageFrameProps) {
  return (
    <div className={[styles["cover-image-frame"], className].filter(Boolean).join(" ")}>
      <Image
        className={[styles["cover-image-frame__image"], imageClassName].filter(Boolean).join(" ")}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={IMAGE_QUALITY.ui}
        priority={priority}
      />
    </div>
  );
}
