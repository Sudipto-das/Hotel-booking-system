import { AuthProvider } from '../feat/auth/authContext';
import { RoomProvider } from '../feat/rooms/context/roomContext';

 const AppProviders = ({ children }) => {

    const providers = [AuthProvider, RoomProvider];
    return (
        providers.reduce((acc, Provider) => {
            return <Provider>{acc}</Provider>
        }, children)
    )
}

export default AppProviders;