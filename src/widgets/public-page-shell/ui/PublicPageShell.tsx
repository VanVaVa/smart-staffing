import type { ReactNode } from "react";

import type { FooterBlockProps } from "@/entities/landing/model/footer-blocks";
import { FeedbackFormSuccessModalProvider } from "@/shared/ui/feedback-form";
import { PageFooterProvider } from "@/shared/ui/page-chrome";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

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
        <Header />
        <main>{children}</main>
        {renderFooter ? renderFooter(footer) : footer}
      </FeedbackFormSuccessModalProvider>
    </PageFooterProvider>
  );
}
