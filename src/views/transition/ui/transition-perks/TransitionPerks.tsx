import Image from "next/image";

import { IMAGE_QUALITY } from "@/shared/config/image-quality";

import { transitionPerks } from "../../model/content";
import { TransitionIcon } from "../transition-icon";
import { MockAvatar, MockChip, MockRow, MockSheet, MockTabs, MockToggle } from "../transition-mock";

import styles from "./TransitionPerks.module.css";

export function TransitionPerks() {
  const { cards } = transitionPerks;
  const cardClass = styles["transition-perks__card"];

  return (
    <ul className={styles["transition-perks"]}>
      <li className={`${cardClass} ${styles["transition-perks__card--lists"]}`}>
        <h3 className={styles["transition-perks__title"]}>{cards.lists.title}</h3>
        <p className={styles["transition-perks__text"]}>{cards.lists.text}</p>
        <MockSheet className={styles["transition-perks__lists-sheet"]}>
          <MockTabs items={["Черный список"]} active={0} />
          <MockRow>
            <span>Банк</span>
            <MockToggle on />
          </MockRow>
          <MockRow>
            <span>ИТ‑интегратор</span>
            <MockToggle on />
          </MockRow>
          <MockRow>
            <span>Конкурент</span>
            <MockToggle on={false} />
          </MockRow>
        </MockSheet>
      </li>
      <li className={`${cardClass} ${styles["transition-perks__card--contour"]}`}>
        <div className={styles["transition-perks__copy"]}>
          <h3 className={styles["transition-perks__title"]}>{cards.contour.title}</h3>
          <p className={styles["transition-perks__text"]}>{cards.contour.text}</p>
        </div>
        <div className={styles["transition-perks__photo"]}>
          <Image
            className={styles["transition-perks__photo-image"]}
            src={transitionPerks.imageSrc}
            alt=""
            fill
            sizes="(max-width: 576px) 100vw, (max-width: 1050px) 50vw, 25vw"
            quality={IMAGE_QUALITY.ui}
          />
        </div>
      </li>
      <li className={`${cardClass} ${styles["transition-perks__card--decision"]}`}>
        <TransitionIcon name="userCheck" className={styles["transition-perks__icon"]} />
        <h3 className={styles["transition-perks__title"]}>{cards.decision.title}</h3>
        <p className={styles["transition-perks__text"]}>{cards.decision.text}</p>
      </li>
      <li className={`${cardClass} ${styles["transition-perks__card--consent"]}`}>
        <div className={styles["transition-perks__consent-mock"]}>
          <MockSheet compact className={styles["transition-perks__consent-sheet"]}>
            <div className={styles["transition-perks__person"]}>
              <MockAvatar initials="J" tone="violet" />
              <span>Java‑разработчик</span>
            </div>
            <MockChip tone="success">✓ Согласие получено</MockChip>
            <MockRow>
              <span>Банк</span>
              <MockChip tone="violet">Профиль открыт</MockChip>
            </MockRow>
            <MockRow>
              <span>Остальные</span>
              <MockChip tone="muted">Скрыт</MockChip>
            </MockRow>
          </MockSheet>
        </div>
        <div className={styles["transition-perks__copy"]}>
          <h3 className={styles["transition-perks__title"]}>{cards.consent.title}</h3>
          <p className={styles["transition-perks__text"]}>{cards.consent.text}</p>
        </div>
      </li>
    </ul>
  );
}
