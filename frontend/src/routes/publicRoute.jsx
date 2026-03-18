
import { useAuth } from "../feat/auth/hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    
    // Get the intended destination from state, default to /dashboard
    const from = location.state?.from || "/dashboard";

    if (loading) {
        return <div>Loading...</div>;
    }
    return !user ? children : <Navigate to={from} replace />;
}

export default PublicRoute;