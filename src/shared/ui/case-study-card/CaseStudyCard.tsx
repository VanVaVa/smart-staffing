"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

import { IMAGE_QUALITY } from "@/shared/config/image-quality";

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
  collapseLabel?: string;
  layout?: CaseStudyCardLayout;
};

const CARD_HEIGHT_TRANSITION_MS = 350;

function CaseStudyCardActionLink({
  href,
  className,
  ariaLabel,
}: {
  href: string;
  className: string;
  ariaLabel: string;
}) {
  if (href.startsWith("#") || href.startsWith("http")) {
    const externalLinkProps = href.startsWith("http")
      ? { target: "_blank" as const, rel: "noopener noreferrer" }
      : {};

    return (
      <a href={href} className={className} aria-label={ariaLabel} {...externalLinkProps}>
        <ArrowIcon name="round" />
      </a>
    );
  }

  return (
    <NextLink href={href} className={className} aria-label={ariaLabel}>
      <ArrowIcon name="round" />
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
  collapseLabel = "Свернуть",
  layout = "default",
}: CaseStudyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const skipHeightAnimationRef = useRef(true);
  const rootClassName = [
    styles["case-study-card"],
    layout === "compact-horizontal" && styles["case-study-card--compact-horizontal"],
    expanded && styles["case-study-card--expanded"],
  ]
    .filter(Boolean)
    .join(" ");
  const actionAriaLabel = `Перейти к кейсу: ${panelAlt}`;

  const toggleExpanded = () => {
    const card = cardRef.current;
    if (card) {
      card.style.height = `${card.getBoundingClientRect().height}px`;
    }
    setExpanded((current) => !current);
  };

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    if (skipHeightAnimationRef.current) {
      skipHeightAnimationRef.current = false;
      return;
    }

    card.classList.add(styles["case-study-card--animating"]);
    card.style.transition = `height ${CARD_HEIGHT_TRANSITION_MS}ms ease`;
    card.style.height = `${card.scrollHeight}px`;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== card || event.propertyName !== "height") {
        return;
      }

      card.removeEventListener("transitionend", handleTransitionEnd);
      card.classList.remove(styles["case-study-card--animating"]);
      card.style.transition = "";
      card.style.height = expanded ? "auto" : "";
    };

    card.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      card.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [expanded]);
  const logoStyle = {
    "--case-study-logo-max-width": `${logoWidth}px`,
    "--case-study-logo-max-height": `${logoHeight}px`,
  } as CSSProperties;

  const panelBackground = (
    <Image
      src={panelSrc}
      alt=""
      fill
      sizes="(max-width: 768px) 100vw, 571px"
      quality={IMAGE_QUALITY.ui}
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
        loading="eager"
        className={styles["case-study-card__panel-logo-image"]}
      />
    ) : null;

  return (
    <article ref={cardRef} className={rootClassName}>
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
        <button
          type="button"
          className={styles["case-study-card__read-more"]}
          aria-expanded={expanded}
          onClick={toggleExpanded}
        >
          {expanded ? collapseLabel : actionLabel}
          <ArrowIcon
            name="2Right"
            className={[
              styles["case-study-card__read-more-icon"],
              expanded && styles["case-study-card__read-more-icon--expanded"],
            ]
              .filter(Boolean)
              .join(" ")}
          />
        </button>
        <CaseStudyCardActionLink
          href={href}
          className={styles["case-study-card__action"]}
          ariaLabel={actionAriaLabel}
        />
      </div>
    </article>
  );
}
