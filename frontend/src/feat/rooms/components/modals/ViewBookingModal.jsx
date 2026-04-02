import { useEffect } from "react";
import styles from "./../ViewBooking.module.scss";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = {
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  bed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4"/>
      <path d="M2 13v6h20v-6"/><path d="M2 13h20"/>
      <path d="M6 13v-3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3"/>
    </svg>
  ),
  wifi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
    </svg>
  ),
  tv: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/>
    </svg>
  ),
  coffee: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  ),
  bath: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
      <line x1="10" y1="5" x2="8" y2="7"/><path d="M2 12h20"/>
    </svg>
  ),
  ac: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="5" rx="1"/>
      <path d="M8 24V6"/><path d="M16 24V6"/><path d="M12 6v18"/><path d="M20 10 12 6 4 10"/>
    </svg>
  ),
  minibar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  cancel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  print: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9"/>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
      <rect x="6" y="14" width="12" height="8"/>
    </svg>
  ),
};

const AMENITY_ICONS = {
  "Free Wi-Fi":       Icon.wifi,
  "Smart TV":         Icon.tv,
  "Coffee Maker":     Icon.coffee,
  "Jacuzzi Bath":     Icon.bath,
  "Air Conditioning": Icon.ac,
  "Mini Bar":         Icon.minibar,
};

const STATUS_MAP = {
  confirmed:    { label: "Confirmed",  cls: "status-badge--confirmed"  },
  pending:      { label: "Pending",    cls: "status-badge--pending"    },
  cancelled:    { label: "Cancelled", cls: "status-badge--cancelled"  },
  "checked-in": { label: "Checked In", cls: "status-badge--checked-in" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const nightsBetween = (a, b) =>
  Math.round((new Date(b) - new Date(a)) / (1000 * 60 * 60 * 24));

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
  });

