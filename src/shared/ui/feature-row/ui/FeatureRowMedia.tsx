import styles from "./FeatureRowMedia.module.css";

type FeatureRowMediaVariant = "soft" | "muted";

type FeatureRowMediaProps = {
  rowIndex: number;
  mediaSrc: string;
  mediaAlt: string;
  mediaWidth: number;
  mediaHeight: number;
  reversed?: boolean;
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

export function FeatureRowMedia({
  rowIndex,
  mediaSrc,
  mediaAlt,
  mediaWidth,
  mediaHeight,
  reversed,
}: FeatureRowMediaProps) {
  const variant = resolveMediaVariant(rowIndex);
  const rootClass = [
    styles["feature-row-media"],
    styles[`feature-row-media--${rowIndex}`],
    variant ? styles[`feature-row-media--${variant}`] : "",
    reversed
      ? styles["feature-row-media--edge-inline-start"]
      : styles["feature-row-media--edge-inline-end"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={rootClass}>
      <div className={styles["feature-row-media__viewport"]}>
        <div className={styles["feature-row-media__slot"]}>
          {mediaSrc.trim().length === 0 ? null : isVideoSrc(mediaSrc) ? (
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
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={styles["feature-row-media__animation"]}
              src={mediaSrc}
              alt={mediaAlt}
              width={mediaWidth}
              height={mediaHeight}
            />
          )}
        </div>
      </div>
    </figure>
  );
}
