import { footerContent } from "@/entities/landing";
import { Text } from "@/shared/ui";

import styles from "./FooterBottom.module.css";

export function FooterBottom() {
  return (
    <div className={styles["footer-bottom"]}>
      <nav className={styles["footer-bottom__legal"]} aria-label="Юридическая информация">
        {footerContent.legal.map((item) => (
          <Text
            key={item.label}
            as="a"
            href={item.href}
            size="xl"
            className={`${styles["footer-bottom__muted"]} ${styles["footer-bottom__link"]}`}
          >
            {item.label}
          </Text>
        ))}
      </nav>
      <Text as="span" size="xl" className={styles["footer-bottom__muted"]}>
        {footerContent.copyright}
      </Text>
    </div>
  );
}
