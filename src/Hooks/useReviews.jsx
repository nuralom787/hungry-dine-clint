import { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/reviews')
            .then(res => {
                setReviews(res.data);
                setLoading(false);
            })
            .catch(err => {
                // console.log(err.message);
            })
    }, []);

    return [reviews, loading];
};

export default useReviews;