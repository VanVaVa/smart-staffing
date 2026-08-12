import Image from "next/image";

import { EditableMedia, EditableText } from "@/shared/ui/editable-field";

import styles from "./TestimonialCard.module.css";

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
  itemIndex,
}: TestimonialCardProps) {
  const prefix = itemIndex !== undefined ? `items.${itemIndex}.` : "";

  return (
    <article className={styles["testimonial-card"]}>
      <div className={styles["testimonial-card__body"]}>
        <header className={styles["testimonial-card__header"]}>
          <div className={styles["testimonial-card__author"]}>
            <EditableMedia path={`${prefix}logoSrc`} label="Отзыв — логотип">
              <div className={styles["testimonial-card__logo"]}>
                <Image
                  src={logoSrc}
                  alt=""
                  width={logoWidth}
                  height={logoHeight}
                  className={styles["testimonial-card__logo-image"]}
                />
              </div>
            </EditableMedia>
            <div className={styles["testimonial-card__meta"]}>
              <EditableText
                path={`${prefix}company`}
                label="Отзыв — компания"
                className={styles["testimonial-card__company"]}
              >
                {company}
              </EditableText>
              <EditableText
                path={`${prefix}role`}
                label="Отзыв — роль"
                className={styles["testimonial-card__role"]}
              >
                {role}
              </EditableText>
            </div>
          </div>
          <EditableText
            path={`${prefix}date`}
            label="Отзыв — дата"
            as="time"
            className={styles["testimonial-card__date"]}
          >
            {date}
          </EditableText>
        </header>
        <EditableText
          path={`${prefix}quote`}
          label="Отзыв — цитата"
          as="p"
          className={styles["testimonial-card__quote"]}
          multiline
        >
          {quote}
        </EditableText>
      </div>
    </article>
  );
}
