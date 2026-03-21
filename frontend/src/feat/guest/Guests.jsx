import { useState } from "react";
import styles from "./Guests.module.scss";
import { MOCK_GUESTS } from "./guest";
import { StatCard,StatusBadge } from "./components/Cards";
import { GuestRow } from "./components/GuestsRow";
import { GuestDetailPanel } from "./components/GuestDetailPanel";
import { AddGuestModal } from "./components/AddGuestModal";
import { STATUS_LABELS } from "./guest";

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function GuestsPage() {
  const [search,       setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected,     setSelected]     = useState(null);
  const [showModal,    setShowModal]    = useState(false);

  const filtered = MOCK_GUESTS.filter((g) => {
    const q = search.toLowerCase();
    const matchSearch =
      g.name.toLowerCase().includes(q)  ||
      g.email.toLowerCase().includes(q) ||
      g.room.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || g.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    total:         MOCK_GUESTS.length,
    "checked-in":  MOCK_GUESTS.filter((g) => g.status === "checked-in").length,
    reserved:      MOCK_GUESTS.filter((g) => g.status === "reserved").length,
    "checked-out": MOCK_GUESTS.filter((g) => g.status === "checked-out").length,
    vip:           MOCK_GUESTS.filter((g) => g.vip).length,
  };

  const handleRowSelect = (guest) =>
    setSelected((prev) => (prev?.id === guest.id ? null : guest));

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles["header__meta"]}>
          <span className={styles["header__tag"]}>Management</span>
          <h1 className={styles["header__title"]}>Guests</h1>
          <p className={styles["header__subtitle"]}>
            {counts.total} registered guests · {counts["checked-in"]} currently on property
          </p>
        </div>
        <button className={styles["btn-primary"]} onClick={() => setShowModal(true)}>
          + Add Guest
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className={styles.stats}>
        <StatCard label="Total Guests" value={counts.total}           icon="🛎" />
        <StatCard label="Checked In"   value={counts["checked-in"]}  icon="🏨" />
        <StatCard label="Reserved"     value={counts.reserved}        icon="📋" />
        <StatCard label="Checked Out"  value={counts["checked-out"]} icon="✓"  />
        <StatCard label="VIP Guests"   value={counts.vip}             icon="★"  />
      </div>

      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search guests…"
        />
        <div className={styles.filters}>
          {["all", "checked-in", "reserved", "checked-out"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={[
                styles["filter-btn"],
                filterStatus === s ? styles["filter-btn--active"] : "",
              ].join(" ")}
            >
              {s === "all" ? "All" : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className={styles["table-wrapper"]}>
        <div className={styles["table-scroll"]}>
          <table className={styles.table}>
            <thead>
              <tr className={styles["table__head-row"]}>
                {["", "Guest", "Room", "Stay", "Status"].map((col, i) => (
                  <th key={i} className={styles["table__th"]}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles["table__empty"]}>
                    No guests match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((g) => (
                  <GuestRow
                    key={g.id}
                    guest={g}
                    selected={selected?.id === g.id}
                    onSelect={handleRowSelect}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={styles["table__footer"]}>
          <span className={styles["table__footer-text"]}>
            Showing {filtered.length} of {MOCK_GUESTS.length} guests
          </span>
          <span className={styles["table__footer-text"]}>
            Click a row to view profile
          </span>
        </div>
      </div>

      {/* ── Detail Panel ── */}
      {selected && (
        <>
          <div className={styles.overlay} onClick={() => setSelected(null)} />
          <GuestDetailPanel guest={selected} onClose={() => setSelected(null)} />
        </>
      )}

      {/* ── Add Guest Modal ── */}
      {showModal && (
        <>
          <div
            className={`${styles.overlay} ${styles["overlay--modal"]}`}
            onClick={() => setShowModal(false)}
          />
          <AddGuestModal onClose={() => setShowModal(false)} />
        </>
      )}
    </div>
  );
}