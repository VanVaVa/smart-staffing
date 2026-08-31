import Link from "next/link";
import Image from "next/image";

import styles from "./HeroRegistryLink.module.css";

type HeroRegistryLinkProps = {
  registryHref: string;
  registryLabel: string;
};

export function HeroRegistryLink({
  registryHref,
  registryLabel,
}: HeroRegistryLinkProps) {
  const isExternal = /^https?:\/\//.test(registryHref);

  return (
    <Link
      className={styles["hero-registry-link"]}
      href={registryHref}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <span className={styles["hero-registry-link__flag"]} aria-hidden>
        <span className={styles["hero-registry-link__flag-white"]} />
        <span className={styles["hero-registry-link__flag-blue"]} />
        <span className={styles["hero-registry-link__flag-red"]} />
      </span>
      <span className={styles["hero-registry-link__label"]}>{registryLabel}</span>
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
