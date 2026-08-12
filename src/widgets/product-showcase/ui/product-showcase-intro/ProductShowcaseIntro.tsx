import { Badge } from "@/shared/ui/badge";
import { EditableText } from "@/shared/ui/editable-field";

import styles from "./ProductShowcaseIntro.module.css";

type ProductShowcaseIntroProps = {
  tag: string;
  title: string;
  subtitle: string;
};

export function ProductShowcaseIntro({
  tag,
  title,
  subtitle,
}: ProductShowcaseIntroProps) {
  return (
    <header className={styles["product-showcase-intro"]}>
      <Badge variant="tag" className={styles["product-showcase-intro__tag"]}>
        <EditableText path="tag" label="Тег платформы">
          {tag}
        </EditableText>
      </Badge>
      <div className={styles["product-showcase-intro__copy"]}>
        <EditableText
          path="title"
          label="Заголовок платформы"
          as="h2"
          className={styles["product-showcase-intro__title"]}
        >
          {title}
        </EditableText>
        <EditableText
          path="subtitle"
          label="Подзаголовок платформы"
          as="p"
          className={styles["product-showcase-intro__subtitle"]}
          multiline
        >
          {subtitle}
        </EditableText>
      </div>
    </header>
  );
}
