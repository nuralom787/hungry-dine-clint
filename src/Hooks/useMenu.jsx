import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    const axiosPublic = useAxiosPublic();

    const { refetch, isPending, data: menus = [] } = useQuery({
        queryKey: ['menus'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menus');
            return res.data;
        }
    });

    return [menus, isPending, refetch];
};

export default useMenu;