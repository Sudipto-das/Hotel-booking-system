import { Icon } from "./icons";
import bStyles from "./BookingModal.module.scss"
// ── Counter ───────────────────────────────────────────────
export const Counter = ({ label, sub, value, onChange, min = 0, max = 10 }) => (
  <div className={bStyles.counter}>
    <div className={bStyles.counterInfo}>
      <span className={bStyles.counterLabel}>{label}</span>
      {sub && <span className={bStyles.counterSub}>{sub}</span>}
    </div>
    <div className={bStyles.counterControls}>
      <button
        type="button"
        className={bStyles.counterBtn}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Icon.Minus />
      </button>
      <span className={bStyles.counterValue}>{value}</span>
      <button
        type="button"
        className={bStyles.counterBtn}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Icon.Plus />
      </button>
    </div>
  </div>
);