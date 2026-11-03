import styles from "./TransitionGlow.module.css";

const ORBS = ["top", "bottom", "corner"] as const;

export function TransitionGlow() {
  return (
    <div className={styles["transition-glow"]} aria-hidden>
      {ORBS.map((orb) => (
        <span key={orb} className={`${styles["transition-glow__orb"]} ${styles[`transition-glow__orb--${orb}`]}`} />
      ))}
    </div>
  );
}
