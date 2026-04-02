import { getImageUrl, getStatusClass } from '../../../utils/rooms.utils';
import styles from '../Rooms.module.scss';

const RoomCard = ({ room, onEdit, onBook, onViewBooking }) => (
  <div className={styles.roomCard}>
    <div className={styles.roomImage}>
      <img src={getImageUrl(room.imageUrl)} alt={`Room ${room.roomNumber}`} />
      <span className={`${styles.roomStatus} ${getStatusClass(room.status, styles)}`}>
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
          <span>${room.pricePerNight}<small>/night</small></span>
        </div>
        <div className={styles.roomDetail}>
          <span>{room.capacity} Guests</span>
        </div>
      </div>
      <div className={styles.roomAmenities}>
        {room.amenities.slice(0, 3).map((amenity, i) => (
          <span key={i} className={styles.amenityTag}>{amenity}</span>
        ))}
        {room.amenities.length > 3 && (
          <span className={styles.amenityMore}>+{room.amenities.length - 3}</span>
        )}
      </div>
      <div className={styles.roomActions}>
        <button className={styles.viewButton} onClick={room.status == "occupied" ? onViewBooking : onBook}>{room.status == "occupied" ? "View Booking" : "Book Now"}</button>
        <button className={styles.editButton} onClick={() => onEdit(room)}>Edit</button>
      </div>
    </div>
  </div>
);

export default RoomCard;