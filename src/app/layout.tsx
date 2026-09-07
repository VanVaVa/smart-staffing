import type { ReactNode } from "react";
import localFont from "next/font/local";

import { CookieConsent } from "@/shared/ui/cookie-consent";
import { YandexMetrika } from "@/shared/ui/yandex-metrika";

import "@/application/styles/globals.css";

const montserrat = localFont({
  src: "../application/styles/fonts/montserrat-variable.woff2",
  variable: "--font-montserrat",
  weight: "500 700",
  display: "swap",
});

const golos = localFont({
  src: "../application/styles/fonts/golos-text-variable.woff2",
  variable: "--font-golos",
  weight: "400 500",
  display: "swap",
});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${golos.variable}`}>
      <body>
        {children}
        <CookieConsent />
        <YandexMetrika />
      </body>
    </html>
  );
}
