"use client";

import { useCallback, useState } from "react";

import type {
  DocumentCertificate,
  DocumentItem,
  DocumentsPageContent,
} from "@/entities/landing";
import { getDocumentModalContent } from "@/entities/landing";

import { CertificateGallery } from "./certificate-gallery";
import { DocumentList } from "./document-list";
import { SoftwareRightsModal } from "./software-rights-modal";

type DocumentsProps = {
  content: DocumentsPageContent;
};

export function Documents({ content }: DocumentsProps) {
  const [modalDocument, setModalDocument] = useState<DocumentItem | null>(null);
  const [certificateIndex, setCertificateIndex] = useState<number | null>(null);

  const openCertificate = (certificate: DocumentCertificate) => {
    const index = content.certificates.findIndex(
      (item) => item.id === certificate.id,
    );

    setCertificateIndex(index);
  };

  const changeCertificate = useCallback((index: number) => {
    setCertificateIndex(index);
  }, []);

  return (
    <>
      <DocumentList
        content={content}
        onOpenSoftwareRights={setModalDocument}
        onOpenCertificate={openCertificate}
      />
      <SoftwareRightsModal
        document={modalDocument}
        content={
          modalDocument
            ? getDocumentModalContent(modalDocument, content)
            : null
        }
        onClose={() => setModalDocument(null)}
      />
      <CertificateGallery
        certificates={content.certificates}
        activeIndex={certificateIndex}
        onChange={changeCertificate}
        onClose={() => setCertificateIndex(null)}
      />
    </>
  );
}
