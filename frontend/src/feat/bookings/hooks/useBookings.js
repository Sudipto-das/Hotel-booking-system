import {
    BookingContext
} from "../context/BookingContext";

import { useContext } from "react";

export const useBookings = () => {
    return useContext(BookingContext)
}