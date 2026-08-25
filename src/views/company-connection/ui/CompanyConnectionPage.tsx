import { CompanyConnectionOffer } from "@/shared/ui/feedback-form";

import modalStyles from "@/shared/ui/feedback-form/CompanyConnectionModal.module.css";
import styles from "./CompanyConnectionPage.module.css";

export function CompanyConnectionPage() {
  return (
    <section
      className={styles["company-connection-page"]}
      data-header-veil-bg="#f9f9fb"
    >
      <div
        className={[
          styles["company-connection-page__panel"],
          modalStyles["company-connection-modal--full-page"],
          modalStyles["company-connection-modal--page"],
        ].join(" ")}
      >
        <CompanyConnectionOffer contactHref="/#contacts" />
      </div>
    </section>
  );
}
