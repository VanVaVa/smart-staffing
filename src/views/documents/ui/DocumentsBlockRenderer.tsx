import type { DocumentsBlock } from "@/entities/landing/model/documents-blocks";
import { Documents } from "@/widgets/documents";

type DocumentsBlockRendererProps = {
  block: DocumentsBlock;
};

export function DocumentsBlockRenderer({ block }: DocumentsBlockRendererProps) {
  switch (block.type) {
    case "documentsPage":
      return <Documents content={block.props} />;
  }
}
