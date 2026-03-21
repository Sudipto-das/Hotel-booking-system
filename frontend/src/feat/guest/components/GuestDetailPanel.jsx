
import styles from "../guests.module.scss";
import { InfoField } from "./InfoFields";
import { StatusBadge } from "./Cards";

export function GuestDetailPanel({ guest, onClose }) {
  if (!guest) return null;

  return (
    <div className={styles.panel}>
      <div className={styles["panel__header"]}>
        <div className={styles["panel__header-meta"]}>
          <span className={styles["panel__tag"]}>Guest Profile</span>
          <span className={styles["panel__name"]}>{guest.name}</span>
          {guest.vip && <span className={styles["panel__vip"]}>★ VIP Guest</span>}
        </div>
        <button className={styles["btn-close"]} onClick={onClose}>✕</button>
      </div>

      <div className={styles["panel__body"]}>
        <InfoField label="Status">
          <StatusBadge status={guest.status} />
        </InfoField>

        <InfoField label="Email">{guest.email}</InfoField>
        <InfoField label="Room">{guest.room}</InfoField>
        <InfoField label="Check-In">{guest.checkIn}</InfoField>
        <InfoField label="Check-Out">{guest.checkOut}</InfoField>

        <div className={styles["panel__divider"]} />

        <div className={styles["panel__actions"]}>
          <div className={styles["field__label"]}>Actions</div>
          <button className={styles["btn-action"]}>Send Welcome Message</button>
          <button className={styles["btn-action"]}>Assign Room Service</button>
          <button className={styles["btn-action"]}>View Billing</button>
        </div>
      </div>
    </div>
  );
}