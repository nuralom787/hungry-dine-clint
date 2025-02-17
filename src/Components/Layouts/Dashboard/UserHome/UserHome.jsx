import React, { useContext } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';

const UserHome = () => {
    const { user } = useContext(AuthContext);
    return (
        <section className="min-h-screen px-2 md:px-10 mt-4 md:mt-0 rounded-t-xl md:rounded-none bg-gray-300 dark:bg-base-300">
            <section className="max-h-screen overflow-y-auto">
                <h1>User Home</h1>
            </section>
        </section>
    );
};

export default UserHome;