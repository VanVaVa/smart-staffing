import type { CSSProperties } from "react";

import styles from "./AboutTrustedLogoCard.module.css";

type AboutTrustedLogoCardProps = {
  cellWidth: number;
  src: string;
  logoWidth: number;
  logoHeight: number;
};

export function AboutTrustedLogoCard({
  cellWidth,
  src,
  logoWidth,
  logoHeight,
}: AboutTrustedLogoCardProps) {
  const style = {
    "--about-trusted-card-width": `${cellWidth}px`,
    "--about-trusted-logo-width": `${logoWidth}px`,
    "--about-trusted-logo-height": `${logoHeight}px`,
  } as CSSProperties;

  return (
    <div className={styles["about-trusted-logo-card"]} style={style}>
      <div>
        <img
          src={src}
          alt=""
          draggable={false}
          className={styles["about-trusted-logo-card__logo"]}
        />
      </div>
    </div>
  );
}
