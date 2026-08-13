import type { CSSProperties } from "react";

import { EditableMedia } from "@/shared/ui/editable-field";

import styles from "./AboutTrustedLogoCard.module.css";

type AboutTrustedLogoCardProps = {
  cellWidth: number;
  src: string;
  logoWidth: number;
  logoHeight: number;
  mediaPath: string;
};

export function AboutTrustedLogoCard({
  cellWidth,
  src,
  logoWidth,
  logoHeight,
  mediaPath,
}: AboutTrustedLogoCardProps) {
  const style = {
    "--about-trusted-card-width": `${cellWidth}px`,
    "--about-trusted-logo-width": `${logoWidth}px`,
    "--about-trusted-logo-height": `${logoHeight}px`,
  } as CSSProperties;

  return (
    <div className={styles["about-trusted-logo-card"]} style={style}>
      <EditableMedia path={mediaPath} label="Логотип партнёра">
        <img
          src={src}
          alt=""
          draggable={false}
          className={styles["about-trusted-logo-card__logo"]}
        />
      </EditableMedia>
    </div>
  );
}
