import type { ReactNode } from "react";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
