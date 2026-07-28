import Link from "next/link";

import { routes } from "@/shared/config";

import styles from "./FooterAbout.module.css";

export function FooterAbout() {
  return (
    <div className={styles["footer-about"]}>
      <div className={styles["footer-about__logos-row"]}>
        <Link href={routes.home} className={styles["footer-about__logo"]}>
          <img
            src="/logo-footer.svg"
            alt=""
            width={265}
            height={96}
            className={styles["footer-about__logo-image"]}
            aria-hidden
          />
        </Link>
        <img
          src="/logo-skolkovo.png"
          alt="Сколково"
          width={270}
          height={76}
          className={styles["footer-about__skolkovo-logo"]}
        />
      </div>
    </div>
  );
}
