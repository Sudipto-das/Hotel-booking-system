import styles from '../Rooms.module.scss';

const RoomFilters = ({
  searchTerm, setSearchTerm,
  typeFilter, setTypeFilter,
  statusFilter, setStatusFilter,
  roomTypes,
  statusFilters,
}) => (
  <div className={styles.filters}>
    <div className={styles.searchBox}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder="Search by room number or type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    <div className={styles.filterGroup}>
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className={styles.filterSelect}
      >
        {roomTypes.map(type => (
          <option key={type} value={type}>
            {type === 'All' ? 'All Types' : type}
          </option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className={styles.filterSelect}
      >
        {statusFilters.map(status => (
          <option key={status} value={status}>
            {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default RoomFilters;