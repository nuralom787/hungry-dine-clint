import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();


    const { refetch, isPending: adminLoading, data: isAdmin } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            // console.log(res.data);
            return res.data.admin;
        }
    });


    return [isAdmin, adminLoading, refetch];
};

export default useAdmin;