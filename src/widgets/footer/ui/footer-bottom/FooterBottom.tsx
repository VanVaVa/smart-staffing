import type { FooterLinkItem } from "@/entities/landing/model/footer-blocks";
import { companyRequisites } from "@/shared/config";
import { Text } from "@/shared/ui";

import { FooterLinkItem as FooterLinkItemView } from "../footer-link-item";
import styles from "./FooterBottom.module.css";

type FooterBottomProps = {
  legal: FooterLinkItem[];
  copyright: string;
};

export function FooterBottom({ legal, copyright }: FooterBottomProps) {
  return (
    <div className={styles["footer-bottom"]}>
      <nav className={styles["footer-bottom__legal"]} aria-label="Юридическая информация">
        {legal.map((item, index) => (
          <FooterLinkItemView
            key={`${item.label}-${index}`}
            label={item.label}
            href={item.href}
            linkClassName={`${styles["footer-bottom__muted"]} ${styles["footer-bottom__link"]}`}
          />
        ))}
      </nav>
      <Text
        as="span"
        size="xl"
        className={`${styles["footer-bottom__muted"]} ${styles["footer-bottom__copyright"]}`}
      >
        <span>{copyright}</span>
      </Text>
      <Text
        as="span"
        size="xl"
        className={`${styles["footer-bottom__muted"]} ${styles["footer-bottom__requisites"]}`}
      >
        {companyRequisites}
      </Text>
    </div>
  );
}
