import type { ReactNode } from "react";

import styles from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  wide?: boolean;
  className?: string;
};

export function Container({ children, wide, className }: ContainerProps) {
  const rootClass = [
    styles.container,
    wide ? styles["container--wide"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={rootClass}>{children}</div>;
}
