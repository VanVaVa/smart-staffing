import { AdminClientsPageEditor } from "@/features/admin-clients-page-editor";
import type { AdminValues } from "@/shared/ui/admin-form";
import type { FooterBlockProps } from "@/entities/landing/model/footer-blocks";

type AdminClientsEditorPageProps = {
  itemId: string;
  initialValues: AdminValues;
  footerContent: FooterBlockProps;
};

export function AdminClientsEditorPage({
  itemId,
  initialValues,
  footerContent,
}: AdminClientsEditorPageProps) {
  return (
    <AdminClientsPageEditor
      itemId={itemId}
      initialValues={initialValues}
      footerContent={footerContent}
    />
  );
}
