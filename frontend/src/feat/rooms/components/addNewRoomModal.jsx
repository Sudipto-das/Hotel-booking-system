import styles from '../Rooms.module.scss';
import { roomTypes } from '../room';

const AddRoomModal = ({editingRoom,setShowModal}) => {
  return (
    <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
              <button className={styles.closeButton} onClick={() => setShowModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <form className={styles.modalForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Room Number</label>
                  <input type="text" defaultValue={editingRoom?.number || ''} placeholder="e.g., 101" />
                </div>
                <div className={styles.formGroup}>
                  <label>Room Type</label>
                  <select defaultValue={editingRoom?.type || 'Standard'}>
                    {roomTypes.filter(t => t !== 'All').map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Price per Night ($)</label>
                  <input type="number" defaultValue={editingRoom?.price || ''} placeholder="150" />
                </div>
                <div className={styles.formGroup}>
                  <label>Capacity (Guests)</label>
                  <input type="number" defaultValue={editingRoom?.capacity || ''} placeholder="2" />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select defaultValue={editingRoom?.status || 'available'}>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Amenities</label>
                <div className={styles.amenitiesCheckboxes}>
                  {['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Butler Service'].map(amenity => (
                    <label key={amenity} className={styles.checkbox}>
                      <input
                        type="checkbox"
                        defaultChecked={editingRoom?.amenities?.includes(amenity)}
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveButton}>
                  {editingRoom ? 'Update Room' : 'Add Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}
export default AddRoomModal