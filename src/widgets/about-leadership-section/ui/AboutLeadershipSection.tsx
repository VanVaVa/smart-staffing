import type { AboutLeadershipBlockProps } from "@/entities/landing/model/about-blocks";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
  EditableText,
} from "@/shared/ui/editable-field";
import { Container } from "@/shared/ui/container";

import { AboutLeadershipCard } from "./about-leadership-card";

import styles from "./AboutLeadershipSection.module.css";

type AboutLeadershipSectionProps = {
  content: AboutLeadershipBlockProps;
};

export function AboutLeadershipSection({ content }: AboutLeadershipSectionProps) {
  const { title, members } = content;

  return (
    <section className={styles["about-leadership-section"]}>
      <Container wide>
        <div className={styles["about-leadership-section__inner"]}>
          <EditableText
            path="title"
            label="Заголовок руководства"
            as="h2"
            className={styles["about-leadership-section__title"]}
          >
            {title}
          </EditableText>
          <div className={styles["about-leadership-section__grid"]}>
            {members.map((member, index) => (
              <EditableCollectionItem
                key={member.id}
                arrayPath="members"
                index={index}
                variant="leadership"
                className={
                  styles[`about-leadership-section__grid-item--${member.layout}`]
                }
              >
                <AboutLeadershipCard
                  role={member.role}
                  name={member.name}
                  imageSrc={member.imageSrc}
                  layout={member.layout}
                  itemIndex={index}
                />
              </EditableCollectionItem>
            ))}
            <EditableCollectionAdd
              arrayPath="members"
              collectionKey="leadership.members"
              addLabel="Участник"
              variant="grid-span"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
