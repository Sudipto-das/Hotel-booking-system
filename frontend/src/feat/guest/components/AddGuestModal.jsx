import styles from "../guests.module.scss";

export function AddGuestModal({ onClose }) {
  return (
    <div className={styles.modal}>
      <div className={styles["modal__tag"]}>New Entry</div>
      <h2 className={styles["modal__title"]}>Add Guest</h2>

      <div className={styles["modal__form"]}>
        {[
          { label: "Full Name",     placeholder: "e.g. Eleanor Voss"    },
          { label: "Email Address", placeholder: "e.g. guest@email.com" },
          { label: "Room",          placeholder: "e.g. Suite 204"       },
        ].map((field) => (
          <div key={field.label} className={styles["form-group"]}>
            <label>{field.label}</label>
            <input type="text" placeholder={field.placeholder} />
          </div>
        ))}

        <div className={styles["modal__dates"]}>
          <div className={styles["form-group"]}>
            <label>Check-In</label>
            <input type="date" />
          </div>
          <div className={styles["form-group"]}>
            <label>Check-Out</label>
            <input type="date" />
          </div>
        </div>

        <div className={styles["modal__actions"]}>
          <button className={styles["btn-ghost"]} onClick={onClose}>
            Cancel
          </button>
          <button className={styles["btn-primary"]} onClick={onClose}>
            Register Guest
          </button>
        </div>
      </div>
    </div>
  );
}