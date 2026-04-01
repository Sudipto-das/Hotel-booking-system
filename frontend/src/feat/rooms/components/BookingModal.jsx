import { useEffect, useState } from "react";
import styles from "../Rooms.module.scss";
import bStyles from "./BookingModal.module.scss";
import { Icon } from "./icons";
import { Steps } from "./StepIndicator";
import { GuestSearchDropdown } from "./GuestsSearchDropdown";
import { useGuest } from "../../guest/hooks/useGuest";
import { useAuth } from "../../auth/hooks/useAuth";
import { useRoom } from "../hooks/useRoom";

// ── Main Modal ────────────────────────────────────────────
const BookingModal = ({ room, setShowBookingModal, onConfirm }) => {

  const { guests,fetchGuests } = useGuest()
  const { user } = useAuth();
  const { handleBookingRoom } = useRoom()

  const [step, setStep] = useState(0);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
  const [specialRequests, setSpecialRequests] = useState("");
  const [addons, setAddons] = useState({ breakfast: false, parking: false, spa: false, airportPickup: false });
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [payment, setPayment] = useState({ name: "", card: "", expiry: "", cvv: "" });
  const [booked, setBooked] = useState(false);



  // ── derived ──────────────────────────────────────────────
  const nights = (() => {
    if (!dates.checkIn || !dates.checkOut) return 0;
    const diff = new Date(dates.checkOut) - new Date(dates.checkIn);
    return Math.max(0, Math.round(diff / 86400000));
  })();

  const baseRate = room?.pricePerNight ?? 280;
  const addonsTotal =
    (addons.breakfast ? 28 : 0) +
    (addons.parking ? 18 : 0) +
    (addons.spa ? 120 : 0) +
    (addons.airportPickup ? 55 : 0);
  const subtotal = baseRate * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes + addonsTotal * nights;

  const today = new Date().toISOString().split("T")[0];

  // ── validation ───────────────────────────────────────────
  const canNext = [
    selectedGuest !== null,
    dates.checkIn && dates.checkOut && nights > 0,
    true, // details optional
    paymentMethod === "offline" ||
    (payment.name && payment.card.replace(/\s/g, "").length === 16 && payment.expiry && payment.cvv.length >= 3),
  ][step];

  const handleConfirm = async () => {
    const bookingData = {
      checkOutDate: dates.checkOut,
      totalPrice: total,
      roomId: room._id,
      userId: user._id,
      clientId: selectedGuest._id,        // guest = client
      roomStatus: "booked",
    }
    const res = await handleBookingRoom(bookingData); // calls context → service → API

    if (res?.data) {
      setBooked(true);          // triggers your success screen
      onConfirm?.(res.data);    // notify parent if needed
    }
  };

  const fmtCard = (v) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const fmtExpiry = (v) =>
    v
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/^(\d{2})(\d)/, "$1/$2");

      useEffect(()=>{
        fetchGuests()
      },[])

  // ── success screen ───────────────────────────────────────
  if (booked) {
    return (
      <div className={styles.modalOverlay} onClick={setShowBookingModal(false)}>
        <div className={`${styles.modal} ${bStyles.modal}`} onClick={(e) => e.stopPropagation()}>
          <div className={bStyles.successScreen}>
            <div className={bStyles.successIcon}>
              <Icon.Sparkle />
            </div>
            <h2>Booking Confirmed</h2>
            <p>Your reservation at <strong>{room?.name ?? "The Suite"}</strong> is confirmed.</p>
            <div className={bStyles.successDetails}>
              <div className={bStyles.successRow}>
                <span>Guest</span>
                <strong>{selectedGuest?.name}</strong>
              </div>
              <div className={bStyles.successRow}>
                <span>Check-in</span>
                <strong>{dates.checkIn}</strong>
              </div>
              <div className={bStyles.successRow}>
                <span>Check-out</span>
                <strong>{dates.checkOut}</strong>
              </div>

              <div className={bStyles.successRow}>
                <span>Payment</span>
                <strong>{paymentMethod === "online" ? "Online Payment" : "Pay at Hotel"}</strong>
              </div>
              <div className={bStyles.successRow}>
                <span>Total</span>
                <strong className={bStyles.totalHighlight}>${total.toLocaleString()}</strong>
              </div>
            </div>
            <button className={styles.saveButton} onClick={() => setShowBookingModal(false)}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={() => setShowBookingModal(false)}>
      <div className={`${styles.modal} ${bStyles.modal}`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div>
            <div className={bStyles.modalTag}>New Reservation</div>
            <h2>{room?.name ?? "Book a Room"}</h2>
          </div>
          <button className={styles.closeButton} onClick={() => setShowBookingModal(false)}>
            <Icon.Close />
          </button>
        </div>

        {/* Steps */}
        <div className={bStyles.stepsWrapper}>
          <Steps current={step} />
        </div>

        {/* Body */}
        <div className={styles.modalForm}>

          {/* ── Step 0: Guest Selection ── */}
          {step === 0 && (
            <div className={bStyles.stepContent}>
              <div className={bStyles.sectionTitle}>
                <Icon.User />
                <span>Select Guest</span>
              </div>

              <GuestSearchDropdown
                guests={guests}
                selectedGuest={selectedGuest}
                onSelect={setSelectedGuest}
              />
            </div>
          )}

          {/* ── Step 1: Dates ── */}
          {step === 1 && (
            <div className={bStyles.stepContent}>
              <div className={bStyles.sectionTitle}>
                <Icon.Calendar />
                <span>Select your dates</span>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Check-in</label>
                  <input type="date" min={today} value={dates.checkIn} onChange={(e) => setDates((d) => ({ ...d, checkIn: e.target.value, checkOut: "" }))} />
                </div>
                <div className={styles.formGroup}>
                  <label>Check-out</label>
                  <input type="date" min={dates.checkIn || today} value={dates.checkOut} onChange={(e) => setDates((d) => ({ ...d, checkOut: e.target.value }))} disabled={!dates.checkIn} />
                </div>
              </div>
              {nights > 0 && (
                <div className={bStyles.nightsBadge}>
                  <Icon.Bed />
                  <span>{nights} night{nights !== 1 ? "s" : ""} · ${baseRate}/night</span>
                </div>
              )}
            </div>
          )}

          {/* ── Step 2: Details & Add-ons ── */}
          {step === 2 && (
            <div className={bStyles.stepContent}>
              <div className={bStyles.sectionTitle}>
                <Icon.Sparkle />
                <span>Enhance your stay</span>
              </div>
              <div className={bStyles.addonGrid}>
                {[
                  { key: "breakfast", label: "Breakfast", desc: "Daily continental breakfast", price: 28 },
                  { key: "parking", label: "Parking", desc: "Secure valet parking", price: 18 },
                  { key: "spa", label: "Spa Access", desc: "Full spa & wellness centre", price: 120 },
                  { key: "airportPickup", label: "Airport Pickup", desc: "Private car transfer", price: 55 },
                ].map(({ key, label, desc, price }) => (
                  <button
                    type="button"
                    key={key}
                    className={`${bStyles.addonCard} ${addons[key] ? bStyles.addonSelected : ""}`}
                    onClick={() => setAddons((a) => ({ ...a, [key]: !a[key] }))}
                  >
                    <div className={bStyles.addonCheck}>{addons[key] && <Icon.Check />}</div>
                    <div className={bStyles.addonLabel}>{label}</div>
                    <div className={bStyles.addonDesc}>{desc}</div>
                    <div className={bStyles.addonPrice}>+${price}/night</div>
                  </button>
                ))}
              </div>

              <div className={styles.formGroup} style={{ marginTop: "1.25rem" }}>
                <label>Special Requests</label>
                <textarea
                  className={bStyles.textarea}
                  placeholder="High floor, late check-out, dietary needs…"
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ── Step 3: Payment & Summary ── */}
          {step === 3 && (
            <div className={bStyles.stepContent}>
              <div className={bStyles.sectionTitle}>
                <Icon.Credit />
                <span>Payment details</span>
              </div>

              {/* Payment Method Selection */}
              <div className={bStyles.paymentMethodSection}>
                <label className={bStyles.paymentMethodLabel}>Payment Method</label>
                <div className={bStyles.paymentMethodOptions}>
                  <button
                    type="button"
                    className={`${bStyles.paymentMethodBtn} ${paymentMethod === "online" ? bStyles.paymentMethodBtnActive : ""}`}
                    onClick={() => setPaymentMethod("online")}
                  >
                    <Icon.Credit />
                    <span>Pay Online</span>
                  </button>
                  <button
                    type="button"
                    className={`${bStyles.paymentMethodBtn} ${paymentMethod === "offline" ? bStyles.paymentMethodBtnActive : ""}`}
                    onClick={() => setPaymentMethod("offline")}
                  >
                    <Icon.Cash />
                    <span>Pay at Hotel</span>
                  </button>
                </div>
              </div>

              {/* Online Payment Form */}
              {paymentMethod === "online" && (
                <div className={bStyles.onlinePaymentForm}>
                  <div className={styles.formGroup}>
                    <label>Cardholder Name</label>
                    <input placeholder="As on card" value={payment.name} onChange={(e) => setPayment((p) => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Card Number</label>
                    <input placeholder="0000 0000 0000 0000" value={payment.card} onChange={(e) => setPayment((p) => ({ ...p, card: fmtCard(e.target.value) }))} />
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Expiry</label>
                      <input placeholder="MM/YY" value={payment.expiry} onChange={(e) => setPayment((p) => ({ ...p, expiry: fmtExpiry(e.target.value) }))} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>CVV</label>
                      <input placeholder="···" maxLength={4} value={payment.cvv} onChange={(e) => setPayment((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))} />
                    </div>
                  </div>
                </div>
              )}

              {/* Offline Payment Info */}
              {paymentMethod === "offline" && (
                <div className={bStyles.offlinePaymentInfo}>
                  <Icon.Cash />
                  <div>
                    <h4>Pay at Hotel</h4>
                    <p>You can pay the full amount at the hotel during check-in. Accepted payment methods: Cash, Credit/Debit Card, or UPI.</p>
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className={bStyles.summary}>
                <div className={bStyles.summaryTitle}>Booking Summary</div>
                <div className={bStyles.summaryRow}>
                  <span>${baseRate} × {nights} night{nights !== 1 ? "s" : ""}</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className={bStyles.summaryRow}>
                    <span>Add-ons × {nights} night{nights !== 1 ? "s" : ""}</span>
                    <span>${(addonsTotal * nights).toLocaleString()}</span>
                  </div>
                )}
                <div className={bStyles.summaryRow}>
                  <span>Taxes & fees (12%)</span>
                  <span>${taxes.toLocaleString()}</span>
                </div>
                <div className={bStyles.summaryDivider} />
                <div className={`${bStyles.summaryRow} ${bStyles.summaryTotal}`}>
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`${styles.modalActions} ${bStyles.footer}`}>
          {step > 0 ? (
            <button className={styles.cancelButton} onClick={() => setStep((s) => s - 1)}>
              Back
            </button>
          ) : (
            <button className={styles.cancelButton} onClick={() => setShowBookingModal(false)}>
              Cancel
            </button>
          )}

          {step < 3 ? (
            <button className={styles.saveButton} disabled={!canNext} onClick={() => setStep((s) => s + 1)}>
              Continue
            </button>
          ) : (
            <button className={styles.saveButton} disabled={!canNext} onClick={handleConfirm}>
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
