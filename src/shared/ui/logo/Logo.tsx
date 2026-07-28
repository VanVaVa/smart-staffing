import Link from "next/link";

import { routes } from "@/shared/config";

import styles from "./Logo.module.css";

type LogoProps = {
  light?: boolean;
};

export function Logo({ light }: LogoProps) {
  const rootClass = [
    styles.logo,
    light ? styles["logo--light"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={routes.home} className={rootClass}>
      <img
        src="/logo.svg"
        alt=""
        width={36}
        height={54}
        className={styles.logo__mark}
        aria-hidden
      />
    </Link>
  );
}
