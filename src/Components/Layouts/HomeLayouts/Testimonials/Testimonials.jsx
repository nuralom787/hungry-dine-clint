import { useEffect, useState } from "react";
import SectionTitle from "../../SharedLayout/SectionTitle/SectionTitle";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaRegUserCircle } from "react-icons/fa";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import 'swiper/css';
import 'swiper/css/navigation';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
            })
    }, []);


    return (
        <section className="max-w-5xl mx-auto px-2">
            <SectionTitle subHeading={'---What Our Clients Say---'} heading={'TESTIMONIALS'} />
            <div>
                <Swiper navigation={true} modules={[Navigation]}>
                    {
                        reviews.map(review => <SwiperSlide key={review._id}>
                            <div className="space-y-10 px-20">
                                <Rating
                                    style={{ maxWidth: 180, margin: '0 auto' }}
                                    value={review.rating}
                                    readOnly
                                />
                                <FaRegUserCircle className="mx-auto text-9xl" />
                                <p className="font-normal font-Inter text-xl text-[#444444] dark:text-white">{review.details}</p>
                                <h1 className="font-medium font-Inter text-3xl text-[#CD9003] uppercase">{review.name}</h1>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;