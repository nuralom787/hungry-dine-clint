import featured from '../../../../assets/home/featured.jpg';
import SectionTitle from '../../SharedLayout/SectionTitle/SectionTitle';
import './FeaturedItem.css';


const FeaturedItem = () => {
    return (
        <div className="bg-featured bg-fixed bg-cover bg-no-repeat">
            <div className="bg-[#151515B3] py-32 space-y-16">
                <SectionTitle subHeading={'---Check It Out---'} heading={'from our menu'} space={"my-0"} />
                <div className='flex flex-col md:flex-row justify-center items-center gap-10 max-w-5xl mx-auto px-2'>
                    <img className='w-3/4 md:w-3/6' src={featured} alt="" />
                    <div className='text-center md:text-start'>
                        <h4 className='font-normal font-Inter text-2xl text-white'>
                            March 20, 2023 <br />
                            WHERE CAN I GET SOME?
                        </h4>
                        <p className='font-normal font-Inter text-xl text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias esse eius soluta quia commodi adipisci sit quis voluptas! Lorem ipsum dolor sit amet.</p>
                        <button className='mt-10 uppercase font-Inter font-medium text-xl text-[#FFFFFF] px-8 py-2 rounded-lg border-b-2 border-[#FFFFFF] hover:border-b-2 hover:border-[#1F2937] hover:bg-[#1F2937] duration-300'>read more</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedItem;