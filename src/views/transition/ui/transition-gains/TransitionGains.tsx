import Image from "next/image";

import { IMAGE_QUALITY } from "@/shared/config/image-quality";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { Container } from "@/shared/ui/container";

import { transitionGains } from "../../model/content";

import styles from "./TransitionGains.module.css";

export function TransitionGains() {
  return (
    <section className={styles["transition-gains"]} aria-label={transitionGains.label}>
      <Container>
        <div className={styles["transition-gains__stage"]}>
          <div className={styles["transition-gains__decor"]} aria-hidden>
            <span className={`${styles["transition-gains__orb"]} ${styles["transition-gains__orb--image"]}`} />
            <span className={`${styles["transition-gains__orb"]} ${styles["transition-gains__orb--orange"]}`} />
            <span className={`${styles["transition-gains__orb"]} ${styles["transition-gains__orb--violet"]}`} />
          </div>
          <div className={styles["transition-gains__panel"]}>
            <Image
              className={styles["transition-gains__image"]}
              src={transitionGains.imageSrc}
              alt=""
              width={1701}
              height={816}
              sizes="(max-width: 1050px) 100vw, 567px"
              quality={IMAGE_QUALITY.ui}
              priority
            />
            <ul className={styles["transition-gains__list"]}>
              {transitionGains.items.map((gain) => (
                <li key={gain} className={styles["transition-gains__item"]}>
                  <span className={styles["transition-gains__marker"]} aria-hidden>
                    <ArrowIcon name="cta" className={styles["transition-gains__marker-icon"]} />
                  </span>
                  <span className={styles["transition-gains__text"]}>{gain}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
