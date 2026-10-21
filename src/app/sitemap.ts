import type { MetadataRoute } from "next";

import { listMediaArticles, listVisibleClientsPages } from "@/entities/landing/server";
import { routes, siteUrl } from "@/shared/config";

export const dynamic = "force-dynamic";

const STATIC_PATHS = [
  routes.home,
  routes.about,
  "/clients",
  "/pricing",
  "/media",
  routes.vacancies,
  routes.documents,
  "/connect",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [clientsPages, articles] = await Promise.all([
    listVisibleClientsPages(),
    listMediaArticles(),
  ]);

  const paths = [
    ...STATIC_PATHS,
    ...clientsPages.map((page) => page.href),
    ...articles.map((article) => article.href),
  ];

  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
