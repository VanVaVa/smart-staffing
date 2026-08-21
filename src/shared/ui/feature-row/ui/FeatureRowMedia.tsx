import styles from "./FeatureRowMedia.module.css";

type FeatureRowMediaProps = {
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

function getVideoSources(src: string): { webm: string; mp4: string } {
  const extensionPattern = /\.(mp4|webm)$/i;

  return {
    webm: src.replace(extensionPattern, ".webm"),
    mp4: src.replace(extensionPattern, ".mp4"),
  };
}

export function FeatureRowMedia({
  mediaSrc,
  mediaAlt,
  mediaWidth,
  mediaHeight,
  reversed,
}: FeatureRowMediaProps) {
  const isAnimated = isAnimatedSrc(mediaSrc);
  const videoSources = isVideoSrc(mediaSrc)
    ? getVideoSources(mediaSrc)
    : null;
  const rootClass = [
    styles["feature-row-media"],
    isAnimated ? styles["feature-row-media--animated"] : "",
    reversed
      ? styles["feature-row-media--edge-inline-start"]
      : styles["feature-row-media--edge-inline-end"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={rootClass}>
      <div
        className={styles["feature-row-media__viewport"]}
        style={{ aspectRatio: `${mediaWidth} / ${mediaHeight}` }}
      >
        <div className={styles["feature-row-media__slot"]}>
          {mediaSrc.trim().length === 0 ? null : videoSources ? (
            <video
              className={styles["feature-row-media__animation"]}
              width={mediaWidth}
              height={mediaHeight}
              autoPlay
              loop
              muted
              playsInline
              aria-label={mediaAlt}
            >
              <source src={videoSources.webm} type="video/webm" />
              <source src={videoSources.mp4} type="video/mp4" />
            </video>
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
