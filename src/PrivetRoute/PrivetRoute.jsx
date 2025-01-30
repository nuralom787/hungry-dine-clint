import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'><span className="loading loading-ring loading-lg"></span></div>
    }

    if (user) {
        return children
    }


    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;
};

export default PrivetRoute;