import { AuthProvider } from '../feat/auth/authContext';
import { RoomProvider } from '../feat/rooms/context/roomContext';
import { GuestContextProvider } from '../feat/guest/context/GuestContext';
import { BookingContextProvider } from '../feat/bookings/context/BookingContext';
const AppProviders = ({ children }) => {

    const providers = [AuthProvider, RoomProvider, GuestContextProvider, BookingContextProvider];
    return (
        providers.reduce((acc, Provider) => {
            return <Provider>{acc}</Provider>
        }, children)
    )
}

export default AppProviders;