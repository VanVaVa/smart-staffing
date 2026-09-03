"use client";

import Image from "next/image";
import { useState, type CSSProperties, type ReactNode } from "react";

import { IMAGE_QUALITY } from "@/shared/config/image-quality";
import { CoverImageFrame } from "@/shared/ui/cover-image-frame";
import { uploadAdminMedia } from "@/shared/lib/upload-admin-media";

import styles from "./AdminInlineImage.module.css";

type AdminInlineImageLayout = "fill" | "frame";

type AdminInlineImageProps = {
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt?: string;
  onChange: (patch: { imageSrc: string }) => void;
  disabled?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  layout?: AdminInlineImageLayout;
  objectFit?: "cover" | "contain";
  placeholderLabel?: string;
  children?: ReactNode;
};

export function AdminInlineImage({
  imageSrc,
  imageWidth,
  imageHeight,
  imageAlt = "",
  onChange,
  disabled,
  sizes,
  priority,
  className,
  imageClassName,
  layout = "fill",
  objectFit = "cover",
  placeholderLabel = "Добавить изображение",
  children,
}: AdminInlineImageProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFrame = layout === "frame";
  const hasAspectRatio = imageWidth > 0 && imageHeight > 0;
  const isEmpty = !imageSrc;
  const slotStyle =
    !children && hasAspectRatio && !isFrame
      ? ({ aspectRatio: `${imageWidth} / ${imageHeight}` } as CSSProperties)
      : undefined;

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const nextSrc = await uploadAdminMedia(file);
      onChange({ imageSrc: nextSrc });
    } catch {
      setError("Не удалось загрузить файл");
    } finally {
      setUploading(false);
    }
  }

  if (isFrame) {
    return (
      <div className={[styles["admin-inline-image"], styles["admin-inline-image--frame"]].join(" ")}>
        <div
          className={[styles["admin-inline-image__slot--frame"], className].filter(Boolean).join(" ")}
        >
          {imageSrc ? (
            children ?? (
              <CoverImageFrame
                className={styles["admin-inline-image__cover-frame"]}
                imageClassName={imageClassName}
                src={imageSrc}
                alt={imageAlt}
                sizes={sizes}
                priority={priority}
              />
            )
          ) : (
            <div
              className={[
                styles["admin-inline-image__placeholder"],
                styles["admin-inline-image__placeholder--frame"],
              ].join(" ")}
            >
              {placeholderLabel}
            </div>
          )}
          <div
            className={[
              styles["admin-inline-image__overlay"],
              isEmpty && styles["admin-inline-image__overlay--visible"],
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <label className={styles["admin-inline-image__button"]}>
              {uploading ? "Загрузка…" : isEmpty ? "Добавить" : "Заменить"}
              <input
                type="file"
                accept="image/*,.svg"
                hidden
                disabled={disabled || uploading}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void upload(file);
                  }
                  event.target.value = "";
                }}
              />
            </label>
          </div>
        </div>
        {error ? <p className={styles["admin-inline-image__error"]}>{error}</p> : null}
      </div>
    );
  }

  const fitClassName =
    objectFit === "contain"
      ? styles["admin-inline-image__contain"]
      : styles["admin-inline-image__cover"];

  return (
    <div className={[styles["admin-inline-image"], className].filter(Boolean).join(" ")}>
      <div
        className={[
          styles["admin-inline-image__slot"],
          objectFit === "cover" && styles["admin-inline-image__slot--cover"],
          children && styles["admin-inline-image__slot--fill"],
        ]
          .filter(Boolean)
          .join(" ")}
        style={slotStyle}
      >
        {imageSrc ? (
          children ?? (
            <Image
              className={[fitClassName, imageClassName].filter(Boolean).join(" ")}
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes={sizes}
              quality={IMAGE_QUALITY.ui}
              priority={priority}
            />
          )
        ) : (
          <div className={styles["admin-inline-image__placeholder"]}>{placeholderLabel}</div>
        )}
        <div
          className={[
            styles["admin-inline-image__overlay"],
            isEmpty && styles["admin-inline-image__overlay--visible"],
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <label className={styles["admin-inline-image__button"]}>
            {uploading ? "Загрузка…" : isEmpty ? "Добавить" : "Заменить"}
            <input
              type="file"
              accept="image/*,.svg"
              hidden
              disabled={disabled || uploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  void upload(file);
                }
                event.target.value = "";
              }}
            />
          </label>
        </div>
      </div>
      {error ? <p className={styles["admin-inline-image__error"]}>{error}</p> : null}
    </div>
  );
}
