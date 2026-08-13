import { EditableMedia } from "@/shared/ui/editable-field";

import styles from "./FeatureRowMedia.module.css";

type FeatureRowMediaVariant = "soft" | "muted";

type FeatureRowMediaProps = {
  rowIndex: number;
  mediaSrc: string;
  mediaAlt: string;
  mediaWidth: number;
  mediaHeight: number;
  mediaPath?: string;
};

function resolveMediaVariant(rowIndex: number): FeatureRowMediaVariant | undefined {
  if (rowIndex === 0 || rowIndex === 1) {
    return "soft";
  }

  if (rowIndex === 3 || rowIndex === 4) {
    return "muted";
  }

  return undefined;
}

function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm)$/i.test(src);
}

function hasMediaSrc(src: string): boolean {
  return src.trim().length > 0;
}

export function FeatureRowMedia({
  rowIndex,
  mediaSrc,
  mediaAlt,
  mediaWidth,
  mediaHeight,
  mediaPath,
}: FeatureRowMediaProps) {
  const variant = resolveMediaVariant(rowIndex);
  const rootClass = [
    styles["feature-row-media"],
    styles[`feature-row-media--${rowIndex}`],
    variant ? styles[`feature-row-media--${variant}`] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const hasMedia = hasMediaSrc(mediaSrc);

  const mediaNode = hasMedia
    ? isVideoSrc(mediaSrc)
      ? (
          <video
            className={styles["feature-row-media__animation"]}
            src={mediaSrc}
            width={mediaWidth}
            height={mediaHeight}
            autoPlay
            loop
            muted
            playsInline
            aria-label={mediaAlt}
          />
        )
      : (
          <img
            className={styles["feature-row-media__animation"]}
            src={mediaSrc}
            alt={mediaAlt}
            width={mediaWidth}
            height={mediaHeight}
          />
        )
    : null;

  const slotNode = mediaPath ? (
    <EditableMedia
      path={mediaPath}
      label="Решение — медиа"
      className={styles["feature-row-media__slot"]}
    >
      {mediaNode}
    </EditableMedia>
  ) : (
    mediaNode
  );

  return (
    <figure className={rootClass}>
      <div className={styles["feature-row-media__viewport"]}>{slotNode}</div>
    </figure>
  );
}
