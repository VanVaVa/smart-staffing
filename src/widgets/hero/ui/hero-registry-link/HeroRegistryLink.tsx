import Link from "next/link";
import Image from "next/image";

import { heroContent } from "@/entities/landing";

import styles from "./HeroRegistryLink.module.css";

export function HeroRegistryLink() {
  return (
    <Link className={styles["hero-registry-link"]} href={heroContent.registryHref} target="_blank" rel="noopener noreferrer">
      <span className={styles["hero-registry-link__flag"]} aria-hidden>
        <span className={styles["hero-registry-link__flag-white"]} />
        <span className={styles["hero-registry-link__flag-blue"]} />
        <span className={styles["hero-registry-link__flag-red"]} />
      </span>
      <span className={styles["hero-registry-link__label"]}>{heroContent.registryLabel}</span>
      <Image
        className={styles["hero-registry-link__chevron"]}
        src="/landing/hero-registry-chevron.png"
        alt=""
        width={12}
        height={7}
        aria-hidden
      />
    </Link>
  );
}
