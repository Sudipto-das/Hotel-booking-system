import { useEffect } from 'react';
import styles from './Rooms.module.scss';
import { roomTypes, statusFilters } from './room';
import { computeStats } from '../../utils/rooms.utils';
import { useRoom } from './hooks/useRoom';
import  useRoomFilters  from './hooks/useRoomFilters';
import useRoomModals  from './hooks/useRoomModals';
import RoomStatsGrid from './components/RoomStatsGrid';
import RoomFilters from './components/RoomFilters';
import AddNewRoomModal from './components/addNewRoomModal';
import BookingModal from './components/BookingModal';
import RoomCard from './components/RoomCard';

const Rooms = () => {
  const { rooms, fetchRooms } = useRoom();
  const { filteredRooms, ...filterProps } = useRoomFilters(rooms);
  const { 
    editingRoom, showModal, setShowModal,
    bookingRoom, showBookingModal, setShowBookingModal,
    openCreateModal, openEditModal, openBookingModal,
  } = useRoomModals();

  useEffect(() => { fetchRooms(); }, []);

  const stats = computeStats(rooms);

  return (
    <div className="page-content">
      <div className={styles.roomsPage}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles["header__tag"]}>Management</span>
            <h1>Rooms</h1>
            <p className={styles.subtitle}>Manage hotel rooms and allocations</p>
          </div>
          <button className={styles.addButton} onClick={openCreateModal}>+ Add Room</button>
        </div>

        <RoomStatsGrid stats={stats} />
        <RoomFilters {...filterProps} roomTypes={roomTypes} statusFilters={statusFilters} />

        <div className={styles.roomGrid}>
          {filteredRooms.map(room => (
            <RoomCard
              key={room._id ?? room.id}
              room={room}
              onEdit={openEditModal}
              onBook={openBookingModal}
            />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No rooms found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {showModal && (
        <AddNewRoomModal editingRoom={editingRoom} setShowModal={setShowModal} />
      )}
      {showBookingModal && (
        <BookingModal room={bookingRoom} setShowBookingModal={setShowBookingModal} />
      )}
    </div>
  );
};

export default Rooms;