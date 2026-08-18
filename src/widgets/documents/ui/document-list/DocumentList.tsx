import Link from "next/link";

import type {
  DocumentCertificate,
  DocumentItem,
  DocumentsPageContent,
} from "@/entities/landing";
import { Container } from "@/shared/ui";

import { PdfViewer } from "../pdf-viewer";
import styles from "./DocumentList.module.css";

type DocumentListProps = {
  content: DocumentsPageContent;
  onOpenSoftwareRights: (document: DocumentItem) => void;
  onOpenCertificate: (certificate: DocumentCertificate) => void;
};

export function DocumentList({
  content,
  onOpenSoftwareRights,
  onOpenCertificate,
}: DocumentListProps) {
  const { company } = content;

  return (
    <section className={styles["document-list"]}>
      <Container wide className={styles["document-list__container"]}>
        <h1 className={styles["document-list__title"]}>
          {content.title}
        </h1>

        <section className={styles["document-list__company"]}>
          <h2 className={styles["document-list__company-name"]}>
            {company.name}
          </h2>
          <dl className={styles["document-list__requisites"]}>
            <div className={styles["document-list__requisite-column"]}>
              <div className={styles["document-list__requisite"]}>
                <dt>Юридический адрес</dt>
                <dd>
                  <span>
                    {company.legalAddress}
                  </span>
                </dd>
              </div>
              <div className={styles["document-list__requisite"]}>
                <dt>ОКВЭД</dt>
                <dd>
                  <span>
                    {company.activity}
                  </span>
                </dd>
              </div>
            </div>
            <div className={styles["document-list__requisite-column"]}>
              <div className={styles["document-list__requisite"]}>
                <dt>ИНН / ОГРН</dt>
                <dd>
                  <span>
                    {company.inn}
                  </span>
                </dd>
              </div>
              <div className={styles["document-list__requisite"]}>
                <dt>Код вида деятельности</dt>
                <dd>
                  <span>
                    {company.activityCode}
                  </span>
                </dd>
              </div>
            </div>
          </dl>
        </section>

        <div className={styles["document-list__categories"]}>
          {content.categories.map((category) => (
            <section key={category.id} className={styles["document-list__category"]}>
              <h2 className={styles["document-list__category-title"]}>
                {category.title}
              </h2>
              <ul className={styles["document-list__links"]}>
                {category.items.map((document) => (
                  <li key={document.id}>
                    {document.presentation === "modal" ? (
                      <button
                        type="button"
                        className={styles["document-list__link"]}
                        onClick={() => onOpenSoftwareRights(document)}
                      >
                        <span>
                          {document.title}
                        </span>
                      </button>
                    ) : (
                      <Link
                        className={styles["document-list__link"]}
                        href={document.href}
                      >
                        <span>
                          {document.title}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className={styles["document-list__certificates"]}>
          <h2 className={styles["document-list__certificates-title"]}>
            {content.certificatesTitle}
          </h2>
          <div className={styles["document-list__certificate-grid"]}>
            {content.certificates.map((certificate) => (
              <button key={certificate.id}
                type="button"
                className={styles["document-list__certificate"]}
                aria-label={`Открыть ${certificate.title.toLowerCase()}`}
                onClick={() => onOpenCertificate(certificate)}
              >
                <div>
                  <PdfViewer src={certificate.pdfSrc} title={certificate.title} compact />
                </div>
              </button>
            ))}
          </div>
        </section>
      </Container>
    </section>
  );
}
