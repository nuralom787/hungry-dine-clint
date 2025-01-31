import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://hungry-dine.vercel.app'
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;