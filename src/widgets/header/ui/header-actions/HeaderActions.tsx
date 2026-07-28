import { routes } from "@/shared/config";
import { Button } from "@/shared/ui/button";

import styles from "./HeaderActions.module.css";

type HeaderActionsProps = {
  onDarkBackdrop?: boolean;
};

export function HeaderActions({ onDarkBackdrop = false }: HeaderActionsProps) {
  return (
    <div className={styles["header-actions"]}>
      <Button
        href={routes.login}
        variant="ghost"
        className={
          onDarkBackdrop ? styles["header-actions__ghost-on-dark"] : undefined
        }
      >
        Вход
      </Button>
      <Button
        href="#contacts"
        size="md"
        variant={onDarkBackdrop ? "light" : "dark"}
        className={styles["header-actions__sign-up"]}
      >
        Регистрация
      </Button>
    </div>
  );
}
