import type { ReactNode } from "react";

import { FeedbackFormSuccessModalProvider } from "@/shared/ui/feedback-form";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <FeedbackFormSuccessModalProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </FeedbackFormSuccessModalProvider>
  );
}
