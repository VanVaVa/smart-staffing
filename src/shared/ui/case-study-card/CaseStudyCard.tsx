import type { CSSProperties } from "react";
import Image from "next/image";
import NextLink from "next/link";
import type { ReactNode } from "react";

import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { Badge } from "@/shared/ui/badge";

import styles from "./CaseStudyCard.module.css";

type CaseStudyCardLayout = "default" | "compact-horizontal";

type CaseStudyCardProps = {
  href: string;
  panelSrc: string;
  panelAlt: string;
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  description: string;
  metric: string;
  metricLabel: string;
  tag?: string;
  actionLabel?: string;
  layout?: CaseStudyCardLayout;
};

function CaseStudyCardRoot({
  href,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  className: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  if (href.startsWith("#") || href.startsWith("http")) {
    return (
      <a href={href} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={className} aria-label={ariaLabel}>
      {children}
    </NextLink>
  );
}

export function CaseStudyCard({
  href,
  panelSrc,
  panelAlt,
  logoSrc,
  logoWidth = 280,
  logoHeight = 60,
  description,
  metric,
  metricLabel,
  tag,
  actionLabel = "Читать далее",
  layout = "default",
}: CaseStudyCardProps) {
  const rootClassName = [
    styles["case-study-card"],
    layout === "compact-horizontal" && styles["case-study-card--compact-horizontal"],
  ]
    .filter(Boolean)
    .join(" ");
  const ariaLabel = `${panelAlt}. ${actionLabel}`;
  const logoStyle = {
    "--case-study-logo-max-width": `${logoWidth}px`,
    "--case-study-logo-max-height": `${logoHeight}px`,
  } as CSSProperties;

  const panelBackground = (
    <Image
      src={panelSrc}
      alt=""
      width={571}
      height={484}
      className={styles["case-study-card__panel-bg-image"]}
      data-header-backdrop-source=""
      aria-hidden
    />
  );

  const panelLogo =
    logoSrc !== undefined ? (
      <Image
        src={logoSrc}
        alt={panelAlt}
        width={logoWidth}
        height={logoHeight}
        className={styles["case-study-card__panel-logo-image"]}
      />
    ) : null;

  return (
    <CaseStudyCardRoot
      href={href}
      className={rootClassName}
      ariaLabel={ariaLabel}
    >
      <div className={styles["case-study-card__panel"]}>
        <div className={styles["case-study-card__panel-media"]}>
          <div className={styles["case-study-card__panel-bg"]}>{panelBackground}</div>
          {panelLogo ? (
            <div className={styles["case-study-card__panel-logo"]} style={logoStyle}>
              {panelLogo}
            </div>
          ) : null}
        </div>
        {layout === "compact-horizontal" && tag ? (
          <div className={styles["case-study-card__panel-header"]}>
            <Badge variant="tag" className={styles["case-study-card__panel-tag"]}>
              {tag}
            </Badge>
          </div>
        ) : null}
        <div className={styles["case-study-card__metric-block"]}>
          <div className={styles["case-study-card__metric-bar"]} aria-hidden />
          <div className={styles["case-study-card__metric-copy"]}>
            <p className={styles["case-study-card__metric"]}>{metric}</p>
            <p className={styles["case-study-card__metric-label"]}>{metricLabel}</p>
          </div>
        </div>
      </div>
      <div className={styles["case-study-card__content"]}>
        <div className={styles["case-study-card__lead"]}>
          {tag ? (
            <Badge variant="tag" className={styles["case-study-card__tag"]}>
              {tag}
            </Badge>
          ) : null}
          <p className={styles["case-study-card__description"]}>{description}</p>
        </div>
      </div>
      <div className={styles["case-study-card__footer"]}>
        <span className={styles["case-study-card__read-more"]}>
          {actionLabel}
          <ArrowIcon name="2Right" className={styles["case-study-card__read-more-icon"]} />
        </span>
        <span className={styles["case-study-card__action"]} aria-hidden>
          <ArrowIcon name="round" />
        </span>
      </div>
    </CaseStudyCardRoot>
  );
}
