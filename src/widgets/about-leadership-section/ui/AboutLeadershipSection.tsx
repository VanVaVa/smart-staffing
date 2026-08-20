import type { AboutLeadershipBlockProps } from "@/entities/landing/model/about-blocks";
import { ABOUT_LEADERSHIP_MOSAIC_LAYOUTS } from "@/entities/landing/model/about-content";
import { Container } from "@/shared/ui/container";

import { AboutLeadershipCard } from "./about-leadership-card";

import styles from "./AboutLeadershipSection.module.css";

type AboutLeadershipSectionProps = {
  content: AboutLeadershipBlockProps;
};

export function AboutLeadershipSection({ content }: AboutLeadershipSectionProps) {
  const { title, members } = content;
  const mosaicMembers = members.slice(0, ABOUT_LEADERSHIP_MOSAIC_LAYOUTS.length);
  const extraMembers = members.slice(ABOUT_LEADERSHIP_MOSAIC_LAYOUTS.length);

  return (
    <section className={styles["about-leadership-section"]}>
      <Container wide>
        <div className={styles["about-leadership-section__inner"]}>
          <h2 className={styles["about-leadership-section__title"]}>
            {title}
          </h2>
          <div className={styles["about-leadership-section__boards"]}>
            {mosaicMembers.length > 0 ? (
              <div className={styles["about-leadership-section__grid"]}>
                {mosaicMembers.map((member, index) => (
                  <AboutLeadershipCard
                    key={member.id}
                    role={member.role}
                    name={member.name}
                    imageSrc={member.imageSrc}
                    layout={ABOUT_LEADERSHIP_MOSAIC_LAYOUTS[index]}
                  />
                ))}
              </div>
            ) : null}
            {extraMembers.length > 0 ? (
              <div className={styles["about-leadership-section__extra-grid"]}>
                {extraMembers.map((member) => (
                  <AboutLeadershipCard
                    key={member.id}
                    role={member.role}
                    name={member.name}
                    imageSrc={member.imageSrc}
                    layout="extra"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
