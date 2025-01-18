import './Category.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import slide1 from '../../../../assets/home/slide1.jpg';
import slide2 from '../../../../assets/home/slide2.jpg';
import slide3 from '../../../../assets/home/slide3.jpg';
import slide4 from '../../../../assets/home/slide4.jpg';
import slide5 from '../../../../assets/home/slide5.jpg';
import SectionTitle from '../../SharedLayout/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div className='max-w-5xl mx-auto px-2'>
            <SectionTitle heading={'ORDER ONLINE'} subHeading={'---From 11:00am to 10:00pm---'} />
            <Swiper
                breakpoints={{
                    425: { slidesPerView: 1, spaceBetween: 10 },
                    426: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 4, spaceBetween: 30 },
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
            >
                <SwiperSlide>
                    <img className='w-full h-[450px]' src={slide1} alt="" />
                    <h1 className='text-4xl uppercase italic -mt-16 pb-10 text-white'>Salad</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full h-[450px]' src={slide2} alt="" />
                    <h1 className='text-4xl uppercase italic -mt-16 pb-10 text-white'>Soups</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full h-[450px]' src={slide3} alt="" />
                    <h1 className='text-4xl uppercase italic -mt-16 pb-10 text-white'>Pizza</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full h-[450px]' src={slide4} alt="" />
                    <h1 className='text-4xl uppercase italic -mt-16 pb-10 text-white'>Desserts</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full h-[450px]' src={slide5} alt="" />
                    <h1 className='text-4xl uppercase italic -mt-16 pb-10 text-white'>Salad</h1>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;