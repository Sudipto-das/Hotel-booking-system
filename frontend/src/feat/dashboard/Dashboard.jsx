import { useRef, useEffect } from "react";
import styles from "./dashboard.module.scss";

// ── Static data ───────────────────────────────────────────────────────────────

const KPI_DATA = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    label: "Occupancy Rate",
    value: "84%",
    delta: "+6%",
    up: true,
    sub: "vs last month",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    label: "Total Revenue",
    value: "$124K",
    delta: "+12%",
    up: true,
    sub: "this month",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="16" y1="2" x2="16" y2="6" />
      </svg>
    ),
    label: "Active Bookings",
    value: "47",
    delta: "-3",
    up: false,
    sub: "vs yesterday",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
    label: "Guest Satisfaction",
    value: "4.8",
    delta: "+0.2",
    up: true,
    sub: "avg rating",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20V10a2 2 0 012-2h16a2 2 0 012 2v10" />
        <path d="M2 14h20" />
        <rect x="6" y="8" width="4" height="4" rx="1" />
      </svg>
    ),
    label: "Available Rooms",
    value: "18",
    delta: null,
    up: null,
    sub: "of 120 total",
  },
];

const REVENUE_DATA = [
  { month: "Jan", rev: 88000,  bk: 38 },
  { month: "Feb", rev: 95000,  bk: 41 },
  { month: "Mar", rev: 112000, bk: 49 },
  { month: "Apr", rev: 103000, bk: 45 },
  { month: "May", rev: 118000, bk: 52 },
  { month: "Jun", rev: 131000, bk: 57 },
  { month: "Jul", rev: 142000, bk: 61 },
  { month: "Aug", rev: 138000, bk: 59 },
  { month: "Sep", rev: 124000, bk: 54 },
  { month: "Oct", rev: 119000, bk: 51 },
  { month: "Nov", rev: 107000, bk: 46 },
  { month: "Dec", rev: 124000, bk: 47 },
];

const ROOM_TYPES = [
  { type: "Presidential", count: 4,  occupied: 3,  color: "#c9a84c" },
  { type: "Suite",        count: 24, occupied: 19, color: "#7db8e8" },
  { type: "Deluxe",       count: 48, occupied: 38, color: "#6fcf97" },
  { type: "Standard",     count: 44, occupied: 41, color: "#e07070" },
];

const RECENT_BOOKINGS = [
  { id: "BKG-0847", guest: "Alexander Pemberton", room: "Presidential Suite", checkIn: "20 Dec", total: "$2,554", status: "confirmed"   },
  { id: "BKG-0846", guest: "Isabelle Laurent",    room: "Suite 301",          checkIn: "18 Dec", total: "$1,350", status: "checked-in"  },
  { id: "BKG-0845", guest: "Marcus Hale",         room: "Deluxe 204",         checkIn: "16 Dec", total: "$560",   status: "checked-in"  },
  { id: "BKG-0844", guest: "Sophia Reinhardt",    room: "Suite 210",          checkIn: "14 Dec", total: "$1,920", status: "checked-out" },
  { id: "BKG-0843", guest: "Julian Park",         room: "Penthouse B",        checkIn: "12 Dec", total: "$5,100", status: "confirmed"   },
];

const ACTIVITY = [
  { icon: "✓", text: "Room 412 checked in — Alexander P.",   time: "2m ago",  type: "success" },
  { icon: "🛎", text: "Room service request — Suite 301",     time: "14m ago", type: "info"    },
  { icon: "+", text: "New booking — Penthouse B (6 nights)",  time: "31m ago", type: "gold"    },
  { icon: "✓", text: "Room 204 cleaned & ready",             time: "45m ago", type: "success" },
  { icon: "!", text: "Maintenance alert — Room 202 A/C",      time: "1h ago",  type: "warn"    },
  { icon: "✓", text: "Room 210 checked out — Reinhardt",     time: "2h ago",  type: "muted"   },
];

const QUICK_STATS = [
  { icon: "→", label: "Check-ins today",   value: "12"         },
  { icon: "←", label: "Check-outs today",  value: "9"          },
  { icon: "🛎", label: "Pending requests",  value: "7"          },
  { icon: "🌙", label: "Avg stay duration", value: "3.4 nights" },
  { icon: "$",  label: "Month-to-date rev", value: "$124K"      },
];

