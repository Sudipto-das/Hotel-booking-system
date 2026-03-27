import { useState } from "react";
import styles from "../guests.module.scss";
import { useGuest } from "../hooks/useGuest";

export function AddGuestModal({ onClose }) {
  const { createGuest } = useGuest();
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateGuest = async () => {
    await createGuest(formData);
    onClose()
  }
  return (
    <div className={styles.modal}>
      <div className={styles["modal__tag"]}>New Entry</div>
      <h2 className={styles["modal__title"]}>Add Guest</h2>

      <div className={styles["modal__form"]}>
        {[
          { name: "name", label: "Full Name", placeholder: "e.g. Eleanor Voss" },
          { name: "phone", label: "Phone Number", placeholder: "e.g. 8116181009" },

        ].map((field) => (
          <div key={field.label} className={styles["form-group"]}>
            <label>{field.label}</label>
            <input type="text"
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange} />
          </div>
        ))}

        <div className={styles["modal__actions"]}>
          <button className={styles["btn-ghost"]} onClick={onClose}>
            Cancel
          </button>
          <button className={styles["btn-primary"]} onClick={handleCreateGuest}>
            Register Guest
          </button>
        </div>
      </div>
    </div>
  );
}