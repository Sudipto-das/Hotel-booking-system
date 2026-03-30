import { useState } from 'react';

 const useRoomModals = () => {
  const [editingRoom, setEditingRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingRoom, setBookingRoom] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const openCreateModal = () => { setEditingRoom(null); setShowModal(true); };
  const openEditModal = (room) => { setEditingRoom(room); setShowModal(true); };
  const openBookingModal = (room) => { setBookingRoom(room); setShowBookingModal(true); };

  return {
    editingRoom, showModal, setShowModal,
    bookingRoom, showBookingModal, setShowBookingModal,
    openCreateModal, openEditModal, openBookingModal,
  };
};

export default useRoomModals