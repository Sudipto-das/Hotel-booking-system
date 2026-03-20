import styles from '../Rooms.module.scss';
import { roomTypes } from '../room';
import { useRoom } from '../hooks/useRoom';
import { useState } from 'react';

const AddRoomModal = ({ editingRoom, setShowModal }) => {
  const { handleAddRoom, handleUpdateRoom } = useRoom();

  const [formData, setFormData] = useState({
    roomNumber: editingRoom?.roomNumber || '',
    type: editingRoom?.type || 'Single',
    pricePerNight: editingRoom?.pricePerNight || '',
    capacity: editingRoom?.capacity || '',
    status: editingRoom?.status || 'available',
    amenities: editingRoom?.amenities || [],
    imageUrl: editingRoom?.imageUrl || ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => {
        const updatedAmenities = new Set(prev.amenities);

        if (checked) {
          updatedAmenities.add(value);
        } else {
          updatedAmenities.delete(value);
        }

        return {
          ...prev,
          amenities: Array.from(updatedAmenities)
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const roomData = {
      roomNumber: formData.roomNumber,
      type: formData.type,
      pricePerNight: parseFloat(formData.pricePerNight),
      capacity: parseInt(formData.capacity),
      status: formData.status,
      amenities: formData.amenities,
      imageUrl: formData.imageUrl
    };

    if (editingRoom) {
      handleUpdateRoom({ ...editingRoom, ...roomData });
    } else {
      handleAddRoom(roomData);
    }

    setShowModal(false);
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => setShowModal(false)}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
          <button
            className={styles.closeButton}
            onClick={() => setShowModal(false)}
          >
            ✕
          </button>
        </div>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Room Number</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="e.g., 101"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Room Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                {roomTypes
                  .filter((t) => t !== 'All')
                  .map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Price per Night ($)</label>
              <input
                type="number"
                name="pricePerNight"
                value={formData.pricePerNight}
                onChange={handleChange}
                placeholder="150"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Capacity (Guests)</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="2"
              />
            </div>
            
          </div>

          <div className={styles.formGroup}>
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Amenities</label>
            <div className={styles.amenitiesCheckboxes}>
              {[
                'WiFi',
                'TV',
                'AC',
                'Mini Bar',
                'Balcony',
                'Jacuzzi',
                'Butler Service'
              ].map((amenity) => (
                <label key={amenity} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onChange={handleChange}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Room Image</label>
            <input
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // Create a local URL for preview
                  const fileUrl = URL.createObjectURL(file);
                  setFormData((prev) => ({ ...prev, imageUrl: fileUrl }));
                }
              }}
            />
            {formData.imageUrl && (
              <div className={styles.imagePreview}>
                <img src={formData.imageUrl} alt="Room preview" />
              </div>
            )}
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

            <button type="submit" className={styles.saveButton}>
              {editingRoom ? 'Update Room' : 'Add Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal;