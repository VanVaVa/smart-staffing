import type { ReactNode } from "react";

import { FeedbackFormSuccessModalProvider } from "@/shared/ui/feedback-form";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

type PublicPageShellProps = {
  children: ReactNode;
};

export function PublicPageShell({ children }: PublicPageShellProps) {
  return (
    <FeedbackFormSuccessModalProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </FeedbackFormSuccessModalProvider>
  );
}
