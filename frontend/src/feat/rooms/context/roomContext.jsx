import { createContext, useState } from 'react';
import { getAllRooms, addRoom, updateRoom, deleteRoom } from '../services/room.services.js';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);

    const handleAddRoom = async (newRoom, imageFile = null) => {
        try {
            const result = await addRoom(newRoom, imageFile);
            setRooms(prevRooms => [...prevRooms, result.room]);
        } catch (err) {
            console.error("Failed to add room:", err);
        }

    };
    const handleUpdateRoom = async (updatedRoom, imageFile = null) => {
        try{
            const result = await updateRoom(updatedRoom._id || updatedRoom.id, updatedRoom, imageFile);
            setRooms(prevRooms => prevRooms.map(r => (r._id || r.id) === (result.room._id || result.room.id) ? result.room : r));
        } catch (err) {
            console.error("Failed to update room:", err);

        }
        
    } 
    const handleDeleteRoom = async (roomId) => {
        try{
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

  


    return (
        <RoomContext.Provider value={{ rooms, setRooms, handleAddRoom, handleUpdateRoom, handleDeleteRoom, fetchRooms }}>
            {children}
        </RoomContext.Provider>
    )
}