const ACTIVITY_COLORS = {
  success: "#6fcf97",
  info:    "#7db8e8",
  gold:    "#c9a84c",
  warn:    "#e07070",
  muted:   "#6e6e78",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function RevenueChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr  = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const W      = rect.width;
    const H      = rect.height;
    const pad    = { top: 20, right: 16, bottom: 36, left: 52 };
    const iW     = W - pad.left - pad.right;
    const iH     = H - pad.top  - pad.bottom;
    const maxRev = Math.max(...REVENUE_DATA.map((d) => d.rev));
    const maxBk  = Math.max(...REVENUE_DATA.map((d) => d.bk));
    const colW   = iW / REVENUE_DATA.length;
    const barW   = colW * 0.5;

    ctx.clearRect(0, 0, W, H);

    // Grid lines + y-axis labels
    [0, 0.25, 0.5, 0.75, 1].forEach((frac) => {
      const y = pad.top + iH * (1 - frac);
      ctx.beginPath();
      ctx.strokeStyle = "#2a2a2e";
      ctx.lineWidth   = 0.5;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + iW, y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle    = "#6e6e78";
      ctx.font         = "10px Jost, sans-serif";
      ctx.textAlign    = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(`$${Math.round((maxRev * frac) / 1000)}k`, pad.left - 6, y);
    });

    // Bars
    REVENUE_DATA.forEach((d, i) => {
      const x    = pad.left + i * colW + (colW - barW) / 2;
      const barH = (d.rev / maxRev) * iH;
      const y    = pad.top + iH - barH;

      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      grad.addColorStop(0, "rgba(201,168,76,0.85)");
      grad.addColorStop(1, "rgba(201,168,76,0.12)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [2, 2, 0, 0]);
      ctx.fill();

      ctx.fillStyle    = "#6e6e78";
      ctx.font         = "10px Jost, sans-serif";
      ctx.textAlign    = "center";
      ctx.textBaseline = "top";
      ctx.fillText(d.month, pad.left + i * colW + colW / 2, H - pad.bottom + 8);
    });

    // Booking trend line
    ctx.beginPath();
    ctx.strokeStyle = "rgba(125,184,232,0.75)";
    ctx.lineWidth   = 1.5;
    REVENUE_DATA.forEach((d, i) => {
      const x = pad.left + i * colW + colW / 2;
      const y = pad.top  + iH - (d.bk / maxBk) * iH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Trend dots
    REVENUE_DATA.forEach((d, i) => {
      const x = pad.left + i * colW + colW / 2;
      const y = pad.top  + iH - (d.bk / maxBk) * iH;
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#7db8e8";
      ctx.fill();
    });
  }, []);

  return (
    <div className={styles["chart-wrap"]}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
        role="img"
        aria-label="Bar chart showing monthly revenue and booking trend for the past 12 months"
      >
        Monthly revenue ranges from $88k in January to $142k in July.
      </canvas>
    </div>
  );
}

function OccupancyDonut() {
  const totalOccupied = ROOM_TYPES.reduce((a, r) => a + r.occupied, 0);
  const totalRooms    = ROOM_TYPES.reduce((a, r) => a + r.count, 0);
  const pct           = Math.round((totalOccupied / totalRooms) * 100);
  const radius        = 38;
  const circ          = 2 * Math.PI * radius;
  const filled        = (pct / 100) * circ;

  return (
    <div className={styles["donut-wrap"]}>
      <svg width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#2a2a2e" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke="#c9a84c"
          strokeWidth="8"
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className={styles["donut-label"]}>
        <span className={styles["donut-label__pct"]}>{pct}%</span>
        <span className={styles["donut-label__text"]}>Occupied</span>
      </div>
    </div>
  );
}

function RoomBar({ type, count, occupied, color }) {
  const pct = Math.round((occupied / count) * 100);
  return (
    <div className={styles["room-bar"]}>
      <div className={styles["room-bar__head"]}>
        <span className={styles["room-bar__name"]}>{type}</span>
        <span className={styles["room-bar__meta"]}>
          {occupied}/{count} · <span style={{ color }}>{pct}%</span>
        </span>
      </div>
      <div className={styles["room-bar__track"]}>
        <div
          className={styles["room-bar__fill"]}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`${styles.badge} ${styles[`badge--${status}`]}`}>
      {status.replace("-", " ")}
    </span>
  );
}

