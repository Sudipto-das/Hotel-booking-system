import { StatusBadge } from "./Cards";
import styles from "../guests.module.scss";

export function GuestRow({ guest, selected, onSelect }) {
  const rowClass = [
    styles["table__row"],
    selected ? styles["table__row--active"] : "",
  ].join(" ");

  return (
    <tr className={rowClass} onClick={() => onSelect(guest)}>
      <td className={`${styles["table__td"]} ${styles["table__td--vip"]}`}>
        {guest.vip && <span className={styles["vip-label"]}>VIP</span>}
      </td>
      <td className={styles["table__td"]}>
        <div className={styles["guest-name"]}>{guest.name}</div>
        <div className={styles["guest-email"]}>{guest.email}</div>
      </td>
      <td className={styles["table__td"]}>{guest.room}</td>
      <td className={styles["table__td"]}>
        <span className={styles["guest-stay"]}>
          {guest.checkIn}
          <span className={styles["stay-arrow"]}>→</span>
          {guest.checkOut}
        </span>
      </td>
      <td className={styles["table__td"]}>
        <StatusBadge status={guest.status} />
      </td>
    </tr>
  );
}