import { createContext, useState } from 'react';
import { getAllRooms, addRoom, updateRoom, deleteRoom } from '../services/room.services.js';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);

    const handleAddRoom = async (newRoom) => {
        try {
            const createdRoom = await addRoom(newRoom);
            setRooms(prevRooms => [...prevRooms, createdRoom]);
        } catch (err) {
            console.error("Failed to add room:", err);
        }

    };
    const handleUpdateRoom = async (updatedRoom) => {
        try{
            const room = await updateRoom(updatedRoom._id,updatedRoom);
            setRooms(prevRooms => prevRooms.map(r => r.id === room.id ? room : r));
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