function KpiDelta({ delta, up, sub }) {
  if (!delta) {
    return (
      <div className={`${styles["kpi-card__delta"]} ${styles["kpi-card__delta--muted"]}`}>
        <span>{sub}</span>
      </div>
    );
  }
  const dirClass = up
    ? styles["kpi-card__delta--up"]
    : styles["kpi-card__delta--down"];

  return (
    <div className={`${styles["kpi-card__delta"]} ${dirClass}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        {up
          ? <polyline points="18 15 12 9 6 15" />
          : <polyline points="6 9 12 15 18 9" />}
      </svg>
      <span>{delta} {sub}</span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const Dashboard = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month:   "long",
    day:     "numeric",
  });

  return (
    <div className={`page-content ${styles.page}`}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles["header__meta"]}>
          <span className={styles["header__tag"]}>Overview</span>
          <h1 className={styles["header__title"]}>Dashboard</h1>
          <p className={styles["header__subtitle"]}>
            Welcome back — here's what's happening at LuxeStay Grand Hotel
          </p>
        </div>

        <div className={styles["date-chip"]}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="16" y1="2" x2="16" y2="6" />
          </svg>
          {today}
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className={styles["kpi-grid"]}>
        {KPI_DATA.map((k) => (
          <div key={k.label} className={styles["kpi-card"]}>
            <div className={styles["kpi-card__icon"]}>{k.icon}</div>
            <div className={styles["kpi-card__value"]}>{k.value}</div>
            <div className={styles["kpi-card__label"]}>{k.label}</div>
            <KpiDelta delta={k.delta} up={k.up} sub={k.sub} />
          </div>
        ))}
      </div>

      {/* ── Revenue Chart + Occupancy ── */}
      <div className={styles["grid--chart-occ"]}>

        <div className={styles.card}>
          <div className={styles["card__head"]}>
            <h2 className={styles["card__title"]}>Revenue &amp; Bookings</h2>
            <div className={styles["chart-legend"]}>
              <span className={styles["chart-legend__item"]}>
                <span className={styles["chart-legend__dot"]} style={{ background: "#c9a84c" }} />
                Revenue
              </span>
              <span className={styles["chart-legend__item"]}>
                <span className={styles["chart-legend__dot"]} style={{ background: "#7db8e8" }} />
                Bookings
              </span>
            </div>
          </div>
          <RevenueChart />
        </div>

        <div className={styles.card}>
          <div className={styles["card__head"]}>
            <h2 className={styles["card__title"]}>Room Occupancy</h2>
            <span className={styles["card__sub"]}>by type</span>
          </div>
          <OccupancyDonut />
          {ROOM_TYPES.map((r) => (
            <RoomBar key={r.type} {...r} />
          ))}
        </div>
      </div>

      {/* ── Recent Bookings + Activity ── */}
      <div className={styles["grid--bookings-activity"]}>

        <div className={styles.card}>
          <div className={styles["card__head"]}>
            <h2 className={styles["card__title"]}>Recent Bookings</h2>
            <a href="/bookings" className={styles["card__link"]}>View All →</a>
          </div>

          <div className={styles["bookings-scroll"]}>
            <table className={styles["bookings-table"]}>
              <thead>
                <tr>
                  {["ID", "Guest", "Room", "Check-in", "Total", "Status"].map((h) => (
                    <th key={h} className={styles["bookings-table__th"]}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_BOOKINGS.map((b) => (
                  <tr key={b.id} className={styles["bookings-table__row"]}>
                    <td className={`${styles["bookings-table__td"]} ${styles["bookings-table__td--id"]}`}>{b.id}</td>
                    <td className={`${styles["bookings-table__td"]} ${styles["bookings-table__td--name"]}`}>{b.guest}</td>
                    <td className={styles["bookings-table__td"]}>{b.room}</td>
                    <td className={styles["bookings-table__td"]}>{b.checkIn}</td>
                    <td className={`${styles["bookings-table__td"]} ${styles["bookings-table__td--amount"]}`}>{b.total}</td>
                    <td className={styles["bookings-table__td"]}>
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles["card__head"]}>
            <h2 className={styles["card__title"]}>Live Activity</h2>
            <span className={styles["card__sub"]} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span className={styles["live-dot"]} />
              live
            </span>
          </div>

          <div className={styles["activity-list"]}>
            {ACTIVITY.map((a, i) => {
              const color = ACTIVITY_COLORS[a.type];
              return (
                <div key={i} className={styles["activity-item"]}>
                  <div
                    className={styles["activity-item__icon"]}
                    style={{
                      background: `${color}18`,
                      border:     `1px solid ${color}35`,
                      color,
                    }}
                  >
                    {a.icon}
                  </div>
                  <div className={styles["activity-item__body"]}>
                    <p className={styles["activity-item__text"]}>{a.text}</p>
                    <span className={styles["activity-item__time"]}>{a.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className={styles["quick-stats"]}>
        {QUICK_STATS.map((s) => (
          <div key={s.label} className={styles["quick-stat"]}>
            <span className={styles["quick-stat__icon"]}>{s.icon}</span>
            <div>
              <div className={styles["quick-stat__value"]}>{s.value}</div>
              <div className={styles["quick-stat__label"]}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;