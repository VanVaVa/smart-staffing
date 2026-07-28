import type { ReactNode } from "react";
import { Golos_Text, Montserrat } from "next/font/google";

import "@/application/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700"],
});

const golos = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-golos",
  weight: ["400", "500"],
});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${golos.variable}`}>
      <body>{children}</body>
    </html>
  );
}
