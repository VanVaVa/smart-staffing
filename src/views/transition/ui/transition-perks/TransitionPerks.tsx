import Image from "next/image";

import { IMAGE_QUALITY } from "@/shared/config/image-quality";

import { transitionPerks } from "../../model/content";
import { TransitionCard } from "../transition-card";
import { TransitionIcon } from "../transition-icon";
import {
  MockAvatar,
  MockButton,
  MockChip,
  MockRow,
  MockSheet,
  MockTabs,
  MockToggle,
} from "../transition-mock";

import styles from "./TransitionPerks.module.css";

export function TransitionPerks() {
  const { cards } = transitionPerks;
  const cardClass = styles["transition-perks__card"];

  return (
    <ul className={styles["transition-perks"]}>
      <TransitionCard title={cards.lists} className={cardClass}>
        <MockSheet>
          <MockTabs items={["Чёрный список"]} active={0} />
          <MockRow>
            <span>Конкурент</span>
            <MockToggle on />
          </MockRow>
          <MockRow>
            <span>Банк</span>
            <MockToggle on={false} />
          </MockRow>
          <MockRow>
            <span>ИТ‑интегратор</span>
            <MockToggle on={false} />
          </MockRow>
        </MockSheet>
      </TransitionCard>
      <TransitionCard title={cards.contour} className={`${cardClass} ${styles["transition-perks__photo"]}`}>
        <Image
          className={styles["transition-perks__photo-image"]}
          src={transitionPerks.imageSrc}
          alt=""
          fill
          sizes="(max-width: 576px) 100vw, (max-width: 1050px) 50vw, 25vw"
          quality={IMAGE_QUALITY.ui}
        />
      </TransitionCard>
      <TransitionCard title={cards.consent} className={cardClass}>
        <MockSheet>
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
      </TransitionCard>
      <TransitionCard title={cards.decision} tone="dark" className={cardClass}>
        <TransitionIcon name="userCheck" className={styles["transition-perks__icon"]} />
        <MockSheet>
          <span className={styles["transition-perks__label"]}>Предложение о работе</span>
          <span className={styles["transition-perks__role"]}>Backend‑разработчик</span>
          <span className={styles["transition-perks__company"]}>Банк</span>
          <div className={styles["transition-perks__actions"]}>
            <MockButton variant="primary">Участвовать</MockButton>
            <MockButton variant="secondary">Отказаться</MockButton>
          </div>
        </MockSheet>
      </TransitionCard>
    </ul>
  );
}
