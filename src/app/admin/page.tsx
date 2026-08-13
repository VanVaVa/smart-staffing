import Link from "next/link";

import { clientSegmentSlugs } from "@/entities/landing/model/clients-content";
import { documentSlugs } from "@/entities/landing/model/documents-content";
import {
  getAdminPageLabel,
  getAdminPagePath,
  getPublicPagePath,
} from "@/entities/landing/lib/landing-page-registry";
import {
  STATIC_LANDING_PAGE_SLUGS,
  clientsPageSlug,
  documentPageSlug,
  LANDING_PAGE_SLUGS,
} from "@/entities/landing/model/landing-page-slugs";
import { listMediaArticlePageSlugs } from "@/entities/landing/server";

import styles from "./AdminIndexPage.module.css";

export const dynamic = "force-dynamic";

type AdminGroup = {
  title: string;
  slugs: string[];
};

export default async function AdminIndexPage() {
  const mediaArticleSlugs = await listMediaArticlePageSlugs();

  const adminGroups: AdminGroup[] = [
    {
      title: "Основные",
      slugs: [
        LANDING_PAGE_SLUGS.home,
        LANDING_PAGE_SLUGS.about,
        LANDING_PAGE_SLUGS.vacancies,
      ],
    },
    {
      title: "Документы",
      slugs: [
        LANDING_PAGE_SLUGS.documents,
        ...documentSlugs.map(documentPageSlug),
      ],
    },
    {
      title: "Медиа",
      slugs: [LANDING_PAGE_SLUGS.media, ...mediaArticleSlugs],
    },
    {
      title: "Клиенты",
      slugs: clientSegmentSlugs.map(clientsPageSlug),
    },
  ];

  const listedSlugs = new Set(adminGroups.flatMap((group) => group.slugs));
  const missingSlugs = STATIC_LANDING_PAGE_SLUGS.filter((slug) => !listedSlugs.has(slug));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Админ-панель</h1>
        <p className={styles.subtitle}>Выберите страницу для редактирования</p>
      </header>
      <div className={styles.groups}>
        {adminGroups.map((group) => (
          <section key={group.title} className={styles.group}>
            <h2 className={styles.groupTitle}>{group.title}</h2>
            <ul className={styles.list}>
              {group.slugs.map((slug) => (
                <li key={slug} className={styles.item}>
                  <Link className={styles.link} href={getAdminPagePath(slug)}>
                    {getAdminPageLabel(slug)}
                  </Link>
                  <a
                    className={styles.publicLink}
                    href={getPublicPagePath(slug)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Открыть на сайте
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {missingSlugs.length > 0 ? (
          <section className={styles.group}>
            <h2 className={styles.groupTitle}>Прочие</h2>
            <ul className={styles.list}>
              {missingSlugs.map((slug) => (
                <li key={slug} className={styles.item}>
                  <Link className={styles.link} href={getAdminPagePath(slug)}>
                    {getAdminPageLabel(slug)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
