import styles from '../Rooms.module.scss';

const STAT_CARDS = [
  { key: 'total', label: 'Total Rooms' },
  { key: 'available', label: 'Available', modifier: styles.statAvailable },
  { key: 'booked', label: 'Booked', modifier: styles.statOccupied },
  { key: 'maintenance', label: 'Maintenance', modifier: styles.statMaintenance },
];

const RoomStatsGrid = ({ stats }) => (
  <div className={styles.statsGrid}>
    {STAT_CARDS.map(({ key, label, modifier }) => (
      <div key={key} className={`${styles.statCard} ${modifier ?? ''}`}>
        <div className={styles.statInfo}>
          <span className={styles.statValue}>{stats[key]}</span>
          <span className={styles.statLabel}>{label}</span>
        </div>
      </div>
    ))}
  </div>
);

export default RoomStatsGrid;