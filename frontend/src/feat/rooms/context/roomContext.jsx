import { createContext, useEffect, useState } from 'react';
import { getAllRooms, addRoom, updateRoom, deleteRoom } from '../services/room.services.js';
import { createBooking } from '../../bookings/services/booking.services.js';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);
    const [bookingLoading,setBookingLoading] = useState(false);
    const [bookingError,setBookingError]=useState(null)

    const handleAddRoom = async (newRoom, imageFile = null) => {
        try {
            const result = await addRoom(newRoom, imageFile);
            setRooms(prevRooms => [...prevRooms, result.room]);
        } catch (err) {
            console.error("Failed to add room:", err);
        }

    };
    const handleUpdateRoom = async (updatedRoom, imageFile = null) => {
        try {
            const result = await updateRoom(updatedRoom._id || updatedRoom.id, updatedRoom, imageFile);
            setRooms(prevRooms => prevRooms.map(r => (r._id || r.id) === (result.room._id || result.room.id) ? result.room : r));
        } catch (err) {
            console.error("Failed to update room:", err);

        }

    }
    const handleDeleteRoom = async (roomId) => {
        try {
            await deleteRoom(roomId);
            setRooms(prevRooms => prevRooms.filter(r => r.id !== roomId));
        } catch (err) {
            console.error("Failed to delete room:", err);
        }
    }
    const fetchRooms = async () => {
        try {
            const roomsData = await getAllRooms();
            setRooms(roomsData.rooms);
        } catch (err) {
            console.error("Failed to fetch rooms:", err);
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
        }finally{
            setBookingLoading(false)
        }
    }


    useEffect(() => {
        fetchRooms();
    },[])




    return (
        <RoomContext.Provider value={{ rooms, setRooms, handleAddRoom, handleUpdateRoom, handleDeleteRoom, fetchRooms,handleBookingRoom,bookingLoading,bookingError }}>
            {children}
        </RoomContext.Provider>
    )
}