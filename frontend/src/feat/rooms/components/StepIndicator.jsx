import { Icon } from "./icons";
import bStyles from "./BookingModal.module.scss"


// ── Step indicator ────────────────────────────────────────
export const Steps = ({ current }) => {
  const steps = ["Guest", "Dates", "Details", "Confirm"];
  return (
    <div className={bStyles.steps}>
      {steps.map((s, i) => (
        <div
          key={s}
          className={`${bStyles.step} ${i < current ? bStyles.stepDone : ""} ${
            i === current ? bStyles.stepActive : ""
          }`}
        >
          <div className={bStyles.stepDot}>
            {i < current ? <Icon.Check /> : <span>{i + 1}</span>}
          </div>
          <span className={bStyles.stepLabel}>{s}</span>
          {i < steps.length - 1 && <div className={bStyles.stepLine} />}
        </div>
      ))}
    </div>
  );
};