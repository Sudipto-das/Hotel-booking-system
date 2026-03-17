import  { useAuth } from '../feat/auth/hooks/useAuth.js'
import { Navigate } from 'react-router';


const PrivateRoute = ({ children}) =>{
    const { user, loading} = useAuth();

    if(loading){
        return <div>Loading...</div>
    }
    return user ? children : <Navigate to="/" replace />
}

export default PrivateRoute;