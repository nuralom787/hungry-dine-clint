import { useContext } from "react";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdmin();

    const location = useLocation();

    if (loading || adminLoading) {
        return <div className='flex justify-center items-center min-h-screen'><span className="loading loading-ring loading-lg"></span></div>
    }

    if (user && isAdmin) {
        return children
    }


    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;