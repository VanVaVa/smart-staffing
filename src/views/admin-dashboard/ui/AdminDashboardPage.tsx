import Link from "next/link";

import {
  FORM_SUBMISSION_TYPES,
  FORM_SUBMISSION_TYPE_LABELS,
  FORM_SUBMISSION_ADMIN_PATHS,
} from "@/entities/form-submission";
import type { FormSubmissionCounts } from "@/entities/form-submission/server";
import {
  ADMIN_SECTIONS,
  ADMIN_SECTION_GROUPS,
  adminSectionPath,
} from "@/entities/landing";
import { AdminPageShell } from "@/widgets/admin-page-shell";

import styles from "./AdminDashboardPage.module.css";

type AdminDashboardPageProps = {
  submissionCounts: FormSubmissionCounts;
  sectionCounts: Record<string, number | null>;
};

export function AdminDashboardPage({
  submissionCounts,
  sectionCounts,
}: AdminDashboardPageProps) {
  const totalSubmissions = FORM_SUBMISSION_TYPES.reduce(
    (total, type) => total + submissionCounts[type],
    0,
  );

  return (
    <AdminPageShell
      title="Админ-панель"
      description="Заявки с форм и разделы сайта, которые меняются со временем."
    >
      <section className={styles.group}>
        <h2 className={styles.groupTitle}>Заявки</h2>
        <Link className={styles.row} href="/admin/submissions">
          <span className={styles.rowTitle}>Все заявки</span>
          <span className={styles.count}>{totalSubmissions}</span>
        </Link>
        {FORM_SUBMISSION_TYPES.map((type) => (
          <Link
            key={type}
            className={styles.row}
            href={FORM_SUBMISSION_ADMIN_PATHS[type]}
          >
            <span className={styles.rowTitle}>{FORM_SUBMISSION_TYPE_LABELS[type]}</span>
            <span className={styles.count}>{submissionCounts[type]}</span>
          </Link>
        ))}
      </section>

      {ADMIN_SECTION_GROUPS.map((group) => (
        <section key={group.key} className={styles.group}>
          <h2 className={styles.groupTitle}>{group.title}</h2>
          {ADMIN_SECTIONS.filter((section) => section.group === group.key).map(
            (section) => (
              <Link
                key={section.key}
                className={styles.row}
                href={adminSectionPath(section)}
              >
                <span className={styles.rowText}>
                  <span className={styles.rowTitle}>{section.title}</span>
                  <span className={styles.rowDescription}>{section.description}</span>
                </span>
                {sectionCounts[section.key] !== null ? (
                  <span className={styles.count}>{sectionCounts[section.key]}</span>
                ) : null}
              </Link>
            ),
          )}
        </section>
      ))}
    </AdminPageShell>
  );
}