const fmtCurrency = (n) =>
  `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

// ── Component ─────────────────────────────────────────────────────────────────
/**
 * ViewRoomBookingDetail
 *
 * Props:
 *   room                    {object}    – room data from the rooms list
 *   setShowViewBookingModal {function}  – close handler (sets modal visibility to false)
 */
export default function ViewRoomBookingDetail({ room, setShowViewBookingModal }) {
  // Use dummy data for now
  const booking = DEMO_BOOKING;

  const onClose = () => setShowViewBookingModal(false);

  // Escape key close
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  if (!booking) return null;

  const nights = nightsBetween(booking.checkIn, booking.checkOut);
  const status = STATUS_MAP[booking.status] ?? { label: booking.status, cls: "" };

  return (
    <div
      className={styles["booking-overlay"]}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="presentation"
    >
      <div className={styles["booking-modal"]} role="dialog" aria-modal="true" aria-label="Booking Detail">

        {/* ── Header ── */}
        <div className={styles["booking-modal__header"]}>
          <div className={styles["booking-modal__title-block"]}>
            <span className={styles["booking-modal__eyebrow"]}>Reservation Detail</span>
            <h2 className={styles["booking-modal__title"]}>Room Booking</h2>
            <span className={styles["booking-modal__id"]}>#{booking.id}</span>
          </div>
          <div className={styles["booking-modal__header-actions"]}>
            <span className={`${styles["status-badge"]} ${styles[status.cls] || ""}`}>{status.label}</span>
            <button className={styles["booking-modal__close"]} onClick={onClose} aria-label="Close modal">
              {Icon.close}
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className={styles["booking-modal__body"]}>

          {/* Room */}
          <div className={styles["bm-section"]}>
            <span className={styles["bm-section__label"]}>Room</span>

            <div className={`${styles["bm-card"]} ${styles["bm-card--highlighted"]}`}>
              <div className={styles["bm-room-hero"]}>
                <div className={styles["bm-room-hero__icon"]}>{Icon.bed}</div>
                <div className={styles["bm-room-hero__info"]}>
                  <div className={styles["room-name"]}>{booking.room.name}</div>
                  <div className={styles["room-type"]}>{booking.room.type}</div>
                </div>
                <div className={styles["bm-room-hero__number"]}>{booking.room.number}</div>
              </div>
            </div>

            <div className={`${styles["bm-grid"]} ${styles["bm-grid--4"]}`}>
              <div className={styles["bm-field"]}>
                <span className={styles["bm-field__label"]}>Floor</span>
                <span className={styles["bm-field__value"]}>{booking.room.floor}</span>
              </div>
              <div className={styles["bm-field"]}>
                <span className={styles["bm-field__label"]}>View</span>
                <span className={styles["bm-field__value"]}>{booking.room.view}</span>
              </div>
              <div className={styles["bm-field"]}>
                <span className={styles["bm-field__label"]}>Max Guests</span>
                <span className={styles["bm-field__value"]}>{booking.room.maxGuests}</span>
              </div>
              <div className={styles["bm-field"]}>
                <span className={styles["bm-field__label"]}>Rate / Night</span>
                <span className={`${styles["bm-field__value"]} ${styles["bm-field__value--gold"]}`}>
                  {fmtCurrency(booking.pricing.ratePerNight)}
                </span>
              </div>
            </div>

            {booking.room.amenities?.length > 0 && (
              <div className={styles["bm-amenities"]}>
                {booking.room.amenities.map((a) => (
                  <span className={styles["bm-amenity"]} key={a}>
                    {AMENITY_ICONS[a] ?? Icon.tv} {a}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Stay */}
          <div className={styles["bm-section"]}>
            <span className={styles["bm-section__label"]}>Stay Duration</span>
            <div className={styles["bm-stay-bar"]}>
              <div className={styles["bm-stay-bar__segment"]}>
                <span className={styles["bm-stay-bar__label"]}>Check-In</span>
                <span className={styles["bm-stay-bar__date"]}>{fmtDate(booking.checkIn)}</span>
              </div>
              <div className={`${styles["bm-stay-bar__segment"]} ${styles["bm-stay-bar__segment--mid"]}`}>
                <span className={styles["bm-stay-bar__nights"]}>{nights}</span>
                <span className={styles["bm-stay-bar__nights-label"]}>{nights === 1 ? "Night" : "Nights"}</span>
              </div>
              <div className={styles["bm-stay-bar__segment"]} style={{ textAlign: "right" }}>
                <span className={styles["bm-stay-bar__label"]}>Check-Out</span>
                <span className={styles["bm-stay-bar__date"]}>{fmtDate(booking.checkOut)}</span>
              </div>
            </div>
          </div>

          {/* Guest */}
          <div className={styles["bm-section"]}>
            <span className={styles["bm-section__label"]}>Guest Information</span>
            <div className={styles["bm-card"]}>
              <div className={`${styles["bm-grid"]} ${styles["bm-grid--2"]}`} style={{ marginBottom: "14px" }}>
                <div className={styles["bm-field"]}>
                  <span className={styles["bm-field__label"]}>Full Name</span>
                  <span className={styles["bm-field__value"]}>{booking.guest.name}</span>
                </div>
                <div className={styles["bm-field"]}>
                  <span className={styles["bm-field__label"]}>Nationality</span>
                  <span className={styles["bm-field__value"]}>{booking.guest.nationality}</span>
                </div>
              </div>
              <div className={`${styles["bm-grid"]} ${styles["bm-grid--2"]}`} style={{ marginBottom: "14px" }}>
                <div className={styles["bm-field"]}>
                  <span className={styles["bm-field__label"]}>Email</span>
                  <span className={`${styles["bm-field__value"]} ${styles["bm-field__value--muted"]}`}>{booking.guest.email}</span>
                </div>
                <div className={styles["bm-field"]}>
                  <span className={styles["bm-field__label"]}>Phone</span>
                  <span className={`${styles["bm-field__value"]} ${styles["bm-field__value--muted"]}`}>{booking.guest.phone}</span>
                </div>
              </div>
              <div className={`${styles["bm-grid"]} ${styles["bm-grid--3"]}`}>
                <div className={styles["bm-field"]}>
                  <span className={styles["bm-field__label"]}>ID Type</span>
                  <span className={styles["bm-field__value"]}>{booking.guest.idType}</span>
                </div>
                <div className={styles["bm-field"]}>
                  <span className={styles["bm-field__label"]}>ID Number</span>
                  <span className={styles["bm-field__value"]}>{booking.guest.idNumber}</span>
                </div>
                <div className={styles["bm-field"]}>
                  <span className={styles["bm-field__label"]}>Guests</span>
                  <span className={styles["bm-field__value"]}>
                    {booking.guests.adults} Adult{booking.guests.adults !== 1 ? "s" : ""}
                    {booking.guests.children > 0 && `, ${booking.guests.children} Child${booking.guests.children !== 1 ? "ren" : ""}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className={styles["bm-section"]}>
            <span className={styles["bm-section__label"]}>Pricing Breakdown</span>
            <div className={styles["bm-card"]}>
              <div className={styles["bm-price-rows"]}>
                <div className={styles["bm-price-row"]}>
                  <span className={styles["bm-price-row__label"]}>
                    {fmtCurrency(booking.pricing.ratePerNight)} × {nights} night{nights !== 1 ? "s" : ""}
                  </span>
                  <span className={styles["bm-price-row__value"]}>
                    {fmtCurrency(booking.pricing.ratePerNight * nights)}
                  </span>
                </div>
                {booking.pricing.serviceFee > 0 && (
                  <div className={styles["bm-price-row"]}>
                    <span className={styles["bm-price-row__label"]}>Service Fee</span>
                    <span className={styles["bm-price-row__value"]}>{fmtCurrency(booking.pricing.serviceFee)}</span>
                  </div>
                )}
                {booking.pricing.taxes > 0 && (
                  <div className={styles["bm-price-row"]}>
                    <span className={styles["bm-price-row__label"]}>Taxes</span>
                    <span className={styles["bm-price-row__value"]}>{fmtCurrency(booking.pricing.taxes)}</span>
                  </div>
                )}
                {booking.pricing.discount > 0 && (
                  <div className={styles["bm-price-row"]}>
                    <span className={styles["bm-price-row__label"]}>Discount</span>
                    <span className={styles["bm-price-row__value"]} style={{ color: "#6fcf97" }}>
                      -{fmtCurrency(booking.pricing.discount)}
                    </span>
                  </div>
                )}
                <div className={`${styles["bm-price-row"]} ${styles["bm-price-row--total"]}`}>
                  <span className={styles["bm-price-row__label"]}>Total Amount</span>
                  <span className={styles["bm-price-row__value"]}>{fmtCurrency(booking.pricing.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className={styles["bm-section"]}>
            <span className={styles["bm-section__label"]}>Payment</span>
            <div className={`${styles["bm-grid"]} ${styles["bm-grid--2"]}`}>
              <div className={styles["bm-field"]}>
                <span className={styles["bm-field__label"]}>Method</span>
                <span className={styles["bm-field__value"]}>{booking.paymentMethod}</span>
              </div>
              <div className={styles["bm-field"]}>
                <span className={styles["bm-field__label"]}>Status</span>
                <span className={`${styles["bm-field__value"]}${booking.paymentStatus === "Paid" ? ` ${styles["bm-field__value--gold"]}` : ""}`}>
                  {booking.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className={styles["bm-section"]}>
              <span className={styles["bm-section__label"]}>Special Requests</span>
              <div className={styles["bm-card"]}>
                <p className={styles["bm-notes"]}>{booking.specialRequests}</p>
              </div>
            </div>
          )}

        </div>{/* end body */}

        {/* ── Footer ── */}
        <div className={styles["booking-modal__footer"]}>
          <span className={styles["booking-modal__footer-meta"]}>
            Created {fmtDate(booking.createdAt)}
          </span>
          <div className={styles["bm-btn-group"]}>
            <button className={`${styles["bm-btn"]} ${styles["bm-btn--ghost"]}`} onClick={() => window.print()}>
              {Icon.print} Print
            </button>
            {booking.status !== "cancelled" && (
              <button className={`${styles["bm-btn"]} ${styles["bm-btn--danger"]}`} onClick={() => console.log("Cancel booking", booking)}>
                {Icon.cancel} Cancel
              </button>
            )}
            <button className={`${styles["bm-btn"]} ${styles["bm-btn--primary"]}`} onClick={() => console.log("Edit booking", booking)}>
              {Icon.edit} Edit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Demo Fixture ──────────────────────────────────────────────────────────────
export const DEMO_BOOKING = {
  id: "BKG-2024-00847",
  status: "confirmed",
  createdAt: "2024-11-10",
  room: {
    number: "412",
    name: "Presidential Suite",
    type: "Suite · King Bed",
    floor: "4th Floor",
    view: "Ocean View",
    maxGuests: 4,
    amenities: ["Free Wi-Fi", "Smart TV", "Coffee Maker", "Jacuzzi Bath", "Air Conditioning", "Mini Bar"],
  },
  guest: {
    name: "Alexander Pemberton",
    email: "a.pemberton@email.com",
    phone: "+1 (555) 024-8876",
    idType: "Passport",
    idNumber: "P9284756A",
    nationality: "United States",
  },
  checkIn: "2024-12-20",
  checkOut: "2024-12-25",
  guests: { adults: 2, children: 1 },
  pricing: {
    ratePerNight: 480,
    serviceFee: 60,
    taxes: 144,
    discount: 50,
    total: 2554,
  },
  paymentMethod: "Visa •••• 4821",
  paymentStatus: "Paid",
  specialRequests:
    "Late check-in expected around 11 PM. Please arrange airport transfer and have a bottle of champagne ready in the suite. Hypoallergenic bedding required.",
};