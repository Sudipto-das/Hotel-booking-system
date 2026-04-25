import { useState, useMemo, useEffect } from 'react';
import styles from './Bookings.module.scss';
import { useBookings } from './hooks/useBookings';

// ── Icons ─────────────────────────────────────────────────────────────────────

const Icon = {
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Eye: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Edit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Trash: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  ),
  ChevLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });

const fmtCurrency = (n) =>
  `$${Number(n).toLocaleString('en-US')}`;

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', cls: 'Confirmed' },
  pending: { label: 'Pending', cls: 'Pending' },
  'checked-in': { label: 'Checked In', cls: 'CheckedIn' },
  'checked-out': { label: 'Checked Out', cls: 'CheckedOut' },
  cancelled: { label: 'Cancelled', cls: 'Cancelled' },
};

const PAGE_SIZE = 8;

// Transform API booking data to frontend format
const transformBooking = (booking) => {
  // Generate booking reference from _id
  const bookingRef = `BKG-${new Date(booking.createdAt || Date.now()).getFullYear()}-${String(booking._id?.slice(-4) || Math.random().toString(36).slice(-4)).padStart(4, '0')}`;

  // Extract guest info - prefer clientId (walk-in guest), fallback to userId (registered user)
  const guestName = booking.clientId?.name || booking.userId?.name || 'Unknown Guest';
  const guestPhone = booking.clientId?.phoneNumber || booking.userId?.phone || 'N/A';

  // Extract room info
  const roomNumber = booking.roomId?.roomNumber || 'TBD';
  const roomType = booking.roomId?.type || 'Standard';

  // Calculate nights
  const checkIn = new Date(booking.checkInDate);
  const checkOut = new Date(booking.checkOutDate);
  const nights = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));

  // Use actual API fields with fallback to derived values
  const status = booking.status || 'confirmed';
  const paymentStatus = booking.paymentStatus || 'pending';
  const paymentMethod = booking.paymentMethod || (booking.clientId ? 'Pay at Hotel' : 'Card on File');

  return {
    _id: booking._id,
    bookingRef,
    guest: { name: guestName, phone: guestPhone },
    room: { number: roomNumber, type: roomType },
    checkIn: booking.checkInDate,
    checkOut: booking.checkOutDate,
    nights,
    totalPrice: booking.totalPrice || 0,
    status,
    paymentStatus,
    paymentMethod,
  };
};

