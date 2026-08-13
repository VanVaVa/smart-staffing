import Link from "next/link";

import {
  FORM_SUBMISSION_TYPE_LABELS,
  formatSubmissionChannel,
  formatSubmissionDate,
  formatSubmissionSource,
  type FormSubmissionRecord,
  type FormSubmissionType,
} from "@/entities/form-submission";
import type { FormSubmissionsListResult } from "@/entities/form-submission/server";
import { Pagination } from "@/shared/ui/pagination";

import styles from "./AdminSubmissionsListPage.module.css";

type AdminSubmissionsListPageProps = {
  type: FormSubmissionType;
  list: FormSubmissionsListResult;
};

export function AdminSubmissionsListPage({ type, list }: AdminSubmissionsListPageProps) {
  const title = FORM_SUBMISSION_TYPE_LABELS[type];
  const pathname = `/admin/submissions/${type}`;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/admin/submissions" className={styles.backLink}>
          ← Все заявки
        </Link>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>
          {list.total === 0
            ? "Заявок пока нет"
            : `${list.total} ${pluralizeSubmissions(list.total)} · страница ${list.page} из ${list.totalPages}`}
        </p>
      </header>

      {list.items.length === 0 ? (
        <div className={styles.empty}>Новых заявок этого типа пока нет.</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Дата</th>
                {type === "vacancy" ? <th>ФИО</th> : null}
                {type !== "book" ? <th>Канал</th> : null}
                <th>{type === "book" ? "Telegram" : "Контакт"}</th>
                <th>Источник</th>
                {type === "vacancy" ? <th>Резюме</th> : null}
              </tr>
            </thead>
            <tbody>
              {list.items.map((item) => (
                <SubmissionRow key={item.id} item={item} type={type} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.pagination}>
        <Pagination
          currentPage={list.page}
          totalPages={list.totalPages}
          pathname={pathname}
        />
      </div>
    </div>
  );
}

function SubmissionRow({
  item,
  type,
}: {
  item: FormSubmissionRecord;
  type: FormSubmissionType;
}) {
  return (
    <tr>
      <td>{formatSubmissionDate(item.createdAt)}</td>
      {type === "vacancy" ? <td>{item.fullName ?? "—"}</td> : null}
      {type !== "book" ? <td>{formatSubmissionChannel(item.channel)}</td> : null}
      <td>{item.contactValue}</td>
      <td>{formatSubmissionSource(item.sourcePath, item.sourceLabel)}</td>
      {type === "vacancy" ? (
        <td>
          {item.resumeStoragePath ? (
            <a
              href={`/api/admin/submissions/${item.id}/resume`}
              className={styles.downloadLink}
            >
              {item.resumeOriginalName ?? "Скачать"}
            </a>
          ) : (
            "—"
          )}
        </td>
      ) : null}
    </tr>
  );
}

function pluralizeSubmissions(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return "заявка";
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return "заявки";
  }
  return "заявок";
}
