import { useContext } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FaTruck, FaUsers, FaWallet } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);


    // Load Admin Statistic Data.
    const { data: statistics, refetch, isPending } = useQuery({
        queryKey: ["statistics"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/statistic");
            return res.data;
        }
    });



    return (
        <section className="min-h-screen px-2 md:px-10 mt-4 md:mt-0 rounded-t-xl md:rounded-none bg-gray-300 dark:bg-base-300">
            <section className="max-h-screen overflow-y-auto">
                <h1 className='font-bold font-Cinzel my-10 text-xl text-[#151515] dark:text-white'>Hi! Welcome Back, <span className='uppercase font-Inter text-[#D1A054]'>{user?.displayName}</span></h1>
                {isPending ?
                    <div className="bg-base-200 p-2 rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-32 w-full"></div>
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex justify-start items-center gap-4 py-8 px-4 rounded-xl bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] font-Inter font-bold text-white">
                            <FaWallet className="text-6xl" />
                            <div>
                                <h1 className="text-2xl">{statistics?.revenue.toFixed(2)}</h1>
                                <p className="text-lg font-light">Revenue</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-4 py-8 px-4 rounded-xl bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] font-Inter font-bold text-white">
                            <FaUsers className="text-6xl" />
                            <div>
                                <h1 className="text-2xl">{statistics?.users}</h1>
                                <p className="text-lg font-light">Users</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-4 py-8 px-4 rounded-xl bg-gradient-to-r from-[#FE4880] to-[#FECDE9] font-Inter font-bold text-white">
                            <MdFastfood className="text-6xl" />
                            <div>
                                <h1 className="text-2xl">{statistics?.menus}</h1>
                                <p className="text-lg font-light">Menus</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-4 py-8 px-4 rounded-xl bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] font-Inter font-bold text-white">
                            <FaTruck className="text-6xl" />
                            <div>
                                <h1 className="text-2xl">{statistics?.orders}</h1>
                                <p className="text-lg font-light">Orders</p>
                            </div>
                        </div>
                    </div>
                }
                <div className="divider before:bg-[#151515] dark:before:bg-white after:bg-[#151515] dark:after:bg-white"></div>
                <div>

                </div>
            </section>
        </section>
    );
};

export default AdminHome;