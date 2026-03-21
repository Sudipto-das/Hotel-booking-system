import styles from "../guests.module.scss";

export function InfoField({ label, children }) {
  return (
    <div>
      <div className={styles["field__label"]}>{label}</div>
      <div className={styles["field__value"]}>{children}</div>
    </div>
  );
}