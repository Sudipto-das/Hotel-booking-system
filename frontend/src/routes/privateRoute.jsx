import  { useAuth } from '../feat/auth/hooks/useAuth.js'
import { Navigate, useLocation } from 'react-router';
import Loader from '../components/Loader/Loader.jsx';

const PrivateRoute = ({ children}) =>{
    const { user, loading} = useAuth();
    const location = useLocation();
    
    if(loading){
        return <Loader/>
    }
    return user ? children : <Navigate to="/" state={{ from: location.pathname }} replace />
}

export default PrivateRoute;