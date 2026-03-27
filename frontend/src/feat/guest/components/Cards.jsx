import styles from "../guests.module.scss";


export function StatCard({ label, value, icon }) {
  return (
    <div className={styles["stat-card"]}>
      <span className={styles["stat-card__icon"]}>{icon}</span>
      <span className={styles["stat-card__value"]}>{value}</span>
      <span className={styles["stat-card__label"]}>{label}</span>
    </div>
  );
}

export function StatusBadge({ status }) {
  return (
    <span className={`${styles.badge} ${styles[`badge--${status}`]}`}>
      {status}
    </span>
  );
}