import type { AdminSection } from "@/entities/landing";
import { AdminContentForm } from "@/features/admin-content-editor";
import type { AdminFieldOption, AdminValues } from "@/shared/ui/admin-form";
import { AdminPageShell } from "@/widgets/admin-page-shell";

type AdminSectionFormPageProps = {
  section: AdminSection;
  itemId: string | null;
  isNew: boolean;
  title: string;
  values: AdminValues;
  tagOptions?: readonly AdminFieldOption[];
};

export function AdminSectionFormPage({
  section,
  itemId,
  isNew,
  title,
  values,
  tagOptions,
}: AdminSectionFormPageProps) {
  const isCollection = section.mode === "collection";

  return (
    <AdminPageShell
      title={title}
      description={isCollection ? undefined : section.description}
      backHref={isCollection ? `/admin/content/${section.key}` : "/admin"}
      backLabel={isCollection ? section.title : "Админ-панель"}
      publicHref={section.publicPath}
    >
      <AdminContentForm
        sectionKey={section.key}
        itemId={itemId}
        isNew={isNew}
        initialValues={values}
        tagOptions={tagOptions}
      />
    </AdminPageShell>
  );
}
