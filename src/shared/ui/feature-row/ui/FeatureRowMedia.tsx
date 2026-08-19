import styles from "./FeatureRowMedia.module.css";

type FeatureRowMediaProps = {
  rowIndex: number;
  mediaSrc: string;
  mediaAlt: string;
  mediaWidth: number;
  mediaHeight: number;
  reversed?: boolean;
};

function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm)$/i.test(src);
}

function isAnimatedSrc(src: string): boolean {
  return /\.(gif|mp4|webm)$/i.test(src);
}

export function FeatureRowMedia({
  rowIndex,
  mediaSrc,
  mediaAlt,
  mediaWidth,
  mediaHeight,
  reversed,
}: FeatureRowMediaProps) {
  const isAnimated = isAnimatedSrc(mediaSrc);
  const rootClass = [
    styles["feature-row-media"],
    styles[`feature-row-media--${rowIndex}`],
    isAnimated ? styles["feature-row-media--animated"] : "",
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
