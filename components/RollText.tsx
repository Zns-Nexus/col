import type { CSSProperties } from "react";
import styles from "./HomePage.module.css";

/**
 * A label whose letters roll over like small cubes, one after another, when the
 * link or button around it is hovered or focused. The rolling letters are
 * hidden from assistive tech; the plain label stays in the accessible name.
 */
export function RollText({ children }: { children: string }) {
  const letters = [...children].map((char) => (char === " " ? " " : char));
  return (
    <span className={styles.roll}>
      <span className={styles.srOnly}>{children}</span>
      <span className={styles.rollLetters} aria-hidden>
        {letters.map((char, index) => (
          <span key={index} className={styles.rollChar} style={{ "--i": index } as CSSProperties}>
            <span>{char}</span>
            <span>{char}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
