import Image from "next/image";

import { routes } from "@/shared/config";
import { Button } from "@/shared/ui/button";

import styles from "./NotFoundPage.module.css";

const NOT_FOUND_MESSAGE =
  "Не\u00a0удалось найти эту\u00a0страницу. Возможно, она\u00a0изменила адрес или\u00a0была удалена.";

export function NotFoundPage() {
  return (
    <div className={styles["not-found-page"]}>
      <section
        className={styles["not-found-page__section"]}
      >
        <div className={styles["not-found-page__decor"]} aria-hidden>
          <div className={styles["not-found-page__gradient"]} />
          <div
            className={`${styles["not-found-page__orb"]} ${styles["not-found-page__orb--purple-large"]}`}
          />
          <div
            className={`${styles["not-found-page__orb"]} ${styles["not-found-page__orb--purple-medium"]}`}
          />
          <div
            className={`${styles["not-found-page__orb"]} ${styles["not-found-page__orb--orange-medium"]}`}
          />
          <div
            className={`${styles["not-found-page__orb"]} ${styles["not-found-page__orb--orange-small"]}`}
          />
        </div>

        <div className={styles["not-found-page__content"]}>
          <Image
            className={styles["not-found-page__digits"]}
            src="/landing/404-digits.svg"
            alt=""
            width={602}
            height={228}
            priority
          />

          <div className={styles["not-found-page__copy"]}>
            <p className={styles["not-found-page__description"]}>{NOT_FOUND_MESSAGE}</p>
            <Button
              href={routes.home}
              variant="primary"
              size="lg"
              withArrow
              className={styles["not-found-page__button"]}
            >
              Вернуться на главную
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
