import axios from "axios";


const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';


const api = axios.create({
    baseURL: `${backendUrl}/api/bookings`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})


const createBooking = async (bookingData) => {
    try {
        const response = await api.post('/create', bookingData);
        return response.data
    } catch (err) {
        throw err
    }
}


const getAllBookings = async () => {
    try {
        const response = await api.get('/all')
        return response.data
    } catch (err) {
        throw err
    }
}
export { createBooking ,getAllBookings}