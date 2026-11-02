import type { Metadata } from "next";

import { TransitionPage, transitionSeo } from "@/views/transition";

export const metadata: Metadata = {
  title: transitionSeo.title,
  description: transitionSeo.description,
  alternates: {
    canonical: transitionSeo.url,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "СмартСтаффинг",
    url: transitionSeo.url,
    title: transitionSeo.socialTitle,
    description: transitionSeo.socialDescription,
    images: [transitionSeo.image],
  },
  twitter: {
    card: "summary_large_image",
    title: transitionSeo.socialTitle,
    description: transitionSeo.socialDescription,
    images: [transitionSeo.image.url],
  },
};

export default function Page() {
  return <TransitionPage />;
}
