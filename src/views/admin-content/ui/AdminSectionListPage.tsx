import Link from "next/link";

import type { AdminCollectionSection } from "@/entities/landing";
import type { AdminSectionItem } from "@/entities/landing/server";
import { AdminItemOrderButtons } from "@/features/admin-content-editor";
import { AdminPageShell } from "@/widgets/admin-page-shell";

import styles from "./AdminSectionListPage.module.css";

type AdminSectionListPageProps = {
  section: AdminCollectionSection;
  items: AdminSectionItem[];
  reorderable: boolean;
};

export function AdminSectionListPage({
  section,
  items,
  reorderable,
}: AdminSectionListPageProps) {
  const basePath = `/admin/content/${section.key}`;

  return (
    <AdminPageShell
      title={section.title}
      description={section.description}
      backHref="/admin"
      backLabel="Админ-панель"
      publicHref={section.publicPath}
      actions={
        section.allowCreate === false ? undefined : (
          <Link className={styles.add} href={`${basePath}/new`}>
            + {section.addLabel}
          </Link>
        )
      }
    >
      {items.length === 0 ? (
        <p className={styles.empty}>{section.emptyLabel}</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={item.id} className={styles.item}>
              <Link className={styles.link} href={`${basePath}/${item.id}`}>
                <span className={styles.itemTitle}>{item.title}</span>
                {item.meta ? <span className={styles.itemMeta}>{item.meta}</span> : null}
              </Link>
              {reorderable ? (
                <AdminItemOrderButtons
                  sectionKey={section.key}
                  itemId={item.id}
                  isFirst={index === 0}
                  isLast={index === items.length - 1}
                />
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </AdminPageShell>
  );
}
