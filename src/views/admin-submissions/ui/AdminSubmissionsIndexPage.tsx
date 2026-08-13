import Link from "next/link";

import {
  FORM_SUBMISSION_ADMIN_PATHS,
  FORM_SUBMISSION_TYPE_LABELS,
  FORM_SUBMISSION_TYPES,
  type FormSubmissionType,
} from "@/entities/form-submission";
import type { FormSubmissionCounts } from "@/entities/form-submission/server";

import styles from "./AdminSubmissionsIndexPage.module.css";

type AdminSubmissionsIndexPageProps = {
  counts: FormSubmissionCounts;
};

export function AdminSubmissionsIndexPage({ counts }: AdminSubmissionsIndexPageProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/admin" className={styles.backLink}>
          ← Админ-панель
        </Link>
        <h1 className={styles.title}>Заявки</h1>
        <p className={styles.subtitle}>Просмотр заявок с форм обратной связи</p>
      </header>
      <div className={styles.grid}>
        {FORM_SUBMISSION_TYPES.map((type) => (
          <SubmissionTypeCard key={type} type={type} count={counts[type]} />
        ))}
      </div>
    </div>
  );
}

function SubmissionTypeCard({
  type,
  count,
}: {
  type: FormSubmissionType;
  count: number;
}) {
  return (
    <Link href={FORM_SUBMISSION_ADMIN_PATHS[type]} className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>{FORM_SUBMISSION_TYPE_LABELS[type]}</h2>
        <span className={styles.badge}>{count}</span>
      </div>
      <p className={styles.cardHint}>Открыть список заявок</p>
    </Link>
  );
}
