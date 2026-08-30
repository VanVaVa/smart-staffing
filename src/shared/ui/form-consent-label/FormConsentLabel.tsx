import { Link } from "@/shared/ui/link";

import styles from "./FormConsentLabel.module.css";

type FormConsentLabelProps = {
  linkClassName?: string;
};

export function FormConsentLabel({ linkClassName }: FormConsentLabelProps) {
  const privacyLinkClassName = [linkClassName, styles["form-consent-label__privacy-link"]]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={styles["form-consent-label"]}>
      Я даю{" "}
      <Link
        href="/documents/personal-data-consent"
        variant="inline"
        className={linkClassName}
      >
        согласие на обработку персональных данных
      </Link>
      {" "}в соответствии с{" "}
      <Link href="/documents/privacy-policy" variant="inline" className={privacyLinkClassName}>
        политикой конфиденциальности
      </Link>
    </span>
  );
}
