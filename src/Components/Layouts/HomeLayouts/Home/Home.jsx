import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import ChefRecommended from "../ChefRecommended/ChefRecommended";
import FeaturedItem from "../FeaturedItem/FeaturedItem";
import OurMenu from "../OurMenu/OurMenu";
import Promo from "../Promo/Promo";
import Testimonials from "../Testimonials/Testimonials";
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div className="space-y-20">
            <Helmet>
                <title>Hungry Dine | Home</title>
            </Helmet>
            <Banner />
            <Category />
            <Promo />
            <OurMenu />
            <section>
                <div className="px-4 py-16 md:p-32 bg-black">
                    <h1 className="font-Inter text-xl md:text-5xl font-semibold text-white">Call Us: +880123456789</h1>
                </div>
            </section>
            <ChefRecommended />
            <FeaturedItem />
            <Testimonials />
        </div>
    );
};

export default Home;