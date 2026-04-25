import { createContext, useState } from "react";
import { getAllBookings } from "../services/booking.services";

export const BookingContext = createContext()

export const BookingContextProvider = ({ children }) => {

    const [allBookings, setAllBookings] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchGetAllBookings = async () => {
        setLoading(true)
        try {
            const response = await getAllBookings()
            setAllBookings(response.data)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    return (
        <BookingContext.Provider value={{allBookings, loading, fetchGetAllBookings}}>
            {children}
        </BookingContext.Provider>
    )
}