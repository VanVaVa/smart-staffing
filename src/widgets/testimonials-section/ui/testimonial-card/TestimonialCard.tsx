"use client";

import Image from "next/image";
import cn from "classnames";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type TransitionEvent,
} from "react";

import { useMediaQuery } from "@/shared/lib/use-media-query";

import {
  getTestimonialExpandedMaxWidth,
  measureTestimonialExpandedHeight,
  measureTestimonialExpandedWidth,
  measureTestimonialQuoteHeight,
} from "../../lib/measure-testimonial-expanded-width";

import styles from "./TestimonialCard.module.css";

const MOBILE_EXPAND_QUERY = "(max-width: 450px)";
const EXPAND_TRANSITION_MS = 300;

type TestimonialCardProps = {
  company: string;
  role: string;
  date: string;
  quote: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  itemIndex?: number;
};

export function TestimonialCard({
  company,
  role,
  date,
  quote,
  logoSrc,
  logoWidth,
  logoHeight,
}: TestimonialCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteRevealed, setIsQuoteRevealed] = useState(false);
  const [expandedStyle, setExpandedStyle] = useState<CSSProperties>();
  const cardRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const collapsedWidthRef = useRef(0);
  const collapsedHeightRef = useRef(0);
  const isMobileExpand = useMediaQuery(MOBILE_EXPAND_QUERY);

  const storeCollapsedSize = useCallback(() => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const { width, height } = card.getBoundingClientRect();
    collapsedWidthRef.current = width;
    collapsedHeightRef.current = height;
  }, []);

  const syncExpandedSize = useCallback(() => {
    const card = cardRef.current;
    const quoteElement = quoteRef.current;

    if (!card || !quoteElement) {
      return;
    }

    if (!isOpen) {
      storeCollapsedSize();
      setExpandedStyle(undefined);
      setIsQuoteRevealed(false);
      return;
    }

    if (isMobileExpand) {
      const contentWidth = card.getBoundingClientRect().width;
      const quoteHeight = measureTestimonialQuoteHeight(quoteElement, contentWidth);
      const expandedHeight = measureTestimonialExpandedHeight(card, quoteElement);

      setExpandedStyle({
        "--testimonial-card-expanded-width": undefined,
        "--testimonial-card-expanded-height": `${expandedHeight}px`,
        "--testimonial-card-quote-max-height": `${quoteHeight}px`,
        "--testimonial-card-collapsed-height": `${collapsedHeightRef.current}px`,
      } as CSSProperties);
      setIsQuoteRevealed(true);
      return;
    }

    const collapsedWidth = collapsedWidthRef.current || card.getBoundingClientRect().width;
    const maxWidth = getTestimonialExpandedMaxWidth();
    const expandedWidth = measureTestimonialExpandedWidth(
      quoteElement,
      collapsedWidth,
      maxWidth,
    );

    setExpandedStyle({
      "--testimonial-card-expanded-width": `${expandedWidth}px`,
      "--testimonial-card-expanded-height": undefined,
      "--testimonial-card-quote-max-height": undefined,
      "--testimonial-card-collapsed-height": `${collapsedHeightRef.current}px`,
    } as CSSProperties);

    if (expandedWidth <= collapsedWidth + 1) {
      setIsQuoteRevealed(true);
    }
  }, [isMobileExpand, isOpen, storeCollapsedSize]);

  const handleClick = () => {
    const card = cardRef.current;
    const quoteElement = quoteRef.current;

    if (!card || !quoteElement) {
      return;
    }

    if (isOpen) {
      setIsQuoteRevealed(false);
      setIsOpen(false);
      setExpandedStyle(undefined);
      return;
    }

    storeCollapsedSize();

    if (isMobileExpand) {
      const contentWidth = card.getBoundingClientRect().width;
      const quoteHeight = measureTestimonialQuoteHeight(quoteElement, contentWidth);
      const expandedHeight = measureTestimonialExpandedHeight(card, quoteElement);

      setExpandedStyle({
        "--testimonial-card-expanded-height": `${expandedHeight}px`,
        "--testimonial-card-quote-max-height": `${quoteHeight}px`,
        "--testimonial-card-collapsed-height": `${collapsedHeightRef.current}px`,
      } as CSSProperties);
      setIsOpen(true);
      setIsQuoteRevealed(true);
      return;
    }

    const collapsedWidth = collapsedWidthRef.current || card.getBoundingClientRect().width;
    const maxWidth = getTestimonialExpandedMaxWidth();
    const expandedWidth = measureTestimonialExpandedWidth(
      quoteElement,
      collapsedWidth,
      maxWidth,
    );

    setExpandedStyle({
      "--testimonial-card-expanded-width": `${expandedWidth}px`,
      "--testimonial-card-collapsed-height": `${collapsedHeightRef.current}px`,
    } as CSSProperties);
    setIsOpen(true);
    setIsQuoteRevealed(expandedWidth <= collapsedWidth + 1);
  };

  const handleTransitionEnd = (event: TransitionEvent<HTMLElement>) => {
    if (event.target !== cardRef.current || isMobileExpand || !isOpen) {
      return;
    }

    if (event.propertyName === "width" || event.propertyName === "flex-basis") {
      setIsQuoteRevealed(true);
    }
  };

  useLayoutEffect(() => {
    if (!isOpen) {
      storeCollapsedSize();
      return;
    }

    syncExpandedSize();
  }, [isOpen, storeCollapsedSize, syncExpandedSize, quote]);

  useLayoutEffect(() => {
    if (!isOpen || isQuoteRevealed || isMobileExpand) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsQuoteRevealed(true);
    }, EXPAND_TRANSITION_MS + 50);

    return () => window.clearTimeout(timeoutId);
  }, [isMobileExpand, isOpen, isQuoteRevealed]);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    window.addEventListener("resize", syncExpandedSize);

    const card = cardRef.current;
    const resizeObserver = card ? new ResizeObserver(syncExpandedSize) : null;

    if (card && resizeObserver) {
      resizeObserver.observe(card);
    }

    return () => {
      window.removeEventListener("resize", syncExpandedSize);
      resizeObserver?.disconnect();
    };
  }, [isOpen, syncExpandedSize]);

  return (
    <article
      ref={cardRef}
      className={cn(
        styles["testimonial-card"],
        isOpen && styles["testimonial-card--open"],
        isQuoteRevealed && styles["testimonial-card--quote-revealed"],
      )}
      style={expandedStyle}
      aria-expanded={isOpen}
      onClick={handleClick}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={styles["testimonial-card__body"]}>
        <header className={styles["testimonial-card__header"]}>
          <div className={styles["testimonial-card__author"]}>
            <div>
              <div className={styles["testimonial-card__logo"]}>
                <Image
                  src={logoSrc}
                  alt=""
                  width={logoWidth}
                  height={logoHeight}
                  loading="eager"
                  className={styles["testimonial-card__logo-image"]}
                />
              </div>
            </div>
            <div className={styles["testimonial-card__meta"]}>
              <span className={styles["testimonial-card__company"]}>
                {company}
              </span>
              <span className={styles["testimonial-card__role"]}>
                {role}
              </span>
            </div>
          </div>
        </header>
        <p ref={quoteRef} className={styles["testimonial-card__quote"]}>
          {quote}
        </p>
      </div>
    </article>
  );
}
