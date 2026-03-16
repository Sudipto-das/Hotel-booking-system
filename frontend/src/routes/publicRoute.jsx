
import { useAuth } from "../feat/auth/hooks/useAuth";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }
    return !user ? children : <Navigate to="/create-room" replace />;
}

export default PublicRoute;