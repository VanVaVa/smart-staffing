import { footerContent } from "@/entities/landing";

import { FooterAbout } from "./footer-about";
import { FooterBottom } from "./footer-bottom";
import { FooterContacts } from "./footer-contacts";
import { FooterLinkColumn } from "./footer-link-column";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__inset}>
          <FooterAbout />
          <div className={styles.footer__columns}>
            <FooterLinkColumn title="Меню" items={footerContent.menu} />
            <FooterLinkColumn title="Клиентам" items={footerContent.solutions} />
            <FooterContacts />
          </div>
        </div>
      </div>
      <div className={styles.footer__inset}>
        <FooterBottom />
      </div>
    </footer>
  );
}
