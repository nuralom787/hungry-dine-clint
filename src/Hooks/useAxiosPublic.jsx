import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://hungry-dine.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;