"use client";

import Link from "next/link";
import Image from "next/image";

import { EditableText, useAdminBlockEditOptional } from "@/shared/ui/editable-field";

import styles from "./HeroRegistryLink.module.css";

type HeroRegistryLinkProps = {
  registryHref: string;
  registryLabel: string;
};

export function HeroRegistryLink({
  registryHref,
  registryLabel,
}: HeroRegistryLinkProps) {
  const blockEdit = useAdminBlockEditOptional();
  const inAdminEdit = Boolean(blockEdit);

  const inner = (
    <>
      <span className={styles["hero-registry-link__flag"]} aria-hidden>
        <span className={styles["hero-registry-link__flag-white"]} />
        <span className={styles["hero-registry-link__flag-blue"]} />
        <span className={styles["hero-registry-link__flag-red"]} />
      </span>
      <EditableText
        path="registryLabel"
        label="Подпись реестра"
        className={styles["hero-registry-link__label"]}
      >
        {registryLabel}
      </EditableText>
      <Image
        className={styles["hero-registry-link__chevron"]}
        src="/landing/hero-registry-chevron.png"
        alt=""
        width={12}
        height={7}
        aria-hidden
      />
    </>
  );

  if (inAdminEdit) {
    return (
      <div className={styles["hero-registry-link"]}>
        {inner}
        <EditableText
          path="registryHref"
          label="Ссылка реестра"
          className={styles["hero-registry-link__href-edit"]}
        >
          {registryHref}
        </EditableText>
      </div>
    );
  }

  return (
    <Link
      className={styles["hero-registry-link"]}
      href={registryHref}
      target="_blank"
      rel="noopener noreferrer"
    >
      {inner}
    </Link>
  );
}
