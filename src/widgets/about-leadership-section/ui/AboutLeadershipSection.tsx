import { aboutLeadership } from "@/entities/landing";
import { Container } from "@/shared/ui/container";

import { AboutLeadershipCard } from "./about-leadership-card";

import styles from "./AboutLeadershipSection.module.css";

export function AboutLeadershipSection() {
  const { title, members } = aboutLeadership;

  return (
    <section className={styles["about-leadership-section"]}>
      <Container wide>
        <div className={styles["about-leadership-section__inner"]}>
          <h2 className={styles["about-leadership-section__title"]}>{title}</h2>
          <div className={styles["about-leadership-section__grid"]}>
            {members.map((member) => (
              <AboutLeadershipCard
                key={member.id}
                role={member.role}
                name={member.name}
                imageSrc={member.imageSrc}
                layout={member.layout}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
