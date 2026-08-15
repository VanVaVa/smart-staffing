import Link from "next/link";

import type {
  DocumentCertificate,
  DocumentItem,
  DocumentsPageContent,
} from "@/entities/landing";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
  EditableMedia,
  EditableText,
} from "@/shared/ui/editable-field";
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
        <EditableText
          path="title"
          label="Заголовок"
          as="h1"
          className={styles["document-list__title"]}
        >
          {content.title}
        </EditableText>

        <section className={styles["document-list__company"]}>
          <EditableText
            path="company.name"
            label="Компания — название"
            as="h2"
            className={styles["document-list__company-name"]}
          >
            {company.name}
          </EditableText>
          <dl className={styles["document-list__requisites"]}>
            <div className={styles["document-list__requisite-column"]}>
              <div className={styles["document-list__requisite"]}>
                <dt>Юридический адрес</dt>
                <dd>
                  <EditableText path="company.legalAddress" label="Юридический адрес">
                    {company.legalAddress}
                  </EditableText>
                </dd>
              </div>
              <div className={styles["document-list__requisite"]}>
                <dt>ИНН</dt>
                <dd>
                  <EditableText path="company.inn" label="ИНН">
                    {company.inn}
                  </EditableText>
                </dd>
              </div>
              <div className={styles["document-list__requisite"]}>
                <dt>ОГРН</dt>
                <dd>
                  <EditableText path="company.ogrn" label="ОГРН">
                    {company.ogrn}
                  </EditableText>
                </dd>
              </div>
            </div>
            <div className={styles["document-list__requisite-column"]}>
              <div className={styles["document-list__requisite"]}>
                <dt>ОКВЭД</dt>
                <dd>
                  <EditableText path="company.activity" label="ОКВЭД">
                    {company.activity}
                  </EditableText>
                </dd>
              </div>
              <div className={styles["document-list__requisite"]}>
                <dt>Код вида деятельности</dt>
                <dd>
                  <EditableText path="company.activityCode" label="Код вида деятельности">
                    {company.activityCode}
                  </EditableText>
                </dd>
              </div>
            </div>
          </dl>
        </section>

        <div className={styles["document-list__categories"]}>
          {content.categories.map((category, categoryIndex) => (
            <EditableCollectionItem
              key={category.id}
              arrayPath="categories"
              index={categoryIndex}
            >
              <section className={styles["document-list__category"]}>
                <EditableText
                  path={`categories.${categoryIndex}.title`}
                  label="Категория — заголовок"
                  as="h2"
                  className={styles["document-list__category-title"]}
                >
                  {category.title}
                </EditableText>
                <ul className={styles["document-list__links"]}>
                  {category.items.map((document, itemIndex) => (
                    <EditableCollectionItem
                      key={document.id}
                      arrayPath={`categories.${categoryIndex}.items`}
                      index={itemIndex}
                    >
                      <li>
                        {document.presentation === "modal" ? (
                          <button
                            type="button"
                            className={styles["document-list__link"]}
                            onClick={() => onOpenSoftwareRights(document)}
                          >
                            <EditableText
                              path={`categories.${categoryIndex}.items.${itemIndex}.title`}
                              label="Документ — название"
                            >
                              {document.title}
                            </EditableText>
                          </button>
                        ) : (
                          <Link
                            className={styles["document-list__link"]}
                            href={document.href}
                          >
                            <EditableText
                              path={`categories.${categoryIndex}.items.${itemIndex}.title`}
                              label="Документ — название"
                            >
                              {document.title}
                            </EditableText>
                          </Link>
                        )}
                      </li>
                    </EditableCollectionItem>
                  ))}
                </ul>
                <EditableCollectionAdd
                  arrayPath={`categories.${categoryIndex}.items`}
                  collectionKey="categories.items"
                  addLabel="Документ"
                />
              </section>
            </EditableCollectionItem>
          ))}
          <EditableCollectionAdd
            arrayPath="categories"
            collectionKey="categories"
            addLabel="Категория"
          />
        </div>

        <section className={styles["document-list__certificates"]}>
          <EditableText
            path="certificatesTitle"
            label="Свидетельства — заголовок"
            as="h2"
            className={styles["document-list__certificates-title"]}
          >
            {content.certificatesTitle}
          </EditableText>
          <div className={styles["document-list__certificate-grid"]}>
            {content.certificates.map((certificate, index) => (
              <EditableCollectionItem
                key={certificate.id}
                arrayPath="certificates"
                index={index}
              >
                <button
                  type="button"
                  className={styles["document-list__certificate"]}
                  aria-label={`Открыть ${certificate.title.toLowerCase()}`}
                  onClick={() => onOpenCertificate(certificate)}
                >
                  <EditableMedia
                    path={`certificates.${index}.pdfSrc`}
                    label="Свидетельство — PDF"
                  >
                    <PdfViewer src={certificate.pdfSrc} title={certificate.title} compact />
                  </EditableMedia>
                </button>
              </EditableCollectionItem>
            ))}
            <EditableCollectionAdd
              arrayPath="certificates"
              collectionKey="certificates"
              addLabel="Свидетельство"
            />
          </div>
        </section>
      </Container>
    </section>
  );
}
