import React, { useContext } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const UserHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);


    // Load Admin Statistic Data.
    // const { data: statistics, refetch, isPending } = useQuery({
    //     queryKey: ["statistics"],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get("/admin/statistic");
    //         return res.data;
    //     }
    // });



    return (
        <section className="min-h-screen px-2 md:px-10 mt-4 md:mt-0 rounded-t-xl md:rounded-none bg-gray-300 dark:bg-base-300">
            <section className="max-h-screen overflow-y-auto">
                <h1 className='font-bold font-Cinzel my-6 text-xl text-[#151515] dark:text-white'>Hi! Welcome Back, <span className='uppercase font-Inter text-[#D1A054]'>{user?.displayName}</span></h1>
                {/* <h1>Revenue: {statistics?.revenue}</h1>
                <h1>Menus: {statistics?.menus}</h1>
                <h1>Orders: {statistics?.orders}</h1>
                <h1>Users: {statistics?.users}</h1> */}
            </section>
        </section>
    );
};

export default UserHome;