import type { ReactNode } from "react";

import type { FooterBlockProps } from "@/entities/landing/model/footer-blocks";
import { FeedbackFormSuccessModalProvider } from "@/shared/ui/feedback-form";
import { PageFooterProvider } from "@/shared/ui/page-chrome";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

import { PublicPageScaler } from "./PublicPageScaler";

import styles from "./PublicPageShell.module.css";

type PublicPageShellProps = {
  children: ReactNode;
  footerContent: FooterBlockProps;
  renderFooter?: (footer: ReactNode) => ReactNode;
};

export function PublicPageShell({
  children,
  footerContent,
  renderFooter,
}: PublicPageShellProps) {
  const footer = <Footer content={footerContent} />;

  return (
    <PageFooterProvider footer={footer}>
      <FeedbackFormSuccessModalProvider>
        <div className={[styles["public-page-shell"], "public-page-shell"].join(" ")}>
          <PublicPageScaler />
          <Header />
          <main className={styles["public-page-shell__main"]}>{children}</main>
          {renderFooter ? renderFooter(footer) : footer}
        </div>
      </FeedbackFormSuccessModalProvider>
    </PageFooterProvider>
  );
}