// ── StatusBadge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, cls: 'Pending' };
  return (
    <span className={`${styles.badge} ${styles['badge' + cfg.cls]}`}>
      {cfg.label}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const Bookings = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const { allBookings, loading, fetchGetAllBookings } = useBookings();

  // Transform API data to frontend format
  const bookings = useMemo(() => {
    return allBookings.map(transformBooking);
  }, [allBookings]);

  // Stats
  const stats = useMemo(() => ({
    total: bookings.length,
    active: bookings.filter(b => new Date(b.checkOutDate > new Date())).length,
    upcoming: bookings.filter(b => b.status === 'confirmed').length,
    revenue: bookings.filter(b => b.paymentStatus === 'paid').reduce((s, b) => s + b.totalPrice, 0),
  }), [bookings]);

  // Filter + sort
  const filtered = useMemo(() => {
    let list = bookings.filter(b => {
      const q = search.toLowerCase();
      const matchSearch =
        b.guest.name.toLowerCase().includes(q) ||
        b.bookingRef.toLowerCase().includes(q) ||
        b.room.number.toLowerCase().includes(q) ||
        b.room.type.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || b.status === statusFilter;
      return matchSearch && matchStatus;
    });

    if (sortBy === 'newest') list = [...list].sort((a, b) => b.bookingRef.localeCompare(a.bookingRef));
    if (sortBy === 'checkin') list = [...list].sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
    if (sortBy === 'amount') list = [...list].sort((a, b) => b.totalPrice - a.totalPrice);

    return list;
  }, [bookings, search, statusFilter, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [search, statusFilter, sortBy]);

  const filters = ['all', 'confirmed', 'checked-in', 'checked-out', 'pending', 'cancelled'];
  const filterLabels = { all: 'All', confirmed: 'Confirmed', 'checked-in': 'Active', 'checked-out': 'Checked Out', pending: 'Pending', cancelled: 'Cancelled' };

  useEffect(() => {
    fetchGetAllBookings();
  }, []);

  if (loading) {
    return (
      <div className="page-content">
        <div className={styles.bookingsPage}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <p>Loading bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className={styles.bookingsPage}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerTag}>Management</span>
            <h1>Bookings</h1>
            <p className={styles.headerSubtitle}>
              {stats.total} total reservations · {stats.active} guests currently on property
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Total Bookings</div>
            <div className={styles.statAccent}>All time</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.active}</div>
            <div className={styles.statLabel}>Currently Active</div>
            <div className={styles.statAccent}>Guests on property</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.upcoming}</div>
            <div className={styles.statLabel}>Upcoming</div>
            <div className={styles.statAccent}>Confirmed reservations</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{fmtCurrency(stats.revenue)}</div>
            <div className={styles.statLabel}>Revenue Collected</div>
            <div className={styles.statAccent}>Paid bookings only</div>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Icon.Search />
            <input
              type="text"
              placeholder="Search by guest, booking ref or room..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            {filters.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={[
                  styles.filterBtn,
                  statusFilter === s ? styles.filterBtnActive : '',
                ].join(' ')}
              >
                {filterLabels[s]}
              </button>
            ))}
          </div>

          <select
            className={styles.filterSelect}
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="checkin">Check-In Date</option>
            <option value="amount">Amount ↓</option>
          </select>
        </div>

        {/* ── Table ── */}
        <div className={styles.tableWrapper}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeadRow}>
                  {['Ref', 'Guest', 'Room', 'Stay', 'Amount', 'Payment', 'Status', ''].map((col, i) => (
                    <th key={i} className={styles.tableTh}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={8} className={styles.tableEmpty}>
                      No bookings match your search.
                    </td>
                  </tr>
                ) : (
                  paginated.map(booking => (
                    <tr key={booking._id} className={styles.tableRow}>
                      <td className={styles.tableTd}>
                        <span className={styles.bookingId}>{booking.bookingRef}</span>
                      </td>
                      <td className={styles.tableTd}>
                        <div className={styles.guestName}>{booking.guest.name}</div>
                        <div className={styles.guestPhone}>{booking.guest.phone}</div>
                      </td>
                      <td className={styles.tableTd}>
                        <div className={styles.roomInfo}>Room {booking.room.number}</div>
                        <div className={styles.roomType}>{booking.room.type}</div>
                      </td>
                      <td className={styles.tableTd}>
                        <div className={styles.dateRange}>
                          {fmtDate(booking.checkIn)}
                          <span className={styles.dateArrow}>→</span>
                          {fmtDate(booking.checkOut)}
                        </div>
                        <div className={styles.nights}>
                          {booking.nights} night{booking.nights !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className={styles.tableTd}>
                        <span className={styles.amount}>{fmtCurrency(booking.totalPrice)}</span>
                      </td>
                      <td className={styles.tableTd}>
                        <div className={`${styles.payBadge} ${booking.paymentStatus === 'paid' ? styles.payPaid : styles.payPending}`}>
                          {booking.paymentStatus === 'paid' ? '✓ Paid' : '○ Pending'}
                        </div>
                        <div className={styles.payBadge} style={{ marginTop: '2px', fontSize: '0.7rem' }}>
                          {booking.paymentMethod}
                        </div>
                      </td>
                      <td className={styles.tableTd}>
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className={styles.tableTd}>
                        <div className={styles.actionsCell}>
                          <button className={styles.actionBtn} title="View"><Icon.Eye /></button>
                          <button className={styles.actionBtn} title="Edit"><Icon.Edit /></button>
                          <button className={styles.actionBtn} title="Delete"><Icon.Trash /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          <div className={styles.tableFooter}>
            <span className={styles.tableFooterText}>
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} bookings
            </span>
            <div className={styles.pagination}>
              <button
                className={`${styles.pageBtn} ${page === 1 ? styles.pageBtnDisabled : ''}`}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                <Icon.ChevLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className={`${styles.pageBtn} ${n === page ? styles.pageBtnActive : ''}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                className={`${styles.pageBtn} ${page === totalPages ? styles.pageBtnDisabled : ''}`}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                <Icon.ChevRight />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Bookings;