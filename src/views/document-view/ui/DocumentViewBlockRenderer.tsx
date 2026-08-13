import type { DocumentViewBlock } from "@/entities/landing/model/document-view-blocks";
import { DocumentViewer } from "@/widgets/documents";

type DocumentViewBlockRendererProps = {
  block: DocumentViewBlock;
};

export function DocumentViewBlockRenderer({ block }: DocumentViewBlockRendererProps) {
  switch (block.type) {
    case "documentView":
      return <DocumentViewer content={block.props} />;
  }
}
