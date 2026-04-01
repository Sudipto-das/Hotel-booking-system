import { createContext, useEffect, useState } from "react";
import { addGuest, updateGuest, deleteGuest, getAllGuests } from "../services/guests.services.js"

export const GuestContext = createContext()

export const GuestContextProvider = ({ children }) => {

    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchGuests = async (force = false) => {
        if (guests.length > 0 && !force) return;
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
        setLoading(true)
        try {
            const newGuest = await addGuest(guestData);
            setGuests((prev) => [...prev, newGuest]);
        } catch (err) {
            console.error("Failed to create guest:", err);
        } finally {
            setLoading(false)
        }
    }
    const editGuest = async (guestId, guestData) => {
        setLoading(true)
        try {
            const updatedGuest = await updateGuest(guestId, guestData);
            setGuests(prev => prev.map(g => (g._id === guestId) ? updatedGuest : g))
        } catch (err) {
            console.error("Failed to update guest:", err);
        } finally {
            setLoading(false)
        }
    }

    const removeGuest = async (guestId) => {
        setLoading(true)
        try {
            await deleteGuest(guestId);
            setGuests(prev => prev.filter(g => g._id !== guestId));
        } catch (err) {
            console.error("Failed to delete guest:", err);

        }
        finally {
            setLoading(false)
        }
    }
    return (
        <GuestContext.Provider value={{ guests, setGuests, loading, fetchGuests, createGuest, editGuest, removeGuest }}>
            {children}
        </GuestContext.Provider>
    )
}