import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://hungry-dine.vercel.app'
});

const useAxiosSecure = () => {
    // Request Interceptor
    axiosSecure.interceptors.request.use(function (config) {
        // console.log("stop by axios interceptor", token);
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    // Response Interceptor
    axios.interceptors.response.use(function (response) {
        return response
    }, function (err) {
        const status = err.response.status;
        return Promise.reject(err);
    });



    return axiosSecure;
};

export default useAxiosSecure;