import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./AdminPageShell.module.css";

type AdminPageShellProps = {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  publicHref?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AdminPageShell({
  title,
  description,
  backHref,
  backLabel,
  publicHref,
  actions,
  children,
}: AdminPageShellProps) {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          {backHref ? (
            <Link className={styles.back} href={backHref}>
              ← {backLabel ?? "Назад"}
            </Link>
          ) : null}
          <div className={styles.headline}>
            <h1 className={styles.title}>{title}</h1>
            {publicHref ? (
              <a
                className={styles.publicLink}
                href={publicHref}
                target="_blank"
                rel="noreferrer"
              >
                Открыть на сайте
              </a>
            ) : null}
          </div>
          {description ? <p className={styles.description}>{description}</p> : null}
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </header>
        {children}
      </div>
    </div>
  );
}
