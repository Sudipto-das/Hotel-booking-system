import { createContext, useEffect, useState } from 'react';
import { getAllRooms, addRoom, updateRoom, deleteRoom } from '../services/room.services.js';
import { createBooking } from '../../bookings/services/booking.services.js';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);
    const [bookingLoading,setBookingLoading] = useState(false)
    const [loading, setLoading] = useState(false);
    const [bookingError, setBookingError] = useState(null)

    const handleAddRoom = async (newRoom, imageFile = null) => {
        setLoading(true)
        try {
            const result = await addRoom(newRoom, imageFile);
            setRooms(prevRooms => [...prevRooms, result.room]);
        } catch (err) {
            console.error("Failed to add room:", err);
        } finally {
            setLoading(false)
        }

    };
    const handleUpdateRoom = async (updatedRoom, imageFile = null) => {
        setLoading(true)
        try {
            const result = await updateRoom(updatedRoom._id || updatedRoom.id, updatedRoom, imageFile);
            setRooms(prevRooms => prevRooms.map(r => (r._id || r.id) === (result.room._id || result.room.id) ? result.room : r));
        } catch (err) {
            console.error("Failed to update room:", err);

        } finally {
            setLoading(false)
        }

    }
    const handleDeleteRoom = async (roomId) => {
        setLoading(true)
        try {
            await deleteRoom(roomId);
            setRooms(prevRooms => prevRooms.filter(r => r.id !== roomId));
        } catch (err) {
            console.error("Failed to delete room:", err);
        } finally {
            setLoading(false)
        }
    }
    const fetchRooms = async (force = false) => {
        if(rooms.length >0 && !force) return ;
        setLoading(true)
        try {
            const roomsData = await getAllRooms();
            setRooms(roomsData.rooms);
        } catch (err) {
            console.error("Failed to fetch rooms:", err);
        } finally {
            setLoading(false)
        }
    };
    const handleBookingRoom = async (bookingData) => {
        setBookingError(null);
        setBookingLoading(true)
        try {
            const result = await createBooking(bookingData);
            return result
        } catch (err) {
            setBookingError(err)
            console.log(err);
        } finally {
            setBookingLoading(false)
        }
    }


    return (
        <RoomContext.Provider value={{ rooms, loading, setRooms, handleAddRoom, handleUpdateRoom, handleDeleteRoom, fetchRooms, handleBookingRoom, bookingError ,bookingLoading}}>
            {children}
        </RoomContext.Provider>
    )
}