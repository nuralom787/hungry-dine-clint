import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/menus')
            .then(res => {
                setMenus(res.data);
                setLoading(false);
            })
            .catch(err => {
                // console.log(err.message);
            })
    }, []);

    return [menus, loading];
};

export default useMenu;