import { useEffect, useState } from 'react';
import styles from './Rooms.module.scss';
import { initialRooms,roomTypes,statusFilters } from './room';
import AddNewRoomModal from './components/addNewRoomModal';
import { useRoom } from './hooks/useRoom';

const Rooms = () => {
  const {rooms, setRooms,fetchRooms} = useRoom();
  const [editingRoom, setEditingRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  console.log("Rooms data:", rooms);

  useEffect(() => {
    fetchRooms();
  }, []);

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || room.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || room.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'Available').length,
    booked: rooms.filter(r => r.status === 'Booked').length,
    maintenance: rooms.filter(r => r.status === 'Maintenance').length
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Available': return styles.statusAvailable;
      case 'Booked': return styles.statusOccupied;
      case 'Maintenance': return styles.statusMaintenance;
      default: return '';
    }
  };

  const handleAddRoom = () => {
    setEditingRoom(null);
    setShowModal(true);
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setShowModal(true);
  };

  return (
    <div className="page-content">
      <div className={styles.roomsPage}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Rooms</h1>
            <p className={styles.subtitle}>Manage hotel rooms and allocations</p>
          </div>
          <button className={styles.addButton} onClick={handleAddRoom}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Room
          </button>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" />
                <path d="M2 13v6h20v-6" />
                <path d="M6 13v-3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
              </svg>
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stats.total}</span>
              <span className={styles.statLabel}>Total Rooms</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.statAvailable}`}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stats.available}</span>
              <span className={styles.statLabel}>Available</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.statOccupied}`}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stats.booked}</span>
              <span className={styles.statLabel}>Booked</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.statMaintenance}`}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stats.maintenance}</span>
              <span className={styles.statLabel}>Maintenance</span>
            </div>
          </div>
        </div>

        {/* Filters */}
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
                <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
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

        {/* Room Grid */}
        <div className={styles.roomGrid}>
          {filteredRooms.map(room => (
            <div key={room._id || room.id} className={styles.roomCard}>
              <div className={styles.roomImage}>
                <img src={room.imageUrl} alt={`Room ${room.roomNumber}`} />
                <span className={`${styles.roomStatus} ${getStatusClass(room.status)}`}>
                  {room.status}
                </span>
              </div>
              <div className={styles.roomContent}>
                <div className={styles.roomHeader}>
                  <h3>Room {room.roomNumber}</h3>
                  <span className={styles.roomType}>{room.type}</span>
                </div>
                <div className={styles.roomDetails}>
                  <div className={styles.roomDetail}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <span>${room.pricePerNight}<small>/night</small></span>
                  </div>
                  <div className={styles.roomDetail}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                    <span>{room.capacity} Guests</span>
                  </div>
                </div>
                <div className={styles.roomAmenities}>
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className={styles.amenityTag}>{amenity}</span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className={styles.amenityMore}>+{room.amenities.length - 3}</span>
                  )}
                </div>
                <div className={styles.roomActions}>
                  <button className={styles.viewButton} onClick={() => handleEditRoom(room)}>View Details</button>
                  <button className={styles.editButton}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRooms.length === 0 && (
          <div className={styles.emptyState}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" />
              <path d="M2 13v6h20v-6" />
              <path d="M6 13v-3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
            </svg>
            <h3>No rooms found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <AddNewRoomModal
          editingRoom={editingRoom}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default Rooms;
