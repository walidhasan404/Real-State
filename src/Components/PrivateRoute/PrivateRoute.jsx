import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('lastVisited', location.pathname);
    }, [user, location])

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" />;
};

export default PrivateRoute;
