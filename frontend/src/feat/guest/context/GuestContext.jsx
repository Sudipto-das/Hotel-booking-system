import { createContext, useState } from "react"
import { addGuest, updateGuest, deleteGuest, getAllGuests } from "../services/Guests.services"

export const GuestContext = createContext()

export const GuestContextProvider = ({ children }) => {

    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchGuests = async () => {
        setLoading(true);
        try {

            const data = await getAllGuests()
            setGuests(data);

        } catch (err) {
            console.error("Failed to fetch guests:", err);

        } finally {
            setLoading(false);
        }
    }
    const createGuest = async (guestData) => {
        try {
            const newGuest = await addGuest(guestData);
            setGuests((prev) => [...prev, newGuest]);
        } catch (err) {
            console.error("Failed to create guest:", err);
        }
    }
    const editGuest = async (guestId, guestData) => {
        try {
            const updatedGuest = await updateGuest(guestId, guestData);
            setGuests(prev => prev.map(g => (g._id === guestId) ? updatedGuest : g))
        } catch (err) {
            console.error("Failed to update guest:", err);
        }
    }

    const removeGuest = async (guestId)=>{
        try{
            await deleteGuest(guestId);
            setGuests(prev => prev.filter(g => g._id !== guestId));
        } catch (err) {
            console.error("Failed to delete guest:", err);

        }
    }
    return (
        <GuestContext.Provider value={{ guests, setGuests, loading, fetchGuests, createGuest, editGuest, removeGuest }}>
            {children}
        </GuestContext.Provider>
    )
}